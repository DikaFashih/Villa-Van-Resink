import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        q.id,
        q.user_id AS "userId",
        u.nama AS "userNama",
        q.pertanyaan,
        q.jawaban,
        q.status,
        q.created_at AS "createdAt"
      FROM questions q
      JOIN users u
        ON u.id = q.user_id
      ORDER BY q.created_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengambil pertanyaan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await pool.query(
      `
      INSERT INTO questions
      (
        user_id,
        pertanyaan,
        status
      )
      VALUES
      ($1, $2, 'pending')
      RETURNING id
      `,
      [
        body.userId,
        body.pertanyaan,
      ]
    );

    return NextResponse.json({
      id: result.rows[0].id,
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menambah pertanyaan" },
      { status: 500 }
    );
  }
}