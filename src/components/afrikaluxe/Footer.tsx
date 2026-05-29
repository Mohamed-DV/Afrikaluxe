import brandA from "@/assets/brand-a.svg";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-[oklch(0.08_0.008_60)] py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-flag opacity-40" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.11_0.01_60)] shadow-gold ring-1 ring-primary/35">
            <img src={brandA} alt="AfrikaLuxe logo" className="h-7 w-7 object-contain" />
          </span>
          <div>
            <div className="font-display text-lg">
              Afrika<span className="text-gold-gradient">Luxe</span>
            </div>
            <div className="text-xs text-muted-foreground">Le luxe à prix abordable</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">Fonctionnalités</a>
          <a href="#why" className="transition-colors hover:text-foreground">À propos</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          <a href="#" className="transition-colors hover:text-foreground">Mentions légales</a>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2026 AfrikaLuxe. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
