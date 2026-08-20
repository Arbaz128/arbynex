import {
  Bot,
  Workflow,
  BrainCircuit,
  MessageSquare,
  Mail,
  FileText,
  Route,
  Zap,
} from "lucide-react";
import Reveal from "./Reveal";
import { AI_SOLUTIONS, AUTOMATION_SOLUTIONS } from "@/lib/seo-data";

const AI_ICONS = [Bot, BrainCircuit, MessageSquare, Workflow];
const AUTO_ICONS = [Zap, Mail, Route, FileText];

export default function AiAutomation() {
  return (
    <section id="ai" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="inline-block rounded-full border border-violet/30 bg-violet/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
            AI, Automation & Intelligent Systems
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Make your business{" "}
            <span className="grad-text">smarter.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            AI is not a separate world from software — it is becoming part of
            modern software. ARBYNEX combines traditional software engineering
            with AI and automation to build systems that understand information,
            make decisions and execute workflows.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-card p-8">
              <h3 className="font-display text-2xl font-bold">AI Solutions</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {AI_SOLUTIONS.map((s, i) => {
                  const Icon = AI_ICONS[i];
                  return (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-line bg-white/[0.02] p-5 transition-all hover:border-violet/30"
                    >
                      <Icon className="mb-3 text-violet" size={22} />
                      <h4 className="font-display text-base font-semibold">
                        {s.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {s.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-line bg-card p-8">
              <h3 className="font-display text-2xl font-bold">
                Business Automation
              </h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {AUTOMATION_SOLUTIONS.map((s, i) => {
                  const Icon = AUTO_ICONS[i];
                  return (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-line bg-white/[0.02] p-5 transition-all hover:border-cyan/30"
                    >
                      <Icon className="mb-3 text-cyan" size={22} />
                      <h4 className="font-display text-base font-semibold">
                        {s.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {s.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 rounded-2xl border border-line bg-card p-6 text-center">
            <p className="text-sm text-muted">
              <span className="font-semibold text-white">Integrations:</span>{" "}
              REST APIs · Webhooks · CRM · Payment Gateways · Messaging
              Platforms · Cloud Services · Third-Party Platforms
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
