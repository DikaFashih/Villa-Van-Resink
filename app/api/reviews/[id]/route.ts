import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;
    const body = await req.json();

    await pool.query<ResultSetHeader>(
      `
      UPDATE reviews
      SET status = ?
      WHERE id = ?
      `,
      [
        body.status,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal mengubah review",
      },
      {
        status: 500,
      }
    );

  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {

    const { id } = await params;

    await pool.query<ResultSetHeader>(
      `
      DELETE FROM reviews
      WHERE id = ?
      `,
      [
        id,
      ]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal menghapus review",
      },
      {
        status: 500,
      }
    );

  }
}
