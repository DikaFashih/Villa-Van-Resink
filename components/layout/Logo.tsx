"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/"
      className={`font-heading text-2xl transition ${
        scrolled ? "text-[#2F2B27]" : "text-white"
      }`}
    >
      Villa Van Resink
    </Link>
  );
}