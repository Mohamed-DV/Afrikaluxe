import { motion } from "motion/react";
import { MessageCircle, Mail, Instagram, Twitter, Facebook, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Contact</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Parlons de votre <span className="text-gold-gradient">prochaine commande</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Une question, un partenariat, une opportunité ? Notre équipe vous répond en moins d'une heure.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass-dark relative overflow-hidden rounded-3xl p-8 shadow-elevated md:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-flag opacity-50" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Nom complet" placeholder="Aminata Diallo" />
              <Field label="Email" type="email" placeholder="aminata@email.com" />
            </div>
            <div className="mt-5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                rows={5}
                placeholder="Dites-nous tout..."
                className="mt-2 w-full resize-none rounded-2xl bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none ring-1 ring-border transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-gold transition-transform hover:scale-[1.02]"
            >
              {sent ? "Message envoyé ✓" : "Envoyer le message"}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value="+243 999 000 000"
              accent="bg-flag-green"
            />
            <ContactCard
              icon={Mail}
              title="Email"
              value="hello@afrikaluxe.com"
              accent="bg-flag-blue"
            />
            <div className="glass-dark rounded-3xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Suivez-nous</div>
              <div className="mt-4 flex gap-3">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-11 w-11 place-items-center rounded-full glass-gold transition-transform hover:scale-110"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none ring-1 ring-border transition focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  accent,
}: {
  icon: typeof MessageCircle;
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <a href="#" className="glass-dark group flex items-center gap-4 rounded-3xl p-5 transition-all hover:border-primary/40 hover:shadow-gold">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${accent} shadow-glow`}>
        <Icon className="h-6 w-6 text-background" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="font-display text-lg">{value}</div>
      </div>
    </a>
  );
}
