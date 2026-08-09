"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";

import UserBookingTab from "./UserBookingTab";
import UserQuestionTab from "./UserQuestionTab";
import UserReviewTab from "./UserReviewTab";

const IDLE_LIMIT_MS = 10 * 60 * 1000; // 10 menit

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUser();
      setUser(current);
    }

    loadUser();
  }, []);

  useEffect(() => {
    function resetIdleTimer() {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        handleLogout();
      }, IDLE_LIMIT_MS);
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer),
      );
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Memuat dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <h1 className="mb-8 text-3xl font-bold text-[#23412D]">
          Selamat Datang, {user.nama}
        </h1>

        <div className="space-y-8">
          <UserBookingTab />

          <UserQuestionTab userId={String(user.id)} userNama={user.nama} />

          <UserReviewTab />
        </div>
      </div>
    </div>
  );
}
