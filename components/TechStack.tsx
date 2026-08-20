import Reveal from "./Reveal";
import { TECH_STACK } from "@/lib/seo-data";

const ENGINEERING_PRINCIPLES = [
  { title: "Scalable Architecture", desc: "Build today without creating tomorrow's limitations." },
  { title: "Security", desc: "Protect business data, access and infrastructure." },
  { title: "Performance", desc: "Optimize systems for real-world usage." },
  { title: "Maintainability", desc: "Software that teams can understand and extend." },
];

export default function TechStack() {
  const categories = Object.values(TECH_STACK);

  return (
    <section id="tech" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Our Technology
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Modern technology.{" "}
            <span className="grad-text">Production-ready engineering.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            We use modern technologies and engineering practices to build
            reliable digital products.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-line bg-card p-7 transition-all hover:border-violet/30">
                <h3 className="font-display text-lg font-bold text-heading">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 rounded-3xl border border-line bg-card p-8">
            <h3 className="font-display text-xl font-bold">Engineering Principles</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ENGINEERING_PRINCIPLES.map((p) => (
                <div key={p.title}>
                  <h4 className="font-display text-sm font-semibold text-cyan">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
