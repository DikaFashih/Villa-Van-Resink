"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <Image
        src="/images/gallery/1.webp"
        alt="Villa Van Resink"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="relative z-20 flex h-full items-center">

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">

          <motion.p
            initial={{ opacity:0,y:30 }}
            animate={{ opacity:1,y:0 }}
            transition={{ duration:.8 }}
            className="mb-4 text-xs tracking-[0.5em] uppercase text-white/80 sm:text-base"
          >
            Heritage â€¢ Botanical Garden
          </motion.p>

          <motion.h1
            initial={{ opacity:0,y:50 }}
            animate={{ opacity:1,y:0 }}
            transition={{ duration:1 }}
            className="font-heading text-6xl leading-none text-white sm:text-7xl md:text-8xl"
          >
            Villa
            <br />
            Van Resink
          </motion.h1>

          <motion.p
            initial={{ opacity:0,y:40 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:.3 }}
            className="mt-8 max-w-xl text-base leading-8 text-white/90 sm:mt-10 sm:text-lg sm:leading-9"
          >
            Perpaduan arsitektur kolonial bersejarah,
            taman botani yang asri,
            dan udara pegunungan Kaliurang
            untuk pengalaman wisata yang tak terlupakan.
          </motion.p>

        </div>

      </div>

    </section>
  );
}