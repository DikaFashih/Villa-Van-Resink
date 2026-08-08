import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSessionUser } from "@/lib/session";
import { getAllAdmins, createAdmin, findUserByEmail } from "@/lib/user";

export async function GET() {
  const user = await getSessionUser();

  if (!user || user.role !== "superadmin") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const admins = await getAllAdmins();
  return NextResponse.json(admins);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();

  if (!user || user.role !== "superadmin") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { nama, email, password } = await req.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    const exists = await findUserByEmail(email);
    if (exists) {
      return NextResponse.json(
        { error: "Email sudah digunakan." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    await createAdmin(nama, email, hash);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menambah admin" },
      { status: 500 }
    );
  }
}
