import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { NICHE_LIST, nicheForN8n } from "@/lib/admin-data";
import type { WorkflowId } from "@/lib/n8n";
import { triggerWorkflow } from "@/lib/n8n";

type TriggerBody = { workflow?: string; niche?: string; city?: string };

const WORKFLOW_IDS: WorkflowId[] = ["scrape", "outreach", "followup"];

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: TriggerBody = {};
  try {
    body = (await request.json()) as TriggerBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const workflow = body.workflow as WorkflowId;
  if (!WORKFLOW_IDS.includes(workflow)) {
    return Response.json({ error: "Unknown workflow." }, { status: 400 });
  }

  if (workflow === "scrape") {
    const niche = (body.niche ?? "").trim();
    const city = (body.city ?? "").trim();
    if (!niche || !NICHE_LIST.includes(niche as (typeof NICHE_LIST)[number])) {
      return Response.json({ error: "Please pick a valid niche." }, { status: 400 });
    }
    if (!city) {
      return Response.json({ error: "Please enter a city." }, { status: 400 });
    }

    const result = await triggerWorkflow(workflow, {
      niche: nicheForN8n(niche),
      city,
    });
    if (!result.ok) {
      return Response.json(
        { error: `Could not start lead sourcing: ${result.message}` },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, workflow: "scrape" });
  }

  const result = await triggerWorkflow(workflow);
  if (!result.ok) {
    return Response.json(
      { error: `Could not start workflow: ${result.message}` },
      { status: 502 },
    );
  }
  return Response.json({ ok: true, workflow });
}