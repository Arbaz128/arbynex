import {
  Lightbulb,
  Code2,
  Cpu,
  Link2,
  Scaling,
  MessageCircle,
} from "lucide-react";
import Reveal from "./Reveal";
import { WHY_ARBYNEX } from "@/lib/seo-data";

const ICONS = [Lightbulb, Code2, Cpu, Link2, Scaling, MessageCircle];

export default function WhyUs() {
  return (
    <section className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-block rounded-full border border-violet/30 bg-violet/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                Why ARBYNEX
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                More than a{" "}
                <span className="grad-text">development team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-8 border-l-2 border-violet/40 pl-6">
                <p className="font-display text-xl font-semibold leading-relaxed text-heading md:text-2xl">
                  &ldquo;We don&apos;t just deliver software. We build technology
                  that becomes part of your business.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_ARBYNEX.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-line bg-card p-6 transition-all hover:border-violet/30">
                    <Icon className="mb-3 text-cyan" size={22} />
                    <h3 className="font-display text-base font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
