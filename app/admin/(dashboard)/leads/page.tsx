import LeadsTable from "@/components/admin/LeadsTable";

export default function AdminLeadsPage() {
  return (
    <section className="space-y-6">
      <div>
        <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Google Sheet
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          All <span className="grad-text">Leads</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Live view of every row in the leads sheet. Hit refresh after a
          sourcing run to see new businesses appear.
        </p>
      </div>

      <LeadsTable
        emptyTitle="No leads yet."
        emptyHint="Run 'Lead Sourcing' from the dashboard and the scraped businesses will show up here automatically."
      />
    </section>
  );
}