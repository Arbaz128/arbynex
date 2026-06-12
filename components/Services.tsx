"use client";

import {
  Bot,
  Magnet,
  CalendarCheck,
  Mail,
  Megaphone,
  Settings,
  Globe,
} from "lucide-react";
import type { MouseEvent } from "react";
import Reveal from "./Reveal";

const SERVICES = [
  {
    icon: Globe,
    title: "Websites & Web Apps",
    desc: "Modern, lightning-fast websites and full web applications built with Next.js & React — the same stack used by OpenAI and Nike. Landing pages, SaaS platforms, e-commerce stores and dashboards.",
    tag: "BUILT TO CONVERT →",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    desc: "WhatsApp, Instagram & website bots powered by GPT/Claude that answer customer questions instantly, in any language, 24/7 — and hand over to you when it matters.",
    tag: "MOST POPULAR →",
  },
  {
    icon: Magnet,
    title: "Lead Capture & Follow-up",
    desc: "Every inquiry from your forms, DMs and ads gets saved automatically, you get notified instantly, and the lead receives a follow-up — before your competitor even replies.",
    tag: "NEVER LOSE A LEAD →",
  },
  {
    icon: CalendarCheck,
    title: "Booking & Reminders",
    desc: "Customers book themselves into your calendar. Automatic WhatsApp/SMS reminders cut no-shows dramatically. Perfect for clinics, salons, gyms & consultants.",
    tag: "KILL NO-SHOWS →",
  },
  {
    icon: Mail,
    title: "Email Automation",
    desc: "Welcome sequences, follow-ups, and AI-drafted replies. Your inbox stops being a to-do list and starts being a sales machine.",
    tag: "INBOX ZERO →",
  },
  {
    icon: Megaphone,
    title: "Content Pipelines",
    desc: "One idea in — posts written, scheduled and published across Instagram, Facebook & LinkedIn automatically. Consistent content without the daily grind.",
    tag: "ALWAYS POSTING →",
  },
  {
    icon: Settings,
    title: "Custom Workflows",
    desc: "Data entry, invoices, order confirmations, reports — if you do it manually every week, we can probably automate it. Tell us your most boring task.",
    tag: "YOUR IDEA →",
  },
];

function onCardMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function Services() {
  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          What We Build
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Systems that make money{" "}
          <span className="grad-text">while you&apos;re offline.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Every system is custom-built for your business, tested with you live,
          and handed over working. No jargon. No fluff. Just results.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div
              onMouseMove={onCardMove}
              className="spotlight-card h-full rounded-3xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet/40"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-cyan/15 to-violet/15">
                <s.icon className="text-cyan" size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
              <span className="mt-5 inline-block text-xs font-semibold tracking-wide text-cyan">
                {s.tag}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
