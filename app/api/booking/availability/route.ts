import { NextResponse } from "next/server";

import { getBookedDateRanges } from "@/lib/booking";

export async function GET() {
  try {
    const bookedRanges = await getBookedDateRanges();

    return NextResponse.json({
      ok: true,
      bookedRanges,
    });
  } catch (err) {
    console.error("Error getBookedDateRanges:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
