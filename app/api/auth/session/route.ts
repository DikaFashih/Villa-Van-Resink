import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  const result = await pool.query(
    "SELECT id,nama,email,role FROM users WHERE id=$1",
    [userId],
  );

  if (!result.rows.length) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: result.rows[0],
  });
}
