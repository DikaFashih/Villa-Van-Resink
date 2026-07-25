import type { Metadata } from "next";
import Edukasi from "@/components/sections/Edukasi";

export const metadata: Metadata = {
  title: "Edukasi | Villa Van Resink",
};

export default function EdukasiPage() {
  return (
    <main className="pt-32">
      <Edukasi />
    </main>
  );
}