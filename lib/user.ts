import { pool } from "@/lib/db";

export interface User {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
}

export async function findUserByEmail(email: string) {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email],
  );
  return result.rows.length ? result.rows[0] : null;
}

export async function createUser(
  nama: string,
  email: string,
  password: string,
) {
  await pool.query(
    `INSERT INTO users (nama,email,password,role)
     VALUES ($1,$2,$3,'user')`,
    [nama, email, password],
  );
}

export async function getAllAdmins() {
  const result = await pool.query<User>(
    `
    SELECT id, nama, email, role, created_at
    FROM users
    WHERE role IN ('admin','superadmin')
    ORDER BY role DESC, nama
    `,
  );
  return result.rows;
}

export async function createAdmin(
  nama: string,
  email: string,
  hashedPassword: string,
) {
  await pool.query(
    `INSERT INTO users (nama,email,password,role)
     VALUES ($1,$2,$3,'admin')`,
    [nama, email, hashedPassword],
  );
}

export async function updateUser(
  id: number,
  data: { nama?: string; email?: string; role?: string },
) {
  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (data.nama !== undefined) {
    fields.push(`nama=$${index++}`);
    values.push(data.nama);
  }
  if (data.email !== undefined) {
    fields.push(`email=$${index++}`);
    values.push(data.email);
  }
  if (data.role !== undefined) {
    fields.push(`role=$${index++}`);
    values.push(data.role);
  }

  if (fields.length === 0) return;

  values.push(id);

  await pool.query(
    `UPDATE users SET ${fields.join(",")} WHERE id=$${index}`,
    values,
  );
}

export async function deleteUser(id: number) {
  await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
}
