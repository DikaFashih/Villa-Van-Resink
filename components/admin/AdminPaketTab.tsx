"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
  getAllPaket,
  addPaket,
  updatePaket,
  removePaket,
  addImageToPaket,
  removeImageFromPaket,
  subscribeToPaket,
  type Paket,
} from "@/lib/paket";

export default function AdminPaketTab() {

  const [paket, setPaket] = useState<Paket[]>(() => getAllPaket());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ kode: "", nama: "", deskripsi: "", cocokUntuk: "", harga: "" });
  const [imageInput, setImageInput] = useState<Record<string, string>>({});

    useEffect(() => {
  return subscribeToPaket(() => {
    setPaket(getAllPaket());
  });
}, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.nama.toLowerCase().trim().replace(/\s+/g, "-");
    addPaket({
      slug,
      kode: form.kode,
      nama: form.nama,
      deskripsi: form.deskripsi,
      cocokUntuk: form.cocokUntuk,
      harga: Number(form.harga) || 0,
      images: [],
    });
    setForm({ kode: "", nama: "", deskripsi: "", cocokUntuk: "", harga: "" });
    setShowForm(false);
  };

  const handleAddImage = (id: string) => {
    const url = imageInput[id]?.trim();
    if (!url) return;
    addImageToPaket(id, url);
    setImageInput((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div>

      <button
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2.5 text-sm text-white hover:bg-[#1a3022]"
      >
        <Plus size={16} /> Paket Baru
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-4 grid gap-3 rounded-lg border border-[#8A6E4A]/20 bg-white p-5 sm:grid-cols-2">
          <input required placeholder="Kode (mis. WST-05)" value={form.kode} onChange={(e) => setForm({ ...form, kode: e.target.value })} className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none" />
          <input required placeholder="Nama Paket" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none" />
          <input required type="number" placeholder="Harga (Rp)" value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none" />
          <input required placeholder="Cocok untuk" value={form.cocokUntuk} onChange={(e) => setForm({ ...form, cocokUntuk: e.target.value })} className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none" />
          <textarea required placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="sm:col-span-2 rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none" rows={2} />
          <button type="submit" className="sm:col-span-2 rounded-md bg-[#23412D] py-2 text-sm text-white hover:bg-[#1a3022]">Simpan Paket</button>
        </form>
      )}

      <div className="mt-6 space-y-4">

        {paket.map((p) => (
          <div key={p.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-5">

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#8A6E4A]">{p.kode}</p>
                <p className="font-heading text-xl text-[#23412D]">{p.nama}</p>
              </div>
              <button onClick={() => removePaket(p.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-neutral-500">
                Harga
                <input
                  type="number"
                  defaultValue={p.harga}
                  onBlur={(e) => updatePaket(p.id, { harga: Number(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="text-xs text-neutral-500">
                Deskripsi
                <input
                  defaultValue={p.deskripsi}
                  onBlur={(e) => updatePaket(p.id, { deskripsi: e.target.value })}
                  className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
                />
              </label>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[#8A6E4A]">Foto ({p.images.length})</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.images.map((img) => (
                  <span key={img} className="flex items-center gap-1 rounded-full bg-[#F7F2EA] px-3 py-1 text-xs text-neutral-600">
                    {img.split("/").pop()}
                    <button onClick={() => removeImageFromPaket(p.id, img)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  placeholder="/images/paket/nama-file.webp"
                  value={imageInput[p.id] || ""}
                  onChange={(e) => setImageInput((prev) => ({ ...prev, [p.id]: e.target.value }))}
                  className="flex-1 rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-xs outline-none"
                />
                <button onClick={() => handleAddImage(p.id)} className="rounded-md bg-[#8A6E4A] px-3 text-xs text-white">Tambah</button>
              </div>
              <p className="mt-1 text-[11px] text-neutral-400">Upload file fisiknya ke folder public/images/ dulu, baru masukkan path-nya di sini.</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}