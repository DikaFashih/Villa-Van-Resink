import { NextRequest, NextResponse } from "next/server";

import { getBookingById, setBuktiUrl } from "@/lib/booking";
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
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const bookingId = Number(id);
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { ok: false, error: "Booking tidak ditemukan" },
        { status: 404 },
      );
    }

    const isOwner = booking.user_id === user.id;
    const isAdmin = user.role === "admin" || user.role === "superadmin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "File tidak ditemukan" },
        { status: 400 },
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Format file harus JPG, PNG, atau PDF" },
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
    const path = `booking-${bookingId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("bukti-transfer")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { ok: false, error: "Gagal upload file" },
        { status: 500 },
      );
    }

    await setBuktiUrl(bookingId, path);

    return NextResponse.json({ ok: true, path });
  } catch (err) {
    console.error("Error upload bukti:", err);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const bookingId = Number(id);
    const booking = await getBookingById(bookingId);

    if (!booking || !booking.bukti_url) {
      return NextResponse.json(
        { ok: false, error: "Bukti tidak ditemukan" },
        { status: 404 },
      );
    }

    const isOwner = booking.user_id === user.id;
    const isAdmin = user.role === "admin" || user.role === "superadmin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { data, error } = await supabaseAdmin.storage
      .from("bukti-transfer")
      .createSignedUrl(booking.bukti_url, 60 * 5);

    if (error || !data) {
      return NextResponse.json(
        { ok: false, error: "Gagal membuat link" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, url: data.signedUrl });
  } catch (err) {
    console.error("Error get bukti:", err);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 },
    );
  }
}
