"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";

import Container from "../ui/Container";
import { Button } from "../ui/Button";

import {
  getCurrentUser,
  subscribeToAuth,
  type AuthUser,
} from "@/lib/auth";

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

export default function Booking() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

useEffect(() => {
  async function loadUser() {
    const current = await getCurrentUser();
    setUser(current);
  }

  loadUser();

  return subscribeToAuth(loadUser);
}, []);

  const handleBookingClick = () => {
    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }

    if (user.role === "user") {
      router.push("/dashboard");
    } else {
      router.push("/admin");
    }
  };

  return (
    <section className="bg-[#23412D] py-20 text-white sm:py-28 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 uppercase tracking-[0.4em] text-white/70">
            Reservasi
          </p>

          <h2 className="font-heading text-5xl leading-tight text-[#D4AF37] md:text-6xl">
             Rencanakan Kunjungan Anda
          </h2> 

          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/80">
            Pesan kamar melalui platform booking pilihan Anda atau lakukan
            booking langsung melalui akun Villa Van Resink.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3"
        >
          {platformOTA.map((item) => (
            <a
              key={item.nama}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-white/20 bg-white/5 p-6 transition hover:border-white/50 hover:bg-white/10"
            >
              <div>
                <h3 className="font-heading text-2xl text-[#D4AF37]">
                {item.nama}
              </h3>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  {item.ket}
                </p>
              </div>

              <span className="mt-6 text-sm uppercase tracking-[0.15em] text-white/80">
                Pesan Sekarang â†’
              </span>
            </a>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-4xl items-center gap-4">
          <div className="h-px flex-1 bg-white/15" />

          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Atau Booking Langsung ke Tim Kami
          </span>

          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mx-auto mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60">
            <ShieldCheck size={14} />
            Booking langsung memerlukan akun.
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-white/15 bg-[#1D3525] p-10 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <FileText className="h-8 w-8 text-white" />
          </div>

          <h3 className="font-heading text-4xl text-[#D4AF37]">
            Booking Langsung
          </h3>

          <p className="mt-5 leading-8 text-white/70">
            Login atau buat akun terlebih dahulu untuk melakukan booking,
            melihat status reservasi, dan berkomunikasi langsung dengan tim
            Villa Van Resink.
          </p>

          <button
            type="button"
            onClick={handleBookingClick}
            className="mt-10 w-full rounded-xl bg-white py-3 text-[#23412D] hover:bg-gray-100"
          >
            Booking Sekarang
          </button>
        </motion.div>
      </Container>
    </section>
  );
}