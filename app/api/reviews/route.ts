import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT
        r.id,
        r.booking_id   AS bookingId,
        r.user_id      AS userId,
        u.nama         AS nama,
        r.layanan_id   AS layananId,
        l.nama         AS layananNama,
        l.slug         AS layananSlug,
        r.rating,
        r.komentar,
        r.status,
        r.created_at   AS createdAt
      FROM reviews r
      LEFT JOIN users u ON u.id = r.user_id
      LEFT JOIN layanan_villa l ON l.id = r.layanan_id
      ORDER BY r.created_at DESC
      `
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO reviews (booking_id, user_id, layanan_id, rating, komentar, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
      `,
      [
        body.bookingId,
        user.id,
        body.layananId,
        body.rating,
        body.komentar,
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menambah ulasan" },
      { status: 500 }
    );
  }
}
