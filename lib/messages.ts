import { pool } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";

export interface BookingMessage {
  id: number;
  booking_id: number;
  sender_id: number;
  sender_nama: string;
  sender_role: "user" | "admin" | "superadmin";
  pesan: string;
  attachment_url?: string | null;
  attachment_signed_url?: string | null;
  created_at: string;
}

export async function getMessagesForBooking(bookingId: number) {
  const result = await pool.query<BookingMessage>(
    `
    SELECT m.id, m.booking_id, m.sender_id, m.pesan, m.attachment_url, m.created_at,
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

export async function sendAttachmentMessage(
  bookingId: number,
  senderId: number,
  attachmentPath: string,
) {
  await pool.query(
    `INSERT INTO booking_messages (booking_id, sender_id, pesan, attachment_url) VALUES ($1, $2, '', $3)`,
    [bookingId, senderId, attachmentPath],
  );
}

export async function attachSignedUrls(messages: BookingMessage[]) {
  const supabaseAdmin = getSupabaseAdmin();
  const enriched = await Promise.all(
    messages.map(async (m) => {
      if (!m.attachment_url) return m;

      const { data } = await supabaseAdmin.storage
        .from("bukti-transfer")
        .createSignedUrl(m.attachment_url, 60 * 5);

      return { ...m, attachment_signed_url: data?.signedUrl || null };
    }),
  );

  return enriched;
}

