import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Feather,
  Flower2,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Users,
  Waves,
  Wind,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero.webp";
import studio1 from "@/assets/studio-1.webp";
import studio2 from "@/assets/studio-2.webp";
import gal1 from "@/assets/gallery-1.webp";
import gal2 from "@/assets/gallery-2.webp";
import gal3 from "@/assets/gallery-3.webp";
import gal4 from "@/assets/gallery-4.webp";
import gal5 from "@/assets/gallery-5.webp";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const WHATSAPP_URL =
  "https://wa.me/541120499447?text=" +
  encodeURIComponent("Hola, quisiera información sobre las clases de Pilates.");

const NAV = [
  { label: "Estudio", href: "#estudio" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#ubicacion" },
];

/* -------------------------------------------------------------------------- */
/*  Motion primitives                                                         */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
      <span className="inline-block h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                   */
/* -------------------------------------------------------------------------- */

function PrimaryButton({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--sage-deep)_55%,transparent)] transition-transform duration-500 hover:scale-[1.02] " +
        className
      }
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="absolute inset-0 -z-0 translate-y-full bg-black/10 transition-transform duration-500 group-hover:translate-y-0" />
    </a>
  );
}

function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-transparent px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]"
    >
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

function Navbar({ dark }: { dark: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
        (scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent")
      }
    >
      <div className="container-ayra flex h-[72px] items-center justify-between">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
          <span
            className={
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors " +
              (scrolled ? "border-foreground/20" : "border-white/40")
            }
          >
            <Flower2
              className={"h-4 w-4 " + (scrolled ? "text-foreground" : "text-white")}
              strokeWidth={1.5}
            />
          </span>
          <span
            className={
              "font-display text-lg tracking-tight transition-colors " +
              (scrolled || !dark ? "text-foreground" : "text-white")
            }
          >
            Ayra <span className="opacity-60">Pilates</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "group relative text-sm transition-colors " +
                (scrolled || !dark
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-white/80 hover:text-white")
              }
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--sage-deep)_60%,transparent)] transition-transform hover:scale-[1.03]"
          >
            Reservar clase
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className={
            "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden " +
            (scrolled || !dark ? "border-foreground/20 text-foreground" : "border-white/40 text-white")
          }
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <div className="container-ayra flex flex-col gap-1 py-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-foreground/80 hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Reservar clase
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.025]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.35, 0.5]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={reduceMotion ? undefined : { y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Interior de Ayra Pilates Studio con reformer y luz natural"
          width={1920}
          height={1280}
          className="h-full w-full object-cover object-[35%_center] md:object-[8%_center] min-[1440px]:!object-left"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        style={reduceMotion ? { opacity: 0.35 } : { opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

      <div className="relative z-10 flex h-full items-end pb-8 sm:pb-12 md:items-center md:pb-0">
        <div className="container-ayra">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/85">
              <span className="inline-block h-px w-8 bg-white/70" />
              Estudio boutique · Palermo, Buenos Aires
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl font-display text-[36px] leading-[1.05] tracking-tight text-white text-balance sm:mt-5 sm:max-w-[420px] sm:text-5xl md:text-[56px] lg:max-w-[440px] lg:text-[64px] xl:text-[68px]"
          >
            Descubrí una nueva forma de{" "}
            <span className="italic text-white/90">conectar con tu cuerpo.</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg"
          >
            Pilates contemporáneo en grupos reducidos con atención personalizada.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center"
          >
            <PrimaryButton href={WHATSAPP_URL} external className="w-full sm:w-auto">
              Reservar una clase
            </PrimaryButton>
            <a
              href="#estudio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:w-auto"
            >
              Conocer el estudio
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee / value strip                                                     */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [
    "Grupos de máximo 5 personas",
    "Instructoras certificadas",
    "Reformer profesional",
    "Clases 100% personalizadas",
    "Ambiente cálido y silencioso",
  ];
  return (
    <section className="border-y border-border/60 bg-sand-soft">
      <div className="container-ayra py-5">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/70 xl:flex-nowrap xl:justify-between">
          {items.map((it) => (
            <li key={it} className="flex max-w-full items-center gap-3 whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
              <span className="tracking-wide">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Beneficios                                                                */
/* -------------------------------------------------------------------------- */

const benefits = [
  { icon: Feather, title: "Mejor postura", desc: "Alineación consciente que te acompaña fuera del estudio." },
  { icon: Sparkles, title: "Más fuerza", desc: "Trabajo profundo del core y de la musculatura estabilizadora." },
  { icon: Wind, title: "Más flexibilidad", desc: "Movilidad articular y elongación en cada práctica." },
  { icon: Waves, title: "Menos estrés", desc: "Respiración guiada y ritmo pausado para bajar revoluciones." },
  { icon: Heart, title: "Clases personalizadas", desc: "Cada rutina se adapta a tu cuerpo y a tu momento." },
  { icon: Users, title: "Grupos reducidos", desc: "Hasta 5 alumnas por clase para una atención real." },
];

function Benefits() {
  return (
    <section id="beneficios" className="relative bg-background py-24 md:py-32">
      <div className="container-ayra">
        <SectionTitle
          eyebrow="Beneficios"
          title={
            <>
              Un método pensado para
              <br className="hidden md:block" /> <em className="italic font-light">tu bienestar diario.</em>
            </>
          }
          intro="Ayra nace para que el Pilates sea parte de tu rutina: un espacio íntimo, con instructoras que te acompañan movimiento a movimiento."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.05}
              className="group relative flex flex-col gap-5 bg-card p-8 transition-colors hover:bg-sand-soft md:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-foreground transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                <b.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
              <span className="absolute right-8 top-8 text-[11px] font-medium tracking-widest text-muted-foreground/50">
                0{i + 1}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sobre Ayra                                                                */
/* -------------------------------------------------------------------------- */

function About() {
  return (
    <section id="estudio" className="relative overflow-hidden bg-sand-soft py-24 md:py-32">
      <div className="container-ayra grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>Sobre Ayra</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Un refugio para volver a habitar el cuerpo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Ayra es un estudio boutique donde el Pilates deja de ser rutina para convertirse en
                una experiencia. Diseñamos cada clase con la intención de escucharte, guiarte y
                acompañarte, sin apuros.
              </p>
              <p>
                Trabajamos en grupos íntimos, con reformer profesional y un equipo de instructoras
                que combina años de formación con una mirada cálida y humana.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryButton href={WHATSAPP_URL} external>Agendar mi primera clase</PrimaryButton>
              <GhostButton href="#servicios">Ver servicios</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {[
                ["+8", "años de experiencia"],
                ["5:1", "ratio máximo"],
                ["100%", "atención personal"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-foreground md:text-4xl">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-6 gap-4 md:gap-5">
            <Reveal className="col-span-4">
              <motion.img
                src={studio1}
                alt="Interior del estudio Ayra Pilates con reformers"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl object-cover"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6 }}
              />
            </Reveal>
            <Reveal delay={0.1} className="col-span-2 mt-16">
              <motion.img
                src={studio2}
                alt="Instructora asistiendo en una clase de Pilates"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-2xl object-cover"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6 }}
              />
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="absolute -bottom-6 left-4 hidden max-w-xs rounded-2xl bg-background/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] backdrop-blur md:block">
              <p className="font-display text-lg italic leading-snug text-foreground">
                “Buscamos que cada alumna se vaya sintiéndose mejor de como llegó.”
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                — Equipo Ayra
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why us                                                                    */
/* -------------------------------------------------------------------------- */

const reasons = [
  { icon: Heart, label: "Atención personalizada" },
  { icon: Award, label: "Profesionales capacitados" },
  { icon: Users, label: "Clases reducidas" },
  { icon: Flower2, label: "Ambiente cálido" },
  { icon: Sparkles, label: "Equipamiento profesional" },
  { icon: MapPin, label: "Ubicación privilegiada" },
];

function WhyUs() {
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="container-ayra">
        <SectionTitle
          center
          eyebrow="¿Por qué elegirnos?"
          title={
            <>
              Todo lo que hace de Ayra{" "}
              <em className="italic font-light">un lugar diferente.</em>
            </>
          }
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4 }}
                className="group flex items-center gap-5 rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sand transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <r.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground">{r.label}</p>
                </div>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">✓</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

const services = [
  {
    n: "01",
    title: "Pilates Reformer",
    desc: "El corazón de Ayra. Trabajo integral en camillas reformer con resistencia progresiva para tonificar y elongar en armonía.",
    img: gal4,
  },
  {
    n: "02",
    title: "Pilates para principiantes",
    desc: "Un primer encuentro amable con el método. Fundamentos, respiración y postura para construir una base sólida.",
    img: gal1,
  },
  {
    n: "03",
    title: "Pilates avanzado",
    desc: "Secuencias exigentes con foco en control, fuerza y precisión para alumnas con recorrido en el método.",
    img: gal3,
  },
  {
    n: "04",
    title: "Entrenamiento personalizado",
    desc: "Sesiones 1 a 1 diseñadas para tus objetivos: rehabilitación, performance o bienestar profundo.",
    img: studio2,
  },
];

function Services() {
  return (
    <section id="servicios" className="relative bg-sand-soft py-24 md:py-32">
      <div className="container-ayra">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Servicios"
            title={
              <>
                Cuatro maneras de <em className="italic font-light">practicar Ayra.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <GhostButton href={WHATSAPP_URL}>Consultar disponibilidad</GhostButton>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-widest text-foreground backdrop-blur">
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-8">
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-auto pt-4">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Reservar
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery — masonry                                                         */
/* -------------------------------------------------------------------------- */

const gallery = [
  { src: gal1, alt: "Alumna estirando en clase de Pilates", tall: true },
  { src: gal2, alt: "Detalle de reformer con luz cálida" },
  { src: gal3, alt: "Grupo reducido practicando Pilates" },
  { src: studio1, alt: "Sala principal del estudio", tall: true },
  { src: gal4, alt: "Ejercicio avanzado en reformer" },
  { src: gal5, alt: "Detalle de toalla y planta en el estudio" },
];

function Gallery() {
  return (
    <section id="galeria" className="bg-background py-24 md:py-32">
      <div className="container-ayra">
        <SectionTitle
          eyebrow="Galería"
          title={
            <>
              Un vistazo al <em className="italic font-light">estudio.</em>
            </>
          }
          intro="Espacios luminosos, materiales nobles y equipamiento profesional pensados para acompañarte."
        />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
          {gallery.map((img, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className="mb-4 break-inside-avoid md:mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={
                    "w-full object-cover transition-transform duration-700 hover:scale-[1.02] " +
                    (img.tall ? "aspect-[3/4]" : "aspect-[4/3]")
                  }
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

const testimonials = [
  {
    name: "Martina R.",
    role: "Alumna hace 2 años",
    text: "Empecé Pilates para mejorar mi postura y encontré mucho más: un espacio donde me cuidan y me escuchan.",
  },
  {
    name: "Julieta S.",
    role: "Runner amateur",
    text: "Las clases reducidas hacen la diferencia. Cada corrección es específica para mí. Nunca practiqué algo tan preciso.",
  },
  {
    name: "Carolina P.",
    role: "Alumna nueva",
    text: "El ambiente es cálido y elegante a la vez. Salgo con el cuerpo liviano y la cabeza en orden.",
  },
  {
    name: "Florencia M.",
    role: "Post rehabilitación",
    text: "Me acompañaron con paciencia y profesionalismo. Recuperé fuerza y volví a confiar en mi cuerpo.",
  },
  {
    name: "Agustina L.",
    role: "Alumna hace 1 año",
    text: "Es mi momento sagrado de la semana. Las instructoras son excelentes y el estudio precioso.",
  },
];

function Testimonials() {
  return (
    <section id="testimonios" className="relative overflow-hidden bg-sand-soft py-24 md:py-32">
      <div className="container-ayra">
        <SectionTitle
          eyebrow="Testimonios"
          title={
            <>
              Historias que <em className="italic font-light">se sienten.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "lg:row-span-2" : ""}
            >
              <motion.figure
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5 }}
                className={
                  "flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card p-8 md:p-10 " +
                  (i === 0 ? "lg:min-h-[420px]" : "")
                }
              >
                <div>
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className={"mt-6 font-display leading-snug text-foreground text-balance " + (i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")}>
                    “{t.text}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand font-display text-sm text-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Schedule + Location                                                       */
/* -------------------------------------------------------------------------- */

const schedule = [
  { day: "Lunes", hours: ["08:00 – 12:00", "17:00 – 21:00"] },
  { day: "Martes", hours: ["16:00 – 21:00"] },
  { day: "Miércoles", hours: ["08:00 – 12:00", "17:00 – 21:00"] },
  { day: "Jueves", hours: ["16:00 – 21:00"] },
  { day: "Viernes", hours: ["08:00 – 12:00", "17:00 – 21:00"] },
  { day: "Sábado", hours: ["10:00 – 13:00"] },
  { day: "Domingo", hours: ["Cerrado"], closed: true },
];

function Schedule() {
  return (
    <section id="horarios" className="bg-background py-24 md:py-32">
      <div className="container-ayra grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>Horarios</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
              Elegí tu momento de la <em className="italic font-light">semana.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Reservamos con anticipación para asegurar tu lugar en el grupo. Podés escribirnos por
              WhatsApp para armar tu rutina semanal.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href={WHATSAPP_URL} external>Reservar por WhatsApp</PrimaryButton>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
              {schedule.map((row, i) => (
                <div
                  key={row.day}
                  className={
                    "group flex items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-sand-soft md:px-8 md:py-6 " +
                    (i !== schedule.length - 1 ? "border-b border-border/60" : "")
                  }
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 font-display text-sm text-muted-foreground">0{i + 1}</span>
                    <span className="font-display text-lg text-foreground md:text-xl">{row.day}</span>
                  </div>
                  <div
                    className={
                      "flex flex-col items-end gap-1 text-sm md:text-base " +
                      (row.closed ? "text-muted-foreground italic" : "text-foreground")
                    }
                  >
                    {row.hours.map((h) => (
                      <span key={h} className="tabular-nums">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="ubicacion" className="relative bg-sand-soft py-24 md:py-32">
      <div className="container-ayra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Dónde estamos</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
                En el corazón de <em className="italic font-light">Palermo.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <address className="mt-8 space-y-1 not-italic text-base leading-relaxed text-foreground md:text-lg">
                <p className="font-medium">Av. Raúl Scalabrini Ortiz 1650</p>
                <p className="text-muted-foreground">Palermo</p>
                <p className="text-muted-foreground">Ciudad Autónoma de Buenos Aires</p>
              </address>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-3">
                <a
                  href="https://maps.app.goo.gl/d8KPJnvMxrKfCX2g7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                    <MapPin className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="flex-1 text-sm text-foreground">Ver en Google Maps</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="flex-1 text-sm text-foreground">+54 11 2049-9447</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
                <iframe
                  title="Ayra Pilates Studio en Google Maps"
                  src="https://www.google.com/maps?q=Av.%20Ra%C3%BAl%20Scalabrini%20Ortiz%201650%2C%20Palermo%2C%20Buenos%20Aires&output=embed"
                  width="100%"
                  height="520"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[420px] w-full grayscale-[0.35] contrast-95 md:h-[560px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA banner + Footer                                                       */
/* -------------------------------------------------------------------------- */

function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-ayra">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--sage) 55%, transparent) 0%, transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--beige) 40%, transparent) 0%, transparent 60%)",
                backgroundSize: "180% 180%",
              }}
            />
            <div className="relative">
              <Eyebrow>
                <span className="text-background/70">Primer clase</span>
              </Eyebrow>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-background text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                Reservá tu <em className="italic font-light">clase de prueba</em> y descubrí Ayra.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-background/70 md:text-lg">
                Coordinamos el mejor horario para vos y te acompañamos desde el primer movimiento.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Reservar por WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#horarios"
                  className="inline-flex items-center gap-2 rounded-full border border-background/30 px-8 py-4 text-sm font-medium text-background hover:bg-background/10"
                >
                  Ver horarios
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-ayra py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20">
                <Flower2 className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </span>
              <span className="font-display text-2xl tracking-tight text-foreground">
                Ayra <span className="opacity-60">Pilates</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Estudio boutique de Pilates contemporáneo en Palermo. Grupos reducidos, atención
              personalizada y una experiencia diseñada para vos.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Navegación</p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-foreground/80 transition-colors hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Contacto</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li>Av. Raúl Scalabrini Ortiz 1650, Palermo</li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  +54 11 2049-9447
                </a>
              </li>
              <li>Lun a Sáb · según agenda</li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="#horarios"
                aria-label="Agendar clase"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Ayra Pilates Studio. Todos los derechos reservados.</p>
          <p>Diseñado con calma en Buenos Aires.</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating: WhatsApp + Back to top + Dark mode                              */
/* -------------------------------------------------------------------------- */

function FloatingActions({
  dark,
  onToggleDark,
}: {
  dark: boolean;
  onToggleDark: () => void;
}) {
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <button
        onClick={onToggleDark}
        aria-label={dark ? "Modo claro" : "Modo oscuro"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        {dark ? <Sparkles className="h-4 w-4" /> : <Flower2 className="h-4 w-4" />}
      </button>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
        aria-label="Volver arriba"
        initial={false}
        animate={{
          opacity: showTop ? 1 : 0,
          y: reduceMotion || showTop ? 0 : 10,
          pointerEvents: showTop ? "auto" : "none",
        }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-lg backdrop-blur"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0 : 0.45 }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary px-5 py-4 text-primary-foreground shadow-[0_15px_45px_-15px_color-mix(in_oklab,var(--sage-deep)_70%,transparent)]"
      >
        <MessageCircle className="relative h-5 w-5" strokeWidth={1.7} />
        <span className="relative hidden text-sm font-medium sm:inline">Escribinos</span>
      </motion.a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD                                                                   */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Ayra Pilates Studio",
  image: [],
  description:
    "Estudio boutique de Pilates contemporáneo en Palermo, Buenos Aires. Grupos reducidos con atención personalizada.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raúl Scalabrini Ortiz 1650",
    addressLocality: "Palermo",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  telephone: "+54 11 2049-9447",
  url: "/",
  priceRange: "$$",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Wednesday","Friday"], opens: "08:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday","Thursday"], opens: "16:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "13:00" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Route                                                                     */
/* -------------------------------------------------------------------------- */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar dark={!dark} />

        <main>
          <Hero />
          <Marquee />
          <Benefits />
          <About />
          <WhyUs />
          <Services />
          <Gallery />
          <Testimonials />
          <Schedule />
          <Location />
          <CtaBanner />
        </main>

        <Footer />
        <FloatingActions dark={dark} onToggleDark={() => setDark((v) => !v)} />
      </div>
    </MotionConfig>
  );
}
