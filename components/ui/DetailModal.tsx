"use client";

import { X, CalendarDays, Users, Tag } from "lucide-react";

interface Booking {
  id: number;
  nama_layanan: string;
  check_in: string;
  check_out: string;
  jumlah_orang: number;
  status: string;
}

const statusLabel: Record<string, string> = {
  pending: "Menunggu Konfirmasi",
  diproses: "Sedang Diproses",
  diterima: "Diterima",
  ditolak: "Ditolak",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

function formatTanggal(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
}

export default function DetailModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#23412D]">
            Detail Booking
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <Tag size={18} className="mt-0.5 text-[#8A6E4A]" />
            <div>
              <p className="text-xs text-neutral-500">Layanan</p>
              <p className="font-medium text-[#23412D]">
                {booking.nama_layanan}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays size={18} className="mt-0.5 text-[#8A6E4A]" />
            <div>
              <p className="text-xs text-neutral-500">Check-in — Check-out</p>
              <p className="font-medium text-[#23412D]">
                {formatTanggal(booking.check_in)} —{" "}
                {formatTanggal(booking.check_out)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users size={18} className="mt-0.5 text-[#8A6E4A]" />
            <div>
              <p className="text-xs text-neutral-500">Jumlah Orang</p>
              <p className="font-medium text-[#23412D]">
                {booking.jumlah_orang} Orang
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-[#F7F2EA] p-3">
            <p className="text-xs text-neutral-500">Status</p>
            <p className="font-medium text-[#23412D]">
              {statusLabel[booking.status] ?? booking.status}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#23412D] py-2.5 text-white hover:bg-[#1a3022]"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
