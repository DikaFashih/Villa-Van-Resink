import type { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Villa Van Resink",
};

export default function GalleryPage() {
  return (
    <main className="pt-32">
      <Gallery />
    </main>
  );
}