"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { getCurrentUser, logout, subscribeToAuth, type AuthUser } from "@/lib/auth";


interface Props {
  dark?: boolean;
}

export default function AuthNav({ dark = false }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- sync awal dari localStorage saat mount
  setUser(getCurrentUser());
  return subscribeToAuth(() => setUser(getCurrentUser()));
}, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className={`hidden items-center gap-1.5 text-sm uppercase tracking-[0.15em] transition-colors duration-300 lg:flex ${
          dark ? "text-[#23412D] hover:text-[#8A6E4A]" : "text-white hover:text-amber-200"
        }`}
      >
        <User size={16} strokeWidth={1.5} />
        Masuk
      </Link>
    );
  }

  const dashboardHref = user.role === "user" ? "/dashboard" : "/admin";
  const dashboardLabel = user.role === "user" ? "Dashboard Saya" : "Dashboard Admin";

  return (
    <div className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
          dark ? "text-[#23412D] hover:text-[#8A6E4A]" : "text-white hover:text-amber-200"
        }`}
      >
        <User size={16} strokeWidth={1.5} />
        {user.nama.split(" ")[0]}
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-[#8A6E4A]/20 bg-white py-2 shadow-xl">
            <Link
              href={dashboardHref}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm normal-case tracking-normal text-[#23412D] hover:bg-[#FBF8F2]"
            >
              {dashboardLabel}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm normal-case tracking-normal text-red-600 hover:bg-[#FBF8F2]"
            >
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}