import { NextRequest, NextResponse } from "next/server";

import {
  attachSignedUrls,
  getMessagesForBooking,
  sendAttachmentMessage,
} from "@/lib/messages";
import { getSessionUser } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Belum login." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const bookingId = Number(id);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "File tidak ditemukan" },
        { status: 400 },
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "File harus berupa foto (JPG, PNG, atau WEBP)" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "Ukuran file maksimal 5MB" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split(".").pop();
    const path = `chat-${bookingId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("bukti-transfer")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { ok: false, error: "Gagal upload foto" },
        { status: 500 },
      );
    }

    await sendAttachmentMessage(bookingId, user.id, path);

    const messages = await getMessagesForBooking(bookingId);
    const enriched = await attachSignedUrls(messages);

    return NextResponse.json({ ok: true, messages: enriched });
  } catch (err) {
    console.error("Error upload chat image:", err);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 },
    );
  }
}
