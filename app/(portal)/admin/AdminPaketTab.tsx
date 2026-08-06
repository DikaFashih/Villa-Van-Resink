"use client";

import { useState } from "react";
import {
  CalendarDays,
  Package,
  MessageCircle,
  Star,
  Users,
  LayoutDashboard,
} from "lucide-react";

import DashboardShell from "./DashboardShell";

import AdminBookingTab from "./AdminBookingTab";
import AdminPaketTab from "./AdminPaketTab";
import AdminReviewsTab from "./AdminReviewsTab";
import AdminQuestionTab from "./AdminQuestionTab";
import AdminUsersTab from "./AdminUsersTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  function renderContent() {
    switch (activeTab) {
      case "booking":
        return <AdminBookingTab />;

      case "paket":
        return <AdminPaketTab />;

      case "review":
        return <AdminReviewsTab />;

      case "pertanyaan":
        return <AdminQuestionTab />;

      case "admin":
        return <AdminUsersTab />;

      default:
        return (
          <div className="space-y-8">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">
                  Total Booking
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[#23412D]">
                  --
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">
                  Pending
                </p>

                <h2 className="mt-3 text-4xl font-bold text-amber-600">
                  --
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">
                  Review
                </p>

                <h2 className="mt-3 text-4xl font-bold text-green-600">
                  --
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-500">
                  User
                </p>

                <h2 className="mt-3 text-4xl font-bold text-blue-600">
                  --
                </h2>
              </div>

            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-semibold text-[#23412D]">

                Dashboard Admin

              </h2>

              <p className="mt-3 text-neutral-500">

                Selamat datang di Dashboard Admin Villa Van Resink.

              </p>

              <div className="mt-8 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-500">

                Statistik realtime akan otomatis muncul setelah seluruh API
                Booking, Review, User dan Pertanyaan selesai dihubungkan ke
                MySQL.

              </div>

            </div>

          </div>
        );
    }
  }

  return (
    <DashboardShell
      portalLabel="Villa Van Resink"
      roleLabel="Administrator"
      userName="Administrator"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={() => {
        window.location.href = "/";
      }}
      navItems={[
        {
          key: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
          key: "booking",
          label: "Booking",
          icon: CalendarDays,
        },
        {
          key: "paket",
          label: "Paket",
          icon: Package,
        },
        {
          key: "review",
          label: "Review",
          icon: Star,
        },
        {
          key: "pertanyaan",
          label: "Pertanyaan",
          icon: MessageCircle,
        },
        {
          key: "admin",
          label: "Admin",
          icon: Users,
        },
      ]}
    >
      {renderContent()}
    </DashboardShell>
  );
}