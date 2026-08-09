import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        nama,
        slug,
        kategori,
        harga,
        deskripsi
      FROM layanan_villa
      WHERE aktif=1
      ORDER BY kategori,nama
    `);

    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, slug, kategori, harga, deskripsi } = body;

    if (!nama || !slug || !kategori || harga === undefined) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `
      INSERT INTO layanan_villa (nama, slug, kategori, harga, deskripsi, aktif)
      VALUES ($1, $2, $3, $4, $5, 1)
      RETURNING id
      `,
      [nama, slug, kategori, harga, deskripsi ?? ""],
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menambah paket" },
      { status: 500 },
    );
  }
}