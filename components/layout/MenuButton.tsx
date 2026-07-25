"use client";

interface Props {
  open: boolean;
  onClick: () => void;
  dark?: boolean;
}

export default function MenuButton({
  open,
  onClick,
  dark = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Tutup menu" : "Buka menu"}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
    >

      <span
        className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
          open
            ? "translate-y-[8px] rotate-45 bg-white"
            : dark
            ? "bg-[#23412D]"
            : "bg-white"
        }`}
      />

      <span
        className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
          open ? "opacity-0" : dark ? "bg-[#23412D]" : "bg-white"
        }`}
      />

      <span
        className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
          open
            ? "-translate-y-[8px] -rotate-45 bg-white"
            : dark
            ? "bg-[#23412D]"
            : "bg-white"
        }`}
      />

    </button>
  );
}