"use client";

import { useEffect, useState } from "react";
import { getActivePromo, type ActivePromo } from "@/lib/promo";

export function usePromo() {
  const [promo, setPromo] = useState<ActivePromo | null>(null);

  useEffect(() => {
    getActivePromo().then(setPromo);
  }, []);

  return promo;
}
