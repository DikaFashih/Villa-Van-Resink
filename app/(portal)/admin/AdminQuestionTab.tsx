"use client";

import { useEffect, useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import {
  getAllQuestions,
  answerQuestion,
  type Question,
} from "@/lib/question";

export default function AdminQuestionTab() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [jawabanInput, setJawabanInput] = useState<Record<string, string>>({});

  useEffect(() => {
  async function loadQuestions() {
    const data = await getAllQuestions();
    setQuestions(data);
  }

  loadQuestions();
}, []);

  const handleAnswer = async (id: string) => {
    const jawaban = jawabanInput[id]?.trim();
    if (!jawaban) return;
    await answerQuestion(id, jawaban);

    const data = await getAllQuestions();
setQuestions(data);

    setJawabanInput((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const belumDijawab = questions.filter((q) => !q.jawaban);
  const sudahDijawab = questions.filter((q) => q.jawaban);

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#8A6E4A]">
        Menunggu Jawaban ({belumDijawab.length})
      </p>

      <div className="mt-3 space-y-3">
        {belumDijawab.map((q) => (
          <div key={q.id} className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <div className="flex items-start gap-2">
              <MessageCircleQuestion size={16} className="mt-0.5 shrink-0 text-[#8A6E4A]" />
              <div className="min-w-0">
                <p className="text-sm text-[#23412D]">{q.pertanyaan}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {q.userNama} Â· {new Date(q.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={jawabanInput[q.id] || ""}
                onChange={(e) => setJawabanInput((prev) => ({ ...prev, [q.id]: e.target.value }))}
                placeholder="Tulis jawaban..."
                className="flex-1 rounded-md border border-[#8A6E4A]/25 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={() => handleAnswer(q.id)}
                className="rounded-md bg-[#23412D] px-4 text-sm text-white hover:bg-[#1a3022]"
              >
                Kirim
              </button>
            </div>
          </div>
        ))}
        {belumDijawab.length === 0 && (
          <p className="text-sm text-neutral-500">Tidak ada pertanyaan yang menunggu jawaban.</p>
        )}
      </div>

      {sudahDijawab.length > 0 && (
        <>
          <p className="mt-8 text-xs uppercase tracking-wide text-[#8A6E4A]">
            Sudah Dijawab ({sudahDijawab.length})
          </p>
          <div className="mt-3 space-y-3">
            {sudahDijawab.map((q) => (
              <div key={q.id} className="rounded-lg border border-[#8A6E4A]/20 bg-white p-4">
                <p className="text-sm text-[#23412D]">{q.pertanyaan}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {q.userNama} Â· {new Date(q.createdAt).toLocaleDateString("id-ID")}
                </p>
                <p className="mt-2 rounded-md bg-[#F7F2EA] p-3 text-sm text-neutral-700">
                  <span className="font-medium text-[#8A6E4A]">Jawaban Anda:</span> {q.jawaban}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}