import { BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

/**
 * People buy from people — especially from a young agency. This puts a real
 * human and a personal guarantee on the page.
 *
 * Photo lives at `public/arbaz-photo.jpeg`. To change it, replace that file
 * (keep it roughly square so it doesn't crop awkwardly).
 */
export default function Founder() {
  return (
    <section id="founder" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <div className="flex flex-col items-center gap-10 rounded-[32px] border border-line bg-card p-8 text-center md:flex-row md:items-center md:gap-12 md:p-12 md:text-left">
          {/* Avatar — fixed size so it never balloons to the image's natural dimensions */}
          <div
            style={{ width: 176, height: 176 }}
            className="shrink-0 overflow-hidden rounded-3xl border border-line"
          >
            <img
              src="/arbaz-photo.jpeg"
              alt="Arbaz — founder of ARBYNEX"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bio */}
          <div>
            <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
              Who&apos;s behind ARBYNEX
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Hi, I&apos;m Arbaz — and I build these myself.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              I&apos;m a developer who got tired of watching businesses lose
              customers to slow replies and manual busywork. So I build the
              systems that fix it — chatbots, automations and websites that
              actually move the needle. No account managers, no hand-offs, no
              waiting on a team: you work directly with the person building your
              system, so it ships faster and nothing gets lost in translation.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-sm text-white/90">
              <BadgeCheck className="text-cyan" size={20} />
              <span>
                My personal promise: you see it working before you pay, or you
                pay nothing.
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
