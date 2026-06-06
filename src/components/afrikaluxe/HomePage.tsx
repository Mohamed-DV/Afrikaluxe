import { Navbar } from "@/components/afrikaluxe/Navbar";
import { Hero } from "@/components/afrikaluxe/Hero";
import { Features } from "@/components/afrikaluxe/Features";
import { WhySection } from "@/components/afrikaluxe/WhySection";
import { AppSection } from "@/components/afrikaluxe/AppSection";
import { Contact } from "@/components/afrikaluxe/Contact";
import { Footer } from "@/components/afrikaluxe/Footer";

export function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <WhySection />
      <AppSection />
      <Contact />
      <Footer />
    </main>
  );
}
