"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const edukasi = [
  {
    title: "Wisata Edukasi Tanaman",
    desc: "Mengenal ragam flora botanical garden beserta manfaatnya.",
    icon: "🌱",
  },
  {
    title: "Heritage & Sejarah Kolonial",
    desc: "Napak tilas sejarah bangunan kolonial Villa Van Resink.",
    icon: "🏛️",
  },
  {
    title: "Workshop Berkebun",
    desc: "Praktik langsung menanam dan merawat tanaman bersama pemandu.",
    icon: "🪴",
  },
  {
    title: "Study Tour Sekolah",
    desc: "Paket kunjungan edukatif khusus untuk rombongan pelajar.",
    icon: "🎒",
  },
];

export default function Edukasi() {
  return (
    <section className="bg-[#FBF8F2] py-20 sm:py-28 lg:py-32">

    
      <Container>

        <SectionTitle
          eyebrow="Belajar & Berkembang"
          title="Program Edukasi"
          description="Wisata sekaligus pembelajaran, cocok untuk keluarga, sekolah, maupun komunitas."
          center
        />

        <div className="flex flex-col gap-16 lg:gap-24">

          {edukasi.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .08,
              }}
              className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-6 font-heading text-2xl">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </Container>
    </section>
  );
}