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
  try {
    const { id } = await params;
    const body = await req.json();

    await pool.query(
      `
      UPDATE reviews
      SET status = $1
      WHERE id = $2
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

    await pool.query(
      `
      DELETE FROM reviews
      WHERE id = $1
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