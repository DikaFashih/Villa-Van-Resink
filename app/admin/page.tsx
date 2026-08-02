"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Tag, CalendarCheck, MessageSquare, Star, ShieldAlert } from "lucide-react";
import { getCurrentUser, logout, subscribeToAuth, type AuthUser } from "@/lib/auth";
import { getAllQuestions, subscribeToQuestions } from "@/lib/question";
import DashboardShell from "@/components/admin/DashboardShell";
import AdminPaketTab from "@/components/admin/AdminPaketTab";
import AdminPromoTab from "@/components/admin/AdminPromoTab";
import AdminBookingTab from "@/components/admin/AdminBookingTab";
import AdminQuestionTab from "@/components/admin/AdminQuestionTab";
import AdminReviewsTab from "@/components/admin/AdminReviewsTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null | undefined>(() => getCurrentUser());
  const [tab, setTab] = useState("paket");
  const [belumDijawab, setBelumDijawab] = useState(
    () => getAllQuestions().filter((q) => !q.jawaban).length
  );

  useEffect(() => {
    if (!user || user.role === "user") {
      router.push("/login?redirect=/admin");
    }

    return subscribeToAuth(() => {
      const next = getCurrentUser();
      setUser(next);
      if (!next || next.role === "user") {
        router.push("/login?redirect=/admin");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 'user' sengaja tidak masuk deps, dicek lewat closure saat effect jalan
  }, [router]);

  useEffect(() => {
    return subscribeToQuestions(() => {
      setBelumDijawab(getAllQuestions().filter((q) => !q.jawaban).length);
    });
  }, []);

  if (!user) return null;

  const navBase = [
    { key: "paket", label: "Paket & Foto", icon: Package },
    { key: "promo", label: "Promo", icon: Tag },
    { key: "booking", label: "Jadwal Booking", icon: CalendarCheck },
    { key: "pertanyaan", label: "Balas Pertanyaan", icon: MessageSquare, badge: belumDijawab },
    { key: "ulasan", label: "Kelola Ulasan", icon: Star },
  ];

  const navItems =
    user.role === "superadmin"
      ? [...navBase, { key: "admin", label: "Kelola Admin", icon: ShieldAlert }]
      : navBase;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DashboardShell
      portalLabel="Villa Van Resink"
      roleLabel={user.role === "superadmin" ? "Super Admin" : "Admin"}
      navItems={navItems}
      activeTab={tab}
      onTabChange={setTab}
      userName={user.nama}
      onLogout={handleLogout}
    >
      {tab === "paket" && <AdminPaketTab />}
      {tab === "promo" && <AdminPromoTab />}
      {tab === "booking" && <AdminBookingTab />}
      {tab === "pertanyaan" && <AdminQuestionTab />}
      {tab === "ulasan" && <AdminReviewsTab />}
      {tab === "admin" && user.role === "superadmin" && <AdminUsersTab />}
    </DashboardShell>
  );
}