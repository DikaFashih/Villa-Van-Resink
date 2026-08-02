export interface Paket {
  id: string;
  slug: string;
  kode: string;
  nama: string;
  deskripsi: string;
  cocokUntuk: string;
  harga: number;
  images: string[];
}

const STORAGE_KEY = "vvr_paket";
const EVENT_NAME = "vvr-paket-updated";

const SEED: Paket[] = [
  {
    id: "seed-1", slug: "wisata-harian", kode: "WST-01", nama: "Paket Wisata Harian",
    deskripsi: "Akses seluruh wahana, taman botani, dan area edukasi selama satu hari kunjungan.",
    cocokUntuk: "Keluarga, rombongan kecil", harga: 50000,
    images: ["/images/edukasi/eco print 1.webp", "/images/wahana/Flying Fox2.webp", "/images/wahana/panahan2.webp", "/images/wahana/panahan3.webp"],
  },
  {
    id: "seed-2", slug: "menginap", kode: "MNG-02", nama: "Paket Menginap",
    deskripsi: "Satu malam di kamar heritage Villa Van Resink, lengkap dengan sarapan dan akses wahana.",
    cocokUntuk: "Pasangan, staycation", harga: 850000,
    images: ["/images/gallery/kamar1.webp", "/images/gallery/kamar2.webp", "/images/gallery/dapur1.webp", "/images/gallery/villa 2.webp", "/images/gallery/villa 3.webp", "/images/gallery/halaman1.webp", "/images/gallery/halaman2.webp"],
  },
  {
    id: "seed-3", slug: "wedding-event", kode: "WED-03", nama: "Paket Wedding & Event",
    deskripsi: "Sewa venue, dekorasi taman, dan koordinasi acara untuk pernikahan atau gathering.",
    cocokUntuk: "Pernikahan, acara korporat", harga: 15000000,
    images: ["/images/gallery/weddinng1.jpg", "/images/gallery/event1.webp"],
  },
  {
    id: "seed-4", slug: "study-tour", kode: "EDU-04", nama: "Paket Study Tour",
    deskripsi: "Kunjungan edukatif terjadwal untuk rombongan pelajar, lengkap dengan pemandu.",
    cocokUntuk: "Sekolah, komunitas", harga: 35000,
    images: ["/images/wahana/camping ground.webp", "/images/wahana/Flying Fox.webp", "/images/wahana/panahan1.webp"],
  },
];

function readAll(): Paket[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw);
  } catch {
    return SEED;
  }
}

function writeAll(paket: Paket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paket));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToPaket(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function getAllPaket(): Paket[] {
  return readAll();
}

export function getPaketBySlug(slug: string): Paket | undefined {
  return readAll().find((p) => p.slug === slug);
}

export function addPaket(data: Omit<Paket, "id">): Paket {
  const newPaket: Paket = { ...data, id: crypto.randomUUID() };
  const all = readAll();
  all.push(newPaket);
  writeAll(all);
  return newPaket;
}

export function updatePaket(id: string, data: Partial<Omit<Paket, "id">>) {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...data };
  writeAll(all);
}

export function removePaket(id: string) {
  writeAll(readAll().filter((p) => p.id !== id));
}

export function addImageToPaket(id: string, imageUrl: string) {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  all[idx].images = [...all[idx].images, imageUrl];
  writeAll(all);
}

export function removeImageFromPaket(id: string, imageUrl: string) {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  all[idx].images = all[idx].images.filter((img) => img !== imageUrl);
  writeAll(all);
}