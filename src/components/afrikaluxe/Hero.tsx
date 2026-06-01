import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Apple, Play } from "lucide-react";
import heroProducts from "@/assets/hero-products.jpg";
import africaMap from "@/assets/africa-map.png";

const countries = [
  { code: "cd", name: "RDC" },
  { code: "cg", name: "Congo" },
  { code: "cm", name: "Cameroun" },
  { code: "gn", name: "Guinee" },
  { code: "td", name: "Tchad" },
  { code: "ml", name: "Mali" },
  { code: "tg", name: "Togo" },
  { code: "bj", name: "Benin" },
  { code: "ga", name: "Gabon" },
  { code: "ci", name: "Cote d'Ivoire" },
];

export function Hero() {
  const { scrollYProgress } = useScroll();
  const mapY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroVisualY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="hero"
      className="relative grain min-h-[88vh] overflow-hidden pt-32 pb-10"
      style={{
        backgroundImage: `var(--gradient-hero)`,
      }}
    >
      {/* Africa map background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          y: mapY,
          backgroundImage: `url(${africaMap})`,
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          filter: "drop-shadow(0 0 60px rgba(246, 200, 122, 0.35))",
        }}
      />
      {/* Gold glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[oklch(0.62_0.22_25_/_0.15)] blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-medium tracking-wide"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            African Premium Marketplace · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Marketplace <br />
            <span className="text-gold-gradient">N°1 en Afrique</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Le luxe à prix abordable, livré à domicile en{" "}
            <span className="font-semibold text-foreground">60 minutes</span> ⏱️
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#app"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-4 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
            >
              Télécharger l'App
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-4 text-sm font-semibold transition-colors hover:bg-card"
            >
              Découvrir
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://apps.apple.com/ci/app/afrikaluxe/id6759881499"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl glass-dark px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.78_0.16_82_/_0.4)]"
            >
              <Apple className="h-5 w-5" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase text-muted-foreground">Télécharger sur</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.afrikaluxe.app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl glass-dark px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.78_0.16_82_/_0.4)]"
            >
              <Play className="h-5 w-5 fill-current" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase text-muted-foreground">Disponible sur</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10"
          >
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Disponible dans 10 pays
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <motion.span
                  key={country.code}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="grid h-10 w-10 place-items-center overflow-hidden rounded-full glass-dark"
                  title={country.name}
                  aria-label={country.name}
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.code}.png`}
                    alt={`Drapeau ${country.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ y: heroVisualY }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent mix-blend-overlay" />
            <img
              src={heroProducts}
              alt="Produits premium AfrikaLuxe"
              width={1600}
              height={1200}
              className="animate-float w-full"
            />
          </div>
          {/* floating stat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -left-4 bottom-10 glass-gold rounded-2xl px-5 py-3 shadow-gold"
          >
            <div className="font-display text-2xl text-gold-gradient">+250K</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Livraisons
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute -right-2 top-10 glass-dark rounded-2xl px-5 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-flag-green animate-pulse" />
              <span className="text-xs font-medium">Livraison 60 min</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
