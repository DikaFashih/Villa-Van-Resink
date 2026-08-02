"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, ShieldCheck } from "lucide-react";
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

  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [showForm, setShowForm] = useState(() => !!getCurrentUser());
  const [sent, setSent] = useState(false);

  useEffect(() => {
    return subscribeToAuth(() => {
      const current = getCurrentUser();
      setUser(current);
      setShowForm(!!current);
    });
  }, []);

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    paket: paketOptions[0],
    paketLainnya: "",
    jumlah: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 uppercase tracking-[0.4em] text-white/70">Reservasi</p>
          <h2 className="font-heading text-5xl leading-tight text-white md:text-6xl">Rencanakan Kunjungan Anda</h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/80">
            Pesan kamar lewat platform booking pilihan Anda, atau hubungi kami
            langsung untuk paket wisata, wedding, maupun study tour.
          </p>
        </motion.div>

        {/* Jalur 1: OTA — booking langsung, tidak perlu akun */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3"
        >
          {platformOTA.map((item) => (
            
            <a  key={item.nama}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-[16px] border border-white/20 bg-white/5 p-6 transition duration-300 hover:border-white/50 hover:bg-white/10"
            >
              <div>
                <p className="font-heading text-2xl text-white">{item.nama}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{item.ket}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/80 transition group-hover:gap-3">
                Pesan Sekarang →
              </span>
            </a>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-4xl items-center gap-4">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Atau Booking Langsung ke Tim Kami</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60">
            <ShieldCheck size={14} strokeWidth={1.5} />
            Booking langsung memerlukan akun, supaya Anda bisa memantau status dan menghubungi tim kami.
          </div>
        </div>

        {/* Jalur 2: Booking custom — perlu akun/login */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-10 w-full max-w-2xl rounded-[20px] border border-white/15 bg-[#1c3524] p-8 sm:p-10"
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
                Klik tombol di bawah untuk memulai proses booking. Anda akan diminta login atau membuat akun terlebih dahulu.
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
                      <option key={p} value={p} className="bg-[#1c3524] text-white">
                        {p}
                      </option>
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

                <Button type="submit" size="lg" className="mt-2 w-full bg-white text-[#23412D] hover:bg-neutral-200 sm:col-span-2">
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