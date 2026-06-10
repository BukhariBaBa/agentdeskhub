# AgentDesk — Client Portal PRD
**Version 1.0 | URL: agentdeskhub.com/client/[token]**

---

## 1. Overview

The Client Portal is a separate, public-facing view that freelancers share with their clients. It gives clients a clean, professional window into their project — proposals to review, milestones to track, invoices to pay — without requiring a login or exposing any AgentDesk internals.

**Key principle:** The client should feel like they're using the freelancer's own branded tool, not a third-party SaaS.

---

## 2. Access Model

```
URL:        agentdeskhub.com/client/[unique-token]
Auth:       Token-gated only — no login required
Token:      UUID generated per client on creation
Sharing:    Freelancer copies link from dashboard → sends to client
Control:    Freelancer can disable portal per client
Visibility: Client sees only their own data
```

**Token generation:** Auto-generated when client is created. Stored in `clients.portal_token`. Regeneratable by freelancer (invalidates old link).

---

## 3. What Clients Can Do

| Action | Allowed |
|---|---|
| View proposals | ✅ |
| Accept a proposal tier | ✅ |
| Request proposal changes | ✅ |
| View project milestones | ✅ Read-only |
| View deliverable files | ✅ Download |
| View invoices | ✅ |
| Pay invoice (external link) | ✅ |
| Download invoice PDF | ✅ |
| Send message to freelancer | ✅ |
| Submit testimonial | ✅ (after payment) |
| Edit any data | ❌ |
| See agent names or runs | ❌ |
| See token counts or models | ❌ |
| See other clients' data | ❌ |

---

## 4. Branding Rules

- Freelancer's logo (from workspace settings) in header
- Freelancer's name displayed, not AgentDesk
- Zero AgentDesk branding anywhere in the portal
- White-label feel throughout
- Footer can show freelancer's custom text (configurable in Settings → Portal tab)

---

## 5. Screen Specifications

### 5.1 Portal Header

```
[Freelancer Logo]  [Freelancer Name / Company]
"Welcome back, [Client Company Name]"
```

Clean minimal top bar. No sidebar. No navigation beyond the 4 tabs.

---

### 5.2 Overview Tab

**Active project card:**
- Project name
- Progress bar (milestones complete / total)
- Deadline countdown ("12 days remaining")

**Latest invoice summary:**
- Amount, due date, status badge
- [Pay Now →] button (if pay link is set and invoice is unpaid)

**Recent activity timeline (last 5 events):**
- "Milestone 2 marked complete — June 1"
- "Invoice #004 sent — May 28"
- "Proposal accepted — May 15"
- "Project started — May 12"

**Message box:**
- "Send a message to [Freelancer Name]"
- Textarea + [Send Message] button
- On submit → creates notification in freelancer's dashboard
- Appears in Project → Client Messages tab

---

### 5.3 Proposals Tab

**Proposal list:**
- Title | Amount | Date sent | Status badge
- Click to open proposal detail

**Proposal detail:**
- Three tier cards side by side: Basic / Standard / Premium
- Each card: scope summary, price, delivery timeline, inclusions list
- **Pending proposals:** [Accept this proposal ✓] (emerald) | [Request Changes] (secondary)
- Client selects one tier → highlights it, other two grey out
- Confirm → status changes to Accepted, freelancer notified
- **Accepted:** green checkmark + accepted date
- **Rejected/expired:** greyed out with status label

**Status badges:**
- Draft (zinc) — not visible to client
- Sent (indigo)
- Accepted (emerald)
- Rejected (rose)
- Expired (amber)

---

### 5.4 Projects Tab

**Active project details:**
- Name, description, start date, deadline

**Milestone timeline (vertical):**
```
✅ Discovery & wireframes — Completed May 10
🔄 Frontend development  — In Progress
⬜ QA & testing          — Upcoming
⬜ Launch                — Jun 15
```

**Deliverables section:**
- Files uploaded by freelancer
- File name | Upload date | [Download] button
- Only files marked "visible to client" appear here

**Read only** — client cannot edit milestones or upload files.

---

### 5.5 Invoices Tab

**Invoice list:**
- Invoice # | Description | Amount | Due date | Status badge

**Invoice detail view:**
- From / To header block
- Line items table: Description | Qty | Rate | Total
- Subtotal | Tax | Total (bold, larger)
- Due date
- [Pay Now →] button — links to external pay link (Stripe, Wise, etc)
  - Full-width on mobile, prominent emerald color
- [Download PDF] button (secondary)
- Paid invoices: emerald badge + "Paid on [date]"
- Overdue: rose badge + "X days overdue"

**After payment confirmed (invoice marked paid by freelancer):**
Simple testimonial form appears:
```
How was working with [Freelancer Name]?
★ ★ ★ ★ ★  (star rating)
[Share your experience (optional)]
[Submit]
```
Submitted testimonials saved to workspace. Shown in Settings → Social Proof section.

---

## 6. Mobile-First Design

Client portal is **mobile-first**. Most clients open portal links on their phone.

- [Pay Now] button always full-width on mobile
- Milestone timeline readable at 375px viewport
- Proposal tier cards stack vertically on mobile (not side by side)
- File download links large tap targets
- Message box prominent on mobile

Desktop: centered max-width 800px card layout.

---

## 7. Portal Settings (Freelancer Controls)

Accessible from Settings → Portal tab:

```
Toggle:   Enable client portal globally (on/off)
Custom welcome message: shown on portal home
Custom footer text
Preview link: [Open Portal Preview →]
```

Per-client control in Clients table:
- Lock/unlock icon in Portal column
- Toggle portal on/off per individual client

---

## 8. Database Fields

```sql
-- clients table additions
portal_token         text        unique, auto-generated
portal_enabled       boolean     default true

-- invoices table additions
pay_link             text        external payment URL
pdf_url              text        Supabase Storage URL

-- projects table additions
deliverables         jsonb       [{name, url, visible_to_client, uploaded_at}]

-- testimonials table (new)
id                   uuid        PK
workspace_id         uuid        FK
client_id            uuid        FK
rating               int         1–5
text                 text
submitted_at         timestamptz
```

---

## 9. Build Timeline

| Week | What ships |
|---|---|
| Week 6 | Portal skeleton: Overview + Projects tabs |
| Week 7 | Proposals tab (3-tier acceptance) + Invoices tab |
| Week 7 | Testimonial form after payment |
| Week 8 | Portal settings (per-client toggle, custom message) |
| Week 9 | Mobile polish pass |
| Week 10 | Deliverables file upload + download |

---

## 10. Key Rules for Developers

1. Every portal route must validate `portal_token` against `clients` table
2. If `portal_enabled = false`, return 404 (not 403 — don't confirm existence)
3. Never expose `workspace_id`, `agent_runs`, or any internal data in portal API responses
4. Portal API routes live at `/api/portal/[token]/...` separate from `/api/trpc/...`
5. Rate-limit portal routes (prevent scraping)
6. Token should be a full UUID v4 (not sequential, not guessable)
7. Regenerating token immediately invalidates old link — warn freelancer before doing so

---

## 11. Notifications to Freelancer from Portal

When client takes action in portal, freelancer gets notified:

| Client action | Notification |
|---|---|
| Accepts proposal | Bell notification + email "Acme Corp accepted your proposal" |
| Requests changes | Bell notification + message in Client Comms queue |
| Sends message | Bell notification + message in Project → Client Messages |
| Pays invoice | Bell notification + triggers post-project automation sequence |
| Submits testimonial | Bell notification + saved to Social Proof |
