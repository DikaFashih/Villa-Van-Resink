"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Layanan {
  id: number;
  nama: string;
  slug: string;
  kategori: "paket" | "wahana" | "edukasi";
  harga: number;
  deskripsi: string;
}

const kategoriBadge: Record<string, string> = {
  wahana: "bg-green-100 text-green-700",
  paket: "bg-amber-100 text-amber-700",
  edukasi: "bg-blue-100 text-blue-700",
};

export default function AdminPaketTab() {
  const [items, setItems] = useState<Layanan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama: "",
    slug: "",
    kategori: "wahana" as Layanan["kategori"],
    harga: "",
    deskripsi: "",
  });

  async function load() {
    const res = await fetch("/api/layanan");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setForm({ nama: "", slug: "", kategori: "wahana", harga: "", deskripsi: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function handleNamaChange(nama: string) {
    setForm((f) => ({
      ...f,
      nama,
      slug: editingId ? f.slug : nama.toLowerCase().trim().replace(/\s+/g, "-"),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      nama: form.nama,
      slug: form.slug,
      kategori: form.kategori,
      harga: Number(form.harga),
      deskripsi: form.deskripsi,
    };

    if (editingId) {
      await fetch(`/api/layanan/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/layanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    await load();
    resetForm();
  }

  function startEdit(item: Layanan) {
    setForm({
      nama: item.nama,
      slug: item.slug,
      kategori: item.kategori,
      harga: String(item.harga),
      deskripsi: item.deskripsi,
    });
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus wahana/paket ini?")) return;
    await fetch(`/api/layanan/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#23412D]">Daftar Wahana & Paket</h2>

        <button
          onClick={() => {
            resetForm();
            setShowForm((v) => !v);
          }}
          className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2 text-sm text-white hover:bg-[#1a3022]"
        >
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-3 rounded-xl border border-neutral-200 p-5 sm:grid-cols-2"
        >
          <input
            placeholder="Nama Wahana/Paket"
            required
            value={form.nama}
            onChange={(e) => handleNamaChange(e.target.value)}
            className="rounded-md border p-2 text-sm"
          />
          <input
            placeholder="Slug (mis. kolam-renang-air-hangat)"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <select
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value as Layanan["kategori"] })}
            className="rounded-md border p-2 text-sm"
          >
            <option value="wahana">Wahana</option>
            <option value="paket">Paket</option>
            <option value="edukasi">Edukasi</option>
          </select>
          <input
            type="number"
            placeholder="Harga (Rp)"
            required
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <textarea
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="rounded-md border p-2 text-sm sm:col-span-2"
          />

          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className="rounded-md bg-[#23412D] px-4 py-2 text-sm text-white">
              {editingId ? "Simpan Perubahan" : "Simpan"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-md border px-4 py-2 text-sm">
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-3 py-3">Kategori</th>
              <th className="px-3 py-3">Nama</th>
              <th className="px-3 py-3">Slug</th>
              <th className="px-3 py-3">Harga</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs capitalize ${kategoriBadge[item.kategori] ?? "bg-neutral-100 text-neutral-600"}`}>
                    {item.kategori}
                  </span>
                </td>
                <td className="px-3 py-4 font-medium text-[#23412D]">{item.nama}</td>
                <td className="px-3 py-4 text-neutral-500">{item.slug}</td>
                <td className="px-3 py-4 font-medium text-[#23412D]">
                  Rp {item.harga.toLocaleString("id-ID")}
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <p className="py-6 text-center text-neutral-500">Belum ada wahana/paket.</p>
        )}
      </div>
    </div>
  );
}