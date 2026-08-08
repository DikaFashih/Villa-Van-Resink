"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  getAllUsers,
  createAdmin,
  removeUser,
  subscribeToAuth,
  type AuthUser,
} from "@/lib/auth";

const roleBadge: Record<string, string> = {
  admin: "bg-blue-100 text-blue-700",
  superadmin: "bg-purple-100 text-purple-700",
  user: "bg-neutral-200 text-neutral-700",
};

export default function AdminUsersTab() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function refresh() {
    const data = await getAllUsers();
    if (Array.isArray(data)) {
      setUsers(data);
    } else if (Array.isArray((data as any)?.users)) {
      setUsers((data as any).users);
    }
  }

  useEffect(() => {
    refresh();
    return subscribeToAuth(refresh);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const result = await createAdmin(form.nama, form.email, form.password);

    if (!result.success) {
      setError(result.error ?? "Gagal membuat admin");
      return;
    }

    setForm({ nama: "", email: "", password: "" });
    setShowForm(false);
    setError("");
    await refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus akun ini?")) return;
    const result = await removeUser(id);
    if (result?.error) {
      alert(result.error);
      return;
    }
    await refresh();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#23412D]">Kelola Akun Staff/Admin</h2>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2 text-sm text-white hover:bg-[#1a3022]"
        >
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 grid gap-3 rounded-xl border border-neutral-200 p-5 sm:grid-cols-3"
        >
          <input
            placeholder="Nama"
            required
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-md border p-2 text-sm"
          />

          {error && <p className="text-sm text-red-600 sm:col-span-3">{error}</p>}

          <button type="submit" className="rounded-md bg-[#23412D] py-2 text-sm text-white sm:col-span-3">
            Simpan
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-3 py-3">Nama</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="px-3 py-4 font-medium text-[#23412D]">{u.nama}</td>
                <td className="px-3 py-4 text-neutral-600">{u.email}</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase ${roleBadge[u.role] ?? roleBadge.user}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  {u.role !== "superadmin" && (
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus akun"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="py-6 text-center text-neutral-500">Belum ada akun staff/admin.</p>
        )}
      </div>
    </div>
  );
}