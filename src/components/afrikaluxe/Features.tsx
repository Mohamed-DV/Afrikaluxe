import { motion } from "motion/react";
import { Zap, Gem, ShieldCheck, Headphones, CreditCard, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Livraison ultra rapide",
    desc: "60 minutes chrono dans toutes les grandes villes africaines.",
  },
  {
    icon: Gem,
    title: "Produits premium",
    desc: "Sélection exclusive de marques de luxe authentiques.",
  },
  {
    icon: ShieldCheck,
    title: "Marketplace sécurisée",
    desc: "Vérification d'identité, escrow, garantie satisfait ou remboursé.",
  },
  {
    icon: Headphones,
    title: "Service client moderne",
    desc: "Support 24/7 par WhatsApp, chat et appel vidéo.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    desc: "Cash, Mobile Money, Carte bancaire.",
  },
  {
    icon: Smartphone,
    title: "Application intuitive",
    desc: "Expérience mobile fluide pensée pour la nouvelle génération.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-flag opacity-30" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Fonctionnalités</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Une expérience <span className="text-gold-gradient">conçue pour exceller</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Chaque détail pensé pour offrir le luxe accessible à toute l'Afrique.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass-dark p-8 transition-all hover:border-primary/40 hover:shadow-gold"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-primary-foreground shadow-gold">
                  <f.icon className="h-7 w-7" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-2xl">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
