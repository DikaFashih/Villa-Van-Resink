"use client";

import { useEffect, useState } from "react";
import { X, Tag, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAllPromo, subscribeToPromo, type Promo } from "@/lib/promo";
import { getPaketBySlug } from "@/lib/paket";

type PromoStatus = "aktif" | "segera";

function getPromoStatus(promo: Promo): PromoStatus | null {
  if (!promo.aktif) return null;
  const now = new Date();
  const mulai = new Date(promo.tanggalMulai);
  const selesai = new Date(promo.tanggalSelesai);
  selesai.setHours(23, 59, 59, 999);

  if (now >= mulai && now <= selesai) return "aktif";

  const satuHariSebelum = new Date(mulai);
  satuHariSebelum.setDate(satuHariSebelum.getDate() - 1);
  satuHariSebelum.setHours(0, 0, 0, 0);
  if (now >= satuHariSebelum && now < mulai) return "segera";

  return null;
}

export default function PromoPopup() {
  const [promos, setPromos] = useState<{ promo: Promo; status: PromoStatus }[]>(
    [],
  );
  const [paketNamaMap, setPaketNamaMap] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadPromo = async () => {
      const all = await getAllPromo();
      const visible: { promo: Promo; status: PromoStatus }[] = [];
      for (const p of all) {
        const status = getPromoStatus(p);
        if (status) visible.push({ promo: p, status });
      }
      visible.sort(
        (a, b) =>
          (a.status === "aktif" ? -1 : 1) - (b.status === "aktif" ? -1 : 1),
      );
      const limited = visible.slice(0, 3);
      setPromos(limited);

      const map: Record<string, string> = {};
      limited.forEach(({ promo }) => {
        const paket = getPaketBySlug(promo.paketSlug);
        map[promo.paketSlug] = paket ? paket.nama : promo.paketSlug;
      });
      setPaketNamaMap(map);
    };
    loadPromo();
    return subscribeToPromo(loadPromo);
  }, []);

  useEffect(() => {
    if (promos.length === 0) return;
    const ids = promos.map((p) => p.promo.id).join(",");
    const dismissedIds = sessionStorage.getItem("vvr_promo_dismissed");
    if (dismissedIds !== ids) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [promos]);

  const handleClose = () => {
    const ids = promos.map((p) => p.promo.id).join(",");
    sessionStorage.setItem("vvr_promo_dismissed", ids);
    setOpen(false);
  };

  const goPrev = () => setIndex((i) => (i === 0 ? promos.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === promos.length - 1 ? 0 : i + 1));

  if (promos.length === 0) return null;
  const { promo, status } = promos[index];
  const paketNama = paketNamaMap[promo.paketSlug] ?? promo.paketSlug;
  const isSegera = status === "segera";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-[#F7F3EC] p-10 shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 rounded-full p-1.5 text-[#23412D]/60 hover:bg-[#23412D]/10 hover:text-[#23412D]"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            {promos.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#23412D] shadow hover:bg-white"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#23412D] shadow hover:bg-white"
                  aria-label="Berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div
              className={`mb-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-white ${isSegera ? "bg-[#B08D57]" : "bg-[#23412D]"}`}
            >
              {isSegera ? <Clock size={13} /> : <Tag size={13} />}
              {isSegera ? "Segera Hadir" : "Promo Spesial"}
            </div>

            <h3 className="mb-3 text-3xl font-serif text-[#23412D]">
              {promo.judul}
            </h3>

            <p className="mb-1 text-sm text-[#23412D]/70">Untuk {paketNama}</p>

            <p className="mb-5 text-sm leading-relaxed text-[#23412D]/80">
              {promo.deskripsi}
            </p>

            <div className="mb-7 flex items-baseline gap-2">
              <span className="text-5xl font-serif text-[#B08D57]">
                {promo.diskonPersen}%
              </span>
              <span className="text-sm text-[#23412D]/60">diskon</span>
            </div>

            <a
              href="/paket"
              className="block w-full rounded-full bg-[#23412D] py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#1a3222]"
            >
              Lihat Paket
            </a>

            <p className="mt-4 text-center text-xs text-[#23412D]/50">
              {isSegera
                ? `Mulai besok, ${promo.tanggalMulai}`
                : `Berlaku ${promo.tanggalMulai} s/d ${promo.tanggalSelesai}`}
            </p>

            {promos.length > 1 && (
              <div className="mt-5 flex justify-center gap-2">
                {promos.map((p, i) => (
                  <button
                    key={p.promo.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Promo ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[#23412D]" : "w-2 bg-[#23412D]/30"}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
