"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const edukasi = [
  { numeral: "I", title: "Ecoprint", desc: "pengalaman unik mencetak keindahan alam pada kain.", image: "/images/edukasi/eco print 1.webp" },
  { numeral: "II", title: "Heritage & Sejarah Kolonial", desc: "Menelusuri jejak arsitektur Villa Van Resink yang berdiri sejak masa kolonial, lengkap dengan cerita di balik tiap sudut bangunannya.", image: "/images/edukasi/hiasan1.webp" },
  { numeral: "III", title: "Study Tour Sekolah", desc: "Paket kunjungan yang disusun mengikuti kurikulum, cocok untuk rombongan pelajar dari tingkat TK hingga SMA.", image: "/images/edukasi/study tour1.webp" },
];

export default function Edukasi() {
  return (
    <section className="bg-[#FBF8F2] py-20 sm:py-28 lg:py-32">
      <Container>

        <SectionTitle
          eyebrow="Catatan Lapangan"
          title="Program Edukasi"
          description="Tiga halaman dari jurnal kebun kami — pengalaman belajar yang disusun untuk keluarga, pelajar, dan siapa pun yang penasaran."
        />

        <div className="relative mt-24">

          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#8A6E4A]/20 lg:block" />

          <div className="flex flex-col gap-16 lg:gap-24">

            {edukasi.map((item, index) => {

              const reversed = index % 2 === 1;

              return (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: .7 }}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                >

                  <div className="relative h-[320px] overflow-hidden rounded-[6px] border border-[#8A6E4A]/25 p-1.5 sm:h-[400px]">
                    <div className="relative h-full w-full overflow-hidden rounded-[3px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className={reversed ? "lg:pr-6" : "lg:pl-6"}>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8A6E4A]/50">
                      <span className="font-heading text-lg text-[#8A6E4A]">{item.numeral}</span>
                    </div>

                    <h3 className="mt-6 font-heading text-4xl text-[#2F2B27]">{item.title}</h3>
                    <div className="mt-4 h-px w-12 bg-[#8A6E4A]/50" />
                    <p className="mt-5 max-w-md leading-8 text-neutral-600">{item.desc}</p>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </Container>
    </section>
  );
}