# ARBYNEX

Marketing site for **ARBYNEX** (arbynex.com) — an AI automation / software
agency — plus a private admin panel that runs lead-automation workflows
(scraping, cold outreach, follow-ups) on a self-hosted n8n instance.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, `proxy.ts` middleware) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- framer-motion, lucide-react
- [jose](https://github.com/panva/jose) for signed session JWTs (admin auth)

## Structure

```
app/
  page.tsx            Landing page (sections composed from components/)
  demo/               Public AI chatbot demo (Groq-backed /api/chat)
  admin/              Private dashboard (login, triggers, leads, instagram)
  api/                chat + admin endpoints (login, leads, trigger, …)
components/           Public site sections; components/admin/ = dashboard UI
lib/                  auth, session (JWT), n8n client, contact links, SEO copy
docs/n8n-setup.md     How to wire the n8n webhooks
proxy.ts              Redirects unauthenticated /admin traffic to /admin/login
```

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

Environment variables (documented in `.env.example`):

| Var | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Groq API key for the `/demo` chatbot |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Single admin login for `/admin` |
| `SESSION_SECRET` | Signs the admin session JWT (`openssl rand -base64 32`) |
| `N8N_BASE_URL` | Base URL of the n8n instance (Render) |
| `N8N_WEBHOOK_TOKEN` | Shared secret sent as `x-n8n-token` to every webhook |
| `N8N_CONTACT_WEBHOOK_URL` | Full webhook URL for the public contact form |

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```

## How the n8n integration works

The admin dashboard never talks to Google Sheets directly. Every action goes
through webhooks on a self-hosted n8n instance:

- **Lead sourcing** (`trigger-scraper`) — scrapes businesses for a niche + city
  and appends rows to a Google Sheet.
- **Outreach** (`trigger-outreach`) — emails leads whose status is `pending`.
- **Follow-ups** (`trigger-followup`) — re-mails leads still `sent` after 3 days.
- **Leads** (`GET /webhook/leads`) — returns the sheet as JSON for the
  `/admin/leads` and `/admin/instagram` tables.

All calls are server-side only (`lib/n8n.ts`), authenticated with the
`x-n8n-token` header. See **[docs/n8n-setup.md](docs/n8n-setup.md)** for the
exact webhook configuration and payload shapes.

## Deployment

Deploys on Vercel; set the env vars above in the project settings. The n8n
instance runs separately on Render.
