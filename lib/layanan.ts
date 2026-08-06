export interface Layanan {
  id: number;
  nama: string;
  slug: string;
  kategori: "paket" | "wahana" | "edukasi";
  harga: number;
  deskripsi: string;
}

export async function getAllLayanan() {
  const res = await fetch("/api/layanan");
  return (await res.json()) as Layanan[];
}