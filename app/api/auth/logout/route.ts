import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

export async function POST() {
  await destroySession();

  const response = NextResponse.json({
    ok: true,
  });

  response.cookies.delete({
    name: "vvr_session",
    path: "/",
  });

  return response;
}
