import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { event } = await req.json();
    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }
    await sql`INSERT INTO analytics_events (event) VALUES (${event})`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const countRow = async (event: string) => {
      const [row] = await sql`
        SELECT COUNT(*) :: integer AS n FROM analytics_events WHERE event = ${event}
      `;
      return Number(row.n);
    };

    const [todayRow] = await sql`
      SELECT COUNT(*) :: integer AS n
      FROM analytics_events
      WHERE event = 'page_visit' AND DATE(created_at) = CURRENT_DATE
    `;

    const last7Days = await sql`
      SELECT DATE(created_at) AS day, COUNT(*) :: integer AS visits
      FROM analytics_events
      WHERE event = 'page_visit'
        AND created_at >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY day
      ORDER BY day ASC
    `;

    return NextResponse.json({
      page_visits: await countRow("page_visit"),
      kumbi_modal_views: await countRow("kumbi_modal_view"),
      kumbi_inquiries: await countRow("kumbi_inquiry"),
      today_visits: Number(todayRow.n),
      last_7_days: last7Days,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
