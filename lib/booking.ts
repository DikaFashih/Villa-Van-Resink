"use client";

// ⚠️ MOCK/DUMMY — pakai localStorage, konsisten dengan pola lib/auth.ts, lib/paket.ts, dll.

export type BookingStatus = "pending" | "confirmed" | "ditolak";

export interface BookingEntry {
  id: string;
  userId: string;
  userNama: string;
  paket: string;
  checkIn: string;
  checkOut: string;
  jumlah: number;
  status: BookingStatus;
  createdAt: number;
}

const STORAGE_KEY = "vvr_bookings";
const EVENT_NAME = "vvr-bookings-updated";

function readAll(): BookingEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(bookings: BookingEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToBookings(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function addBooking(booking: Omit<BookingEntry, "id" | "createdAt" | "status">): BookingEntry {
  const newBooking: BookingEntry = {
    ...booking,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: Date.now(),
  };
  const all = readAll();
  all.push(newBooking);
  writeAll(all);
  return newBooking;
}

export function getBookingsForUser(userId: string): BookingEntry[] {
  return readAll()
    .filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getAllBookings(): BookingEntry[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const all = readAll();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return;
  all[idx].status = status;
  writeAll(all);
}