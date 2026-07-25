"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Baby,
  Landmark,
  Car,
  Coffee,
  Users,
  HeartPulse,
  Trees,
} from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const fasilitas = [
  {
    title: "Toilet Umum",
    desc: "Tersedia di beberapa titik, bersih dan terawat.",
    icon: Droplets,
  },
  {
    title: "Ruang Laktasi",
    desc: "Ruang privat dan nyaman untuk ibu menyusui.",
    icon: Baby,
  },
  {
    title: "Musholla",
    desc: "Tempat ibadah teduh di tengah rindangnya taman.",
    icon: Landmark,
  },
  {
    title: "Area Parkir",
    desc: "Menampung kendaraan roda dua maupun roda empat.",
    icon: Car,
  },
  {
    title: "Kantin & Kedai",
    desc: "Aneka camilan dan minuman hangat siap menemani.",
    icon: Coffee,
  },
  {
    title: "Titik Kumpul",
    desc: "Area berkumpul untuk rombongan dan keperluan acara.",
    icon: Users,
  },
  {
    title: "Standar P3K",
    desc: "Petugas dan perlengkapan medis dasar selalu siap siaga.",
    icon: HeartPulse,
  },
  {
    title: "Outbound Zone",
    desc: "Ruang terbuka untuk kegiatan kelompok dan permainan tim.",
    icon: Trees,
  },
];

export default function Fasilitas() {
  return (
    <section className="bg-[#F7F3EC] py-20 sm:py-28 lg:py-32">
      
      <Container>

        <SectionTitle
          eyebrow="Papan Petunjuk"
          title="Fasilitas Pendukung"
          description="Delapan titik layanan yang memastikan kunjungan Anda tetap nyaman, dari datang hingga pulang."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mt-20 overflow-hidden rounded-[32px] border border-[#8A6E4A]/25 bg-[#FBF8F2]"
        >

          <div className="grid md:grid-cols-2">

            {fasilitas.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className={`
                    flex items-center gap-6 p-8
                    border-[#8A6E4A]/15
                    ${index % 2 === 0 ? "md:border-r" : ""}
                    ${index < fasilitas.length - 2 ? "border-b" : ""}
                  `}
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#8A6E4A]/40 bg-[#F7F2EA] text-[#8A6E4A]">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div>

                    <h3 className="font-heading text-xl text-[#2F2B27]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {item.desc}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </motion.div>

      </Container>
    </section>
  );
}