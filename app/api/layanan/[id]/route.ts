import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const { id } = await params;
  const body = await req.json();

  const fields: string[] = [];
  const values: unknown[] = [];

  if (body.nama !== undefined) { fields.push("nama=?"); values.push(body.nama); }
  if (body.slug !== undefined) { fields.push("slug=?"); values.push(body.slug); }
  if (body.kategori !== undefined) { fields.push("kategori=?"); values.push(body.kategori); }
  if (body.harga !== undefined) { fields.push("harga=?"); values.push(body.harga); }
  if (body.deskripsi !== undefined) { fields.push("deskripsi=?"); values.push(body.deskripsi); }
  if (body.aktif !== undefined) { fields.push("aktif=?"); values.push(body.aktif ? 1 : 0); }

  if (fields.length === 0) {
    return NextResponse.json({ success: true });
  }

  values.push(id);

  await pool.query<ResultSetHeader>(
    `UPDATE layanan_villa SET ${fields.join(",")} WHERE id=?`,
    values
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;

  await pool.query<ResultSetHeader>(
    `UPDATE layanan_villa SET aktif=0 WHERE id=?`,
    [id]
  );

  return NextResponse.json({ success: true });
}