// TARUH DI: app/layout.tsx (timpa file yang sekarang)
// Header & Footer situs DIHAPUS dari sini â€” dipindah ke app/(site)/layout.tsx
// supaya halaman login/register/admin/dashboard (di app/(portal)/...) tidak
// ikut memakai Header/Footer web publik.

import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, Jost } from "next/font/google";
import { MotionConfig } from "framer-motion";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Villa Van Resink | Kaliurang Park Botanical Garden",
  description:
    "Villa Van Resink â€” retreat butik bersejarah di tengah Kaliurang Park Botanical Garden, Yogyakarta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`
          ${cormorant.variable}
          ${libreBaskerville.variable}
          ${jost.variable}
          font-sans
          antialiased
        `}
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}