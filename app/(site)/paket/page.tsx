import type { Metadata } from "next";
import Packages from "@/components/sections/Packages";

export const metadata: Metadata = {
  title: "Paket | Villa Van Resink",
};

export default function PaketPage() {
  return (
    <main className="pt-32">
      <Packages />
    </main>
  );
}