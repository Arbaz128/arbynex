import { ShieldCheck, Rocket, Wrench, Globe2 } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Honest social proof. We do NOT invent client quotes — that's a fast way to
 * lose trust (and clients). Instead we lead with provable facts: real products
 * shipped, a demo-first guarantee, fixed pricing, fast turnaround.
 *
 * As you collect REAL testimonials, add them here and they'll render
 * automatically. Keep them truthful — name, business, and a result you can back up.
 */
const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  // Example shape — replace with a real client once you have one:
  // {
  //   quote: "Our missed-lead problem disappeared in a week. The bot books appointments while we sleep.",
  //   name: "Sara K.",
  //   role: "Owner, Glow Skin Clinic",
  // },
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "You see it before you pay",
    desc: "We build a working demo for your business first. Pay only once it's proven — the risk is on us, not you.",
  },
  {
    icon: Globe2,
    title: "Real products, live right now",
    desc: "We don't just talk — we ship. SaaS platforms, AI tools and stores running in production today, linked above in Our Work.",
  },
  {
    icon: Rocket,
    title: "Live in days, not months",
    desc: "Most systems go live within 3–7 days. Fixed quote agreed up front — no scope creep, no surprise invoices.",
  },
  {
    icon: Wrench,
    title: "We don't disappear",
    desc: "Free fixes after launch and optional monthly support keep everything monitored, maintained and improving.",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Why Trust Us
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          No risk on you. <span className="grad-text">All proof on us.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-line bg-card p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-cyan/15 to-violet/15">
                <p.icon className="text-cyan" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {TESTIMONIALS.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-line bg-card p-7">
                <blockquote className="text-sm leading-relaxed text-white/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="text-muted"> — {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl border border-dashed border-violet/30 bg-gradient-to-br from-violet/5 to-cyan/5 p-8 text-center">
            <p className="font-display text-lg font-semibold text-white">
              Be the first business we feature here.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Early clients get our sharpest pricing and our full attention. Your
              results could be the case study on this page next month.
            </p>
            <a
              href="#contact"
              className="grad-bg mt-6 inline-block rounded-xl px-7 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Claim your free demo →
            </a>
          </div>
        </Reveal>
      )}
    </section>
  );
}
