export interface Review {
  id: number;
  bookingId: number;
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

  const res = await fetch("/api/reviews");

  if (!res.ok) {
    return [];
  }

  return await res.json();

}

export async function getReviewsFor(
  layananId: number
): Promise<Review[]> {

  const all = await getAllReviews();

  return all.filter(
    (r) =>
      r.layananId === layananId &&
      r.status === "approved"
  );

}

export async function getAverageRating(
  layananId: number
): Promise<number> {

  const reviews = await getReviewsFor(
    layananId
  );

  if (reviews.length === 0) {
    return 0;
  }

  return (
    reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    ) / reviews.length
  );

}

export async function addReview(data: {
  bookingId: number;
  userId: number;
  layananId: number;
  rating: number;
  komentar: string;
}) {

  const res = await fetch(
    "/api/reviews",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();

}

export async function updateReviewStatus(
  id: number,
  status: "pending" | "approved" | "rejected"
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

export async function removeReview(
  id: number
) {

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

  const approved = reviews.filter(
    (r) => r.status === "approved"
  );

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

  return Array.from(map.entries()).map(
    ([layananId, value]) => ({
      layananId,
      layananNama: value.layananNama,
      layananSlug: value.layananSlug,
      averageRating:
        value.total / value.count,
      count: value.count,
    })
  );

}
