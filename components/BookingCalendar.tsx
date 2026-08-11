"use client";

import { useEffect, useMemo, useState } from "react";

interface BookedRange {
  check_in: string;
  check_out: string;
}

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateOnly(value: string) {
  const datePart = value.split("T")[0];
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function BookingCalendar() {
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    async function loadAvailability() {
      try {
        const res = await fetch("/api/booking/availability");
        const data = await res.json();
        if (data.ok) {
          setBookedRanges(data.bookedRanges ?? []);
        } else {
          setError("Gagal memuat data booking.");
        }
      } catch {
        setError("Gagal memuat data booking.");
      } finally {
        setLoading(false);
      }
    }
    loadAvailability();
  }, []);

  const bookedDateSet = useMemo(() => {
    const set = new Set<string>();
    for (const range of bookedRanges) {
      const start = parseDateOnly(range.check_in);
      const end = parseDateOnly(range.check_out);
      const cursor = new Date(start);
      while (cursor <= end) {
        set.add(toDateKey(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
    }
    return set;
  }, [bookedRanges]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [currentMonth]);

  const today = toDateKey(new Date());

  function goToPrevMonth() {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }

  function goToNextMonth() {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Memuat kalender...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
          type="button"
        >
          ‹
        </button>
        <span className="font-semibold text-gray-800">
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={goToNextMonth}
          className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
          type="button"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-xs text-gray-400">
        {DAY_NAMES.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, idx) => {
          if (!date) return <div key={idx} />;

          const key = toDateKey(date);
          const isBooked = bookedDateSet.has(key);
          const isToday = key === today;
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <div
              key={idx}
              className={[
                "flex h-9 items-center justify-center rounded-md text-sm",
                isPast
                  ? "text-gray-300"
                  : isBooked
                    ? "bg-red-100 text-red-600 font-medium"
                    : "bg-emerald-50 text-emerald-700",
                isToday ? "ring-2 ring-blue-400" : "",
              ].join(" ")}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-emerald-50 border border-emerald-200" />
          Tersedia
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-red-100 border border-red-200" />
          Sudah dibooking
        </div>
      </div>
    </div>
  );
}
