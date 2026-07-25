import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "FAQ | Villa Van Resink",
};

export default function FAQPage() {
  return (
    <main className="pt-32">
      <FAQ />
    </main>
  );
}