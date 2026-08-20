import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const FEATURED = {
  name: "DokanOS",
  domain: "dokanos.com",
  tag: "Retail POS & Business Management Platform",
  desc: "A complete desktop business system designed for Pakistani retailers — Point of Sale, Inventory Management, Billing, Credit Book, Sales Reporting, End-of-Day Reconciliation, Multi-user Management, Backup & Restore, Licensing & Activation.",
  capabilities: [
    "Point of Sale",
    "Inventory Management",
    "Billing & Credit Book",
    "Sales Reporting",
    "Multi-user & Licensing",
    "Cloud Activation",
  ],
};

const PROJECTS = [
  {
    name: "Floww",
    url: "https://floww.build",
    domain: "floww.build",
    tag: "Communication & Automation Platform",
    desc: "Omnichannel messaging automation platform connecting Instagram, Facebook & WhatsApp with no-code business workflows.",
  },
  {
    name: "Toolrift",
    url: "https://toolrift.co",
    domain: "toolrift.co",
    tag: "AI Tools Platform",
    desc: "Digital platform built around AI-powered tools and experiences for creators, marketers and developers.",
  },
  {
    name: "Zimiso",
    url: "https://zimiso.com",
    domain: "zimiso.com",
    tag: "E-commerce Platform",
    desc: "Digital commerce experience focused on online product discovery and transactions.",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Products & Selected Work
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Technology{" "}
          <span className="grad-text">we&apos;ve built.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Our work covers different industries, business models and technical
          requirements. Different challenges — one engineering mindset.
        </p>
      </Reveal>

      {/* Featured Project */}
      <Reveal delay={0.3}>
        <div className="mt-16 rounded-3xl border border-line bg-card p-8 transition-all hover:border-cyan/30 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
                Featured Project
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                {FEATURED.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-violet">
                {FEATURED.tag}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {FEATURED.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FEATURED.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-lg border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="#contact"
                className="grad-bg inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                Build Something Like This
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Other Projects */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
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
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {p.desc}
              </p>
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
