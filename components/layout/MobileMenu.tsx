"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/navigation";
import { getCurrentUser, logout, subscribeToAuth, type AuthUser } from "@/lib/auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

const allItems = [
  { title: "Villa Van Resink", href: "/" },
  ...navigation,
];

export default function MobileMenu({ open, onClose }: Props) {

  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- sync awal dari localStorage saat mount
  setUser(getCurrentUser());
  return subscribeToAuth(() => setUser(getCurrentUser()));
}, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .35 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-[#23412D] py-24 lg:hidden"
        >

          {allItems.map((item, index) => {

            const isActive = pathname === item.href;
            const isButton = "isButton" in item && item.isButton;

            return (

              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .4, delay: .1 + index * .05 }}
              >

                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`font-heading transition-colors ${
                    isButton
                      ? "rounded-full border border-white/40 px-8 py-3 text-xl text-white"
                      : `text-2xl sm:text-3xl ${
                          isActive
                            ? "text-[#C9A66B]"
                            : "text-white hover:text-[#C9A66B]"
                        }`
                  }`}
                >
                  {item.title}
                </Link>

              </motion.div>

            );

          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .4, delay: .1 + allItems.length * .05 }}
            className="mt-4 flex flex-col items-center gap-4"
          >
            {user ? (
              <>
                <Link
                  href={user.role === "user" ? "/dashboard" : "/admin"}
                  onClick={onClose}
                  className="text-lg text-[#C9A66B] hover:text-white"
                >
                  {user.role === "user" ? "Dashboard Saya" : "Dashboard Admin"}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="text-lg text-white/70 hover:text-white"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="rounded-full border border-white/40 px-8 py-3 text-lg text-white"
              >
                Masuk
              </Link>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}