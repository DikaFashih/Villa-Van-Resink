import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Booking | Villa Van Resink",
};

export default function BookingPage() {
  return (
    <main className="pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#8A6E4A]"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>
      </div>
      <Booking />
    </main>
  );
}
