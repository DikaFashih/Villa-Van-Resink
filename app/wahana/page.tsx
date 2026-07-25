import type { Metadata } from "next";
import Wahana from "@/components/sections/Wahana";

export const metadata: Metadata = {
  title: "Wahana | Villa Van Resink",
};

export default function WahanaPage() {
  return (
    <main className="pt-32">
      <Wahana />
    </main>
  );
}