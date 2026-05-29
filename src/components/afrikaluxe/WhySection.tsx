import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toLocaleString("fr-FR") + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(value, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to, value]);

  useEffect(() => rounded.on("change", (v) => {
    if (ref.current) ref.current.textContent = v;
  }), [rounded]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 250000, suffix: "+", label: "Livraisons effectuées" },
  { value: 120000, suffix: "+", label: "Clients satisfaits" },
  { value: 9, suffix: "", label: "Pays disponibles" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

export function WhySection() {
  return (
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
              Pourquoi AfrikaLuxe
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              Le luxe<br />
              <span className="text-gold-gradient">accessible</span> à toute l'Afrique
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              AfrikaLuxe connecte les talents, les marques et les consommateurs du continent
              dans une marketplace moderne, fiable et inspirée par notre culture.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Produits tendance soigneusement sélectionnés",
                "Livraison express vérifiée par nos partenaires",
                "Expérience mobile futuriste, pensée pour 2026",
                "Service client premium 24/7",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-gold text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -6 }}
                className="glass-gold relative overflow-hidden rounded-3xl p-7 shadow-elevated"
                style={{
                  transform: i % 2 ? "translateY(24px)" : undefined,
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px shimmer" />
                <div className="font-display text-4xl text-gold-gradient sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
