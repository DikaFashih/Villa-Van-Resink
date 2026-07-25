"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

interface Props {
  dark?: boolean;
  onClick?: () => void;
}

export default function NavLinks({
  dark = false,
  onClick,
}: Props) {

  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => {

        const isActive = pathname === item.href;

        if (item.isButton) {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClick}
              className="rounded-full bg-[#23412D] px-6 py-2.5 text-xs normal-case tracking-normal text-white transition-all duration-300 hover:bg-[#1a3022] hover:-translate-y-0.5"
            >
              {item.title}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`
              text-sm
              uppercase
              tracking-[0.2em]
              transition-all
              duration-300

              ${
                isActive
                  ? "text-[#8A6E4A]"
                  : dark
                  ? "text-[#23412D] hover:text-[#8A6E4A]"
                  : "text-white hover:text-amber-200"
              }
            `}
          >
            {item.title}
          </Link>
        );

      })}
    </>
  );
}