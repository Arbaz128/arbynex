"use client";

import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  ShoppingCart,
  Building2,
} from "lucide-react";
import type { MouseEvent } from "react";
import Reveal from "./Reveal";
import { BUILD_CATEGORIES } from "@/lib/seo-data";

const ICONS = [Code2, Globe, Smartphone, Cloud, ShoppingCart, Building2];

function onCardMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 mx-auto max-w-7xl px-6 py-28"
    >
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          What We Build
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          From idea to production{" "}
          <span className="grad-text">— we engineer it all.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Whether you need a new digital product, an internal business system
          or a complete customer-facing platform, ARBYNEX can take it from
          concept to deployment.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BUILD_CATEGORIES.map((cat, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={cat.title} delay={i * 0.08}>
              <div
                onMouseMove={onCardMove}
                className="spotlight-card group h-full rounded-3xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet/40 hover:bg-card-hover"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-cyan/15 to-violet/15">
                    <Icon className="text-cyan" size={26} />
                  </div>
                  <span className="font-display text-3xl font-bold text-white/10">
                    {cat.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
