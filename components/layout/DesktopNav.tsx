"use client";

import NavLinks from "./NavLinks";

interface Props {
  dark?: boolean;
}

export default function DesktopNav({ dark = false }: Props) {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      <NavLinks dark={dark} />
    </nav>
  );
}