"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";

export default function RegisterPage() {

  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const result = await register(
      nama,
      email,
      password
    );

    if (!result.ok) {
      setError(result.error ?? "Registrasi gagal");
      return;
    }

    router.push("/booking");
    router.refresh();

  }

  return (

    <div className="flex min-h-screen items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >

        <h1 className="mb-8 text-center text-3xl font-bold">
          Register
        </h1>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-5 w-full rounded-lg border p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="mb-5 rounded bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 text-white"
        >
          Daftar
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-3 w-full rounded-lg border py-3"
        >
          Sudah punya akun
        </button>

      </form>

    </div>

  );
}
