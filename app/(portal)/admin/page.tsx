"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Package,
  MessageCircle,
  Star,
  Users,
  LayoutDashboard,
  Tag,
} from "lucide-react";

import DashboardShell from "./DashboardShell";
import AdminBookingTab from "./AdminBookingTab";
import AdminPaketTab from "./AdminPaketTab";
import AdminPromoTab from "./AdminPromoTab";
import AdminReviewsTab from "./AdminReviewsTab";
import AdminQuestionTab from "./AdminQuestionTab";
import AdminUsersTab from "./AdminUsersTab";

import { getCurrentUser, logout, type AuthUser } from "@/lib/auth";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<AuthUser | null>(null);

  const [summary, setSummary] = useState({
    paket: 0,
    review: 0,
    promo: 0,
    pertanyaan: 0,
  });

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUser();
      setUser(current);
    }
    loadUser();
  }, []);

  useEffect(() => {
    async function loadSummary() {
      try {
        const [layananRes, reviewRes, promoRes, questionRes] = await Promise.all([
          fetch("/api/layanan"),
          fetch("/api/reviews"),
          fetch("/api/promo"),
          fetch("/api/question"),
        ]);

        const layanan = await layananRes.json();
        const review = await reviewRes.json();
        const promo = await promoRes.json();
        const question = await questionRes.json();

        setSummary({
          paket: Array.isArray(layanan) ? layanan.length : 0,
          review: Array.isArray(review) ? review.length : 0,
          promo: Array.isArray(promo) ? promo.filter((p: any) => p.aktif).length : 0,
          pertanyaan: Array.isArray(question) ? question.length : 0,
        });
      } catch {
        // biarkan default 0 kalau gagal
      }
    }

    if (activeTab === "dashboard") {
      loadSummary();
    }
  }, [activeTab]);

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "booking", label: "Booking", icon: CalendarDays },
    { key: "paket", label: "Paket", icon: Package },
    { key: "promo", label: "Promo", icon: Tag },
    { key: "review", label: "Review", icon: Star },
    { key: "pertanyaan", label: "Pertanyaan", icon: MessageCircle },
  ];

  if (user?.role === "superadmin") {
    navItems.push({ key: "admin", label: "Admin", icon: Users });
  }

  function renderContent() {
    switch (activeTab) {
      case "booking":
        return <AdminBookingTab />;
      case "paket":
        return <AdminPaketTab />;
      case "promo":
        return <AdminPromoTab />;
      case "review":
        return <AdminReviewsTab />;
      case "pertanyaan":
        return <AdminQuestionTab />;
      case "admin":
        return <AdminUsersTab />;
      default:
        return (
          <div className="space-y-8">
            <h2 className="font-heading text-2xl text-[#23412D]">Ringkasan Sistem</h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">Total Wahana/Paket</p>
                <h2 className="mt-3 text-4xl font-bold text-[#23412D]">{summary.paket}</h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">Ulasan Pengunjung</p>
                <h2 className="mt-3 text-4xl font-bold text-amber-600">{summary.review}</h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">Promo Aktif</p>
                <h2 className="mt-3 text-4xl font-bold text-green-600">{summary.promo}</h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">Pesan / Pertanyaan</p>
                <h2 className="mt-3 text-4xl font-bold text-blue-600">{summary.pertanyaan}</h2>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <DashboardShell
      portalLabel="Villa Van Resink"
      roleLabel={user?.role === "superadmin" ? "Superadmin" : "Admin"}
      userName={user?.nama ?? "Memuat..."}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={async () => {
        await logout();
      }}
      navItems={navItems}
    >
      {renderContent()}
    </DashboardShell>
  );
}
