"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { getCurrentUser, subscribeToAuth, type AuthUser } from "@/lib/auth";
import AdminPaketTab from "@/components/admin/AdminPaketTab";
import AdminPromoTab from "@/components/admin/AdminPromoTab";
import AdminBookingTab from "@/components/admin/AdminBookingTab";
import AdminQuestionTab from "@/components/admin/AdminQuestionTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";

const tabsBase = [
  { key: "paket", label: "Paket & Foto" },
  { key: "promo", label: "Promo" },
  { key: "booking", label: "Booking" },
  { key: "pertanyaan", label: "Pertanyaan" },
];

export default function AdminPage() {

  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null | undefined>(() => getCurrentUser());
  const [tab, setTab] = useState("paket");

  useEffect(() => {
  const unsubscribe = subscribeToAuth(() => {
    setUser(getCurrentUser());
  });

  return unsubscribe;
}, []);

useEffect(() => {
  if (user === undefined) return;

  if (!user || user.role === "user") {
    router.push("/login?redirect=/admin");
  }
}, [user, router]);

  if (!user) return null;

  const tabs = user.role === "superadmin"
    ? [...tabsBase, { key: "admin", label: "Kelola Admin" }]
    : tabsBase;

  return (
    <section className="min-h-screen bg-[#FBF8F2] pt-32 pb-20">
      <Container>

        <p className="text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">
          {user.role === "superadmin" ? "Super Admin" : "Admin"}
        </p>
        <h1 className="mt-2 font-heading text-4xl text-[#23412D]">Dashboard Pengelolaan</h1>
        <p className="mt-2 text-sm text-neutral-600">Masuk sebagai {user.nama}</p>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#8A6E4A]/20">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-t-lg px-4 py-2.5 text-sm transition ${
                tab === t.key
                  ? "border-b-2 border-[#23412D] font-medium text-[#23412D]"
                  : "text-neutral-500 hover:text-[#23412D]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "paket" && <AdminPaketTab />}
          {tab === "promo" && <AdminPromoTab />}
          {tab === "booking" && <AdminBookingTab />}
          {tab === "pertanyaan" && <AdminQuestionTab />}
          {tab === "admin" && user.role === "superadmin" && <AdminUsersTab />}
        </div>

      </Container>
    </section>
  );
}