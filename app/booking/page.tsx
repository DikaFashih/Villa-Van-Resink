import type { Metadata } from "next";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Booking | Villa Van Resink",
};

export default function BookingPage() {
  return (
    <main className="pt-32">
      <Booking />
    </main>
  );
}