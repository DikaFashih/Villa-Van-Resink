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

export default function AdminUsersTab() {
  const [users, setUsers] = useState<AuthUser[]>(() => getAllUsers());

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    return subscribeToAuth(() => {
      setUsers(getAllUsers());
    });
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const result = createAdmin(
      form.nama,
      form.email,
      form.password
    );

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setForm({
      nama: "",
      email: "",
      password: "",
    });

    setError("");
    setShowForm(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2.5 text-sm text-white hover:bg-[#1a3022]"
      >
        <Plus size={16} /> Tambah Admin
      </button>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mt-4 grid gap-3 rounded-lg border border-[#8A6E4A]/20 bg-white p-5 sm:grid-cols-3"
        >
          <input
            required
            placeholder="Nama"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama: e.target.value,
              })
            }
            className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
          />

          <input
            required
            type="password"
            minLength={6}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
          />

          {error && (
            <p className="sm:col-span-3 text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="sm:col-span-3 rounded-md bg-[#23412D] py-2 text-sm text-white hover:bg-[#1a3022]"
          >
            Buat Akun Admin
          </button>
        </form>
      )}

      <div className="mt-6 space-y-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between rounded-lg border border-[#8A6E4A]/20 bg-white p-4"
          >
            <div>
              <p className="font-medium text-[#23412D]">
                {u.nama}
              </p>

              <p className="text-xs text-neutral-500">
                {u.email} · {u.role}
              </p>
            </div>

            {u.role !== "superadmin" && (
              <button
                onClick={() => removeUser(u.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}