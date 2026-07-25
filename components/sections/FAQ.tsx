"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const faq = [
  {
    q: "Apa saja wahana yang tersedia di Villa Van Resink?",
    a: "Ada Camping Ground, Flying Fox, Green House, Sky Rope Bridge, Panahan, dan Mandi Busa Ceria. Detail lengkapnya bisa dilihat di halaman Wahana.",
  },
  {
    q: "Apakah tersedia paket menginap?",
    a: "Tersedia. Kamar heritage di Villa Van Resink bisa disewa per malam, lengkap dengan sarapan dan akses ke seluruh wahana keesokan harinya.",
  },
  {
    q: "Bagaimana cara memesan tiket atau paket?",
    a: "Hubungi tim kami langsung lewat tombol Booking di navigasi, atau melalui WhatsApp yang tertera di halaman Booking.",
  },
  {
    q: "Apakah cocok untuk rombongan sekolah?",
    a: "Cocok. Tersedia Paket Study Tour dengan jadwal dan pemandu yang bisa disesuaikan dengan kurikulum.",
  },
  {
    q: "Apakah tersedia fasilitas untuk pernikahan?",
    a: "Ya, taman dan halaman belakang villa sering digunakan sebagai venue pernikahan outdoor. Cek Paket Wedding & Event untuk detailnya.",
  },
  {
    q: "Jam operasional Villa Van Resink?",
    a: "Buka setiap hari pukul 08.00–17.00 WIB. Untuk camping dan acara malam, silakan konfirmasi jadwal khusus lewat tim kami.",
  },
];

export default function FAQ() {

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      
      <Container>

        <SectionTitle
          eyebrow="Sebelum Berkunjung"
          title="Pertanyaan Umum"
        />

        <div className="mx-auto mt-16 max-w-3xl divide-y divide-[#8A6E4A]/20 border-t border-[#8A6E4A]/20">

          {faq.map((item, index) => {

            const isOpen = open === index;

            return (

              <div key={item.q}>

                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start gap-6 py-7 text-left"
                >

                  <span className="font-heading text-sm text-[#8A6E4A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1 font-heading text-2xl text-[#2F2B27]">
                    {item.q}
                  </span>

                  <Plus
                    size={20}
                    strokeWidth={1.5}
                    className={`mt-1 shrink-0 text-[#8A6E4A] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />

                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .35 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-8 pl-11 leading-7 text-neutral-600">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}