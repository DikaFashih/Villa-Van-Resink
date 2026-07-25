"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Container from "../ui/Container";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // solid di semua halaman kecuali beranda (yang punya hero fullscreen di belakangnya)
  const scrolled = isHome ? scrolledPast : true;

  return (
    <header
      className={`
      fixed
      top-0
      left-0
      w-full
      z-50
      transition-all
      duration-500
      ${
        scrolled
          ? "py-3"
          : "py-7"
      }
    `}
    >
      <Container>

        <div
          className={`
          flex
          items-center
          justify-between
          rounded-full
          transition-all
          duration-500
          px-8
          ${
            scrolled
              ? "h-16 bg-white/80 backdrop-blur-xl shadow-xl"
              : "h-20 bg-transparent"
          }
        `}
        >
          <Logo />

          <DesktopNav dark={scrolled} />

        </div>

      </Container>
    </header>
  );
}