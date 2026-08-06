"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";

import UserBookingTab from "./UserBookingTab";
import UserQuestionTab from "./UserQuestionTab";
import UserReviewTab from "./UserReviewTab";

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUser();
      setUser(current);
    }

    loadUser();
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

        <h1 className="mb-8 text-3xl font-bold text-[#23412D]">
          Selamat Datang, {user.nama}
        </h1>

        <div className="space-y-8">

          <UserBookingTab />

          <UserQuestionTab
  userId={String(user.id)}
  userNama={user.nama}
/>

          <UserReviewTab />

        </div>

      </div>
    </div>
  );
}


