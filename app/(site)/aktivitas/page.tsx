import type { Metadata } from "next";
import Wahana from "@/components/sections/Wahana";
import Edukasi from "@/components/sections/Edukasi";

export const metadata: Metadata = {
  title: "Aktivitas | Villa Van Resink",
};

export default function AktivitasPage() {
  return (
    <main className="pt-32">
      <Wahana />
      <Edukasi />
    </main>
  );
}