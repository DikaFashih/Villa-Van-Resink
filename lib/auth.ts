// ⚠️ MOCK/DUMMY — pakai localStorage, hanya untuk tampilan sementara.

export type Role = "superadmin" | "admin" | "user";

export interface AuthUser {
  id: string;
  nama: string;
  email: string;
  role: Role;
}

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = "vvr_users";
const SESSION_KEY = "vvr_session";
const EVENT_NAME = "vvr-auth-updated";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];

    if (!users.some((u) => u.role === "superadmin")) {
      users.push({
        id: "seed-superadmin",
        nama: "Super Admin",
        email: "superadmin@vanresink.com",
        password: "superadmin123",
        role: "superadmin",
      });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return users;
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event(EVENT_NAME));
}

function toPublicUser(u: StoredUser): AuthUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...publicUser } = u;
  return publicUser;
}

export function subscribeToAuth(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function register(nama: string, email: string, password: string): { ok: true } | { ok: false; error: string } {
  const users = readUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Email sudah terdaftar." };
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    nama,
    email,
    password,
    role: "user",
  };

  writeUsers([...users, newUser]);
  localStorage.setItem(SESSION_KEY, JSON.stringify(toPublicUser(newUser)));
  window.dispatchEvent(new Event(EVENT_NAME));

  return { ok: true };
}

export function login(email: string, password: string): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const users = readUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!found) {
    return { ok: false, error: "Email atau password salah." };
  }

  const publicUser = toPublicUser(found);
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  window.dispatchEvent(new Event(EVENT_NAME));

  return { ok: true, user: publicUser };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(EVENT_NAME));
}

// ---- khusus superadmin: kelola akun admin ----

export function getAllUsers(): AuthUser[] {
  return readUsers().map(toPublicUser);
}

export function createAdmin(nama: string, email: string, password: string): { ok: true } | { ok: false; error: string } {
  const users = readUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Email sudah terdaftar." };
  }

  const newAdmin: StoredUser = {
    id: crypto.randomUUID(),
    nama,
    email,
    password,
    role: "admin",
  };

  writeUsers([...users, newAdmin]);
  return { ok: true };
}

export function removeUser(id: string) {
  const users = readUsers().filter((u) => u.id !== id && u.role !== "superadmin");
  writeUsers(users);
}