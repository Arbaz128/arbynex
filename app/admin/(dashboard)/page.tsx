import { AtSign, Table2 } from "lucide-react";
import TriggerPanel from "@/components/admin/TriggerPanel";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Command Center
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Your business on <span className="grad-text">autopilot.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Fire the lead engine, run outreach and follow-ups, then watch the
            sheet fill up — all from here.
          </p>
        </div>
      </div>

      <TriggerPanel />

      {/* Quick links */}
      <div className="grid gap-6 md:grid-cols-2">
        <a
          href="/admin/leads"
          className="group rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-cyan/15 to-violet/15">
              <Table2 className="text-cyan" size={20} />
            </div>
            <span className="text-xs font-semibold text-cyan opacity-0 transition-opacity group-hover:opacity-100">
              OPEN →
            </span>
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold text-white">
            All Leads
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Every row from the Google Sheet — business, industry, city, email
            and status.
          </p>
        </a>

        <a
          href="/admin/instagram"
          className="group rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/15 to-pink/15">
              <AtSign className="text-violet" size={20} />
            </div>
            <span className="text-xs font-semibold text-violet opacity-0 transition-opacity group-hover:opacity-100">
              OPEN →
            </span>
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold text-white">
            Instagram Leads
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Leads with no email but an Instagram handle — DM these manually,
            one by one.
          </p>
        </a>
      </div>
    </section>
  );
}