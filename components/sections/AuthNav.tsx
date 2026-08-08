"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCurrentUser,
  logout,
  subscribeToAuth,
  type AuthUser,
} from "@/lib/auth";

export default function AuthNav() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      setUser(await getCurrentUser());
    }

    loadUser();

    return subscribeToAuth(loadUser);
  }, []);

  async function handleLogout() {
    await logout();
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white">
        {user.nama}
      </span>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-red-500 px-5 py-2 text-sm text-red-500 transition hover:bg-red-600 hover:text-white"
      >
        Logout
      </button>
    </div>
  );
}
