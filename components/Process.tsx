import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Free Audit Call",
    desc: "A quick 15-minute chat. You tell us how your business runs — we spot exactly where you're losing time and leads.",
  },
  {
    title: "Free Working Demo",
    desc: "We build a live demo for YOUR business before you pay anything. You see it working with your own eyes first.",
  },
  {
    title: "Build & Launch",
    desc: "You approve, we build the full system, test it with you live, and launch. Most projects go live within 3–7 days.",
  },
  {
    title: "Support & Scale",
    desc: "We monitor, maintain and improve your system every month — so it keeps working while your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          How It Works
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          From first call to live system in{" "}
          <span className="grad-text">days, not months.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-line bg-card p-8">
              <span className="grad-text font-display text-5xl font-bold opacity-85">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
