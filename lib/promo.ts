export interface Promo {
  id: string;
  paketSlug: string;
  judul: string;
  deskripsi: string;
  diskonPersen: number;
  aktif: boolean;
  tanggalMulai: string;
  tanggalSelesai: string;
}

const EVENT_NAME = "vvr-promo-updated";

export function subscribeToPromo(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

function notify() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

interface PromoRow {
  id: string;
  paketSlug: string;
  judul: string;
  deskripsi: string;
  diskonPersen: number | string;
  aktif: number | boolean;
  tanggalMulai: string;
  tanggalSelesai: string;
}

export async function getAllPromo(): Promise<Promo[]> {
  const res = await fetch("/api/promo");
  const data: PromoRow[] = await res.json();
  return data.map((p) => ({
    ...p,
    aktif: !!p.aktif,
    diskonPersen: Number(p.diskonPersen),
  }));
}

export async function getActivePromoForPaket(
  paketSlug: string,
): Promise<Promo | undefined> {
  const all = await getAllPromo();
  const today = new Date().toISOString().slice(0, 10);
  return all.find(
    (p) =>
      p.paketSlug === paketSlug &&
      p.aktif &&
      p.tanggalMulai <= today &&
      today <= p.tanggalSelesai,
  );
}

export async function addPromo(data: Omit<Promo, "id">): Promise<Promo> {
  const res = await fetch("/api/promo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const newPromo = await res.json();
  notify();
  return newPromo;
}

export async function updatePromo(
  id: string,
  data: Partial<Omit<Promo, "id">>,
): Promise<void> {
  await fetch(`/api/promo/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  notify();
}

export async function removePromo(id: string): Promise<void> {
  await fetch(`/api/promo/${id}`, { method: "DELETE" });
  notify();
}

export interface ActivePromo {
  id: string;
  judul: string;
  deskripsi: string;
  diskon: number;
  tanggalSelesai: string;
  paketSlug: string;
}

export async function getActivePromo() {
  try {
    const res = await fetch("/api/promo/active");

    if (!res.ok) return null;

    const text = await res.text();

    if (!text) return null;

    return JSON.parse(text) as ActivePromo | null;
  } catch {
    return null;
  }
}

