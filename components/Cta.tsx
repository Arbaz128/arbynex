import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import LeadForm from "./LeadForm";
import { buildWhatsAppUrl, buildEmailUrl } from "@/lib/contact";

export default function Cta() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-violet/25 bg-gradient-to-br from-cyan/10 via-violet/10 to-pink/10 px-8 py-20 text-center md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-72 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,.22), transparent 65%)",
            }}
          />
          <h2 className="relative font-display text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s build{" "}
            <span className="grad-text">what&apos;s next.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Whether you&apos;re launching a startup, transforming an existing
            business or building the next generation of your product — ARBYNEX
            can help you turn the idea into working technology.
          </p>

          <div className="relative mx-auto mt-8 max-w-lg">
            <p className="mb-4 text-sm text-muted">Tell us about your project:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="rounded-xl border border-line bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                What are you building?
              </span>
              <span className="rounded-xl border border-line bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                What problem are you solving?
              </span>
              <span className="rounded-xl border border-line bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                What does success look like?
              </span>
            </div>
          </div>

          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={buildWhatsAppUrl(
                "Hi ARBYNEX! I'd like to discuss a software development project."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-bg inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 font-display font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.35)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(139,92,246,.5)]"
            >
              <MessageCircle size={20} /> WhatsApp Us Now
            </a>
            <a
              href={buildEmailUrl(
                "Project Inquiry",
                "Hi ARBYNEX,\n\nI'd like to discuss a software development project.\n\nWhat I'm building: \nProblem it solves: \nSuccess looks like: "
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-line px-8 py-3.5 font-display font-semibold text-white transition-all hover:-translate-y-1 hover:border-violet"
            >
              <Mail size={20} /> Send an Email
            </a>
          </div>

          <div className="relative">
            <LeadForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
