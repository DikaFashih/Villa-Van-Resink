"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const foto = [
  { src: "/images/gallery/1.webp", rotate: "-rotate-2", alt: "Fasad Villa Van Resink" },
  { src: "/images/gallery/2.webp", rotate: "rotate-1", alt: "Taman botani Kaliurang Park" },
  { src: "/images/gallery/3.webp", rotate: "-rotate-1", alt: "Aktivitas wahana pengunjung" },
  { src: "/images/gallery/4.webp", rotate: "rotate-2", alt: "Suasana taman Villa Van Resink" },
  { src: "/images/gallery/5.webp", rotate: "-rotate-1", alt: "Interior kamar heritage" },
  { src: "/images/gallery/kolamrenang2.webp", rotate: "rotate-2", alt: "Kolam renang alam" },
  { src: "/images/gallery/kamar2.webp", rotate: "-rotate-2", alt: "Kamar heritage" },
  { src: "/images/gallery/ruangtamu1.webp", rotate: "rotate-1", alt: "Ruang tamu villa" },
  { src: "/images/gallery/villa 3.webp", rotate: "-rotate-1", alt: "Fasad villa dari sisi lain" },
  { src: "/images/gallery/weddinng1.jpg", rotate: "-rotate-1", alt: "acara pernikahan" },
  { src: "/images/wahana/Flying Fox.webp", rotate: "-rotate-1", alt: "Flying Fox"},
  { src: "/images/wahana/panahan1.webp", rotate: "-rotate-1", alt: "Memanah di Taman Botani"},
];

export default function Gallery() {
  return (
    <section className="bg-[#F7F3EC] py-20 sm:py-28 lg:py-32">
      <Container>

        <SectionTitle
          eyebrow="Sekilas Cerita"
          title="Galeri"
          description="Beberapa momen yang terekam dari kunjungan tamu-tamu kami."
        />

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:mt-20 sm:gap-x-6 sm:gap-y-16 md:grid-cols-3">

          {foto.map((item, index) => (

            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: .6, delay: (index % 3) * .1 }}
              className={`group relative ${item.rotate} transition-transform duration-500 hover:rotate-0 hover:z-10`}
            >

              <div className="border-4 border-white bg-white shadow-[0_10px_25px_-8px_rgba(0,0,0,0.25)] sm:border-8">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-[#8A6E4A]/20 shadow-inner" />

            </motion.div>

          ))}

        </div>

      </Container>
    </section>
  );
}