import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { event } = await req.json();
    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }
    db.prepare("INSERT INTO analytics_events (event) VALUES (?)").run(event);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = (event: string) =>
      (db.prepare("SELECT COUNT(*) as n FROM analytics_events WHERE event = ?").get(event) as { n: number }).n;

    const todayVisits = (
      db
        .prepare(
          "SELECT COUNT(*) as n FROM analytics_events WHERE event = 'page_visit' AND DATE(created_at) = DATE('now')"
        )
        .get() as { n: number }
    ).n;

    const last7Days = (
      db
        .prepare(
          "SELECT DATE(created_at) as day, COUNT(*) as visits FROM analytics_events WHERE event = 'page_visit' AND created_at >= DATE('now', '-6 days') GROUP BY day ORDER BY day ASC"
        )
        .all() as Array<{ day: string; visits: number }>
    );

    return NextResponse.json({
      page_visits: count("page_visit"),
      kumbi_modal_views: count("kumbi_modal_view"),
      kumbi_inquiries: count("kumbi_inquiry"),
      today_visits: todayVisits,
      last_7_days: last7Days,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
