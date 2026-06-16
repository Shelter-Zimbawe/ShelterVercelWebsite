import { NextResponse } from 'next/server';
import sql from '@/lib/db';

function parseCurrency(value: string) {
  const numeric = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await sql`DELETE FROM stands WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting stand:', error);
    return NextResponse.json({ error: 'Failed to delete stand' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const [currentStand] = await sql`SELECT * FROM stands WHERE id = ${params.id}`;

    if (!currentStand) {
      return NextResponse.json({ error: 'Stand not found' }, { status: 404 });
    }

    const minimumPrice =
      body.minimumPrice ??
      currentStand.minimum_price ??
      parseCurrency(body.price || currentStand.price || '');

    const [updatedStand] = await sql`
      UPDATE stands SET
        name = ${body.name ?? currentStand.name},
        category = ${body.category ?? currentStand.category},
        price = ${body.price ?? currentStand.price},
        image = ${normalizePublicImagePath(body.image ?? currentStand.image)},
        description = ${body.description ?? currentStand.description},
        features = ${JSON.stringify(body.features || JSON.parse(currentStand.features || '[]'))},
        available = ${body.available !== undefined ? (body.available ? 1 : 0) : currentStand.available},
        location = ${body.location ?? currentStand.location},
        size = ${body.size ?? currentStand.size},
        direction = ${body.direction ?? currentStand.direction ?? ''},
        completion_status = ${body.completionStatus ?? currentStand.completion_status ?? 'Ready'},
        minimum_price = ${minimumPrice},
        updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (Array.isArray(body.plots)) {
      await sql`DELETE FROM stand_plot_options WHERE stand_id = ${params.id}`;
      for (const plot of body.plots) {
        const financials = calculatePlotFinancials(Number(plot.price));
        await sql`
          INSERT INTO stand_plot_options (
            stand_id, size, price, deposit_30, installment_24, installment_36, is_gated_community
          ) VALUES (
            ${params.id}, ${plot.size}, ${plot.price},
            ${financials.deposit30},
            ${Number(plot.installment24) || 0},
            ${Number(plot.installment36) || 0},
            ${plot.isGatedCommunity ? 1 : 0}
          )
        `;
      }
    }

    const updatedPlots = await sql`
      SELECT * FROM stand_plot_options WHERE stand_id = ${params.id} ORDER BY price ASC
    `;

    return NextResponse.json(serializeStand(updatedStand, updatedPlots));
  } catch (error) {
    console.error('Error updating stand:', error);
    return NextResponse.json({ error: 'Failed to update stand' }, { status: 500 });
  }
}
