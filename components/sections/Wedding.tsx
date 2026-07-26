"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Flower2, ClipboardCheck, Utensils } from "lucide-react";
import { Button } from "../ui/Button";

const fitur = [
  {
    title: "Kapasitas Hingga 300 Tamu",
    desc: "Halaman belakang villa cukup luas untuk resepsi standing maupun kursi tertata.",
    icon: Users,
  },
  {
    title: "Taman & Dekorasi Alami",
    desc: "Latar taman botani dan fasad kolonial jadi dekorasi alami tanpa perlu banyak setting tambahan.",
    icon: Flower2,
  },
  {
    title: "Koordinasi Acara Penuh",
    desc: "Tim kami membantu dari perizinan lokasi hingga koordinasi hari-H bersama vendor Anda.",
    icon: ClipboardCheck,
  },
  {
    title: "Katering & Venue Makan",
    desc: "Area kantin dan pendopo tersedia untuk kebutuhan katering tamu undangan.",
    icon: Utensils,
  },
];

export default function Wedding() {
  return (
    <section className="bg-[#E1E100] py-20 sm:py-28 lg:py-32 text-[#23412D]">

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="relative h-[280px] overflow-hidden rounded-[6px] border border-[#23412D]/20 sm:h-[420px]"
        >
          <Image
            src="/images/wedding/venue.webp"
            alt="Wedding venue di Villa Van Resink"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .1 }}
        >

          <p className="text-xs uppercase tracking-[0.35em] text-[#23412D]/70">
            Momen Sekali Seumur Hidup
          </p>

          <h2 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">
            Wedding Venue
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-[#23412D]/80">
            Rayakan momen spesial dengan latar villa kolonial, taman hijau,
            dan udara sejuk Kaliurang — ruang yang menyatu dengan alam,
            tanpa perlu dekorasi berlebihan.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">

            {fitur.map((item) => {

              const Icon = item.icon;

              return (

                <div key={item.title} className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#23412D]/30 text-[#23412D]">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  <div>
                    <p className="font-heading text-lg leading-snug">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#23412D]/70">
                      {item.desc}
                    </p>
                  </div>

                </div>

              );

            })}

          </div>

          <div className="mt-10">
            <a href="/booking">
              <Button size="lg" className="bg-[#23412D] text-white hover:bg-[#1a3022]">
                Konsultasi Gratis
              </Button>
            </a>
          </div>

        </motion.div>

      </div>

    </section>
  );
}