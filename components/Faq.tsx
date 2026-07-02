"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { FAQS } from "@/lib/seo-data";

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
