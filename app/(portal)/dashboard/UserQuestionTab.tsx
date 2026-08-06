"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import {
  askQuestion,
  getQuestionsForUser,
  type Question,
} from "@/lib/question";

export default function UserQuestionTab({ userId, userNama }: { userId: string; userNama: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pertanyaan, setPertanyaan] = useState("");

  useEffect(() => {
  async function loadQuestions() {
    const data = await getQuestionsForUser(userId);
    setQuestions(data);
  }

  loadQuestions();
}, [userId]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pertanyaan.trim()) return;
    await askQuestion(
  userId,
  userNama,
  pertanyaan.trim()
);

const data = await getQuestionsForUser(userId);
setQuestions(data);

setPertanyaan("");
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          placeholder="Tulis pertanyaan Anda..."
          className="flex-1 rounded-lg border border-[#8A6E4A]/25 bg-white px-4 py-3 text-sm outline-none"
        />
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#23412D] px-5 text-sm text-white hover:bg-[#1a3022]">
          <Send size={16} /> Kirim
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
            <p className="text-sm text-[#23412D]">{q.pertanyaan}</p>
            {q.jawaban ? (
              <p className="mt-2 rounded-md bg-[#F7F2EA] p-3 text-sm text-neutral-700">
                <span className="font-medium text-[#8A6E4A]">Jawaban tim kami:</span> {q.jawaban}
              </p>
            ) : (
              <p className="mt-2 text-xs italic text-neutral-400">Menunggu jawaban dari tim kami...</p>
            )}
          </div>
        ))}
        {questions.length === 0 && <p className="text-sm text-neutral-500">Belum ada pertanyaan.</p>}
      </div>
    </div>
  );
}