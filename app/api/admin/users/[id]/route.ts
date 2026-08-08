import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { updateUser, deleteUser } from "@/lib/user";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const user = await getSessionUser();

  if (!user || user.role !== "superadmin") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await req.json();

  await updateUser(Number(id), body);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const user = await getSessionUser();

  if (!user || user.role !== "superadmin") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (Number(id) === user.id) {
    return NextResponse.json(
      { error: "Tidak bisa menghapus akun sendiri" },
      { status: 400 }
    );
  }

  await deleteUser(Number(id));

  return NextResponse.json({ success: true });
}