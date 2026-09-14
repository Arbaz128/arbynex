import LeadsTable from "@/components/admin/LeadsTable";

export default function AdminInstagramPage() {
  return (
    <section className="space-y-6">
      <div>
        <span className="inline-block rounded-full border border-violet/30 bg-violet/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
          Manual Outreach
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Instagram <span className="grad-text">Leads</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Businesses we couldn&apos;t find an email for, but have an Instagram
          handle. DM these yourself — we don&apos;t automate Instagram DMs.
        </p>
      </div>

      <LeadsTable
        filter="instagram"
        emptyTitle="Nothing here yet."
        emptyHint="Leads with an Instagram handle but no email will show up in this list after a sourcing run."
      />
    </section>
  );
}