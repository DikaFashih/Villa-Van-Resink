import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, Jost } from "next/font/google";
import { MotionConfig } from "framer-motion";

import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";

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
    "Villa Van Resink — retreat butik bersejarah di tengah Kaliurang Park Botanical Garden, Yogyakarta.",
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

        <MotionConfig reducedMotion="user">
  <Header />
  {children}
  <Footer />
</MotionConfig>

      </body>
    </html>
  );
}