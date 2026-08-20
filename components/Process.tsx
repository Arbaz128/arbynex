import Reveal from "./Reveal";
import { PROCESS_STEPS } from "@/lib/seo-data";

export default function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          How We Work
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          From business problem to{" "}
          <span className="grad-text">working product.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Great software starts with understanding the problem. Our process is
          designed to keep communication clear, development focused and delivery
          predictable.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.07}>
            <div
              className={`h-full rounded-3xl border bg-card p-7 transition-all ${
                i < 4 ? "border-line" : "border-violet/20"
              } ${i >= 4 ? "lg:col-span-1" : ""}`}
            >
              <span className="grad-text font-display text-4xl font-bold opacity-85">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
              <div className="mt-4 rounded-lg border border-line bg-white/[0.02] px-3 py-2">
                <p className="text-xs text-muted">
                  <span className="font-semibold text-white/60">Output: </span>
                  {step.output}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
