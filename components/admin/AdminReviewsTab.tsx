"use client";

import { useEffect, useState } from "react";
import { Trash2, Star } from "lucide-react";
import { getAllRawReviews, removeReview, subscribeToReviews, type Review } from "@/lib/reviews";

export default function AdminReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>(() => getAllRawReviews());

  useEffect(() => {
    return subscribeToReviews(() => setReviews(getAllRawReviews()));
  }, []);

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="flex items-start justify-between gap-4 rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#23412D]">{r.nama}</span>
              <span className="text-xs uppercase tracking-wide text-[#8A6E4A]">· {r.targetType} · {r.targetLabel}</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={13} className={n <= r.rating ? "fill-[#8A6E4A] text-[#8A6E4A]" : "text-neutral-300"} />
              ))}
            </div>
            <p className="mt-2 text-sm text-neutral-600">{r.komentar}</p>
          </div>
          <button onClick={() => removeReview(r.id)} className="shrink-0 text-red-500 hover:text-red-700" title="Hapus ulasan">
            <Trash2 size={17} />
          </button>
        </div>
      ))}
      {reviews.length === 0 && <p className="text-sm text-neutral-500">Belum ada ulasan.</p>}
    </div>
  );
}