import { MessageCircle, Mail } from "lucide-react";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "923004339095";
const EMAIL = "a4arbazchaudhary@gmail.com";

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
            Get your <span className="grad-text">free demo</span> this week.
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Tell us what eats your time — we&apos;ll show you a working
            automation for your business before you spend a single dollar. Only
            2 free demo slots per week.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi ARBYNEX! I want a free automation demo for my business."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-bg inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 font-display font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.35)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(139,92,246,.5)]"
            >
              <MessageCircle size={20} /> WhatsApp Us Now
            </a>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                "Free Demo Request"
              )}`}
              className="inline-flex items-center gap-2.5 rounded-xl border border-line px-8 py-3.5 font-display font-semibold text-white transition-all hover:-translate-y-1 hover:border-violet"
            >
              <Mail size={20} /> Send an Email
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
