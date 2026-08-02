"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { login } from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(email.trim(), password);

    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (redirectTo) {
      router.push(redirectTo);
      return;
    }

    if (result.user.role === "superadmin" || result.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="flex min-h-screen items-center bg-[#FBF8F2] py-20">
      <Container>
        <div className="mx-auto max-w-md rounded-[16px] border border-[#8A6E4A]/25 bg-white p-8 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8A6E4A]">Villa Van Resink</p>
          <h1 className="mt-2 font-heading text-3xl text-[#23412D]">Masuk ke Akun</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Masuk untuk melakukan booking dan memberi ulasan.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-xs text-neutral-500">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-md border border-[#8A6E4A]/25 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8A6E4A]/60"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-neutral-500">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-[#8A6E4A]/25 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8A6E4A]/60"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#23412D] py-2.5 text-sm text-white transition hover:bg-[#1a3022] disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Belum punya akun?{" "}
            <Link
              href={redirectTo ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"}
              className="text-[#8A6E4A] underline underline-offset-2 hover:text-[#6b552f]"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}