"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Container from "../ui/Container";
import PageTitle from "./PageTitle";
import DesktopNav from "./DesktopNav";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const scrolled = isHome ? scrolledPast : true;

  const hidden = isHome && !scrolledPast;

  return (
    <>
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
        ${
          hidden
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
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
            px-6
            sm:px-8
            ${
              scrolled
                ? "h-16 bg-white/80 backdrop-blur-xl shadow-xl"
                : "h-20 bg-transparent"
            }
          `}
          >
            <PageTitle dark={scrolled} />

            <DesktopNav dark={scrolled} />

            <MenuButton
              open={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              dark={scrolled}
            />

          </div>

        </Container>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}