"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { Button } from "../ui/Button";

const paket = [
  {
    kode: "WST-01",
    nama: "Paket Wisata Harian",
    ket: "Akses seluruh wahana, taman botani, dan area edukasi selama satu hari kunjungan.",
    cocok: "Keluarga, rombongan kecil",
    images: ["/images/edukasi/eco print 1.webp",
             "/images/wahana/Flying Fox2.webp",
             "/images/wahana/panahan2.webp",
             "/images/wahana/panahan3.webp"],
  },
  {
    kode: "MNG-02",
    nama: "Paket Menginap",
    ket: "Satu malam di kamar heritage Villa Van Resink, lengkap dengan sarapan dan akses wahana.",
    cocok: "Pasangan, staycation",
    images: ["/images/gallery/kamar1.webp",
             "/images/gallery/kamar2.webp", 
             "/images/gallery/dapur1.webp",
             "/images/gallery/villa 2.webp", 
             "/images/gallery/villa 3.webp",
             "/images/gallery/halaman1.webp",
             "/images/gallery/halaman2.webp",]
  },
  {
    kode: "WED-03",
    nama: "Paket Wedding & Event",
    ket: "Sewa venue, dekorasi taman, dan koordinasi acara untuk pernikahan atau gathering.",
    cocok: "Pernikahan, acara korporat",
    images: ["/images/gallery/weddinng1.jpg",
             "/images/gallery/event1.webp"],
  },
  {
    kode: "EDU-04",
    nama: "Paket Study Tour",
    ket: "Kunjungan edukatif terjadwal untuk rombongan pelajar, lengkap dengan pemandu.",
    cocok: "Sekolah, komunitas",
    images: ["/images/wahana/camping ground.webp",
              "/images/wahana/Flying Fox.webp",
              "/images/wahana/Flying Fox2.webp",
              "/images/wahana/Flying Fox3.webp",
              "/images/wahana/panahan1.webp",
              "/images/wahana/panahan2.webp",
              "/images/wahana/panahan3.webp",
              "/images/wahana/tamiyamontaincoaster.png",
              "/images/wahana/mandi salju1.webp",
              "/images/wahana/mandi salju2.webp",
              "/images/wahana/mountain slide.webp",
              "/images/wahana/mountain slide 2.webp",]
  },
];

function PhotoCarousel({ images, alt }: { images: string[]; alt: string }) {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  };

  return (
    <div className="relative">

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-44 w-full flex-none snap-center sm:h-52">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === active ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default function Packages() {
  return (
    <section className="bg-[#FBF8F2] py-20 sm:py-28 lg:py-32">
      <Container>

        <SectionTitle
          eyebrow="Pilih Sesuai Kebutuhan"
          title="Paket Kunjungan"
          description="Empat jenis kunjungan yang bisa disesuaikan dengan tujuan Anda datang ke Villa Van Resink."
        />

        <div className="mt-14 grid gap-8 sm:mt-20 md:grid-cols-2">

          {paket.map((item, index) => (

            <motion.div
              key={item.kode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: .6, delay: index * .08 }}
              className="overflow-hidden rounded-[10px] border border-[#8A6E4A]/30 bg-white"
            >

              <PhotoCarousel images={item.images} alt={item.nama} />

              <div className="p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">{item.kode}</p>
                <h3 className="mt-2 font-heading text-2xl text-[#23412D] sm:text-3xl">{item.nama}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 sm:mt-4 sm:text-base sm:leading-7">{item.ket}</p>
                <p className="mt-4 text-sm italic text-[#8A6E4A]">Cocok untuk: {item.cocok}</p>
              </div>

            </motion.div>

          ))}

        </div>

        <div className="mt-14 text-center">
          <a href="/booking">
            <Button size="lg" className="bg-[#23412D] text-white hover:bg-[#1a3022]">
              Tanyakan Harga & Ketersediaan
            </Button>
          </a>
        </div>

      </Container>
    </section>
  );
}