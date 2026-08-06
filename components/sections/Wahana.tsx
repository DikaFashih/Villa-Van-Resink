"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ReviewBox from "../ui/ReviewBox";
import ReviewsPanel from "../ui/ReviewsPanel";

const wahana = [
  { slug: "camping-ground", title: "Camping Ground", category: "Bermalam", desc: "Rasakan dinginnya udara pegunungan sembari mendirikan tenda di bawah pohon-pohon pinus tua.", image: "/images/wahana/camping ground.webp", tall: false },
  { slug: "flying-fox", title: "Flying Fox", category: "Adrenalin", desc: "Meluncur menyisir kanopi taman botani dengan panorama Merapi di kejauhan.", image: "/images/wahana/Flying Fox.webp", tall: true },
  { slug: "green-house", title: "Green House", category: "Botani", desc: "Koleksi tumbuhan langka dari berbagai penjuru nusantara, terawat dalam rumah kaca kolonial.", image: "/images/wahana/greenhouse1.webp", tall: false },
  { slug: "tamiya-mountain-coaster", title: "Tamiya Mountain Coaster", category: "Adrenalin", desc: "Nikmati Sensasi Meluncur Dikelilingi Pohon Rindang.", image: "/images/wahana/tamiyamontaincoaster.png", tall: false },
  { slug: "panahan", title: "Panahan", category: "Ketangkasan", desc: "Latih fokus dan ketepatan bersama instruktur berpengalaman di area terbuka.", image: "/images/wahana/panahan1.webp", tall: true },
];

export default function Wahana() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <Container>

        <SectionTitle
          eyebrow="Koleksi Aktivitas"
          title="Wahana di Taman Botani"
          description="Seperti spesimen dalam katalog kebun raya, setiap wahana di Villa Van Resink punya karakternya sendiri â€” dari yang memacu adrenalin hingga yang mengajak melambat."
        />

        <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">

          {wahana.map((item, index) => (

            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: .6, delay: (index % 3) * .1 }}
              className="group relative flex flex-col rounded-[16px] border border-[#8A6E4A]/25 bg-white p-5"
            >

              <div className="absolute -left-2 -top-2 z-10 -rotate-3 rounded-sm border border-[#8A6E4A]/40 bg-[#FBF8F2] px-3 py-1 shadow-sm transition-transform duration-500 group-hover:rotate-0">
                <span className="font-heading text-xs tracking-[0.25em] text-[#8A6E4A]">
                  No. {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`relative overflow-hidden rounded-[6px] ${item.tall ? "h-[380px]" : "h-[280px]"}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">{item.category}</p>
              <h3 className="mt-2 font-heading text-2xl text-[#23412D]">{item.title}</h3>
              <div className="mt-3 h-px w-10 bg-[#8A6E4A]/50 transition-all duration-500 group-hover:w-16" />
              <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.desc}</p>

              <ReviewBox layananId={1} targetLabel={item.title} />

            </motion.div>

          ))}

        </div>

        <ReviewsPanel title="Ulasan Wahana Terfavorit"
          items={wahana.map((w) => ({ slug: w.slug, label: w.title, image: w.image }))}
        />

      </Container>
    </section>
  );
}


