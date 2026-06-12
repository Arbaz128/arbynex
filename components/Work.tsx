import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const PROJECTS = [
  {
    name: "Floww",
    url: "https://floww.build",
    domain: "floww.build",
    desc: "Omnichannel messaging automation platform — connects Instagram, Facebook & WhatsApp and automates customer conversations with no-code flows.",
    tag: "SaaS Platform",
  },
  {
    name: "Click2Deploy",
    url: "https://click2deploy.com",
    domain: "click2deploy.com",
    desc: "DevOps automation platform that deploys, updates and manages Odoo across dev, staging and production — without technical expertise.",
    tag: "DevOps Platform",
  },
  {
    name: "Toolrift",
    url: "https://toolrift.co",
    domain: "toolrift.co",
    desc: "Suite of free AI utilities for creators, marketers and developers — summarization, content generation and code explanation tools.",
    tag: "AI Tools Suite",
  },
  {
    name: "Zimiso",
    url: "https://zimiso.com",
    domain: "zimiso.com",
    desc: "Minimalist skincare brand storefront — clean, conversion-focused e-commerce experience.",
    tag: "E-commerce",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Our Work
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Real products. <span className="grad-text">Live right now.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Products our team has engineered and shipped — from SaaS platforms to
          e-commerce. Click any of them, they&apos;re live.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-3xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-violet">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    {p.name}
                  </h3>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 transition-all group-hover:border-cyan/50 group-hover:bg-cyan/10">
                  <ArrowUpRight
                    className="text-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    size={20}
                  />
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.desc}</p>
              <span className="mt-5 inline-block text-xs font-medium text-white/40">
                {p.domain}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
