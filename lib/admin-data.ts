/**
 * Shared admin constants — used by the dashboard UI and validated again
 * server-side in the API routes. These are NOT secrets.
 */

export const NICHE_LIST = [
  "Med Spas",
  "Salons",
  "Dental Clinics",
  "Gyms",
  "HVAC",
  "Roofing",
  "Plumbing",
] as const;

export type Niche = (typeof NICHE_LIST)[number];

/** Normalize a niche for the scraper (n8n searches Yelp, e.g. "med spas"). */
export function nicheForN8n(niche: string): string {
  return niche.trim().toLowerCase();
}

export type LeadFilter = "all" | "email" | "instagram";

/** Raw sheet row (Google Sheets node keys = column headers). */
export type RawLead = {
  business_name?: string | null;
  industry?: string | null;
  city?: string | null;
  first_name?: string | null;
  email?: string | null;
  instagram?: string | null;
  status?: string | null;
  phone?: string | null;
  notes?: string | null;
  follow_up_count?: string | number | null;
  last_contacted?: string | null;
};

export type Lead = {
  businessName: string;
  industry: string;
  city: string;
  firstName: string;
  email: string;
  instagram: string;
  status: string;
  phone: string;
  notes: string;
  followUpCount: string;
  lastContacted: string;
};

function clean(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function mapLead(raw: RawLead): Lead {
  return {
    businessName: clean(raw.business_name),
    industry: clean(raw.industry),
    city: clean(raw.city),
    firstName: clean(raw.first_name),
    email: clean(raw.email),
    instagram: clean(raw.instagram),
    status: clean(raw.status),
    phone: clean(raw.phone),
    notes: clean(raw.notes),
    followUpCount: clean(raw.follow_up_count),
    lastContacted: clean(raw.last_contacted),
  };
}

export function filterLeads(leads: Lead[], filter: LeadFilter): Lead[] {
  if (filter === "email") {
    return leads.filter((l) => l.email.length > 0);
  }
  if (filter === "instagram") {
    return leads.filter((l) => l.email.length === 0 && l.instagram.length > 0);
  }
  return leads;
}

/** Pill colors for lead statuses (fallback = neutral). */
export function statusBadgeClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("interested") || s.includes("replied") || s.includes("positive")) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }
  if (s.includes("pending")) {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }
  if (s.includes("sent") || s.includes("follow")) {
    return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
  }
  if (s.includes("not interested") || s.includes("bounced") || s.includes("negative")) {
    return "border-pink-400/30 bg-pink-400/10 text-pink-300";
  }
  return "border-line bg-white/5 text-white/60";
}