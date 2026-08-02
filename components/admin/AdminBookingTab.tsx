"use client";

import { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus, subscribeToBookings, type BookingEntry } from "@/lib/booking";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
};

export default function AdminBookingTab() {

  const [bookings, setBookings] = useState<BookingEntry[]>(() => getAllBookings());

  useEffect(() => {
    return subscribeToBookings(() => setBookings(getAllBookings()));
  }, []);

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium text-[#23412D]">{b.userNama} — {b.paket}</p>
              <p className="text-xs text-neutral-500">{b.checkIn} s/d {b.checkOut} · {b.jumlah} orang</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${statusStyle[b.status]}`}>{b.status}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => updateBookingStatus(b.id, "confirmed")} className="rounded-md bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700">Konfirmasi</button>
            <button onClick={() => updateBookingStatus(b.id, "ditolak")} className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600">Tolak</button>
          </div>
        </div>
      ))}
      {bookings.length === 0 && <p className="text-sm text-neutral-500">Belum ada booking masuk.</p>}
    </div>
  );
}