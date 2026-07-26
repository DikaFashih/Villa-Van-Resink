"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageCircle, ShieldCheck, Phone } from "lucide-react";
import Container from "../ui/Container";
import { Button } from "../ui/Button";

const NOMOR_WA = "6281234567890";

const paketOptions = [
  "Paket Wisata Harian",
  "Paket Menginap",
  "Paket Wedding & Event",
  "Paket Study Tour",
];

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

const templateKosong = `Halo Villa Van Resink, saya ingin bertanya ketersediaan booking:%0A%0ANama: %0ACheck-in: %0ACheck-out: %0AJumlah Orang (maks 40): %0APaket yang diminati: %0A%0AMohon informasinya. Terima kasih.`;

export default function Booking() {

  const [form, setForm] = useState({
    nama: "",
    checkIn: "",
    checkOut: "",
    paket: paketOptions[0],
    jumlah: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pesan = `Halo Villa Van Resink, saya ingin booking:%0A%0ANama: ${form.nama}%0ACheck-in: ${form.checkIn}%0ACheck-out: ${form.checkOut}%0APaket: ${form.paket}%0AJumlah Orang: ${form.jumlah}%0A%0AMohon info ketersediaan dan harganya. Terima kasih.`;

    window.open(`https://wa.me/${NOMOR_WA}?text=${pesan}`, "_blank");
  };

  return (
    <section className="bg-[#23412D] py-20 sm:py-28 lg:py-32 text-white">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
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
            Pesan kamar lewat platform booking pilihan Anda, atau hubungi
            kami langsung untuk paket wisata, wedding, maupun study tour.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: .7, delay: .1 }}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3"
        >

          {platformOTA.map((item) => {
            return (
              
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
            Atau Booking Langsung ke Tim Kami
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60">
            <ShieldCheck size={14} strokeWidth={1.5} />
            Data Anda tidak disimpan di server — langsung terkirim sebagai pesan WhatsApp
          </div>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: .7 }}
            className="rounded-[20px] border border-white/15 bg-[#1c3524] p-8 sm:p-10 lg:rounded-r-none"
          >

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <p className="font-heading text-2xl">
                Isi Formulir Booking
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Lengkapi detail kunjungan Anda — otomatis tersusun rapi
              sebagai pesan WhatsApp yang tinggal Anda kirim.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Nama Lengkap
                </label>
                <input
                  required
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Check-in
                </label>
                <input
                  required
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Check-out
                </label>
                <input
                  required
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Jumlah Orang
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  max={40}
                  name="jumlah"
                  value={form.jumlah}
                  onChange={handleChange}
                  placeholder="Maks. 40 orang"
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Pilih Paket
                </label>
                <select
                  name="paket"
                  value={form.paket}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-white/50"
                >
                  {paketOptions.map((p) => (
                    <option key={p} value={p} className="text-[#23412D]">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full bg-white text-[#23412D] hover:bg-neutral-200"
            >
              Kirim & Lanjutkan ke WhatsApp
            </Button>

          </motion.form>

          <div className="relative hidden items-center justify-center lg:flex lg:w-16">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" />
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#23412D] text-[11px] uppercase tracking-widest text-white/60">
              atau
            </span>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-[11px] uppercase tracking-widest text-white/50">atau</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: .7, delay: .1 }}
            className="flex flex-col justify-center rounded-[20px] border border-white/15 bg-[#1c3524] p-8 sm:p-10 lg:rounded-l-none"
          >

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <MessageCircle size={18} strokeWidth={1.5} />
              </div>
              <p className="font-heading text-2xl">
                Chat Langsung
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Lebih suka ngobrol langsung? Klik tombol di bawah — template
              pesan sudah kami siapkan di WhatsApp, tinggal Anda lengkapi
              di sana.
            </p>

            
              href={`https://wa.me/${NOMOR_WA}?text=${templateKosong}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-[#23412D]"
              >
                Chat via WhatsApp
              </Button>
            </a>

            
              href={`tel:+${NOMOR_WA}`}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white"
            >
              <Phone size={14} strokeWidth={1.5} />
              atau telepon langsung
            </a>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}