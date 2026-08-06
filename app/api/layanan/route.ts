import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
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

    return NextResponse.json(rows);

  } catch {

    return NextResponse.json([], { status: 500 });

  }
}