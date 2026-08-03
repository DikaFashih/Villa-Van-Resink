import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Villa from "@/components/sections/Villa";
import PromoPopup from "@/components/PromoPopup";

export default function HomePage() {
  return (
    <main>
      <PromoPopup />

      <Hero />

      <Intro />

      <Villa />
    </main>
  );
}
