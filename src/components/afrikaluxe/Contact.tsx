import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, MapPin, Instagram, Facebook, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Telephone requis").max(30),
  message: z.string().trim().min(5, "Message trop court").max(2000),
});

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_EMAIL = "contact@afrikaluxe.com";
const WORDPRESS_LEAD_ENDPOINT = "https://afrikaluxe.com/wp-json/afrikaluxe/v1/lead";

function getWordPressLeadEndpoint() {
  if (typeof window === "undefined") return WORDPRESS_LEAD_ENDPOINT;
  const endpoint = new URLSearchParams(window.location.search).get("wp_api");
  if (endpoint?.trim()) return endpoint.trim();
  return WORDPRESS_LEAD_ENDPOINT;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (e[i.path[0] as string] = i.message));
      setErrors(e);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const wpEndpoint = getWordPressLeadEndpoint();

      const wpRes = await fetch(wpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!wpRes.ok) {
        throw new Error("Impossible d'enregistrer le lead sur WordPress");
      }
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur réseau");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

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
            onSubmit={handleSubmit}
            noValidate
            className="glass-dark relative overflow-hidden rounded-3xl p-8 shadow-elevated md:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-flag opacity-50" />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Field name="name" label="Nom complet" placeholder="Aminata Diallo" error={errors.name} />
              <Field name="email" label="Email" type="email" placeholder="aminata@email.com" error={errors.email} />
              <Field name="phone" label="Telephone" type="tel" placeholder="+243 850 761 771" error={errors.phone} />
            </div>
            <div className="mt-5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Dites-nous tout..."
                className={`mt-2 w-full resize-none rounded-2xl bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none ring-1 transition focus:ring-2 focus:ring-primary ${
                  errors.message ? "ring-destructive" : "ring-border"
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-gold transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_oklch(0.78_0.16_82_/_0.55)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "loading" ? (
                  <motion.span
                    key="l"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Envoi en cours <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="s"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Message envoyé <CheckCircle2 className="h-4 w-4" />
                  </motion.span>
                ) : status === "error" ? (
                  <motion.span
                    key="e"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Réessayer <AlertCircle className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="i"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Envoyer le message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Merci ! Votre message a bien été transmis à notre équipe.</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm"
                >
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>{errorMsg || "Une erreur est survenue. Réessayez."}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <ContactCard icon={MessageCircle} title="WhatsApp" value="+243 850 761 771" accent="bg-flag-green" />
            <InfoCard
              icon={MapPin}
              title="Adresses"
              value={["UPN, Kinshasa, RDC", "Limete, Kinshasa, RDC"]}
              accent="bg-flag-yellow"
            />
            <ContactCard icon={Mail} title="Email" value={CONTACT_EMAIL} accent="bg-flag-blue" />
            <div className="glass-dark rounded-3xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Suivez-nous</div>
              <div className="mt-4 flex gap-3">
                {[
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/afrikaluxeofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                    label: "Instagram",
                  },
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/share/18DGPt7neo/?mibextid=wwXIfr",
                    label: "Facebook",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full glass-gold transition-transform hover:scale-110"
                  >
                    <social.icon className="h-5 w-5 text-primary" />
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
  name,
  label,
  type = "text",
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-2xl bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none ring-1 transition focus:ring-2 focus:ring-primary ${
          error ? "ring-destructive" : "ring-border"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
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
    <a
      href={
        title === "Email"
          ? `mailto:${value}`
          : title === "WhatsApp"
            ? "https://wa.me/243850761771"
            : "#"
      }
      target={title === "WhatsApp" ? "_blank" : undefined}
      rel={title === "WhatsApp" ? "noopener noreferrer" : undefined}
      className="glass-dark group flex items-center gap-4 rounded-3xl p-5 transition-all hover:border-primary/40 hover:shadow-gold"
    >
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

function InfoCard({
  icon: Icon,
  title,
  value,
  accent,
}: {
  icon: typeof MessageCircle;
  title: string;
  value: string[];
  accent: string;
}) {
  return (
    <div className="glass-dark flex items-start gap-4 rounded-3xl p-5">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${accent} shadow-glow`}>
        <Icon className="h-6 w-6 text-background" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="mt-1 space-y-1 text-sm text-foreground/90">
          {value.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
