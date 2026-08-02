"use client";

import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import { addReview, type TargetType } from "@/lib/reviews";

const targets: { type: TargetType; slug: string; label: string }[] = [
  { type: "paket", slug: "wisata-harian", label: "Paket Wisata Harian" },
  { type: "paket", slug: "menginap", label: "Paket Menginap" },
  { type: "paket", slug: "wedding-event", label: "Paket Wedding & Event" },
  { type: "paket", slug: "study-tour", label: "Paket Study Tour" },
  { type: "wahana", slug: "camping-ground", label: "Wahana: Camping Ground" },
  { type: "wahana", slug: "flying-fox", label: "Wahana: Flying Fox" },
  { type: "wahana", slug: "green-house", label: "Wahana: Green House" },
  { type: "wahana", slug: "tamiya-mountain-coaster", label: "Wahana: Tamiya Mountain Coaster" },
  { type: "wahana", slug: "panahan", label: "Wahana: Panahan" },
  { type: "edukasi", slug: "ecoprint", label: "Edukasi: Ecoprint" },
  { type: "edukasi", slug: "heritage-sejarah-kolonial", label: "Edukasi: Heritage & Sejarah Kolonial" },
  { type: "edukasi", slug: "study-tour-sekolah", label: "Edukasi: Study Tour Sekolah" },
];

export default function UserReviewTab({ userNama }: { userNama: string }) {

  const [pilihan, setPilihan] = useState(0);
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Mohon beri rating bintang 1 sampai 5 dulu ya.");
      setSukses(false);
      return;
    }

    const target = targets[pilihan];

    addReview({
      targetType: target.type,
      targetSlug: target.slug,
      targetLabel: target.label,
      nama: userNama,
      rating,
      komentar: komentar.trim(),
    });

    setRating(0);
    setKomentar("");
    setError("");
    setSukses(true);
  };

  return (
    <div className="max-w-xl rounded-lg border border-[#8A6E4A]/20 bg-white p-6">

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Yang Diulas</label>
          <select
            value={pilihan}
            onChange={(e) => { setPilihan(Number(e.target.value)); setSukses(false); }}
            className="mt-2 w-full rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm text-[#23412D] outline-none focus:border-[#8A6E4A]"
          >
            {targets.map((t, i) => (
              <option key={`${t.type}-${t.slug}`} value={i}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Rating Anda</label>
          <div className="mt-2">
            <StarRating value={rating} onChange={(v) => { setRating(v); setError(""); }} size={26} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-[#8A6E4A]">Ulasan</label>
          <textarea
            required
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            rows={4}
            placeholder="Ceritakan pengalaman Anda..."
            className="mt-2 w-full resize-none rounded-lg border border-[#8A6E4A]/30 px-4 py-3 text-sm text-[#23412D] outline-none focus:border-[#8A6E4A]"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {sukses && <p className="text-sm text-[#23412D]">Terima kasih! Ulasan Anda sudah tersimpan.</p>}

        <button type="submit" className="w-full rounded-lg bg-[#23412D] py-3 text-sm text-white hover:bg-[#1a3022]">
          Kirim Ulasan
        </button>

      </form>

    </div>
  );
}