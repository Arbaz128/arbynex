import "server-only";

/**
 * Server-only n8n client. Webhook paths here mirror the workflows in the n8n
 * instance (self-hosted on Render):
 *
 *   trigger-scraper    — Yelp sourcing for { niche, city }
 *   trigger-outreach   — send personalized cold emails to "pending" leads
 *   trigger-followup   — follow up with leads still "sent" after 3 days
 *   leads              — read all rows from the Google Sheet as JSON
 *
 * Every call sends `x-n8n-token` (N8N_WEBHOOK_TOKEN) which each n8n webhook
 * node must be configured to check (Header Auth — see docs/n8n-setup.md).
 *
 * NOTE (Render free tier): the server sleeps after ~15 min idle. Cold starts
 * can take a minute, so trigger calls allow up to 55s before giving up.
 */

export type WorkflowId = "scrape" | "outreach" | "followup";

export const WORKFLOW_PATHS: Record<WorkflowId, string> = {
  scrape: "/webhook/trigger-scraper",
  outreach: "/webhook/trigger-outreach",
  followup: "/webhook/trigger-followup",
};

export const LEADS_PATH = "/webhook/leads";

const TRIGGER_TIMEOUT_MS = 55_000;
const LEADS_TIMEOUT_MS = 30_000;

function baseUrl(): string {
  const base = process.env.N8N_BASE_URL;
  if (!base) {
    throw new Error("N8N_BASE_URL is not set.");
  }
  return base.replace(/\/+$/, "");
}

function authHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "x-n8n-token": process.env.N8N_WEBHOOK_TOKEN ?? "",
  };
}

export type TriggerResult =
  | { ok: true; status: number }
  | { ok: false; status: number | null; message: string };

/**
 * Fire-and-forget workflow trigger. n8n must be set to respond "On Received"
 * (see docs/n8n-setup.md) so the request returns immediately even though the
 * workflow keeps running for minutes.
 */
export async function triggerWorkflow(
  workflow: WorkflowId,
  body?: Record<string, unknown>,
): Promise<TriggerResult> {
  try {
    const res = await fetch(`${baseUrl()}${WORKFLOW_PATHS[workflow]}`, {
      method: "POST",
      headers: authHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(TRIGGER_TIMEOUT_MS),
    });
    return res.ok
      ? { ok: true, status: res.status }
      : { ok: false, status: res.status, message: `n8n returned ${res.status}` };
  } catch (err) {
    return {
      ok: false,
      status: null,
      message:
        err instanceof Error ? err.message : "Could not reach automation server.",
    };
  }
}

export type RawLead = Record<string, string | number | null | undefined>;

/**
 * Fetch all leads from the Google Sheet via the "leads" n8n webhook.
 * Accepts either `{ leads: [...] }` or a bare JSON array (both shapes are
 * easy to produce from the Google Sheets node).
 */
export async function fetchLeads(): Promise<RawLead[]> {
  try {
    const res = await fetch(`${baseUrl()}${LEADS_PATH}`, {
      method: "GET",
      headers: authHeaders(),
      signal: AbortSignal.timeout(LEADS_TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(`n8n returned ${res.status}`);
    }
    const data = (await res.json()) as unknown;
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object" && Array.isArray((data as { leads?: unknown }).leads)) {
      return (data as { leads: RawLead[] }).leads;
    }
    throw new Error("Unexpected response shape from n8n.");
  } catch (err) {
    throw new Error(
      `Could not fetch leads from automation server: ${
        err instanceof Error ? err.message : "unknown error"
      }`,
    );
  }
}