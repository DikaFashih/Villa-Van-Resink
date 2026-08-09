import { pool } from "@/lib/db";

export interface BookingMessage {
  id: number;
  booking_id: number;
  sender_id: number;
  sender_nama: string;
  sender_role: "user" | "admin" | "superadmin";
  pesan: string;
  created_at: string;
}

export async function getMessagesForBooking(bookingId: number) {
  const result = await pool.query<BookingMessage>(
    `
    SELECT m.id, m.booking_id, m.sender_id, m.pesan, m.created_at,
           u.nama AS sender_nama, u.role AS sender_role
    FROM booking_messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.booking_id = $1
    ORDER BY m.created_at ASC
    `,
    [bookingId],
  );
  return result.rows;
}

export async function sendMessage(
  bookingId: number,
  senderId: number,
  pesan: string,
) {
  await pool.query(
    `INSERT INTO booking_messages (booking_id, sender_id, pesan) VALUES ($1, $2, $3)`,
    [bookingId, senderId, pesan],
  );
}
