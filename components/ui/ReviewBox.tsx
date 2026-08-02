"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import {
  getReviewsFor,
  subscribeToReviews,
  type Review,
  type TargetType,
} from "@/lib/reviews";

interface Props {
  targetType: TargetType;
  targetSlug: string;
  targetLabel: string;
}

export default function ReviewBox({ targetType, targetSlug, targetLabel }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync awal dari localStorage saat mount, disengaja
    setReviews(getReviewsFor(targetType, targetSlug));
    return subscribeToReviews(() => {
        setReviews(getReviewsFor(targetType, targetSlug));
    });
    }, [targetType, targetSlug]);

  const average = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-5 border-t border-[#8A6E4A]/15 pt-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 text-left"
        >
          <StarRating value={Math.round(average)} readOnly size={16} />
          <span className="text-xs text-neutral-500">
            {reviews.length > 0
              ? `${average.toFixed(1)} (${reviews.length} ulasan)`
              : "Belum ada ulasan"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#8A6E4A] hover:text-[#6b552f]"
        >
          <MessageSquarePlus size={14} strokeWidth={1.5} />
          Ulas
        </button>
      </div>

      {modalOpen && (
        <ReviewModal
          targetType={targetType}
          targetSlug={targetSlug}
          targetLabel={targetLabel}
          reviews={reviews}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}