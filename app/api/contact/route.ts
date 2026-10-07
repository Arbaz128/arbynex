import type { NextRequest } from "next/server";
import { submitContact, type ContactPayload } from "@/lib/n8n";

/**
 * Public contact form endpoint. Validates + rate-limits server-side, then
 * forwards the sanitized payload to the n8n "contact" webhook (which appends
 * it to the Inbound sheet). The browser never talks to n8n directly.
 */

const LIMITS = { name: 100, email: 200, phone: 40, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic in-memory rate limit: 5 submissions per IP per 10 minutes.
// (Resets on cold start — good enough alongside the n8n-side data.)
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 } as const;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function badRequest(error: string) {
  return Response.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest("Invalid request body.");
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const str = (value: unknown) =>
    typeof value === "string" ? value.trim() : "";

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const message = str(body.message);

  if (!name || !email || !message) {
    return badRequest("Please fill in your name, email and message.");
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email) {
    return badRequest("Please keep the fields within the allowed length.");
  }
  if (phone.length > LIMITS.phone || message.length > LIMITS.message) {
    return badRequest("Please keep the fields within the allowed length.");
  }
  if (!EMAIL_RE.test(email)) {
    return badRequest("Please enter a valid email address.");
  }

  const payload: ContactPayload = {
    name,
    email,
    phone,
    message,
    source: "website-contact-form",
    submittedAt: new Date().toISOString(),
  };

  const result = await submitContact(payload);
  if (!result.ok) {
    console.error(`contact webhook failed (status=${result.status}): ${result.message}`);
    return Response.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
