"use client";

import NavLinks from "./NavLinks";

interface Props {
  dark?: boolean;
}

export default function DesktopNav({ dark = false }: Props) {
  return (
    <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
      <NavLinks dark={dark} />
    </nav>
  );
}