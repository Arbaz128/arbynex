"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { statusBadgeClass } from "@/lib/admin-data";
import type { Lead, LeadFilter } from "@/lib/admin-data";

type FetchState =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; leads: Lead[]; fetchedAt: string };

export default function LeadsTable({
  filter,
  emptyTitle,
  emptyHint,
}: {
  filter?: LeadFilter;
  emptyTitle: string;
  emptyHint: string;
}) {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const query = filter && filter !== "all" ? `?type=${filter}` : "";
    fetch(`/api/admin/leads${query}`)
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as {
          leads?: Lead[];
          fetchedAt?: string;
          error?: string;
        } | null;
        if (cancelled) return;
        if (!res.ok || !data?.leads) {
          setState({ kind: "error", message: data?.error ?? "Failed to load leads." });
          return;
        }
        setState({ kind: "ready", leads: data.leads, fetchedAt: data.fetchedAt ?? "" });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ kind: "error", message: "Failed to load leads. Check that n8n is reachable." });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [filter, reloadKey]);

  function refresh() {
    setState({ kind: "loading" });
    setReloadKey((k) => k + 1);
  }

  const th =
    "px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:px-4";
  const td = "px-3 py-3.5 text-sm text-white/90 sm:px-4";

  return (
    <div className="rounded-3xl border border-line bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <p className="text-sm text-muted">
          {state.kind === "ready"
            ? `${state.leads.length} lead${state.leads.length === 1 ? "" : "s"} · updated ${new Date(state.fetchedAt).toLocaleTimeString()}`
            : "Loading…"}
        </p>
        <button
          onClick={refresh}
          disabled={state.kind === "loading"}
          className="flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-cyan/50 disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={state.kind === "loading" ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {state.kind === "loading" && (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted">
          <Loader2 size={16} className="animate-spin" /> Fetching leads…
        </div>
      )}

      {state.kind === "error" && (
        <div className="mx-6 my-10 rounded-2xl border border-dashed border-pink/30 bg-pink/5 p-6 text-center">
          <p className="text-sm font-semibold text-white">Couldn&apos;t load leads</p>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted">{state.message}</p>
        </div>
      )}

      {state.kind === "ready" && state.leads.length === 0 && (
        <div className="mx-6 my-10 rounded-2xl border border-dashed border-violet/30 bg-gradient-to-br from-violet/5 to-cyan/5 p-8 text-center">
          <p className="font-display text-base font-semibold text-white">
            {emptyTitle}
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-muted">{emptyHint}</p>
        </div>
      )}

      {state.kind === "ready" && state.leads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>Business</th>
                <th className={th}>Industry</th>
                <th className={th}>City</th>
                <th className={th}>{filter === "instagram" ? "Instagram" : "Email"}</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {state.leads.map((lead, i) => (
                <tr
                  key={`${lead.businessName}-${i}`}
                  className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.03]"
                >
                  <td className={td}>
                    <span className="font-medium text-white">
                      {lead.businessName || "—"}
                    </span>
                  </td>
                  <td className={`${td} text-muted`}>{lead.industry || "—"}</td>
                  <td className={`${td} text-muted`}>{lead.city || "—"}</td>
                  <td className={td}>
                    {filter === "instagram" ? (
                      lead.instagram ? (
                        <a
                          href={`https://instagram.com/${lead.instagram.replace(/^@/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan transition-colors hover:underline"
                        >
                          @{lead.instagram.replace(/^@/, "")}
                        </a>
                      ) : (
                        "—"
                      )
                    ) : lead.email ? (
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-cyan transition-colors hover:underline"
                      >
                        {lead.email}
                      </a>
                    ) : (
                      <span className="text-white/35">no email</span>
                    )}
                  </td>
                  <td className={td}>
                    {lead.status ? (
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    ) : (
                      <span className="text-white/35">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}