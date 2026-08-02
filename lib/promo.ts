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

const STORAGE_KEY = "vvr_promo";
const EVENT_NAME = "vvr-promo-updated";

function readAll(): Promo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(promo: Promo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(promo));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToPromo(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function getAllPromo(): Promo[] {
  return readAll();
}

export function getActivePromoForPaket(paketSlug: string): Promo | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return readAll().find(
    (p) => p.paketSlug === paketSlug && p.aktif && p.tanggalMulai <= today && today <= p.tanggalSelesai
  );
}

export function addPromo(data: Omit<Promo, "id">): Promo {
  const newPromo: Promo = { ...data, id: crypto.randomUUID() };
  const all = readAll();
  all.push(newPromo);
  writeAll(all);
  return newPromo;
}

export function updatePromo(id: string, data: Partial<Omit<Promo, "id">>) {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...data };
  writeAll(all);
}

export function removePromo(id: string) {
  writeAll(readAll().filter((p) => p.id !== id));
}