import { pool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
}

export async function findUserByEmail(email: string) {
  const [rows] = await pool.query<User[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows.length ? rows[0] : null;
}

export async function createUser(
  nama: string,
  email: string,
  password: string
) {
  await pool.query(
    `INSERT INTO users (nama,email,password,role)
     VALUES (?,?,?,'user')`,
    [nama, email, password]
  );
}