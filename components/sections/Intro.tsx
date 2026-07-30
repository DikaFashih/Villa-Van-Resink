"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="bg-[#F7F3EC] py-24 sm:py-32 lg:py-36">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: .7 }}
        className="mx-auto max-w-5xl px-6 text-center"
      >

        <p className="mb-4 text-xs tracking-[0.3em] text-[#8A6E4A] uppercase sm:text-sm sm:tracking-[0.4em]">
          Welcome
        </p>

        <h2 className="font-heading text-3xl text-[#23412D] sm:text-4xl lg:text-5xl">
          Experience Timeless Heritage
        </h2>

        <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-neutral-600 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl">
          Villa Van Resink merupakan ikon bersejarah yang berada
          di tengah kawasan Kaliurang Park Botanical Garden.
          Menghadirkan perpaduan arsitektur kolonial,
          keindahan alam,
          serta ruang yang ideal untuk rekreasi,
          fotografi,
          wedding,
          hingga berbagai event.
        </p>

      </motion.div>

    </section>
  );
}