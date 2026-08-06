"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type BookingStatus =
  | "pending"
  | "diproses"
  | "diterima"
  | "ditolak"
  | "selesai"
  | "dibatalkan";

interface Booking {
  id: number;
  nama_user: string;
  nama_layanan: string;
  check_in: string;
  check_out: string;
  jumlah_orang: number;
  status: BookingStatus;
}

const STATUS: BookingStatus[] = [
  "pending",
  "diproses",
  "diterima",
  "ditolak",
  "selesai",
  "dibatalkan",
];

const badge: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  diproses: "bg-blue-100 text-blue-700",
  diterima: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
  selesai: "bg-emerald-100 text-emerald-700",
  dibatalkan: "bg-neutral-200 text-neutral-700",
};

export default function AdminBookingTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      if (data.ok) setBookings(data.bookings);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function changeStatus(id: number, status: BookingStatus) {
    await fetch(`/api/booking/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadBookings();
  }

  async function removeBooking(id: number) {
    if (!confirm("Hapus booking ini?")) return;

    await fetch(`/api/booking/${id}`, {
      method: "DELETE",
    });

    await loadBookings();
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        Memuat booking...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-[#23412D]">
        Manajemen Booking
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-3 text-left">User</th>
              <th className="px-3 py-3 text-left">Layanan</th>
              <th className="px-3 py-3 text-left">Check In</th>
              <th className="px-3 py-3 text-left">Check Out</th>
              <th className="px-3 py-3 text-center">Orang</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="px-3 py-4">{b.nama_user}</td>
                <td className="px-3 py-4">{b.nama_layanan}</td>
                <td className="px-3 py-4">{b.check_in}</td>
                <td className="px-3 py-4">{b.check_out}</td>
                <td className="px-3 py-4 text-center">{b.jumlah_orang}</td>
                <td className="px-3 py-4 text-center">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      changeStatus(
                        b.id,
                        e.target.value as BookingStatus
                      )
                    }
                    className={`rounded-md px-2 py-1 ${badge[b.status]}`}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => removeBooking(b.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="py-6 text-center text-neutral-500">
            Belum ada booking.
          </p>
        )}
      </div>
    </div>
  );
}