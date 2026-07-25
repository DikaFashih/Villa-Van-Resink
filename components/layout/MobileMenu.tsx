"use client";

import { AnimatePresence, motion } from "framer-motion";
import NavLinks from "./NavLinks";

interface Props {
  open: boolean;
  close: () => void;
}

export default function MobileMenu({
  open,
  close,
}: Props) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: .45 }}
          className="fixed inset-0 z-50 flex bg-[#F7F2EA]"
        >

          <div className="m-auto flex flex-col items-center gap-8 text-2xl">

            <NavLinks onClick={close} />

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}