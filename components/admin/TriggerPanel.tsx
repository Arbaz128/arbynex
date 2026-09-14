"use client";

import { useState } from "react";
import { Loader2, Mail, Repeat, Send, Search } from "lucide-react";
import { NICHE_LIST } from "@/lib/admin-data";
import type { WorkflowId } from "@/lib/n8n";

type Status =
  | { kind: "idle" }
  | { kind: "working"; label: string }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

const WORKFLOW_META: Record<
  Exclude<WorkflowId, "scrape">,
  { label: string; description: string }
> = {
  outreach: {
    label: "Run Outreach",
    description: "Send personalized cold emails to all 'pending' leads.",
  },
  followup: {
    label: "Run Follow-ups",
    description: "Follow up with leads still marked 'sent' after 3 days.",
  },
};

export default function TriggerPanel() {
  const [niche, setNiche] = useState<string>(NICHE_LIST[0]);
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const cityError = status.kind === "error" && status.message.startsWith("city");

  async function fire(workflow: WorkflowId, payload?: Record<string, unknown>) {
    setStatus({
      kind: "working",
      label:
        workflow === "scrape" ? "Sourcing leads…" : "Starting workflow…",
    });
    try {
      const res = await fetch("/api/admin/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflow, ...payload }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        setStatus({ kind: "error", message: data?.error ?? "Something went wrong." });
        return;
      }
      setStatus({
        kind: "ok",
        message:
          workflow === "scrape"
            ? "Lead sourcing started — allow 5–10 minutes for results."
            : workflow === "outreach"
              ? "Outreach started — emails are being drafted and sent."
              : "Follow-ups started.",
      });
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server. Try again." });
    }
  }

  function startScrape() {
    if (!city.trim()) {
      setStatus({ kind: "error", message: "city" });
      return;
    }
    void fire("scrape", { niche, city: city.trim() });
  }

  const working = status.kind === "working";

  return (
    <div className="rounded-3xl border border-line bg-card p-7 md:p-8">
      <h3 className="font-display text-lg font-semibold text-white">
        Automations
      </h3>
      <p className="mt-1.5 text-sm text-muted">
        Trigger the n8n workflows. Each one runs in the background — you&apos;ll
        see results here once the sheet updates.
      </p>

      {/* Scrape (lead sourcing) */}
      <div className="mt-6 rounded-2xl border border-line bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Search size={16} className="text-cyan" />
          Lead Sourcing
        </div>
        <p className="mt-1 text-xs text-muted">
          Find businesses on Yelp for a niche + city, then grab their contact
          email or Instagram.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
              Niche
            </span>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full rounded-xl border border-line bg-bg2 px-4 py-3 text-sm text-white outline-none focus:border-violet"
            >
              {NICHE_LIST.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
              City
            </span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Austin, TX"
              className="w-full rounded-xl border border-line bg-bg2 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-violet"
            />
          </label>
        </div>

        <button
          onClick={startScrape}
          disabled={working}
          className="grad-bg mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.3)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
        >
          {working ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Start Lead Sourcing
        </button>
      </div>

      {/* Outreach + follow-ups */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(["outreach", "followup"] as const).map((wf) => (
          <div
            key={wf}
            className="rounded-2xl border border-line bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              {wf === "outreach" ? (
                <Send size={16} className="text-cyan" />
              ) : (
                <Repeat size={16} className="text-cyan" />
              )}
              {WORKFLOW_META[wf].label}
            </div>
            <p className="mt-1 text-xs text-muted">
              {WORKFLOW_META[wf].description}
            </p>
            <button
              onClick={() => void fire(wf)}
              disabled={working}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-violet disabled:opacity-60 sm:w-auto"
            >
              {working && status.kind === "working" ? (
                <Loader2 size={15} className="animate-spin" />
              ) : wf === "outreach" ? (
                <Mail size={15} />
              ) : (
                <Repeat size={15} />
              )}
              Start
            </button>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {status.kind === "working" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-cyan">
          <Loader2 size={15} className="animate-spin" /> {status.label}
        </p>
      )}
      {status.kind === "ok" && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {status.message}
        </p>
      )}
      {status.kind === "error" && !cityError && (
        <p className="mt-4 text-sm text-pink">{status.message}</p>
      )}
      {status.kind === "error" && cityError && (
        <p className="mt-4 text-sm text-pink">Please enter a city first.</p>
      )}
    </div>
  );
}