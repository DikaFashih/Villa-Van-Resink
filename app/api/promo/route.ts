import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Ambil semua promo
export async function GET() {
  const result = await pool.query(
    `SELECT p.id, l.slug AS "paketSlug", p.judul, p.deskripsi,
            p.diskon_persen AS "diskonPersen", p.aktif,
            p.tanggal_mulai AS "tanggalMulai", p.tanggal_selesai AS "tanggalSelesai"
     FROM promo p
     JOIN layanan_villa l ON p.layanan_id = l.id
     ORDER BY p.id DESC`,
  );
  return NextResponse.json(result.rows);
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

  const paketResult = await pool.query(
    "SELECT id FROM layanan_villa WHERE slug = $1",
    [paketSlug],
  );

  if (paketResult.rows.length === 0) {
    return NextResponse.json(
      { error: "Paket tidak ditemukan" },
      { status: 400 },
    );
  }

  const layananId = paketResult.rows[0].id;

  const result = await pool.query(
    `INSERT INTO promo (layanan_id, judul, deskripsi, diskon_persen, aktif, tanggal_mulai, tanggal_selesai)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
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
    id: result.rows[0].id,
    paketSlug,
    judul,
    deskripsi,
    diskonPersen,
    aktif,
    tanggalMulai,
    tanggalSelesai,
  });
}