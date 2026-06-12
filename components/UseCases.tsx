import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const CASES = [
  {
    emoji: "🏥",
    title: "Clinics & Salons",
    desc: "“Patients message at 11 PM and book elsewhere by morning.” → Bot answers instantly, books the appointment, sends a reminder.",
  },
  {
    emoji: "🏠",
    title: "Real Estate Agents",
    desc: "“I get 50 DMs a day and can't tell serious buyers from window shoppers.” → Bot qualifies every lead and sends you only the hot ones.",
  },
  {
    emoji: "🛍️",
    title: "E-commerce Stores",
    desc: "“Where is my order?” asked 200 times a week. → Automated order updates and instant support replies, zero manual work.",
  },
  {
    emoji: "💪",
    title: "Gyms & Coaches",
    desc: "“Leads from my ads go cold because I reply hours later.” → Instant follow-up the second a lead comes in, every single time.",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Use Cases
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Sounds familiar? <span className="grad-text">We fix exactly this.</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-5">
        {CASES.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="group flex flex-col items-center gap-5 rounded-2xl border border-line bg-card px-8 py-7 text-center transition-all duration-300 hover:translate-x-2 hover:border-cyan/40 md:flex-row md:text-left">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {c.desc}
                </p>
              </div>
              <ArrowRight
                className="text-violet transition-transform group-hover:translate-x-1 md:ml-auto"
                size={22}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
