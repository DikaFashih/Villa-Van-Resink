"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

interface Message {
  id: number;
  booking_id: number;
  sender_id: number;
  sender_nama: string;
  sender_role: "user" | "admin" | "superadmin";
  pesan: string;
  created_at: string;
}

export default function ChatPanel({
  bookingId,
  currentUserId,
  onClose,
}: {
  bookingId: number;
  currentUserId: number;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function loadMessages() {
    try {
      const res = await fetch(`/api/booking/${bookingId}/messages`);
      const data = await res.json();
      if (data.ok) setMessages(data.messages);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 4000);
    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setSending(true);
    try {
      const res = await fetch(`/api/booking/${bookingId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pesan: text.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessages(data.messages);
        setText("");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h3 className="font-semibold text-[#23412D]">Chat Admin</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {loading && (
            <p className="text-center text-sm text-neutral-400">Memuat chat...</p>
          )}

          {!loading && messages.length === 0 && (
            <p className="text-center text-sm text-neutral-400">
              Belum ada pesan. Mulai percakapan dengan admin.
            </p>
          )}

          {messages.map((m) => {
            const isMine = m.sender_id === currentUserId;
            return (
              <div
                key={m.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    isMine
                      ? "bg-[#23412D] text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {!isMine && (
                    <p className="mb-1 text-xs font-medium opacity-70">
                      {m.sender_nama}
                    </p>
                  )}
                  <p>{m.pesan}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-neutral-200 p-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis pesan..."
            className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center rounded-full bg-[#23412D] p-2.5 text-white hover:bg-[#1a3022] disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
