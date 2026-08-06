export type Role = "user" | "admin" | "superadmin";

export interface AuthUser {
  id: number;
  nama: string;
  email: string;
  role: Role;
}

const EVENT_NAME = "vvr-auth-updated";

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/session", {
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.authenticated) return null;

    return data.user;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.ok) {
    notifyAuthChanged();
  }

  return data;
}

export async function register(
  nama: string,
  email: string,
  password: string
) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nama,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.ok) {
    notifyAuthChanged();
  }

  return data;
}

export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  notifyAuthChanged();

  window.location.href = "/";
}

export function subscribeToAuth(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);

  return () =>
    window.removeEventListener(EVENT_NAME, callback);
}

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

export async function getAllUsers() {
  const res = await fetch("/api/admin/users", {
    credentials: "include",
  });

  return await res.json();
}

export async function createAdmin(
  nama: string,
  email: string,
  password: string
) {
  const res = await fetch("/api/admin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nama,
      email,
      password,
      role: "admin",
    }),
  });

  return await res.json();
}

export async function removeUser(id: number) {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return await res.json();
}
