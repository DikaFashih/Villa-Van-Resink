"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Promo {
  id: number;
  paketSlug: string;
  judul: string;
  deskripsi: string;
  diskonPersen: number;
  aktif: number | boolean;
  tanggalMulai: string;
  tanggalSelesai: string;
}

export default function AdminPromoTab() {
  const [items, setItems] = useState<Promo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    paketSlug: "",
    judul: "",
    deskripsi: "",
    diskonPersen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  });

  async function load() {
    const res = await fetch("/api/promo");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setForm({ paketSlug: "", judul: "", deskripsi: "", diskonPersen: "", tanggalMulai: "", tanggalSelesai: "" });
    setEditingId(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      paketSlug: form.paketSlug,
      judul: form.judul,
      deskripsi: form.deskripsi,
      diskonPersen: Number(form.diskonPersen),
      aktif: true,
      tanggalMulai: form.tanggalMulai,
      tanggalSelesai: form.tanggalSelesai,
    };

    if (editingId) {
      await fetch(`/api/promo/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    await load();
    resetForm();
  }

  function startEdit(p: Promo) {
    setForm({
      paketSlug: p.paketSlug,
      judul: p.judul,
      deskripsi: p.deskripsi,
      diskonPersen: String(p.diskonPersen),
      tanggalMulai: p.tanggalMulai?.slice(0, 10) ?? "",
      tanggalSelesai: p.tanggalSelesai?.slice(0, 10) ?? "",
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus promo ini?")) return;
    await fetch(`/api/promo/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#23412D]">Kelola Promo</h2>

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
            placeholder="Slug Paket (mis. kolam-renang-air-hangat)"
            required
            value={form.paketSlug}
            onChange={(e) => setForm({ ...form, paketSlug: e.target.value })}
            className="rounded-md border p-2 text-sm sm:col-span-2"
          />
          <input
            placeholder="Judul Promo"
            required
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <input
            type="number"
            placeholder="Diskon (%)"
            required
            value={form.diskonPersen}
            onChange={(e) => setForm({ ...form, diskonPersen: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <input
            type="date"
            required
            value={form.tanggalMulai}
            onChange={(e) => setForm({ ...form, tanggalMulai: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <input
            type="date"
            required
            value={form.tanggalSelesai}
            onChange={(e) => setForm({ ...form, tanggalSelesai: e.target.value })}
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
              <th className="px-3 py-3">Judul</th>
              <th className="px-3 py-3">Deskripsi</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-3 py-4 font-medium text-[#23412D]">{p.judul}</td>
                <td className="px-3 py-4 text-neutral-600">{p.deskripsi}</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs ${p.aktif ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-600"}`}>
                    {p.aktif ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => startEdit(p)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <p className="py-6 text-center text-neutral-500">Belum ada promo.</p>
        )}
      </div>
    </div>
  );
}
