"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleQuestion } from "lucide-react";
import Container from "@/components/ui/Container";
import { getCurrentUser, subscribeToAuth, type AuthUser } from "@/lib/auth";
import { getBookingsForUser, subscribeToBookings, type BookingEntry } from "@/lib/booking";
import { askQuestion, getQuestionsForUser, subscribeToQuestions, type Question } from "@/lib/question";


const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
};

export default function DashboardPage() {

  const router = useRouter();

const currentUser = getCurrentUser();

const [user, setUser] = useState<AuthUser | null | undefined>(currentUser);

const [bookings, setBookings] = useState<BookingEntry[]>(
  () => (currentUser ? getBookingsForUser(currentUser.id) : [])
);

const [questions, setQuestions] = useState<Question[]>(
  () => (currentUser ? getQuestionsForUser(currentUser.id) : [])
);

const [pertanyaan, setPertanyaan] = useState("");

 useEffect(() => {
  if (!user) {
    router.push("/login?redirect=/dashboard");
    return;
  }

  const unsubAuth = subscribeToAuth(() => {
    const current = getCurrentUser();

    setUser(current);

    if (current) {
      setBookings(getBookingsForUser(current.id));
      setQuestions(getQuestionsForUser(current.id));
    } else {
      setBookings([]);
      setQuestions([]);
    }
  });

  const unsubBooking = subscribeToBookings(() => {
    const current = getCurrentUser();
    if (current) {
      setBookings(getBookingsForUser(current.id));
    }
  });

  const unsubQuestion = subscribeToQuestions(() => {
    const current = getCurrentUser();
    if (current) {
      setQuestions(getQuestionsForUser(current.id));
    }
  });

  return () => {
    unsubAuth();
    unsubBooking();
    unsubQuestion();
  };
}, [router, user]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !pertanyaan.trim()) return;
    askQuestion(user.id, user.nama, pertanyaan.trim());
    setPertanyaan("");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen bg-[#FBF8F2] pt-32 pb-20">
      <Container>

        <p className="text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">Dashboard Saya</p>
        <h1 className="mt-2 font-heading text-4xl text-[#23412D]">Halo, {user.nama}</h1>

        <div className="mt-10">
          <p className="font-heading text-2xl text-[#23412D]">Booking Saya</p>
          <div className="mt-4 space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
                <div>
                  <p className="font-medium text-[#23412D]">{b.paket}</p>
                  <p className="text-xs text-neutral-500">{b.checkIn} s/d {b.checkOut} · {b.jumlah} orang</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${statusStyle[b.status]}`}>{b.status}</span>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-sm text-neutral-500">Belum ada booking. Yuk mulai rencanakan kunjungan Anda.</p>}
          </div>
        </div>

        <div className="mt-12">
          <p className="font-heading text-2xl text-[#23412D]">Tanya Kami</p>

          <form onSubmit={handleAsk} className="mt-4 flex gap-2">
            <input
              value={pertanyaan}
              onChange={(e) => setPertanyaan(e.target.value)}
              placeholder="Tulis pertanyaan Anda..."
              className="flex-1 rounded-lg border border-[#8A6E4A]/25 bg-white px-4 py-3 text-sm outline-none"
            />
            <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#23412D] px-5 text-sm text-white hover:bg-[#1a3022]">
              <MessageCircleQuestion size={16} /> Kirim
            </button>
          </form>

          <div className="mt-4 space-y-3">
            {questions.map((q) => (
              <div key={q.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
                <p className="text-sm text-[#23412D]">{q.pertanyaan}</p>
                {q.jawaban ? (
                  <p className="mt-2 rounded-md bg-[#F7F2EA] p-3 text-sm text-neutral-700">
                    <span className="font-medium text-[#8A6E4A]">Jawaban tim kami:</span> {q.jawaban}
                  </p>
                ) : (
                  <p className="mt-2 text-xs italic text-neutral-400">Menunggu jawaban dari tim kami...</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}