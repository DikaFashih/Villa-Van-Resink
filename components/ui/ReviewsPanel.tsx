"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import {
  getGroupedSummaries,
  getReviewsFor,
  subscribeToReviews,
  type Review,
  type TargetType,
} from "@/lib/reviews";

interface ReviewsPanelItem {
  slug: string;
  label: string;
  image: string;
}

interface Props {
  targetType: TargetType;
  title?: string;
  items: ReviewsPanelItem[];
}

export default function ReviewsPanel({ targetType, title = "Ulasan Pengunjung", items }: Props) {
  const [summaries, setSummaries] = useState(() => getGroupedSummaries(targetType));
  const [active, setActive] = useState<ReviewsPanelItem | null>(null);
  const [activeReviews, setActiveReviews] = useState<Review[]>([]);

  useEffect(() => {
    return subscribeToReviews(() => {
      setSummaries(getGroupedSummaries(targetType));
      if (active) setActiveReviews(getReviewsFor(targetType, active.slug));
    });
  }, [targetType, active]);

  if (summaries.length === 0) return null;

  const imageBySlug = new Map(items.map((i) => [i.slug, i.image]));

  const openModal = (slug: string, label: string) => {
    const image = imageBySlug.get(slug) ?? "";
    setActive({ slug, label, image });
    setActiveReviews(getReviewsFor(targetType, slug));
  };

  return (
    <div className="mt-16 rounded-[24px] border border-[#8A6E4A]/25 bg-[#FBF8F2] p-8">
      <p className="font-heading text-2xl text-[#23412D]">{title}</p>
      <p className="mt-1 text-xs text-neutral-500">Diurutkan dari rating tertinggi</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((s) => {
          const image = imageBySlug.get(s.targetSlug);
          return (
            <button
              key={s.targetSlug}
              type="button"
              onClick={() => openModal(s.targetSlug, s.targetLabel)}
              className="group flex items-center gap-4 rounded-[12px] border border-[#8A6E4A]/20 bg-white p-3 text-left transition hover:border-[#8A6E4A]/50"
            >
              {image && (
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-[8px]">
                  <Image
                    src={image}
                    alt={s.targetLabel}
                    fill
                    sizes="64px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#23412D]">{s.targetLabel}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <StarRating value={Math.round(s.averageRating)} readOnly size={13} />
                  <span className="text-xs text-neutral-500">
                    {s.averageRating.toFixed(1)} ({s.count})
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <ReviewModal
          targetType={targetType}
          targetSlug={active.slug}
          targetLabel={active.label}
          reviews={activeReviews}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}