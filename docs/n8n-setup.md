# n8n Setup for the ARBYNEX Admin Dashboard

The dashboard at `/admin` talks to your n8n instance on Render via webhooks.
This doc covers the two things you must configure in n8n for it to work:

1. **Header auth** on your three existing workflows' webhook nodes.
2. A small **new "leads" workflow** that returns the Google Sheet as JSON.

The website sends the header `x-n8n-token: <N8N_WEBHOOK_TOKEN>` on every
request. That token lives only in the server env (`.env` / Vercel) — never in
the browser.

## Env vars used by the dashboard

| Env var            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `N8N_BASE_URL`     | e.g. `https://arbynex-n8n.onrender.com`        |
| `N8N_WEBHOOK_TOKEN`| Shared secret; must match the webhook auth     |

---

## 1. Add header auth to the existing webhooks

Do this on each of these three webhook nodes:

- `trigger-scraper` (workflow: lead sourcing)
- `trigger-outreach` (workflow: outreach)
- `trigger-followup` (workflow: follow-up)

**In each Webhook node's settings:**

1. Open the node → **Settings**.
2. **HTTP Method**: keep `POST`.
3. **Authentication** → choose **Header Auth**.
4. **Header Name**: `x-n8n-token`
5. **Header Value**: your `N8N_WEBHOOK_TOKEN` (the exact string from `.env`).

**Important — scraper response mode:**

For `trigger-scraper` only, set **Settings → Respond → "On Received"** so n8n
answers the dashboard immediately and lets the Yelp crawling run in the
background (it takes minutes). The outreach and follow-up webhooks can stay on
the default ("When Last Node Finishes" — they finish quickly).

---

## 2. New "leads" workflow (reads the Google Sheet)

Build this workflow so `/admin/leads` can show the sheet:

```
[Webhook] → [Google Sheets (Get rows)] → [Respond to Webhook]
```

**Webhook node**
- **HTTP Method**: `GET`
- **Path**: `leads`
- **Authentication**: Header Auth (`x-n8n-token`, same token)
- **Respond**: default ("When Last Node Finishes")

The webhook URL will be:

```
https://arbynex-n8n.onrender.com/webhook/leads
```

**Google Sheets node**
- **Credential**: connect the Google account owning the leads sheet.
- **Spreadsheet ID**: your leads spreadsheet (the long ID in its URL).
- **Sheet**: select the sheet tab with your lead rows (or add "Sheet" names).
- **Operation**: `Get Many Rows`
- **Options → Output Format**: `Including Headers` ✅

With "Including Headers", every row comes back as an object keyed by the
column names — exactly the columns the dashboard expects:

```
business_name, industry, city, first_name, email, instagram,
status, phone, notes, follow_up_count, last_contacted
```

Keep those exact column names; the dashboard maps them 1:1.

**Respond to Webhook node**
- **Respond With**: `All Incoming Items`

That returns the full array of row objects as JSON — the dashboard accepts
either that array or `{ "leads": [...] }`.

**Activate** the workflow (toggle top-right). The URL only works while the
workflow is active.

---

## 3. Test it

1. Make sure your Render n8n instance is up (`https://arbynex-n8n.onrender.com`).
2. In a terminal:

   ```bash
   # leads (should return your sheet rows as JSON)
   curl -H "x-n8n-token: <N8N_WEBHOOK_TOKEN>" https://arbynex-n8n.onrender.com/webhook/leads

   # trigger lead sourcing (should respond instantly — "On Received")
   curl -X POST -H "Content-Type: application/json" \
        -H "x-n8n-token: <N8N_WEBHOOK_TOKEN>" \
        -d '{"niche":"med spas","city":"Austin, TX"}' \
        https://arbynex-n8n.onrender.com/webhook/trigger-scraper
   ```

3. Log in to `arbynex.com/admin`, run **Lead Sourcing**, then open **Leads**.