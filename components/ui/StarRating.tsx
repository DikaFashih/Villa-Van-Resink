"use client";

import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function StarRating({
  value,
  onChange,
  size = 20,
  readOnly = false,
}: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          className={readOnly ? "cursor-default" : "cursor-pointer transition hover:scale-110"}
          aria-label={`${n} bintang`}
        >
          <Star
            size={size}
            strokeWidth={1.5}
            className={
              n <= value
                ? "fill-[#8A6E4A] text-[#8A6E4A]"
                : "fill-transparent text-neutral-300"
            }
          />
        </button>
      ))}
    </div>
  );
}