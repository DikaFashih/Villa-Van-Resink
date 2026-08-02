"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, CheckCircle2 } from "lucide-react";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import { getCurrentUser, subscribeToAuth, type AuthUser } from "@/lib/auth";
import { addBooking } from "@/lib/booking";

const paketOptions = [
  "Paket Wisata Harian",
  "Paket Menginap",
  "Paket Wedding & Event",
  "Paket Study Tour",
  "Lainnya",
];

export default function Booking() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);

useEffect(() => {
  const syncUser = () => {
    const current = getCurrentUser();
    setUser(current);
    setShowForm(!!current);
  };

  syncUser();

  return subscribeToAuth(syncUser);
}, []);

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    paket: paketOptions[0],
    paketLainnya: "",
    jumlah: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBookingClick = () => {
    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const paketFinal = form.paket === "Lainnya" ? form.paketLainnya : form.paket;

    addBooking({
      userId: user.id,
      userNama: user.nama,
      paket: paketFinal,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      jumlah: Number(form.jumlah),
    });

    setSent(true);
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

          <p className="mb-4 uppercase tracking-[0.4em] text-white/70">Reservasi</p>
          <h2 className="font-heading text-5xl leading-tight text-white md:text-6xl">Rencanakan Kunjungan Anda</h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/80">
            Satu langkah mudah untuk memesan paket wisata, menginap,
            wedding, maupun study tour di Villa Van Resink.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: .7 }}
          className="mx-auto mt-14 w-full max-w-2xl rounded-[20px] border border-white/15 bg-[#1c3524] p-8 sm:p-10"
        >

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
              <FileText size={18} strokeWidth={1.5} />
            </div>
            <p className="font-heading text-2xl text-white">Formulir Booking</p>
          </div>

          {sent ? (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-[14px] border border-white/15 bg-white/5 p-8 text-center">
              <CheckCircle2 size={36} strokeWidth={1.5} className="text-white" />
              <p className="text-sm leading-6 text-white/70">
                Booking Anda berhasil dikirim dengan status <span className="text-white">menunggu konfirmasi</span>.
                Tim kami akan segera menghubungi Anda.
              </p>
            </div>
          ) : !showForm ? (
            <div className="mt-8 text-center">
              <p className="text-sm leading-6 text-white/60">
                Klik tombol di bawah untuk memulai proses booking.
              </p>
              <Button
                type="button"
                size="lg"
                onClick={handleBookingClick}
                className="mt-6 w-full bg-white text-[#23412D] hover:bg-neutral-200"
              >
                Booking Sekarang
              </Button>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Lengkapi formulir di bawah untuk mengecek ketersediaan dan mendapatkan penawaran terbaik.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-white/60">Nama Pemesan</label>
                  <input
                    disabled
                    type="text"
                    value={user?.nama ?? ""}
                    className="mt-2 w-full cursor-not-allowed rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white/70"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-white/60">Check-in</label>
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
                  <label className="text-xs uppercase tracking-[0.2em] text-white/60">Check-out</label>
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
                  <label className="text-xs uppercase tracking-[0.2em] text-white/60">Jumlah Orang</label>
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

                <div className={form.paket === "Lainnya" ? "" : "sm:col-span-2"}>
                  <label className="text-xs uppercase tracking-[0.2em] text-white/60">Pilih Paket</label>
                  <select
                    name="paket"
                    value={form.paket}
                    onChange={handleChange}
                    className="mt-2 w-full appearance-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/50"
                  >
                    {paketOptions.map((p) => (
                      <option key={p} value={p} className="bg-[#1c3524] text-white">{p}</option>
                    ))}
                  </select>
                </div>

                {form.paket === "Lainnya" && (
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-white/60">Sebutkan Kebutuhan Anda</label>
                    <input
                      required
                      type="text"
                      name="paketLainnya"
                      value={form.paketLainnya}
                      onChange={handleChange}
                      placeholder="Contoh: Gathering kantor 25 orang"
                      className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/50"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full bg-white text-[#23412D] hover:bg-neutral-200 sm:col-span-2"
                >
                  Kirim Booking
                </Button>

              </form>
            </>
          )}

        </motion.div>

      </Container>
    </section>
  );
}