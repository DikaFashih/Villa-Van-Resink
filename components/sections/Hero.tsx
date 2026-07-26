"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

      <Image
        src="/images/hero.webp"
        alt="Villa Van Resink"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Content */}

      <div className="relative z-20 flex h-full items-center">

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">

          <motion.p
            initial={{ opacity:0,y:30 }}
            animate={{ opacity:1,y:0 }}
            transition={{ duration:.8 }}
            className="mb-4 text-xs tracking-[0.5em] uppercase text-white/80 sm:text-base"
          >
            Heritage • Botanical Garden
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

          <motion.div
            initial={{ opacity:0,y:40 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >

            <a href="/booking">
              <Button size="lg" className="bg-white text-[#23412D] hover:bg-neutral-200">
                Booking Sekarang
              </Button>
            </a>

            <a href="/aktivitas">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#23412D]">
                Jelajahi Fasilitas
              </Button>
            </a>

          </motion.div>

        </div>

      </div>

    </section>
  );
}