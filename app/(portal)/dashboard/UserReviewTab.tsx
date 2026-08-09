"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/ui/StarRating";

interface Booking {
  id: number;
  layanan_id: number;
  nama_layanan?: string;
  status: string;
}

interface Review {
  id: number;
  bookingId: number;
  userId: number;
  layananId: number;
  layananNama: string;
  rating: number;
  komentar: string;
  status: string;
  createdAt: string;
}

export default function UserReviewTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [komentars, setKomentars] = useState<Record<number, string>>({});
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const sessionRes = await fetch("/api/auth/session", {
          credentials: "include",
        });
        const sessionData = await sessionRes.json();

        if (!sessionData.authenticated) {
          setLoading(false);
          return;
        }
        setUserId(sessionData.user.id);

        const [bookingRes, reviewRes] = await Promise.all([
          fetch("/api/booking", { credentials: "include" }),
          fetch("/api/reviews"),
        ]);

        const bookingData = await bookingRes.json();
        const reviewData = await reviewRes.json();

        if (bookingData.ok) setBookings(bookingData.bookings);
        if (Array.isArray(reviewData)) setReviews(reviewData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(booking: Booking) {
    const rating = ratings[booking.id] ?? 0;
    const komentar = komentars[booking.id] ?? "";

    if (rating === 0 || !komentar.trim()) return;

    setSubmittingId(booking.id);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId: booking.id,
          layananId: booking.layanan_id,
          rating,
          komentar,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setReviews((prev) => [
          ...prev,
          {
            id: data.id,
            bookingId: booking.id,
            userId: userId!,
            layananId: booking.layanan_id,
            layananNama: booking.nama_layanan ?? "",
            rating,
            komentar,
            status: "approved",
            createdAt: new Date().toISOString(),
          },
        ]);
        setMessage("Terima kasih! Ulasan kamu berhasil dikirim.");
      } else {
        setMessage(data.error ?? "Gagal mengirim ulasan.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmittingId(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-[#23412D]">Review</h2>
        <p className="mt-2 text-neutral-500">Memuat data ulasan...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-[#23412D]">Review</h2>
        <p className="mt-2 text-neutral-500">
          Kamu belum punya booking untuk diulas.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-[#23412D]">Review</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Beri ulasan untuk booking yang pernah kamu ajukan.
      </p>

      {message && <p className="mt-3 text-sm text-green-700">{message}</p>}

      <div className="mt-4 space-y-4">
        {bookings.map((booking) => {
          const existingReview = reviews.find(
            (r) => r.bookingId === booking.id && r.userId === userId,
          );

          return (
            <div
              key={booking.id}
              className="rounded-lg border border-neutral-200 p-4"
            >
              <p className="font-medium text-[#23412D]">
                {booking.nama_layanan ?? "Layanan"}
              </p>

              {existingReview ? (
                <div className="mt-2">
                  <StarRating
                    value={existingReview.rating}
                    readOnly
                    size={16}
                  />
                  <p className="mt-1 text-sm text-neutral-600">
                    {existingReview.komentar}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Status: {existingReview.status}
                  </p>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <StarRating
                    value={ratings[booking.id] ?? 0}
                    onChange={(v) =>
                      setRatings((prev) => ({ ...prev, [booking.id]: v }))
                    }
                    size={20}
                  />
                  <textarea
                    value={komentars[booking.id] ?? ""}
                    onChange={(e) =>
                      setKomentars((prev) => ({
                        ...prev,
                        [booking.id]: e.target.value,
                      }))
                    }
                    placeholder="Ceritakan pengalamanmu..."
                    rows={2}
                    className="w-full resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit(booking)}
                    disabled={submittingId === booking.id}
                    className="rounded-md bg-[#23412D] px-4 py-2 text-xs text-white hover:bg-[#1a3022] disabled:opacity-50"
                  >
                    {submittingId === booking.id
                      ? "Mengirim..."
                      : "Kirim Ulasan"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
