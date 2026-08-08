import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "@/lib/user";

export async function POST(req: NextRequest) {
  try {
    const { nama, email, password } = await req.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        {
          ok: false,
          error: "Semua field wajib diisi."
        },
        { status: 400 }
      );
    }

    const exists = await findUserByEmail(email);

    if (exists) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email sudah digunakan."
        },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);

    await createUser(
      nama,
      email,
      hash
    );

    const user = await findUserByEmail(email);

    return NextResponse.json({
      ok: true,
      user: {
        id: user!.id,
        nama: user!.nama,
        email: user!.email,
        role: user!.role,
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        ok: false,
        error: "Server error."
      },
      {
        status: 500
      }
    );
  }
}
