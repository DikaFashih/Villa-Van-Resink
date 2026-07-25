"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const ruang = [
  { no: "01", nama: "Beranda Depan", ket: "Menyambut tamu dengan lengkung kolonial dan lantai tegel asli." },
  { no: "02", nama: "Ruang Tamu Utama", ket: "Plafon tinggi, jendela kupu-kupu, dan perabot kayu jati tua." },
  { no: "03", nama: "Kamar Heritage", ket: "Dipertahankan sesuai desain aslinya, dengan sentuhan kenyamanan modern." },
  { no: "04", nama: "Dapur Kolonial", ket: "Dapur terbuka bergaya lama, kerap dipakai untuk sesi foto." },
  { no: "05", nama: "Balkon Menara", ket: "Titik tertinggi villa dengan pemandangan taman botani." },
  { no: "06", nama: "Halaman Belakang", ket: "Rerumputan luas, sering jadi lokasi resepsi outdoor." },
];

export default function Villa() {
  return (
    <section className="bg-white py-32">
      <Container>

        <SectionTitle
          eyebrow="Sejak Masa Kolonial"
          title="Villa Van Resink"
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="text-xl leading-9 text-neutral-700 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[#8A6E4A]"
          >
            Berdiri sejak masa kolonial di tengah kawasan Kaliurang Park
            Botanical Garden, Villa Van Resink adalah saksi bisu perjalanan
            waktu yang tetap mempertahankan wajah aslinya. Setiap dinding,
            jendela kupu-kupu, dan lantai tegelnya menyimpan cerita — kini
            terbuka untuk siapa pun yang ingin merasakan pengalaman menginap
            di tengah taman botani yang asri, jauh dari hiruk-pikuk kota.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7, delay: .15 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative col-span-2 h-64 overflow-hidden rounded-[4px] border border-[#8A6E4A]/25">
              <Image src="/images/villa/facade.webp" alt="Fasad Villa Van Resink" fill className="object-cover" />
            </div>
            <div className="relative h-40 overflow-hidden rounded-[4px] border border-[#8A6E4A]/25">
              <Image src="/images/villa/detail-1.webp" alt="Detail interior villa" fill className="object-cover" />
            </div>
            <div className="relative h-40 overflow-hidden rounded-[4px] border border-[#8A6E4A]/25">
              <Image src="/images/villa/detail-2.webp" alt="Detail jendela villa" fill className="object-cover" />
            </div>
          </motion.div>

        </div>

        <div className="mt-24 border-t border-[#8A6E4A]/20 pt-16">

          <p className="font-heading text-2xl text-[#2F2B27]">Ruang & Area</p>

          <div className="mt-8 divide-y divide-[#8A6E4A]/15">

            {ruang.map((item) => (

              <div key={item.no} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">

                <span className="font-heading text-sm text-[#8A6E4A]">{item.no}</span>

                <span className="w-full font-heading text-2xl text-[#2F2B27] sm:w-64 sm:shrink-0">
                  {item.nama}
                </span>

                <span className="text-neutral-600">{item.ket}</span>

              </div>

            ))}

          </div>

        </div>

      </Container>
    </section>
  );
}