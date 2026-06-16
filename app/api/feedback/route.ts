import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { rating, comment } = await req.json();
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    await sql`
      INSERT INTO feedback (rating, comment)
      VALUES (${Number(rating)}, ${(comment || "").toString().slice(0, 1000)})
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql<Array<{ id: number; rating: number; comment: string; created_at: string }>>`
      SELECT id, rating, comment, created_at
      FROM feedback
      ORDER BY created_at DESC
      LIMIT 200
    `;

    const avg = rows.length
      ? (rows.reduce((s, r) => s + Number(r.rating), 0) / rows.length).toFixed(1)
      : "0.0";

    const distribution = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: rows.filter((r) => Number(r.rating) === star).length,
    }));

    return NextResponse.json({ total: rows.length, average: avg, distribution, reviews: rows });
  } catch {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
