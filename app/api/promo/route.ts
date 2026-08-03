import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Ambil semua promo
export async function GET() {
  const [rows] = await pool.query(
    `SELECT p.id, l.slug AS paketSlug, p.judul, p.deskripsi,
            p.diskon_persen AS diskonPersen, p.aktif,
            p.tanggal_mulai AS tanggalMulai, p.tanggal_selesai AS tanggalSelesai
     FROM promo p
     JOIN layanan_villa l ON p.layanan_id = l.id
     ORDER BY p.id DESC`,
  );
  return NextResponse.json(rows);
}

// Tambah promo baru
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    paketSlug,
    judul,
    deskripsi,
    diskonPersen,
    aktif,
    tanggalMulai,
    tanggalSelesai,
  } = body;

  const [paketRows] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM layanan_villa WHERE slug = ?",
    [paketSlug],
  );

  if (paketRows.length === 0) {
    return NextResponse.json(
      { error: "Paket tidak ditemukan" },
      { status: 400 },
    );
  }

  const layananId = paketRows[0].id;

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO promo (layanan_id, judul, deskripsi, diskon_persen, aktif, tanggal_mulai, tanggal_selesai)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      layananId,
      judul,
      deskripsi,
      diskonPersen,
      aktif ? 1 : 0,
      tanggalMulai,
      tanggalSelesai,
    ],
  );

  return NextResponse.json({
    id: result.insertId,
    paketSlug,
    judul,
    deskripsi,
    diskonPersen,
    aktif,
    tanggalMulai,
    tanggalSelesai,
  });
}
