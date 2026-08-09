import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const { id } = await params;
  const body = await req.json();

  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (body.nama !== undefined) { fields.push(`nama=$${index++}`); values.push(body.nama); }
  if (body.slug !== undefined) { fields.push(`slug=$${index++}`); values.push(body.slug); }
  if (body.kategori !== undefined) { fields.push(`kategori=$${index++}`); values.push(body.kategori); }
  if (body.harga !== undefined) { fields.push(`harga=$${index++}`); values.push(body.harga); }
  if (body.deskripsi !== undefined) { fields.push(`deskripsi=$${index++}`); values.push(body.deskripsi); }
  if (body.aktif !== undefined) { fields.push(`aktif=$${index++}`); values.push(body.aktif ? 1 : 0); }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(id);

  await pool.query(
    `UPDATE layanan_villa SET ${fields.join(",")} WHERE id=$${index}`,
    values,
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;

  await pool.query(
    `UPDATE layanan_villa SET aktif=0 WHERE id=$1`,
    [id],
  );

  return NextResponse.json({ success: true });
}