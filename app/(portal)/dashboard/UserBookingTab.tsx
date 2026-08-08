"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle, Plus } from "lucide-react";

interface Booking {
  id: number;
  nama_layanan: string;
  check_in: string;
  check_out: string;
  jumlah_orang: number;
  status:
    | "pending"
    | "diproses"
    | "diterima"
    | "ditolak"
    | "selesai"
    | "dibatalkan";
}

const badge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  diproses: "bg-blue-100 text-blue-700",
  diterima: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
  selesai: "bg-emerald-100 text-emerald-700",
  dibatalkan: "bg-gray-100 text-gray-700",
};

const paketOptions = [
  { id: 1, nama: "Paket Wisata Harian" },
  { id: 2, nama: "Paket Menginap" },
  { id: 3, nama: "Paket Wedding & Event" },
  { id: 4, nama: "Paket Study Tour" },
];

export default function UserBookingTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [layananId, setLayananId] = useState(paketOptions[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);

  async function loadBookings() {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      if (data.ok) {
        setBookings(data.bookings);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!checkIn || !checkOut) {
      setFormError("Tanggal check-in dan check-out wajib diisi.");
      return;
    }

    if (checkOut <= checkIn) {
      setFormError("Tanggal check-out harus setelah check-in.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          layanan_id: layananId,
          check_in: checkIn,
          check_out: checkOut,
          jumlah_orang: jumlahOrang,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setFormError(data.error || "Gagal membuat booking.");
        return;
      }

      setShowForm(false);
      setCheckIn("");
      setCheckOut("");
      setJumlahOrang(1);
      setLoading(true);
      await loadBookings();
    } catch {
      setFormError("Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">Memuat booking...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl text-[#23412D]">Booking Saya</h2>
          <p className="mt-2 text-neutral-500">
            Seluruh riwayat reservasi Anda.
          </p>
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-lg bg-[#23412D] px-5 py-2 text-white hover:bg-[#1b3323]"
        >
          <Plus size={18} />
          {showForm ? "Batal" : "Buat Booking Baru"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-6 shadow-sm border border-neutral-200"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Pilih Paket
            </label>
            <select
              value={layananId}
              onChange={(e) => setLayananId(Number(e.target.value))}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            >
              {paketOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Jumlah Orang
            </label>
            <input
              type="number"
              min={1}
              value={jumlahOrang}
              onChange={(e) => setJumlahOrang(Number(e.target.value))}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#23412D] px-5 py-2 text-white hover:bg-[#1b3323] disabled:opacity-50"
          >
            {submitting ? "Mengirim..." : "Ajukan Booking"}
          </button>
        </form>
      )}

      {bookings.length === 0 && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Belum ada booking.
        </div>
      )}

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#23412D]">
                {booking.nama_layanan}
              </h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                <CalendarDays size={16} />
                {booking.check_in}
                {" - "}
                {booking.check_out}
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {booking.jumlah_orang} Orang
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${badge[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="rounded-lg bg-[#23412D] px-5 py-2 text-white hover:bg-[#1b3323]">
              Detail
            </button>
            <button className="flex items-center gap-2 rounded-lg border px-5 py-2 hover:bg-neutral-50">
              <MessageCircle size={18} />
              Chat Admin
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
