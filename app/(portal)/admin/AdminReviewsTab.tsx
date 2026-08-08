"use client";

import { useEffect, useState } from "react";
import { Trash2, Star, Check, X } from "lucide-react";

interface Review {
  id: number;
  bookingId: number;
  userId: number;
  nama: string;
  layananId: number;
  layananNama: string;
  layananSlug: string;
  rating: number;
  komentar: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const statusStyle: Record<Review["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-neutral-200 text-neutral-500",
};

const statusLabel: Record<Review["status"], string> = {
  pending: "Menunggu",
  approved: "Tayang",
  rejected: "Ditolak",
};

export default function AdminReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<Review["status"] | "all">("pending");

  async function load() {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: number, status: Review["status"]) {
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus ulasan ini secara permanen?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    await load();
  }

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[#23412D]">Daftar Ulasan Pengunjung</h2>

        <div className="flex flex-wrap gap-2">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                filter === f ? "bg-[#23412D] text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {f === "all" ? "Semua" : statusLabel[f]}
              {f === "pending" && pendingCount > 0 && ` (${pendingCount})`}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-3 py-3">User</th>
              <th className="px-3 py-3">Target (Wahana)</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Komentar</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b align-top">
                <td className="px-3 py-4">
                  <p className="font-medium text-[#23412D]">{r.nama}</p>
                  <p className="text-xs text-neutral-400">
                    {new Date(r.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </td>
                <td className="px-3 py-4 text-neutral-600">{r.layananNama}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={14}
                        className={n <= r.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-3 py-4 italic text-neutral-600">&quot;{r.komentar}&quot;</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs ${statusStyle[r.status]}`}>
                    {statusLabel[r.status]}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center gap-2">
                    {r.status !== "approved" && (
                      <button onClick={() => setStatus(r.id, "approved")} title="Setujui" className="rounded-md bg-green-600 p-1.5 text-white hover:bg-green-700">
                        <Check size={14} />
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button onClick={() => setStatus(r.id, "rejected")} title="Tolak" className="rounded-md bg-neutral-300 p-1.5 text-neutral-700 hover:bg-neutral-400">
                        <X size={14} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(r.id)} title="Hapus permanen" className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="py-6 text-center text-neutral-500">Tidak ada ulasan di kategori ini.</p>
        )}
      </div>
    </div>
  );
}