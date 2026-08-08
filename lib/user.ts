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

export async function getAllAdmins() {
  const [rows] = await pool.query<User[]>(
    `
    SELECT id, nama, email, role, created_at
    FROM users
    WHERE role IN ('admin','superadmin')
    ORDER BY role DESC, nama
    `
  );
  return rows;
}

export async function createAdmin(
  nama: string,
  email: string,
  hashedPassword: string
) {
  await pool.query(
    `INSERT INTO users (nama,email,password,role)
     VALUES (?,?,?,'admin')`,
    [nama, email, hashedPassword]
  );
}

export async function updateUser(
  id: number,
  data: { nama?: string; email?: string; role?: string }
) {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.nama !== undefined) {
    fields.push("nama=?");
    values.push(data.nama);
  }
  if (data.email !== undefined) {
    fields.push("email=?");
    values.push(data.email);
  }
  if (data.role !== undefined) {
    fields.push("role=?");
    values.push(data.role);
  }

  if (fields.length === 0) return;

  values.push(id);

  await pool.query(
    `UPDATE users SET ${fields.join(",")} WHERE id=?`,
    values
  );
}

export async function deleteUser(id: number) {
  await pool.query(`DELETE FROM users WHERE id=?`, [id]);
}
