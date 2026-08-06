import { pool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Paket extends RowDataPacket {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  harga: number;
  deskripsi: string;
  aktif: boolean;
}

export async function getAllPaket() {
  const [rows] = await pool.query<Paket[]>(
    `
    SELECT *
    FROM layanan_villa
    WHERE aktif = 1
    ORDER BY nama ASC
    `
  );

  return rows;
}

export async function getPaketById(id: number) {
  const [rows] = await pool.query<Paket[]>(
    `
    SELECT *
    FROM layanan_villa
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows.length ? rows[0] : null;
}

export async function getPaketBySlug(slug: string) {
  const [rows] = await pool.query<Paket[]>(
    `
    SELECT *
    FROM layanan_villa
    WHERE slug = ?
    LIMIT 1
    `,
    [slug]
  );

  return rows.length ? rows[0] : null;
}

export async function createPaket(
  nama: string,
  slug: string,
  kategori: string,
  harga: number,
  deskripsi: string
) {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO layanan_villa
    (
      nama,
      slug,
      kategori,
      harga,
      deskripsi,
      aktif
    )
    VALUES
    (?,?,?,?,?,1)
    `,
    [
      nama,
      slug,
      kategori,
      harga,
      deskripsi,
    ]
  );

  return result.insertId;
}

export async function updatePaket(
  id: number,
  nama: string,
  slug: string,
  kategori: string,
  harga: number,
  deskripsi: string,
  aktif: boolean
) {
  await pool.query(
    `
    UPDATE layanan_villa
    SET
      nama=?,
      slug=?,
      kategori=?,
      harga=?,
      deskripsi=?,
      aktif=?
    WHERE id=?
    `,
    [
      nama,
      slug,
      kategori,
      harga,
      deskripsi,
      aktif,
      id,
    ]
  );
}

export async function deletePaket(id: number) {
  await pool.query(
    `
    DELETE FROM layanan_villa
    WHERE id=?
    `,
    [id]
  );
}