"use client";

import { useState } from "react";
import { X } from "lucide-react";
import StarRating from "./StarRating";
import { addReview, type Review, type TargetType } from "@/lib/reviews";

interface Props {
  targetType: TargetType;
  targetSlug: string;
  targetLabel: string;
  reviews: Review[];
  onClose: () => void;
}

export default function ReviewModal({ targetType, targetSlug, targetLabel, reviews, onClose }: Props) {
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Mohon beri rating bintang 1 sampai 5 dulu ya.");
      return;
    }

    addReview({
      targetType,
      targetSlug,
      targetLabel,
      nama: nama.trim() || "Pengunjung",
      rating,
      komentar: komentar.trim(),
    });

    setNama("");
    setRating(0);
    setKomentar("");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[16px] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl text-[#23412D]">{targetLabel}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 transition hover:text-neutral-700"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3 rounded-lg bg-[#F7F2EA] p-4">
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            className="w-full rounded-md border border-[#8A6E4A]/25 bg-white px-3 py-2 text-sm outline-none focus:border-[#8A6E4A]/60"
          />

          <div>
            <p className="mb-1 text-xs text-neutral-500">Rating Anda</p>
            <StarRating value={rating} onChange={(v) => { setRating(v); setError(""); }} size={22} />
          </div>

          <textarea
            required
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            placeholder="Ceritakan pengalaman Anda..."
            rows={3}
            className="w-full resize-none rounded-md border border-[#8A6E4A]/25 bg-white px-3 py-2 text-sm outline-none focus:border-[#8A6E4A]/60"
          />

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-[#23412D] py-2 text-sm text-white transition hover:bg-[#1a3022]"
          >
            Kirim Ulasan
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {reviews.length === 0 && (
            <p className="text-sm text-neutral-500">Belum ada ulasan. Jadilah yang pertama!</p>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="border-t border-[#8A6E4A]/15 pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-2">
                <StarRating value={r.rating} readOnly size={14} />
                <span className="text-sm font-medium text-[#2F2B27]">{r.nama}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{r.komentar}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}