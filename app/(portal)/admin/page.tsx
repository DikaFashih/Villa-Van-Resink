"use client";

import { useState } from "react";
import {
  CalendarDays,
  Package,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";

import DashboardShell from "./DashboardShell";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("booking");

  return (
    <DashboardShell
      portalLabel="Villa Van Resink"
      roleLabel="Admin"
      userName="Administrator"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={() => {
        window.location.href = "/";
      }}
      navItems={[
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
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#23412D]">
          Dashboard Admin
        </h2>

        <p className="mt-3 text-neutral-600">
          Dashboard sedang dalam proses migrasi ke MySQL.
        </p>
      </div>
    </DashboardShell>
  );
}
