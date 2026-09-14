import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { filterLeads, mapLead } from "@/lib/admin-data";
import type { LeadFilter } from "@/lib/admin-data";
import { fetchLeads } from "@/lib/n8n";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  if (!(await getSession())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type") as LeadFilter | null;
  const filter: LeadFilter = type === "instagram" || type === "email" ? type : "all";

  try {
    const raw = await fetchLeads();
    const leads = filterLeads(raw.map(mapLead), filter);
    return Response.json({ leads, fetchedAt: new Date().toISOString() });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to fetch leads." },
      { status: 502 },
    );
  }
}