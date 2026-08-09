import { pool } from "@/lib/db";

export interface Paket {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  harga: number;
  deskripsi: string;
  aktif: boolean;
}

export async function getAllPaket() {
  const result = await pool.query<Paket>(
    `
    SELECT *
    FROM layanan_villa
    WHERE aktif = 1
    ORDER BY nama ASC
    `
  );

  return result.rows;
}

export async function getPaketById(id: number) {
  const result = await pool.query<Paket>(
    `
    SELECT *
    FROM layanan_villa
    WHERE id = $1
    LIMIT 1
    `,
    [id]
  );

  return result.rows.length ? result.rows[0] : null;
}

export async function getPaketBySlug(slug: string) {
  const result = await pool.query<Paket>(
    `
    SELECT *
    FROM layanan_villa
    WHERE slug = $1
    LIMIT 1
    `,
    [slug]
  );

  return result.rows.length ? result.rows[0] : null;
}

export async function createPaket(
  nama: string,
  slug: string,
  kategori: string,
  harga: number,
  deskripsi: string
) {
  const result = await pool.query(
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
    ($1,$2,$3,$4,$5,1)
    RETURNING id
    `,
    [
      nama,
      slug,
      kategori,
      harga,
      deskripsi,
    ]
  );

  return result.rows[0].id;
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
      nama=$1,
      slug=$2,
      kategori=$3,
      harga=$4,
      deskripsi=$5,
      aktif=$6
    WHERE id=$7
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
    WHERE id=$1
    `,
    [id]
  );
}