import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/afrikaluxe/Navbar";
import { Hero } from "@/components/afrikaluxe/Hero";
import { Features } from "@/components/afrikaluxe/Features";
import { WhySection } from "@/components/afrikaluxe/WhySection";
import { AppSection } from "@/components/afrikaluxe/AppSection";
import { Contact } from "@/components/afrikaluxe/Contact";
import { Footer } from "@/components/afrikaluxe/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfrikaLuxe — Marketplace N°1 en Afrique" },
      {
        name: "description",
        content:
          "AfrikaLuxe est la marketplace premium d'Afrique. Le luxe à prix abordable, livré à domicile en 60 minutes.",
      },
      { property: "og:title", content: "AfrikaLuxe — Marketplace N°1 en Afrique" },
      {
        property: "og:description",
        content: "Le luxe accessible, livré chez vous en 60 minutes dans 10 pays d'Afrique.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
