import { motion } from "motion/react";
import brandA from "@/assets/brand-a.svg";

const links = [
  { label: "Accueil", href: "#hero" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "Pourquoi nous", href: "#why" },
  { label: "Application", href: "#app" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className="glass-dark mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3 shadow-elevated">
        <a href="#hero" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[oklch(0.11_0.01_60)] shadow-gold ring-1 ring-primary/35">
            <img src={brandA} alt="AfrikaLuxe logo" className="h-6 w-6 object-contain" />
          </span>
          <span className="font-display text-lg tracking-tight">
            Afrika<span className="text-gold-gradient">Luxe</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#app"
          className="hidden rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-105 md:inline-block"
        >
          Télécharger
        </a>
      </nav>
    </motion.header>
  );
}
