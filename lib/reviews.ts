export type TargetType = "paket" | "wahana" | "edukasi";

export interface Review {
  id: string;
  targetType: TargetType;
  targetSlug: string;
  targetLabel: string;
  nama: string;
  rating: number;
  komentar: string;
  createdAt: number;
}

const STORAGE_KEY = "vvr_reviews";
const EVENT_NAME = "vvr-reviews-updated";

function readAll(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToReviews(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function getReviewsFor(targetType: TargetType, targetSlug: string): Review[] {
  return readAll()
    .filter((r) => r.targetType === targetType && r.targetSlug === targetSlug)
    .sort((a, b) => b.rating - a.rating || b.createdAt - a.createdAt);
}

export function getAllReviewsFor(targetType: TargetType): Review[] {
  return readAll()
    .filter((r) => r.targetType === targetType)
    .sort((a, b) => b.rating - a.rating || b.createdAt - a.createdAt);
}

export function addReview(review: Omit<Review, "id" | "createdAt">): Review {
  const newReview: Review = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const all = readAll();
  all.push(newReview);
  writeAll(all);
  return newReview;
}

export function getAverageRating(targetType: TargetType, targetSlug: string): number {
  const reviews = getReviewsFor(targetType, targetSlug);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export interface TargetSummary {
  targetSlug: string;
  targetLabel: string;
  averageRating: number;
  count: number;
  latestCreatedAt: number;
}

export function getGroupedSummaries(targetType: TargetType): TargetSummary[] {
  const all = readAll().filter((r) => r.targetType === targetType);
  const map = new Map<string, { label: string; total: number; count: number; latest: number }>();

  for (const r of all) {
    const cur = map.get(r.targetSlug) ?? { label: r.targetLabel, total: 0, count: 0, latest: 0 };
    cur.total += r.rating;
    cur.count += 1;
    cur.latest = Math.max(cur.latest, r.createdAt);
    cur.label = r.targetLabel;
    map.set(r.targetSlug, cur);
  }

  return Array.from(map.entries())
    .map(([slug, v]) => ({
      targetSlug: slug,
      targetLabel: v.label,
      averageRating: v.total / v.count,
      count: v.count,
      latestCreatedAt: v.latest,
    }))
    .sort((a, b) => b.averageRating - a.averageRating || b.count - a.count);
}