// TARUH DI: app/(site)/layout.tsx  (folder baru, nama pakai tanda kurung)
// Ini layout khusus halaman-halaman web publik. Header & Footer situs
// sekarang cuma render di sini, bukan lagi di root layout.

import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import PromoPopup from "@/components/PromoPopup";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <PromoPopup />
      {children}
      <Footer />
    </>
  );
}
