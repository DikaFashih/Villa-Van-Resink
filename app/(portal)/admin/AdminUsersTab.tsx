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
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const data = await getAllUsers();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      }
    }

    loadUsers();

    return subscribeToAuth(loadUsers);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const result = await createAdmin(
      form.nama,
      form.email,
      form.password
    );

    if (!result.ok) {
      setError(result.error ?? "Gagal membuat admin");
      return;
    }

    setForm({
      nama: "",
      email: "",
      password: "",
    });

    setShowForm(false);
    setError("");

    const data = await getAllUsers();

    if (Array.isArray(data)) {
      setUsers(data);
    } else if (Array.isArray(data.users)) {
      setUsers(data.users);
    }
  }

  async function handleDelete(id: number) {
    await removeUser(id);

    const data = await getAllUsers();

    if (Array.isArray(data)) {
      setUsers(data);
    } else if (Array.isArray(data.users)) {
      setUsers(data.users);
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowForm(v => !v)}
        className="flex items-center gap-2 rounded-lg bg-[#23412D] px-4 py-2 text-white"
      >
        <Plus size={16} />
        Tambah Admin
      </button>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mt-5 grid gap-3 rounded-lg border p-5"
        >
          <input
            placeholder="Nama"
            value={form.nama}
            onChange={(e)=>setForm({...form,nama:e.target.value})}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            className="rounded bg-[#23412D] py-2 text-white"
          >
            Simpan
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {users.map((u)=>(
          <div
            key={u.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <p>{u.nama}</p>
              <p className="text-sm text-gray-500">
                {u.email} • {u.role}
              </p>
            </div>

            {u.role !== "superadmin" && (
              <button
                onClick={()=>handleDelete(u.id)}
              >
                <Trash2 size={18}/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
