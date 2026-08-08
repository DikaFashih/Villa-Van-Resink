import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking } from "@/lib/booking";
import { getSessionUser } from "@/lib/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await getSessionUser();

    // Pastikan hanya admin/superadmin yang bisa ubah status
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // PERBAIKAN: Await params untuk versi Next.js terbaru
    const params = await context.params;
    const bookingId = Number(params.id);

    const body = await request.json();

    if (body.status) {
      await updateBookingStatus(bookingId, body.status);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error PATCH booking:", err);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const user = await getSessionUser();

    // Pastikan hanya admin/superadmin yang bisa hapus
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // PERBAIKAN: Await params
    const params = await context.params;
    const bookingId = Number(params.id);

    await deleteBooking(bookingId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error DELETE booking:", err);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 },
    );
  }
}
