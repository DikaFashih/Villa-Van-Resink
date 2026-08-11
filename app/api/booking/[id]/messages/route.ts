import { NextRequest, NextResponse } from "next/server";
import {
  attachSignedUrls,
  getMessagesForBooking,
  sendMessage,
} from "@/lib/messages";
import { getSessionUser } from "@/lib/session";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const messages = await getMessagesForBooking(Number(id));
  const enriched = await attachSignedUrls(messages);
  return NextResponse.json({ ok: true, messages: enriched });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Belum login." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const { pesan } = await req.json();

  if (!pesan || !pesan.trim()) {
    return NextResponse.json(
      { ok: false, error: "Pesan tidak boleh kosong." },
      { status: 400 },
    );
  }

  await sendMessage(Number(id), user.id, pesan.trim());
  const messages = await getMessagesForBooking(Number(id));
  const enriched = await attachSignedUrls(messages);

  return NextResponse.json({ ok: true, messages: enriched });
}
