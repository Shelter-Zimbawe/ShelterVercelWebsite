import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { hasAdminSession } from '@/lib/adminAuth';

function parseCurrency(value: string) {
  const numeric = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatFromPrice(value: number) {
  return value > 0 ? `From $${value.toLocaleString()}` : 'Custom Quote';
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function calculatePlotFinancials(price: number) {
  return { deposit30: roundMoney(price * 0.3) };
}

const canonicalImageFilenames: Record<string, string> = {
  "rockview.webp": "Rockview.webp",
  "adeladepark.webp": "AdeladePark.webp",
  "lendypark.webp": "LendyPark.webp",
  "chipukutu1.webp": "Chipukutu1.webp",
  "chipukutu2.jpg": "Chipukutu2.jpg",
  "chipukutumain.webp": "Chipukutumain.webp",
  "rosegardens.webp": "Rosegardens.webp",
  "rosegardens1.webp": "Rosegardens1.webp",
  "rosegardens2.webp": "Rosegardens2.webp",
  "rosegardens3.webp": "Rosegardens3.webp",
};

function normalizePublicImagePath(image: string) {
  const raw = String(image || "").trim();
  if (!raw.startsWith("/images/")) return raw;
  const [pathOnly, query = ""] = raw.split("?");
  const fileName = pathOnly.split("/").pop()?.toLowerCase();
  if (!fileName) return raw;
  const canonical = canonicalImageFilenames[fileName];
  if (!canonical) return raw;
  return `/images/${canonical}${query ? `?${query}` : ""}`;
}

function serializeStand(stand: any, plots: any[]) {
  return {
    ...stand,
    image: normalizePublicImagePath(stand.image),
    features: JSON.parse(stand.features || '[]'),
    available: Boolean(stand.available),
    direction: stand.direction || '',
    completionStatus: stand.completion_status || 'Ready',
    minimumPrice: stand.minimum_price || parseCurrency(stand.price || ''),
    plots: plots.map((plot) => ({
      id: plot.id,
      size: plot.size,
      price: plot.price,
      deposit30: plot.deposit_30,
      installment24: plot.installment_24,
      installment36: plot.installment_36,
      isGatedCommunity: Boolean(plot.is_gated_community),
    })),
  };
}

export async function GET() {
  try {
    const stands = await sql`SELECT * FROM stands ORDER BY id ASC`;
    const plotOptions = await sql`SELECT * FROM stand_plot_options ORDER BY stand_id ASC, price ASC`;

    const plotsByStandId = plotOptions.reduce<Record<number, any[]>>((acc, plot) => {
      if (!acc[plot.stand_id]) acc[plot.stand_id] = [];
      acc[plot.stand_id].push(plot);
      return acc;
    }, {});

    return NextResponse.json(
      stands.map((stand) => serializeStand(stand, plotsByStandId[stand.id] || []))
    );
  } catch (error) {
    console.error('Error fetching stands:', error);
    return NextResponse.json({ error: 'Failed to fetch stands' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!await hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const minimumPrice = body.minimumPrice || parseCurrency(body.price || '');
    const normalizedImage = normalizePublicImagePath(body.image);
    const plots = Array.isArray(body.plots) ? body.plots : [];

    const [newStand] = await sql`
      INSERT INTO stands (
        name, category, price, image, description, features, available,
        location, size, direction, completion_status, minimum_price
      ) VALUES (
        ${body.name},
        ${body.category},
        ${body.price || formatFromPrice(minimumPrice)},
        ${normalizedImage},
        ${body.description},
        ${JSON.stringify(body.features || [])},
        ${body.available !== undefined ? (body.available ? 1 : 0) : 1},
        ${body.location || ''},
        ${body.size || ''},
        ${body.direction || ''},
        ${body.completionStatus || 'Ready'},
        ${minimumPrice}
      ) RETURNING *
    `;

    for (const plot of plots) {
      const financials = calculatePlotFinancials(Number(plot.price));
      await sql`
        INSERT INTO stand_plot_options (
          stand_id, size, price, deposit_30, installment_24, installment_36, is_gated_community
        ) VALUES (
          ${newStand.id}, ${plot.size}, ${plot.price},
          ${financials.deposit30},
          ${Number(plot.installment24) || 0},
          ${Number(plot.installment36) || 0},
          ${plot.isGatedCommunity ? 1 : 0}
        )
      `;
    }

    const newStandPlots = await sql`
      SELECT * FROM stand_plot_options WHERE stand_id = ${newStand.id} ORDER BY price ASC
    `;

    return NextResponse.json(serializeStand(newStand, newStandPlots), { status: 201 });
  } catch (error) {
    console.error('Error creating stand:', error);
    return NextResponse.json({ error: 'Failed to create stand' }, { status: 500 });
  }
}
