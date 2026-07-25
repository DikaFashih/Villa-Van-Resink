"use client";

import { AnimatePresence, motion } from "framer-motion";
import NavLinks from "./NavLinks";

interface Props {
  open: boolean;
  close: () => void;
}

export default function FullscreenMenu({
  open,
  close,
}: Props) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .35 }}
          className="fixed inset-0 z-50 hidden bg-[#F7F2EA] lg:flex"
        >

          <div className="m-auto flex flex-col items-center gap-8">

            <h2 className="font-heading text-5xl">
              Villa Van Resink
            </h2>

            <div className="flex flex-col items-center gap-6 text-xl">

              <NavLinks onClick={close} />

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}