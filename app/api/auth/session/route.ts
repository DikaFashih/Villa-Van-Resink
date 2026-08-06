import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { RowDataPacket } from "mysql2";

export async function GET() {

  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({
      authenticated:false
    });
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id,nama,email,role FROM users WHERE id=?",
    [userId]
  );

  if (!rows.length) {
    return NextResponse.json({
      authenticated:false
    });
  }

  return NextResponse.json({
    authenticated:true,
    user:rows[0]
  });

}
