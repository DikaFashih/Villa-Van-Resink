"use client";

import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { getReviewsFor, addReview, type Review } from "@/lib/reviews";
import { getCurrentUser, type AuthUser } from "@/lib/auth";

interface Props {
  layananSlug: string;
  targetLabel: string;
  requireBooking?: boolean;
}

export default function ReviewBox({
  layananSlug,
  targetLabel,
  requireBooking = true,
}: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [eligibleBookingId, setEligibleBookingId] = useState<number | null>(
    null,
  );
  const [showPanel, setShowPanel] = useState(false);
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getReviewsFor(layananSlug);
      setReviews(data);
    }
    load();
  }, [layananSlug]);

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUser();
      setUser(current);
      if (!current) return;

      if (!requireBooking) {
        setEligibleBookingId(0);
        return;
      }

      try {
        const res = await fetch("/api/booking", { credentials: "include" });
        const data = await res.json();
        if (data.ok) {
          const match = data.bookings.find(
            (b: { id: number; layanan_slug?: string }) =>
              b.layanan_slug === layananSlug,
          );
          if (match) setEligibleBookingId(match.id);
        }
      } catch {
        // ignore
      }
    }
    loadUser();
  }, [layananSlug, requireBooking]);

  const average = reviews.length
    ? reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length
    : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if ((requireBooking && !eligibleBookingId) || rating === 0 || !user) return;

    setSubmitting(true);
    setMessage("");

    try {
      await addReview({
        bookingId: requireBooking ? eligibleBookingId : null,
        userId: user.id,
        layananSlug,
        rating,
        komentar,
      });

      const updatedReviews = await getReviewsFor(layananSlug);
      setReviews(updatedReviews);

      setRating(0);
      setKomentar("");
      setMessage("Terima kasih! Ulasan kamu berhasil dikirim.");
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : "Gagal mengirim ulasan, coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-5 border-t border-[#8A6E4A]/15 pt-5">
      <div className="flex items-center gap-2">
        <StarRating value={average} readOnly size={16} />
        <span className="text-xs text-neutral-500">
          {reviews.length > 0
            ? `${average.toFixed(1)} (${reviews.length} ulasan)`
            : "Belum ada ulasan"}
        </span>
      </div>

      <button
        onClick={() => setShowPanel((v) => !v)}
        className="mt-1 text-xs font-medium text-[#8A6E4A] underline underline-offset-2 hover:text-[#6f5638]"
      >
        {showPanel ? "Sembunyikan ulasan" : "Ulasan"}
      </button>

      {showPanel && (
        <div className="mt-4 space-y-6">
          <div className="rounded-lg border border-[#8A6E4A]/15 bg-white p-4">
            <h3 className="text-sm font-semibold text-[#23412D]">
              Beri Ulasan
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Ceritakan pengalaman Anda menggunakan layanan kami.
            </p>

            {!user && (
              <p className="mt-4 text-xs text-neutral-600">
                <a
                  href="/login"
                  className="font-medium text-[#8A6E4A] underline underline-offset-2 hover:text-[#6f5638]"
                >
                  Login
                </a>{" "}
                terlebih dahulu untuk memberi ulasan.
              </p>
            )}

            {user && requireBooking && eligibleBookingId === null && (
              <p className="mt-4 text-xs text-neutral-600">
                Kamu belum memiliki booking untuk {targetLabel}, jadi belum bisa
                memberi ulasan di sini.
              </p>
            )}

            {user && (!requireBooking || eligibleBookingId !== null) && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <p className="text-xs font-medium text-neutral-700">
                  Mengulas:{" "}
                  <span className="text-[#23412D]">{targetLabel}</span>
                </p>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-neutral-500">
                    Rating Bintang
                  </p>
                  <StarRating value={rating} onChange={setRating} size={22} />
                </div>

                <textarea
                  required
                  placeholder="Ketik ulasan Anda di sini..."
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
                />

                <button
                  type="submit"
                  disabled={submitting || rating === 0}
                  className="rounded-md bg-[#23412D] px-4 py-2 text-xs text-white hover:bg-[#1a3022] disabled:opacity-50"
                >
                  {submitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </form>
            )}

            {message && (
              <p className="mt-3 text-xs text-green-700">{message}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#23412D]">
              Ulasan Publik
            </h3>
            <div className="mt-2 space-y-3">
              {reviews.length === 0 && (
                <p className="text-xs text-neutral-500">
                  Belum ada ulasan untuk {targetLabel}.
                </p>
              )}
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-md border border-[#8A6E4A]/10 bg-white/60 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#23412D]">
                      {r.nama}
                    </span>
                    <StarRating value={Number(r.rating)} readOnly size={14} />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Mengulas: <span className="font-medium">{targetLabel}</span>
                  </p>
                  <p className="mt-1 text-xs italic text-neutral-600">
                    &quot;{r.komentar}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
