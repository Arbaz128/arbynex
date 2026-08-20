import {
  Store,
  ShoppingCart,
  Building,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Rocket,
  TrendingUp,
} from "lucide-react";
import Reveal from "./Reveal";
import { INDUSTRIES } from "@/lib/seo-data";

const ICONS = [
  Store,
  ShoppingCart,
  Building,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Rocket,
  TrendingUp,
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative z-10 mx-auto max-w-7xl px-6 py-28"
    >
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Solutions for Your Business
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Technology built around{" "}
          <span className="grad-text">your industry.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Every industry has different workflows, customers and challenges. We
          adapt the technology to the business — not the other way around.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map((ind, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={ind.title} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet/30">
                <Icon
                  className="mb-4 text-violet transition-colors group-hover:text-cyan"
                  size={28}
                />
                <h3 className="font-display text-lg font-bold">{ind.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {ind.capabilities}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-12 rounded-3xl border border-line bg-card p-8 text-center">
          <h3 className="font-display text-xl font-bold">
            The ARBYNEX Advantage
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            You don&apos;t need to assemble multiple technology vendors for
            every part of your digital transformation. We can handle the
            complete journey.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["Strategy", "Design", "Development", "Integration", "Deployment", "Support"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="rounded-xl border border-line bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80">
                    {step}
                  </span>
                  {i < 5 && (
                    <span className="text-violet/40">→</span>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
