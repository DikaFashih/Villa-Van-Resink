"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPromoPopupList, type PromoPopupItem } from "@/lib/promo";

export default function PromoPopup() {
  const router = useRouter();
  const pathname = usePathname();

  const [promos, setPromos] = useState<PromoPopupItem[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (pathname === "/") {
      async function loadPromo() {
        const data = await getPromoPopupList();
        if (isMounted && data.length > 0) {
          setPromos(data);
          setIndex(0);
          setOpen(true);
        }
      }
      loadPromo();
    }

    return () => {
      isMounted = false;
      setOpen(false);
    };
  }, [pathname]);

  if (pathname !== "/" || promos.length === 0 || !open) return null;

  const promo = promos[index];
  const isFirst = index === 0;
  const isLast = index === promos.length - 1;

  function goPrev() {
    setIndex((i) => (i === 0 ? i : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === promos.length - 1 ? i : i + 1));
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        
        {promos.length > 1 && !isFirst && (
          <button
            onClick={goPrev}
            aria-label="Promo sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#23412D] transition hover:bg-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        {promos.length > 1 && !isLast && (
          <button
            onClick={goNext}
            aria-label="Promo berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#23412D] transition hover:bg-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        <h2 className="text-3xl font-bold text-[#23412D]">🎉 PROMO SPESIAL</h2>

        {promo.status === "besok" && (
          <span className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            Dimulai besok
          </span>
        )}

        <h3 className="mt-4 text-2xl font-semibold text-[#23412D]">
          {promo.judul}
        </h3>

        <p className="mt-5 text-gray-700">
          Diskon <strong>{promo.diskon}%</strong> untuk {promo.deskripsi}
        </p>

        {promo.status === "aktif" ? (
          <>
            <p className="mt-5 text-sm text-gray-500">Berlaku sampai</p>
            <p className="font-semibold text-[#23412D]">{promo.tanggalSelesai}</p>
          </>
        ) : (
          <>
            <p className="mt-5 text-sm text-gray-500">Mulai berlaku</p>
            <p className="font-semibold text-[#23412D]">{promo.tanggalMulai}</p>
          </>
        )}

        {promos.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Lihat promo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#23412D]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

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