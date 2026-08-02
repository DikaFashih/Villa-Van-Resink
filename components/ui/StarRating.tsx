"use client";

import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function StarRating({ value, onChange, size = 22, readOnly = false }: Props) {
  const stars = [1, 2, 3, 4, 5];

  if (readOnly) {
    return (
      <div className="flex items-center gap-1">
        {stars.map((s) => {
          const filled = s <= Math.round(value);
          return (
            <span key={s} aria-hidden="true">
              <Star
                size={size}
                strokeWidth={1.5}
                className={filled ? "fill-[#8A6E4A] text-[#8A6E4A]" : "fill-transparent text-[#8A6E4A]/40"}
              />
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => {
        const filled = s <= Math.round(value);
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange?.(s)}
            className="cursor-pointer transition hover:scale-110"
            aria-label={`Beri rating ${s} bintang`}
          >
            <Star
              size={size}
              strokeWidth={1.5}
              className={filled ? "fill-[#8A6E4A] text-[#8A6E4A]" : "fill-transparent text-[#8A6E4A]/40"}
            />
          </button>
        );
      })}
    </div>
  );
}