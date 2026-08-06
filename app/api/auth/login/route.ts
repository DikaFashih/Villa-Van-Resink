import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUserByEmail } from "@/lib/user";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Email atau password salah." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Email atau password salah." },
        { status: 401 }
      );
    }
    await createSession(user.id);
    
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
