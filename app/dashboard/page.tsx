"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, MessageSquare, Star } from "lucide-react";
import { getCurrentUser, logout, subscribeToAuth, type AuthUser } from "@/lib/auth";
import DashboardShell from "@/components/admin/DashboardShell";
import UserBookingTab from "@/components/dashboard/UserBookingTab";
import UserQuestionTab from "@/components/dashboard/UserQuestionTab";
import UserReviewTab from "@/components/dashboard/UserReviewTab";

const navItems = [
  { key: "booking", label: "Booking / Reservasi", icon: CalendarCheck },
  { key: "tanya", label: "Tanya Admin", icon: MessageSquare },
  { key: "ulasan", label: "Beri Ulasan", icon: Star },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null | undefined>(() => getCurrentUser());
  const [tab, setTab] = useState("booking");

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/dashboard");
    }

    return subscribeToAuth(() => {
      const next = getCurrentUser();
      setUser(next);
      if (!next) {
        router.push("/login?redirect=/dashboard");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 'user' sengaja tidak masuk deps, dicek lewat closure saat effect jalan
  }, [router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DashboardShell
      portalLabel="Villa Van Resink"
      roleLabel="Tamu"
      navItems={navItems}
      activeTab={tab}
      onTabChange={setTab}
      userName={user.nama}
      onLogout={handleLogout}
    >
      {tab === "booking" && <UserBookingTab userId={user.id} userNama={user.nama} />}
      {tab === "tanya" && <UserQuestionTab userId={user.id} userNama={user.nama} />}
      {tab === "ulasan" && <UserReviewTab userNama={user.nama} />}
    </DashboardShell>
  );
}