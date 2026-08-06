import { NextRequest, NextResponse } from "next/server";

import {
  createBooking,
  getAllBookings,
  getBookingsByUser,
} from "@/lib/booking";

import { getSessionUser } from "@/lib/session";

export async function GET() {
  try {

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      user.role === "admin" ||
      user.role === "superadmin"
    ) {

      const bookings = await getAllBookings();

      return NextResponse.json({
        ok: true,
        bookings,
      });

    }

    const bookings = await getBookingsByUser(user.id);

    return NextResponse.json({
      ok: true,
      bookings,
    });

  } catch {

    return NextResponse.json(
      {
        ok: false,
        error: "Server Error",
      },
      {
        status: 500,
      }
    );

  }
}

export async function POST(
  request: NextRequest
) {

  try {

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const bookingId = await createBooking(

      user.id,

      body.layanan_id,

      body.check_in,

      body.check_out,

      body.jumlah_orang

    );

    return NextResponse.json({

      ok: true,

      bookingId,

    });

  } catch {

    return NextResponse.json(
      {
        ok: false,
        error: "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}
