"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Do I really get a demo before paying?",
    a: "Yes — 100%. We build a working demo for your business first. You only pay when you've seen it working and want the full system. Zero risk for you.",
  },
  {
    q: "How much does it cost?",
    a: "Simple automations start from $150. AI chatbots and complete systems range from $300–$1,000+ depending on what you need. Monthly support plans are also available. Every quote is fixed before we start — no surprises.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. We build everything, test it with you, and hand it over working. If anything ever breaks, we fix it.",
  },
  {
    q: "How long does it take?",
    a: "Most systems go live within 3–7 days of approval. Simple automations can be done in 24–48 hours.",
  },
  {
    q: "What if it stops working later?",
    a: "Every project includes free fixes for the first weeks after launch, and our monthly support plans keep everything monitored, maintained and improving over time.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          FAQ
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Questions? <span className="grad-text">Answered.</span>
        </h2>
      </Reveal>

      <div className="mt-12 max-w-3xl space-y-4">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06}>
            <div className="overflow-hidden rounded-2xl border border-line bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-7 py-6 text-left font-display text-base font-semibold"
              >
                {f.q}
                <Plus
                  className={`shrink-0 text-violet transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                  size={22}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-7 pb-6 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
