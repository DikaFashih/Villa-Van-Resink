"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";

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

export default function UserBookingTab() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {

    return (

      <div className="rounded-xl bg-white p-8 shadow-sm">

        Memuat booking...

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h2 className="font-heading text-3xl text-[#23412D]">

          Booking Saya

        </h2>

        <p className="mt-2 text-neutral-500">

          Seluruh riwayat reservasi Anda.

        </p>

      </div>

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

            <button
              className="rounded-lg bg-[#23412D] px-5 py-2 text-white hover:bg-[#1b3323]"
            >

              Detail

            </button>

            <button
              className="flex items-center gap-2 rounded-lg border px-5 py-2 hover:bg-neutral-50"
            >

              <MessageCircle size={18} />

              Chat Admin

            </button>

          </div>

        </div>

      ))}

    </div>

  );

}