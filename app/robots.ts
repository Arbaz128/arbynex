import type { MetadataRoute } from "next";

const SITE_URL = "https://arbynex.com";

// AI / generative-search crawlers we explicitly welcome so ARBYNEX can be
// read and cited by ChatGPT, Perplexity, Claude, Gemini, Copilot, etc. (GEO).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
