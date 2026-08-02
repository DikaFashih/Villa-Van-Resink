"use client";

// ⚠️ MOCK/DUMMY — pakai localStorage, konsisten dengan pola lib/bookings.ts, lib/auth.ts, dll.

export interface Question {
  id: string;
  userId: string;
  userNama: string;
  pertanyaan: string;
  jawaban?: string;
  createdAt: number;
  answeredAt?: number;
}

const STORAGE_KEY = "vvr_questions";
const EVENT_NAME = "vvr-questions-updated";

function readAll(): Question[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(questions: Question[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToQuestions(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function askQuestion(userId: string, userNama: string, pertanyaan: string): Question {
  const newQuestion: Question = {
    id: crypto.randomUUID(),
    userId,
    userNama,
    pertanyaan,
    createdAt: Date.now(),
  };
  const all = readAll();
  all.push(newQuestion);
  writeAll(all);
  return newQuestion;
}

export function getQuestionsForUser(userId: string): Question[] {
  return readAll().filter((q) => q.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
}

export function getAllQuestions(): Question[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function answerQuestion(id: string, jawaban: string) {
  const all = readAll();
  const idx = all.findIndex((q) => q.id === id);
  if (idx === -1) return;
  all[idx].jawaban = jawaban;
  all[idx].answeredAt = Date.now();
  writeAll(all);
}