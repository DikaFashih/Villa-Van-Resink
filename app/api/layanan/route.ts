import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, slug, kategori, harga, deskripsi } = body;

    if (!nama || !slug || !kategori || harga === undefined) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO layanan_villa (nama, slug, kategori, harga, deskripsi, aktif)
      VALUES (?, ?, ?, ?, ?, 1)
      `,
      [nama, slug, kategori, harga, deskripsi ?? ""]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menambah paket" },
      { status: 500 }
    );
  }
}
