"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { getCurrentUser, subscribeToAuth, type AuthUser } from "@/lib/auth";

interface Props {
  dark?: boolean;
  onClick?: () => void;
}

export default function NavLinks({ dark = false, onClick }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  useEffect(() => {
    return subscribeToAuth(() => setUser(getCurrentUser()));
  }, []);

  const handleBookingClick = () => {
    onClick?.();
    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }
    router.push("/booking");
  };

  return (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;

        if (item.isButton) {
          // Tombol Booking: cek login dulu sebelum masuk ke halaman booking.
          if (item.href === "/booking") {
            return (
              <button
                key={item.href}
                type="button"
                onClick={handleBookingClick}
                className="rounded-full bg-[#23412D] px-6 py-2.5 text-xs normal-case tracking-normal text-white transition-all duration-300 hover:bg-[#1a3022] hover:-translate-y-0.5"
              >
                {item.title}
              </button>
            );
          }

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
              relative
              text-sm
              uppercase
              tracking-[0.2em]
              transition-all
              duration-300
              pb-1.5

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

            <span
              className={`
                absolute
                bottom-0
                left-0
                h-px
                bg-current
                transition-all
                duration-300
                ease-out

                ${isActive ? "w-full" : "w-0"}
              `}
            />
          </Link>
        );
      })}
    </>
  );
}