import { pool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Booking extends RowDataPacket {
  id: number;
  user_id: number;
  layanan_id: number;
  check_in: string;
  check_out: string;
  jumlah_orang: number;
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
}

export async function createBooking(
  userId: number,
  layananId: number,
  checkIn: string,
  checkOut: string,
  jumlahOrang: number
) {
  const [result] = await pool.query<ResultSetHeader>(
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
    VALUES (?,?,?,?,?,'pending')
    `,
    [
      userId,
      layananId,
      checkIn,
      checkOut,
      jumlahOrang,
    ]
  );

  return result.insertId;
}

export async function getBookingsByUser(userId: number) {
  const [rows] = await pool.query<Booking[]>(
    `
    SELECT
      b.*,
      l.nama AS nama_layanan
    FROM booking b
    JOIN layanan_villa l
      ON l.id = b.layanan_id
    WHERE b.user_id=?
    ORDER BY b.created_at DESC
    `,
    [userId]
  );

  return rows;
}

export async function getAllBookings() {
  const [rows] = await pool.query<Booking[]>(
    `
    SELECT
      b.*,
      u.nama AS nama_user,
      l.nama AS nama_layanan
    FROM booking b
    JOIN users u
      ON u.id=b.user_id
    JOIN layanan_villa l
      ON l.id=b.layanan_id
    ORDER BY b.created_at DESC
    `
  );

  return rows;
}

export async function updateBookingStatus(
  id: number,
  status: Booking["status"]
) {
  await pool.query(
    `
    UPDATE booking
    SET status=?
    WHERE id=?
    `,
    [status, id]
  );
}

export async function deleteBooking(
  id: number
) {
  await pool.query(
    `
    DELETE FROM booking
    WHERE id=?
    `,
    [id]
  );
}
