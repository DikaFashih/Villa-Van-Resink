import type { Metadata } from "next";
import Fasilitas from "@/components/sections/Fasilitas";

export const metadata: Metadata = {
  title: "Fasilitas | Villa Van Resink",
};

export default function FasilitasPage() {
  return (
    <main className="pt-32">
      <Fasilitas />
    </main>
  );
}