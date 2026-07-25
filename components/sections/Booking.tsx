"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { Button } from "../ui/Button";

const NOMOR_WA = "628157728629"; // ganti dengan nomor WA asli

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

export default function Booking() {

  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
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

    const pesan = `Halo Villa Van Resink, saya ingin booking:%0A%0ANama: ${form.nama}%0ATanggal Kunjungan: ${form.tanggal}%0APaket: ${form.paket}%0AJumlah Orang: ${form.jumlah}%0A%0AMohon info ketersediaan dan harganya. Terima kasih.`;

    window.open(`https://wa.me/${NOMOR_WA}?text=${pesan}`, "_blank");
  };

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
            Pesan kamar lewat platform booking pilihan Anda, atau hubungi
            kami langsung untuk paket wisata, wedding, maupun study tour.
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
            Atau Booking Langsung
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <a
            href={`https://wa.me/${NOMOR_WA}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-[#23412D] hover:bg-neutral-200"
            >
              Chat via WhatsApp
            </Button>
          </a>

          <a href={`tel:+${NOMOR_WA}`}>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#23412D]"
            >
              Hubungi Kami
            </Button>
          </a>

        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8, delay: .15 }}
          className="mx-auto mt-16 max-w-2xl rounded-[24px] border border-white/20 bg-white/5 p-8 backdrop-blur-sm sm:p-10"
        >

          <p className="text-center font-heading text-2xl">
            Formulir Booking Paket & Event
          </p>

          <p className="mt-2 text-center text-sm text-white/60">
            Untuk wisata harian, wedding, atau study tour — bukan booking kamar.
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
                className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                Tanggal Kunjungan
              </label>
              <input
                required
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-white/50"
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
                name="jumlah"
                value={form.jumlah}
                onChange={handleChange}
                placeholder="Contoh: 4"
                className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                Pilih Paket
              </label>
              <select
                name="paket"
                value={form.paket}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-white/50"
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

          <p className="mt-4 text-center text-xs text-white/50">
            Data Anda akan otomatis terisi sebagai pesan WhatsApp ke tim kami — tidak disimpan di server.
          </p>

        </motion.form>

      </Container>
    </section>
  );
}