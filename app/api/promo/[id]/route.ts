import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Update promo (misal ubah status aktif)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (body.judul !== undefined) {
    fields.push("judul = ?");
    values.push(body.judul);
  }
  if (body.deskripsi !== undefined) {
    fields.push("deskripsi = ?");
    values.push(body.deskripsi);
  }
  if (body.diskonPersen !== undefined) {
    fields.push("diskon_persen = ?");
    values.push(body.diskonPersen);
  }
  if (body.aktif !== undefined) {
    fields.push("aktif = ?");
    values.push(body.aktif ? 1 : 0);
  }
  if (body.tanggalMulai !== undefined) {
    fields.push("tanggal_mulai = ?");
    values.push(body.tanggalMulai);
  }
  if (body.tanggalSelesai !== undefined) {
    fields.push("tanggal_selesai = ?");
    values.push(body.tanggalSelesai);
  }

  if (fields.length === 0) {
    return NextResponse.json(
      { error: "Tidak ada data untuk diupdate" },
      { status: 400 },
    );
  }

  values.push(id);
  await pool.query(
    `UPDATE promo SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  return NextResponse.json({ ok: true });
}

// Hapus promo
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await pool.query("DELETE FROM promo WHERE id = ?", [id]);
  return NextResponse.json({ ok: true });
}
