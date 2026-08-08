import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const body = await req.json();

    await pool.query<ResultSetHeader>(
      `UPDATE questions SET jawaban=?, status='dijawab' WHERE id=?`,
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

    await pool.query<ResultSetHeader>(
      `DELETE FROM questions WHERE id=?`,
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