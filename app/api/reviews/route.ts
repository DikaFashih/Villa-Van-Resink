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
      `,
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
    const body = await req.json();
    console.log("DEBUG - Body diterima:", body); // Log data yang diterima

    if (!user) {
      console.log("DEBUG - User tidak terautentikasi");
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    let layananId = body.layananId;

    if (!layananId && body.layananSlug) {
      const [services] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM layanan_villa WHERE slug = ?",
        [body.layananSlug],
      );
      console.log("DEBUG - Hasil pencarian slug:", services); // Log hasil query slug

      if (services.length > 0) {
        layananId = services[0].id;
      }
    }

    if (!layananId) {
      console.log(
        "DEBUG - LayananId tidak ditemukan untuk slug:",
        body.layananSlug,
      );
      return NextResponse.json(
        { ok: false, error: "Layanan tidak ditemukan" },
        { status: 400 },
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO reviews (booking_id, user_id, layanan_id, rating, komentar, status) VALUES (?, ?, ?, ?, ?, 'approved')`,
      [body.bookingId ?? null, user.id, layananId, body.rating, body.komentar],
    );

    console.log("DEBUG - Berhasil insert, ID:", result.insertId);
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("DEBUG - Error sistem:", error); // Log error asli
    return NextResponse.json(
      { error: "Gagal menambah ulasan", details: error },
      { status: 500 },
    );
  }
}
