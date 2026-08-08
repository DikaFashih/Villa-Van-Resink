"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  logout,
  subscribeToAuth,
  type AuthUser,
} from "@/lib/auth";

import { navigation } from "@/lib/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      setUser(await getCurrentUser());
    }

    loadUser();

    return subscribeToAuth(loadUser);
  }, []);

  async function handleLogout() {
    await logout();
    onClose();
  }

  function handleNavigate(href: string) {
    onClose();
    router.push(href);
  }

  function handleBooking() {
    onClose();

    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }

    router.push(
      user.role === "user"
        ? "/dashboard"
        : "/admin"
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[60] bg-white transition-transform duration-300 lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-xl font-semibold text-[#23412D]">
          Menu
        </h2>

        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col p-6">

        {navigation.map((item) => {

          if (item.href === "/booking") {
            return (
              <button
                key={item.href}
                onClick={handleBooking}
                className="border-b py-4 text-left"
              >
                {item.title}
              </button>
            );
          }

          return (
            <button
              key={item.href}
              onClick={() => handleNavigate(item.href)}
              className="border-b py-4 text-left"
            >
              {item.title}
            </button>
          );

        })}

        {user && (
          <button
            onClick={handleLogout}
            className="mt-6 rounded-lg bg-red-600 py-3 text-white"
          >
            Logout
          </button>
        )}

      </nav>
    </div>
  );
}
