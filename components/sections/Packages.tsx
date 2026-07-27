"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { Button } from "../ui/Button";

const paket = [
  { kode: "WST-01", nama: "Paket Wisata Harian", ket: "Akses seluruh wahana, taman botani, dan area edukasi selama satu hari kunjungan.", cocok: "Keluarga, rombongan kecil" },
  { kode: "MNG-02", nama: "Paket Menginap", ket: "Satu malam di kamar heritage Villa Van Resink, lengkap dengan sarapan dan akses wahana.", cocok: "Pasangan, staycation" },
  { kode: "WED-03", nama: "Paket Wedding & Event", ket: "Sewa venue, dekorasi taman, dan koordinasi acara untuk pernikahan atau gathering.", cocok: "Pernikahan, acara korporat" },
  { kode: "EDU-04", nama: "Paket Study Tour", ket: "Kunjungan edukatif terjadwal untuk rombongan pelajar, lengkap dengan pemandu.", cocok: "Sekolah, komunitas" },
];

export default function Packages() {
  return (
    <section className="bg-[#FBF8F2] py-20 sm:py-28 lg:py-32">
      <Container>

        <SectionTitle
          eyebrow="Pilih Sesuai Kebutuhan"
          title="Paket Kunjungan"
          description="Empat jenis kunjungan yang bisa disesuaikan dengan tujuan Anda datang ke Villa Van Resink."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {paket.map((item, index) => (

            <motion.div
              key={item.kode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: .6, delay: index * .08 }}
              className="relative flex overflow-hidden rounded-[10px] border border-[#8A6E4A]/30 bg-white"
            >

              <div className="flex-1 p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">{item.kode}</p>
                <h3 className="mt-2 font-heading text-3xl text-[#2F2B27]">{item.nama}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{item.ket}</p>
                <p className="mt-5 text-sm italic text-[#8A6E4A]">Cocok untuk: {item.cocok}</p>
              </div>

              <div className="relative flex w-28 shrink-0 flex-col items-center justify-center border-l border-dashed border-[#8A6E4A]/40 bg-[#F7F2EA] px-4">
                <div className="absolute -top-3 h-6 w-6 rounded-full bg-[#FBF8F2]" />
                <div className="absolute -bottom-3 h-6 w-6 rounded-full bg-[#FBF8F2]" />
                <span className="[writing-mode:vertical-rl] font-heading text-sm tracking-widest text-[#8A6E4A]">
                  Villa Van Resink
                </span>
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