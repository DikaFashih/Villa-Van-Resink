import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const body = await req.json();

    await pool.query(
      `UPDATE questions SET jawaban=$1, status='dijawab' WHERE id=$2`,
      [body.jawaban, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menjawab pertanyaan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    await pool.query(
      `DELETE FROM questions WHERE id=$1`,
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menghapus pertanyaan" },
      { status: 500 }
    );
  }
}