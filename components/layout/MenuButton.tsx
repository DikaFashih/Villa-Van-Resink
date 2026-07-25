"use client";

import { Menu, X } from "lucide-react";

interface Props {
  open: boolean;
  toggle: () => void;
}

export default function MenuButton({
  open,
  toggle,
}: Props) {
  return (
    <button
      onClick={toggle}
      className="relative z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white/80 backdrop-blur-lg lg:hidden"
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}