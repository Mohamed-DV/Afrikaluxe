import { motion, useScroll, useTransform } from "motion/react";
import { Apple, Play, Star } from "lucide-react";
import appMockup from "@/assets/app-mockup.jpg";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-install-redirect";

export function AppSection() {
  const { scrollYProgress } = useScroll();
  const mockupY = useTransform(scrollYProgress, [0.15, 0.8], [40, -40]);
  const textY = useTransform(scrollYProgress, [0.15, 0.8], [20, -20]);

  return (
    <section id="app" className="relative py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto max-w-md"
            style={{ y: mockupY }}
          >
            <div className="relative overflow-hidden rounded-[3rem] gold-border shadow-gold pulse-glow">
              <img
                src={appMockup}
                alt="Application AfrikaLuxe"
                width={1200}
                height={1400}
                loading="lazy"
                className="w-full"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 glass-gold rounded-2xl px-5 py-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">4.9 · 25K avis</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: textY }}
          >
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
              Application Mobile
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              L'Afrique du luxe<br />
              <span className="text-gold-gradient">dans votre poche</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Une interface fluide, des produits triés sur le volet, un panier ultra rapide
              et la livraison suivie en temps réel. Téléchargez l'app et entrez dans la
              nouvelle ère du commerce africain.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-foreground px-6 py-4 text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.78_0.16_82_/_0.45)]"
              >
                <Apple className="h-7 w-7" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase opacity-70">Télécharger sur</div>
                  <div className="font-display text-lg">App Store</div>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-gradient-gold px-6 py-4 text-primary-foreground shadow-gold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_oklch(0.78_0.16_82_/_0.7)]"
              >
                <Play className="h-7 w-7 fill-current" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase opacity-80">Disponible sur</div>
                  <div className="font-display text-lg">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
