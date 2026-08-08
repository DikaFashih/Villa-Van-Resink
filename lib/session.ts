import { cookies } from "next/headers";
import { pool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

const COOKIE_NAME = "vvr_session";

export async function createSession(userId: number) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, String(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionUserId() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME);

  if (!value) return null;

  return Number(value.value);
}

interface SessionUser extends RowDataPacket {
  id: number;
  nama: string;
  email: string;
  role: "user" | "admin" | "superadmin";
}

export async function getSessionUser() {
  const userId = await getSessionUserId();

  if (!userId) return null;

  const [rows] = await pool.query<SessionUser[]>(
    `
    SELECT
      id,
      nama,
      email,
      role
    FROM users
    WHERE id=?
    LIMIT 1
    `,
    [userId]
  );

  return rows.length ? rows[0] : null;
}

