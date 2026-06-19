import type { NextRequest } from "next/server";

/**
 * Demo chatbot backend — powered by Groq (free, no card).
 * The API key lives only on the server (process.env.GROQ_API_KEY) and is never
 * exposed to the browser. This route is what /demo talks to.
 *
 * The system prompt is built per-request so the assistant always knows the
 * real current date/time. The timezone is AUTO-DETECTED from the visitor's
 * browser (sent in the request body) — so every user sees their own correct
 * local date. Falls back to UTC if none/invalid is sent.
 *
 * To run: add GROQ_API_KEY to .env.local (and Vercel env vars for production).
 * Get a free key at https://console.groq.com/keys
 */

function buildSystemPrompt(timeZone: string): string {
  const now = new Date();

  const dateOpts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  };

  let today: string;
  let time: string;
  try {
    today = now.toLocaleDateString("en-US", dateOpts);
    time = now.toLocaleTimeString("en-US", timeOpts);
  } catch {
    // Invalid/unknown timezone — fall back to server default.
    today = now.toLocaleDateString("en-US", { ...dateOpts, timeZone: undefined });
    time = now.toLocaleTimeString("en-US", { ...timeOpts, timeZone: undefined });
  }

  return `You are the AI front-desk assistant for Glow Med Spa, a premium medical spa. You speak like a warm, professional human receptionist — friendly, calm, and efficient. Your job: answer questions instantly and book consultations.

CURRENT DATE & TIME: Today is ${today}, and it is currently ${time}.
You ALWAYS know the date and time from the line above. If asked, answer confidently — never say you don't know the date.

SERVICES & PRICES:
- Botox: $12 per unit
- Dermal Fillers: from $650 per syringe
- HydraFacial: $199
- Laser Hair Removal: from $150 per session
- Chemical Peel: $120
- Microneedling: $300

HOURS: Monday to Saturday, 9:00 AM to 7:00 PM. Closed Sunday.

CONVERSATION RULES:
- Reply SHORT and natural — 1 to 3 sentences. Never sound like a brochure.
- Use only the services, prices, and hours above. Never invent anything; if unsure, offer to connect them with the team.
- Don't repeat the same call-to-action every message. Offer a consultation only when it fits, and vary the wording.
- If a message is unclear or off-topic, briefly steer back to treatments, prices, or booking.
- Use the customer's name once they share it. At most one emoji per message.

BOOKING RULES (important — be precise):
- To book, collect: (1) full name, (2) phone number, (3) a specific date, (4) a time. Ask for whatever is missing, one or two at a time — don't interrogate.
- Always convert relative dates to a REAL calendar date using today's date above. Example: if today is Friday, "Monday" means the next Monday — state it as "Monday, [Month] [day]".
- Only accept FUTURE dates and times. Politely refuse past dates/times and times outside opening hours, and suggest the nearest available slot instead.
- Never book on a Sunday (closed) — offer Saturday or the next Monday.
- When everything is collected, confirm clearly with the full date, day, time, and the customer's name. Example: "You're all set, Sarah — Tuesday, June 24 at 2:00 PM. We'll see you then!"`;
}

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(request: NextRequest) {
  try {
    const { messages, timeZone } = (await request.json()) as {
      messages: ChatMessage[];
      timeZone?: string;
    };

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { reply: "The assistant isn't configured yet (missing API key)." },
        { status: 200 },
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 320,
        messages: [
          { role: "system", content: buildSystemPrompt(timeZone || "UTC") },
          ...(messages ?? []).filter(
            (m) => m.role === "user" || m.role === "assistant",
          ),
        ],
      }),
    });

    if (!res.ok) {
      return Response.json(
        { reply: "Sorry, I'm having a brief moment — please try again." },
        { status: 200 },
      );
    }

    const data = await res.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, could you rephrase that?";

    return Response.json({ reply });
  } catch {
    return Response.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 200 },
    );
  }
}
