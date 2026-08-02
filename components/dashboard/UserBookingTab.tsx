"use client";

import { useEffect, useState } from "react";
import { addBooking, getBookingsForUser, subscribeToBookings, type BookingEntry } from "@/lib/booking";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
};

const paketOptions = ["Paket Wisata Harian", "Paket Menginap", "Paket Wedding & Event", "Paket Study Tour"];

export default function UserBookingTab({ userId, userNama }: { userId: string; userNama: string }) {
  const [bookings, setBookings] = useState<BookingEntry[]>(() => getBookingsForUser(userId));
  const [form, setForm] = useState({ paket: paketOptions[0], checkIn: "", checkOut: "", jumlah: "" });

  useEffect(() => {
    return subscribeToBookings(() => setBookings(getBookingsForUser(userId)));
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      userId,
      userNama,
      paket: form.paket,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      jumlah: Number(form.jumlah) || 1,
    });
    setForm({ paket: paketOptions[0], checkIn: "", checkOut: "", jumlah: "" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="h-fit rounded-lg border border-[#8A6E4A]/20 bg-white p-6 space-y-4">
        <p className="font-heading text-lg text-[#23412D]">Buat Reservasi Baru</p>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Paket</label>
          <select
            value={form.paket}
            onChange={(e) => setForm({ ...form, paket: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm outline-none"
          >
            {paketOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Check-in</label>
            <input
              required
              type="date"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              className="mt-2 w-full rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Check-out</label>
            <input
              required
              type="date"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              className="mt-2 w-full rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Jumlah Orang</label>
          <input
            required
            type="number"
            min={1}
            max={40}
            value={form.jumlah}
            onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm outline-none"
          />
        </div>

        <button type="submit" className="w-full rounded-lg bg-[#23412D] py-3 text-sm text-white hover:bg-[#1a3022]">
          Kirim Permintaan Booking
        </button>
      </form>

      <div>
        <p className="font-heading text-lg text-[#23412D]">Riwayat Booking Saya</p>
        <div className="mt-4 space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#23412D]">{b.paket}</p>
                <span className={`rounded-full px-3 py-1 text-xs ${statusStyle[b.status]}`}>{b.status}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {b.checkIn} s/d {b.checkOut} · {b.jumlah} orang
              </p>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-sm text-neutral-500">Belum ada reservasi.</p>}
        </div>
      </div>
    </div>
  );
}