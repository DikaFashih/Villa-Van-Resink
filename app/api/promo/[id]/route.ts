import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;
  const body = await req.json();

  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (body.judul !== undefined) {
    fields.push(`judul=$${index++}`);
    values.push(body.judul);
  }

  if (body.deskripsi !== undefined) {
    fields.push(`deskripsi=$${index++}`);
    values.push(body.deskripsi);
  }

  if (body.diskonPersen !== undefined) {
    fields.push(`diskon_persen=$${index++}`);
    values.push(body.diskonPersen);
  }

  if (body.aktif !== undefined) {
    fields.push(`aktif=$${index++}`);
    values.push(body.aktif ? 1 : 0);
  }

  if (body.tanggalMulai !== undefined) {
    fields.push(`tanggal_mulai=$${index++}`);
    values.push(body.tanggalMulai);
  }

  if (body.tanggalSelesai !== undefined) {
    fields.push(`tanggal_selesai=$${index++}`);
    values.push(body.tanggalSelesai);
  }

  if (body.paketSlug !== undefined) {
    const paketResult = await pool.query(
      "SELECT id FROM layanan_villa WHERE slug=$1",
      [body.paketSlug],
    );

    if (paketResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Paket tidak ditemukan" },
        { status: 404 },
      );
    }

    fields.push(`layanan_id=$${index++}`);
    values.push(paketResult.rows[0].id);
  }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(id);

  await pool.query(
    `UPDATE promo
     SET ${fields.join(",")}
     WHERE id=$${index}`,
    values,
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  await pool.query(
    "DELETE FROM promo WHERE id=$1",
    [id],
  );

  return NextResponse.json({
    success: true,
  });
}