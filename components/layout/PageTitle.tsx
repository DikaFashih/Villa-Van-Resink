"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

interface Props {
  dark?: boolean;
}

export default function PageTitle({ dark = false }: Props) {

  const pathname = usePathname();

  const current = navigation.find((item) => item.href === pathname);
  const label = current ? current.title : "Villa Van Resink";

  return (
    <Link
      href="/"
      className={`font-heading text-xl tracking-wide transition-colors duration-300 sm:text-2xl ${
        dark ? "text-[#23412D]" : "text-white"
      }`}
    >
      {label}
    </Link>
  );
}