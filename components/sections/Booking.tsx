"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { Button } from "../ui/Button";

const NOMOR_WA = "628157728629"; // ganti dengan nomor WA asli

const platformOTA = [
  {
    nama: "Agoda",
    ket: "Booking kamar dengan proteksi pembayaran Agoda",
    url: "https://www.agoda.com/en-nz/villa-van-resink/hotel/yogyakarta-id.html?cid=1844104&ds=aYn0l2gpkzQsC8wB",
  },
  {
    nama: "Traveloka",
    ket: "Booking kamar lewat aplikasi Traveloka",
    url: "https://www.traveloka.com/id-id/hotel/indonesia/-villa-van-resink-9000005647021",
  },
  {
    nama: "Tiket.com",
    ket: "Booking kamar lewat Tiket.com",
    url: "https://www.tiket.com/id-id/homes/indonesia/villa-van-resink-711001731313828864",
  },
];

const templatePesan = `Halo Villa Van Resink, saya ingin bertanya ketersediaan booking:%0A%0ANama: %0ACheck-in: %0ACheck-out: %0AJumlah Orang (maks 40): %0APaket yang diminati: %0A%0AMohon informasinya. Terima kasih.`;

export default function Booking() {
  return (
    <section className="bg-[#23412D] py-20 sm:py-28 lg:py-32 text-white">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mx-auto max-w-3xl text-center"
        >

          <p className="mb-4 uppercase tracking-[0.4em] text-white/70">
            Reservasi
          </p>

          <h2 className="font-heading text-5xl leading-tight md:text-6xl">
            Rencanakan Kunjungan Anda
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/80">
            Pesan kamar lewat platform booking pilihan Anda, atau chat
            langsung ke tim kami untuk wisata harian, wedding, maupun
            study tour — pesannya udah kami siapin, tinggal Anda lengkapi.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .1 }}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3"
        >

          {platformOTA.map((item) => {
            return (
              <a
                key={item.nama}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-[16px] border border-white/20 bg-white/5 p-6 transition duration-300 hover:border-white/50 hover:bg-white/10"
              >

                <div>
                  <p className="font-heading text-2xl">{item.nama}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {item.ket}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/80 transition group-hover:gap-3">
                  Pesan Sekarang →
                </span>

              </a>
            );
          })}

        </motion.div>

        <div className="mx-auto mt-16 flex max-w-4xl items-center gap-4">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Atau Chat Langsung
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .15 }}
          className="mx-auto mt-10 max-w-xl text-center"
        >

          <p className="text-white/70">
            Untuk paket wisata harian, menginap custom, wedding, atau study tour —
            klik tombol di bawah, template pesannya udah siap, tinggal lengkapi datanya.
          </p>

          <a
            href={`https://wa.me/${NOMOR_WA}?text=${templatePesan}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block"
          >
            <Button size="lg" className="bg-white text-[#23412D] hover:bg-neutral-200">
              Chat via WhatsApp
            </Button>
          </a>

        </motion.div>

      </Container>
    </section>
  );
}