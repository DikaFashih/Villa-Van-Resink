"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import {
  getCurrentUser,
  subscribeToAuth,
  type AuthUser,
} from "@/lib/auth";

interface Props {
  dark?: boolean;
  onClick?: () => void;
}

export default function NavLinks({
  dark = false,
  onClick,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      setUser(await getCurrentUser());
    }

    loadUser();

    return subscribeToAuth(loadUser);
  }, []);

  const handleBookingClick = () => {
    onClick?.();

    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }

    if (user.role === "user") {
      router.push("/dashboard");
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;

        if (item.isButton) {
          if (item.href === "/booking") {
            return (
              <button
                key={item.href}
                type="button"
                onClick={handleBookingClick}
                className="rounded-full bg-[#23412D] px-6 py-2.5 text-xs text-white transition hover:bg-[#1a3022]"
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
              className="rounded-full bg-[#23412D] px-6 py-2.5 text-xs text-white transition hover:bg-[#1a3022]"
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
            className={`relative pb-1.5 text-sm uppercase tracking-[0.2em] transition
            ${
              isActive
                ? "text-[#8A6E4A]"
                : dark
                ? "text-[#23412D] hover:text-[#8A6E4A]"
                : "text-white hover:text-amber-200"
            }`}
          >
            {item.title}

            <span
              className={`absolute bottom-0 left-0 h-px bg-current transition
              ${isActive ? "w-full" : "w-0"}`}
            />
          </Link>
        );
      })}
    </>
  );
}
