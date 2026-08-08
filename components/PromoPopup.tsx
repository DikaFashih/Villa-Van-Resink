"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getActivePromo, type ActivePromo } from "@/lib/promo";

export default function PromoPopup() {
  const router = useRouter();
  const pathname = usePathname();

  const [promo, setPromo] = useState<ActivePromo | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Hanya panggil API dan buka popup jika pengguna sedang di halaman utama (/)
    if (pathname === "/") {
      async function loadPromo() {
        const data = await getActivePromo();
        if (data && isMounted) {
          setPromo(data);
          setOpen(true);
        }
      }

      loadPromo();
    }

    // Cleanup: Reset status popup saat pengguna pindah ke halaman lain
    return () => {
      isMounted = false;
      setOpen(false);
    };
  }, [pathname]);

  // Jika bukan di halaman home, atau tidak ada promo, atau status open false, sembunyikan!
  if (pathname !== "/" || !promo || !open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-[#23412D]">🎉 PROMO SPESIAL</h2>

        <h3 className="mt-6 text-2xl font-semibold text-[#23412D]">
          {promo.judul}
        </h3>

        <p className="mt-5 text-gray-700">
          Diskon <strong>{promo.diskon}%</strong> untuk {promo.deskripsi}
        </p>

        <p className="mt-5 text-sm text-gray-500">Berlaku sampai</p>

        <p className="font-semibold text-[#23412D]">{promo.tanggalSelesai}</p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/paket");
            }}
            className="flex-1 rounded-xl bg-[#23412D] py-3 text-white transition hover:bg-[#1A3022]"
          >
            Lihat Paket
          </button>

          <button
            onClick={() => setOpen(false)}
            className="flex-1 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
