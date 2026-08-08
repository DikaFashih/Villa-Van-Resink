export interface Review {
  id: number;
  bookingId: number | null;
  userId: number;
  nama: string;
  layananId: number;
  layananNama: string;
  layananSlug: string;
  rating: number;
  komentar: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export async function getAllReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews", { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return await res.json();
}

export async function getReviewsFor(
  layananIdentifier: number | string,
): Promise<Review[]> {
  const all = await getAllReviews();
  return all.filter((r) => {
    if (typeof layananIdentifier === "number") {
      return r.layananId === layananIdentifier && r.status === "approved";
    }
    return r.layananSlug === layananIdentifier && r.status === "approved";
  });
}

export async function addReview(data: {
  bookingId?: number | null;
  userId: number;
  layananSlug?: string;
  layananId?: number;
  rating: number;
  komentar: string;
}) {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      bookingId: data.bookingId ?? null,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Gagal mengirim ulasan");
  }

  return json;
}

export async function updateReviewStatus(
  id: number,
  status: "pending" | "approved" | "rejected",
) {
  await fetch(`/api/reviews/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });
}

export async function removeReview(id: number) {
  await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
}

export async function getAllRawReviews(): Promise<Review[]> {
  return await getAllReviews();
}

export interface ReviewSummary {
  layananId: number;
  layananNama: string;
  layananSlug: string;
  averageRating: number;
  count: number;
}

export async function getGroupedSummaries(): Promise<ReviewSummary[]> {
  const reviews = await getAllReviews();
  const approved = reviews.filter((r) => r.status === "approved");

  const map = new Map<
    number,
    {
      layananNama: string;
      layananSlug: string;
      total: number;
      count: number;
    }
  >();

  for (const review of approved) {
    const current = map.get(review.layananId) ?? {
      layananNama: review.layananNama,
      layananSlug: review.layananSlug,
      total: 0,
      count: 0,
    };

    current.total += review.rating;
    current.count++;

    map.set(review.layananId, current);
  }

  return Array.from(map.entries()).map(([layananId, value]) => ({
    layananId,
    layananNama: value.layananNama,
    layananSlug: value.layananSlug,
    averageRating: value.total / value.count,
    count: value.count,
  }));
}
