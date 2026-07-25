import type { Metadata } from "next";
import Villa from "@/components/sections/Villa";

export const metadata: Metadata = {
  title: "Villa Van Resink",
};

export default function VillaPage() {
  return (
    <main className="pt-32">
      <Villa />
    </main>
  );
}