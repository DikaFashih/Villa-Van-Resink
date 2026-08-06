"use client";

import { useEffect, useState } from "react";

import StarRating from "./StarRating";

import {
  getReviewsFor,

  type Review,

} from "@/lib/reviews";

interface Props {
  layananId: number;
  
  targetLabel: string;
}

export default function ReviewBox({ layananId, targetLabel }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
  async function load() {
    const data = await getReviewsFor(layananId);
    setReviews(data);
  }

  load();
}, [layananId]);

  const average = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-5 border-t border-[#8A6E4A]/15 pt-5">
      <div className="flex items-center justify-between gap-3">
        

        
      </div>

      
    </div>
  );
}










