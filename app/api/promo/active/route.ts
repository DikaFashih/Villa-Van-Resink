import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT
        p.id,
        p.judul,
        p.deskripsi,
        p.diskon_persen AS diskon,
        p.tanggal_selesai AS tanggalSelesai,
        l.slug AS paketSlug
      FROM promo p
      JOIN layanan_villa l
        ON l.id = p.layanan_id
      WHERE
        p.aktif = 1
        AND CURDATE() >= p.tanggal_mulai
        AND CURDATE() <= p.tanggal_selesai
      ORDER BY p.diskon_persen DESC
      LIMIT 1
    `);

    if (rows.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(null);
  }
}
