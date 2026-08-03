"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getAllPaket, type Paket } from "@/lib/paket";
import {
  getAllPromo,
  addPromo,
  removePromo,
  updatePromo,
  subscribeToPromo,
  type Promo,
} from "@/lib/promo";

export default function AdminPromoTab() {
  const [promo, setPromo] = useState<Promo[]>([]);
  const [paket, setPaket] = useState<Paket[]>(() => getAllPaket());
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    paketSlug: "",
    judul: "",
    deskripsi: "",
    diskonPersen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  });

  const loadPromo = async () => {
    setPromo(await getAllPromo());
    setPaket(getAllPaket());
  };

  useEffect(() => {
    // eslint-disable-next-line
    loadPromo();
    return subscribeToPromo(loadPromo);
  }, []);
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      form.tanggalMulai &&
      form.tanggalSelesai &&
      form.tanggalSelesai < form.tanggalMulai
    ) {
      setError("Tanggal selesai tidak boleh sebelum tanggal mulai.");
      return;
    }

    await addPromo({
      paketSlug: form.paketSlug || paket[0]?.slug || "",
      judul: form.judul,
      deskripsi: form.deskripsi,
      diskonPersen: Number(form.diskonPersen) || 0,
      aktif: true,
      tanggalMulai: form.tanggalMulai,
      tanggalSelesai: form.tanggalSelesai,
    });

    setForm({
      paketSlug: "",
      judul: "",
      deskripsi: "",
      diskonPersen: "",
      tanggalMulai: "",
      tanggalSelesai: "",
    });
    setShowForm(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2.5 text-sm text-white hover:bg-[#1a3022]"
      >
        <Plus size={16} /> Promo Baru
      </button>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mt-4 grid gap-4 rounded-lg border border-[#8A6E4A]/20 bg-white p-5 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Paket
            </label>
            <select
              required
              value={form.paketSlug}
              onChange={(e) => setForm({ ...form, paketSlug: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
            >
              <option value="">Pilih Paket</option>
              {paket.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Judul Promo
            </label>
            <input
              required
              placeholder="Contoh: Promo Kemerdekaan"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Diskon (%)
            </label>
            <input
              required
              type="number"
              min={1}
              max={100}
              placeholder="Contoh: 20"
              value={form.diskonPersen}
              onChange={(e) =>
                setForm({ ...form, diskonPersen: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Tanggal Mulai
            </label>
            <input
              required
              type="date"
              value={form.tanggalMulai}
              onChange={(e) =>
                setForm({ ...form, tanggalMulai: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Tanggal Selesai
            </label>
            <input
              required
              type="date"
              min={form.tanggalMulai || undefined}
              value={form.tanggalSelesai}
              onChange={(e) =>
                setForm({ ...form, tanggalSelesai: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Deskripsi (opsional)
            </label>
            <textarea
              placeholder="Deskripsi (opsional)"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className="mt-1 w-full resize-none rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
              rows={2}
            />
          </div>

          {error && (
            <p className="sm:col-span-2 text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="sm:col-span-2 rounded-md bg-[#23412D] py-2 text-sm text-white hover:bg-[#1a3022]"
          >
            Simpan Promo
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {promo.map((p) => {
          const target = paket.find((k) => k.slug === p.paketSlug);
          return (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-[#8A6E4A]/20 bg-white p-4"
            >
              <div>
                <p className="font-medium text-[#23412D]">
                  {p.judul} — {p.diskonPersen}%
                </p>
                <p className="text-xs text-neutral-500">
                  {target?.nama} · Berlaku {p.tanggalMulai} s/d{" "}
                  {p.tanggalSelesai}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updatePromo(p.id, { aktif: !p.aktif })}
                  className={`rounded-full px-3 py-1 text-xs ${
                    p.aktif
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {p.aktif ? "Aktif" : "Nonaktif"}
                </button>
                <button
                  onClick={() => removePromo(p.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {promo.length === 0 && (
          <p className="text-sm text-neutral-500">Belum ada promo.</p>
        )}
      </div>
    </div>
  );
}
