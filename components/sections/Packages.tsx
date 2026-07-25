"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import Container from "../ui/Container";

const packages = [
  {
    title: "Paket Wisata",
    desc: "Jelajahi sejarah Villa Van Resink dan kawasan Botanical Garden bersama keluarga.",
    icon: "🌿",
  },
  {
    title: "Paket Wedding",
    desc: "Venue pernikahan bernuansa heritage dengan taman yang romantis.",
    icon: "💍",
  },
  {
    title: "Paket Menginap",
    desc: "Nikmati pengalaman menginap di bangunan kolonial yang eksklusif.",
    icon: "🏡",
  },
  {
    title: "Paket Gathering",
    desc: "Cocok untuk outing kantor, komunitas, dan acara keluarga.",
    icon: "🎉",
  },
  {
    title: "Makanan & Minuman",
    desc: "Tersedia berbagai pilihan konsumsi sesuai kebutuhan acara.",
    icon: "🍽️",
  },
  {
    title: "Private Event",
    desc: "Rayakan ulang tahun, engagement, ataupun acara spesial lainnya.",
    icon: "✨",
  },
];

export default function Packages() {
  return (
    <section
      id="paket"
      className="bg-[#f8f5f1] py-32"
    >
      <Container>

        <SectionTitle
          eyebrow="Layanan"
          title="Paket yang Kami Sediakan"
          description="Berbagai pilihan paket yang dapat disesuaikan dengan kebutuhan Anda."
          center
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {packages.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .08,
              }}
              className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-5xl">

                {item.icon}

              </div>

              <h3 className="mt-6 font-heading text-3xl">

                {item.title}

              </h3>

              <p className="mt-5 leading-8 text-neutral-600">

                {item.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </Container>
    </section>
  );
}