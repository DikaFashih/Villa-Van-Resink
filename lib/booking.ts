import { pool } from "@/lib/db";

export interface Booking {
  id: number;
  user_id: number;
  layanan_id: number;
  check_in: string;
  check_out: string;
  jumlah_orang: number;
  bukti_url?: string | null;
  status:
    | "pending"
    | "diproses"
    | "diterima"
    | "ditolak"
    | "selesai"
    | "dibatalkan";
  created_at: string;

  nama_layanan?: string;
  nama_user?: string;
  layanan_slug?: string;
}

export interface BookedRange {
  check_in: string;
  check_out: string;
}

export async function getBookedDateRanges() {
  const result = await pool.query<BookedRange>(
    `
    SELECT check_in, check_out
    FROM booking
    WHERE status NOT IN ('ditolak', 'dibatalkan')
    ORDER BY check_in ASC
    `,
  );

  return result.rows;
}

export async function isDateRangeAvailable(checkIn: string, checkOut: string) {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM booking
    WHERE status NOT IN ('ditolak', 'dibatalkan')
      AND check_in <= $2
      AND check_out >= $1
    `,
    [checkIn, checkOut],
  );

  return result.rows[0].count === 0;
}

export async function createBooking(
  userId: number,
  layananId: number,
  checkIn: string,
  checkOut: string,
  jumlahOrang: number,
) {
  const available = await isDateRangeAvailable(checkIn, checkOut);

  if (!available) {
    throw new Error("TANGGAL_TIDAK_TERSEDIA");
  }

  const result = await pool.query(
    `
    INSERT INTO booking
    (
      user_id,
      layanan_id,
      check_in,
      check_out,
      jumlah_orang,
      status
    )
    VALUES ($1,$2,$3,$4,$5,'pending')
    RETURNING id
    `,
    [userId, layananId, checkIn, checkOut, jumlahOrang],
  );

  return result.rows[0].id;
}

export async function getBookingsByUser(userId: number) {
  const result = await pool.query<Booking>(
    `
    SELECT
      b.*,
      l.nama AS nama_layanan,
      l.slug AS layanan_slug
    FROM booking b
    JOIN layanan_villa l
      ON l.id = b.layanan_id
    WHERE b.user_id=$1
    ORDER BY b.created_at DESC
    `,
    [userId],
  );

  return result.rows;
}

export async function getAllBookings() {
  const result = await pool.query<Booking>(
    `
    SELECT
      b.*,
      u.nama AS nama_user,
      l.nama AS nama_layanan,
      l.slug AS layanan_slug
    FROM booking b
    JOIN users u
      ON u.id=b.user_id
    JOIN layanan_villa l
      ON l.id=b.layanan_id
    ORDER BY b.created_at DESC
    `,
  );

  return result.rows;
}

export async function updateBookingStatus(
  id: number,
  status: Booking["status"],
) {
  await pool.query(
    `
    UPDATE booking
    SET status=$1
    WHERE id=$2
    `,
    [status, id],
  );
}

export async function deleteBooking(id: number) {
  await pool.query(
    `
    DELETE FROM booking
    WHERE id=$1
    `,
    [id],
  );
}

export async function getBookingById(id: number) {
  const result = await pool.query<Booking>(
    `SELECT * FROM booking WHERE id=$1`,
    [id],
  );

  return result.rows[0] || null;
}

export async function setBuktiUrl(id: number, path: string) {
  await pool.query(`UPDATE booking SET bukti_url=$1 WHERE id=$2`, [path, id]);
}
