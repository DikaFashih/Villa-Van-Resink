"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

const allItems = [
  { title: "Beranda", href: "/" },
  ...navigation,
];

export default function MobileMenu({ open, onClose }: Props) {

  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .35 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#23412D] lg:hidden"
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
                      ? "rounded-full border border-white/40 px-8 py-3 text-2xl text-white"
                      : `text-3xl sm:text-4xl ${
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

        </motion.div>
      )}
    </AnimatePresence>
  );
}