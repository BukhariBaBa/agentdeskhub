# AgentDesk — Freelancer Dashboard PRD

**Version 1.0 | Product: agentdeskhub.com**

---

## 1. Product Overview

AgentDesk is a SaaS product that acts as an agentic AI assistant for freelancers. It manages the full freelance lifecycle autonomously: lead generation → proposal → contract → project → invoice → case study → next lead. Six AI agents handle each stage. The freelancer approves every agent action before it executes — nothing happens without human approval.

**Tagline:** Your AI-powered freelance OS

**Domain:** agentdeskhub.com

**Primary user:** Solo freelancers (web dev, design, writing, marketing, video)

**Target markets (priority order):**

1. USA + UK (primary, highest LTV)
2. India + Pakistan (volume)
3. Canada + Australia (HoneyBook refugees)
4. SE Asia + LatAm (year 2)

---

## 2. The Problem

Freelancers waste 30–40% of their working time on business admin — finding leads, writing proposals, chasing invoices, sending status updates. Every competitor (HoneyBook, Dubsado, Bonsai, Plutio) is rules-based automation. None use autonomous AI agents. AgentDesk is the first product where an AI agent does the work and the freelancer just approves it.

**HoneyBook vulnerability:** Raised prices 89% in 2025, serves only US/Canada, creating an active migration opportunity at $140M ARR.

---

## 3. Core Differentiator

**True autonomous agents with human-in-loop approval** vs rules-based automation everywhere else.

Every agent action shows the freelancer exactly what it did and what it plans to send/save. One click to approve, edit, or reject. The freelancer is always in control — the agent does the work.

---

## 4. Six Core Agents

| Agent               | What it does                                                       |
| ------------------- | ------------------------------------------------------------------ |
| **Lead Scout**      | Finds leads, scores fit 0–100, drafts outreach                     |
| **Proposal Agent**  | Turns call notes into 3-tier proposals with pricing                |
| **Project Manager** | Creates milestones, flags scope creep, sends weekly updates        |
| **Finance Agent**   | Invoices from time logs, chases payments, logs revenue             |
| **Client Comms**    | Drafts replies, books meetings, sends testimonial requests         |
| **Content & Brand** | Writes case studies, schedules LinkedIn posts, builds social proof |

---

## 5. The Complete Lifecycle

```
Day 1    Lead arrives
         Lead Scout researches the client, scores them, drafts outreach.
         Freelancer approves in one click.

Day 2    Client responds
         Comms Agent drafts reply. Freelancer approves.
         Meeting booked via Calendly integration.

Day 3    Discovery call
         Freelancer takes the call. Pastes transcript.
         Agent extracts requirements, sets action items.

Day 4    Proposal sent
         Proposal Agent turns call notes into full proposal with 3 pricing tiers.
         PDF sent. Client reviews in portal.

Day 7    Contract signed
         Project Manager Agent creates workspace, milestone plan, client portal.

Week 2–6 Active project
         Agent sends weekly client updates.
         Flags scope creep. Logs time automatically.

Day 45   Project complete
         Finance Agent invoices the client.
         Content Agent starts writing the case study.
         Zero manual work.

Day 52   Payment received
         Revenue logged. Case study published.
         LinkedIn post scheduled.
         New testimonial requested automatically.
```

---

## 6. Pricing

| Plan        | Price      | Runs/mo  | Model      | Notes                     |
| ----------- | ---------- | -------- | ---------- | ------------------------- |
| **Trial**   | Free       | 15 runs  | Haiku 4.5  | 14 days, no card required |
| **Starter** | $19/mo     | 30 runs  | Haiku 4.5  |                           |
| **Pro**     | $39/mo     | 100 runs | Mixed      |                           |
| **Agency**  | $79/mo     | 300 runs | Sonnet 4.6 |                           |
| **Top-up**  | $2/10 runs | —        | —          | All plans                 |

**Trial rules:**

- 14 days, no credit card required
- 15 run limit (enough to experience product, not run a business)
- Soft lock on expiry: can view data, cannot run agents
- Data preserved 30 days post-expiry

---

## 7. Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 14 (App Router)                       |
| Language    | TypeScript                                    |
| Styling     | Tailwind CSS + shadcn/ui                      |
| API         | tRPC + Zod + Next.js Route Handlers           |
| Agent queue | BullMQ on Upstash Redis                       |
| AI          | Anthropic SDK + Vercel AI SDK                 |
| Models      | Haiku 4.5 (Starter), Sonnet 4.6 (Agency)      |
| Database    | Supabase (PostgreSQL) + Drizzle ORM           |
| Auth        | Supabase Auth                                 |
| Storage     | Supabase Storage (PDFs, deliverables)         |
| Payments    | LemonSqueezy                                  |
| Hosting     | Vercel                                        |
| Email       | Resend + React Email                          |
| Errors      | Sentry                                        |
| Dev tooling | npm, ESLint, Prettier, Vitest, GitHub Actions |

**Model cost strategy:**

- Prompt caching: 90% off repeated inputs
- Batch API: 50% off non-urgent runs
- Combined effective savings: up to 95%

---

## 8. Database Schema

### Core Tables

```sql
users
  id              uuid        PK
  email           text        unique
  full_name       text
  avatar_url      text
  created_at      timestamptz

workspaces
  id              uuid        PK
  owner_id        uuid        FK → users
  name            text
  slug            text        unique
  plan            enum        trial|starter|pro|agency
  runs_used       int
  runs_limit      int
  trial_ends_at   timestamptz
  discount_code   text
  discount_pct    int
  status          enum        active|trial|cancelled|suspended
  ls_customer_id  text
  ls_sub_id       text
  notes           text
  created_at      timestamptz

clients
  id              uuid        PK
  workspace_id    uuid        FK
  name            text
  email           text
  company         text
  status          enum        lead|contacted|active|past|lost
  platform        text
  source_url      text
  source_raw      text
  fit_score       int
  fit_breakdown   jsonb
  outreach_sent   boolean
  outreach_sent_at timestamptz
  portal_token    text        unique
  portal_enabled  boolean
  scout_recommendation enum  pursue|maybe|skip
  freelancer_decision  enum  approved|rejected
  outcome         enum        converted|ghosted|lost
  notes           text
  created_at      timestamptz

agent_runs
  id              uuid        PK
  workspace_id    uuid        FK
  agent_type      enum        lead_scout|proposal|project_manager|finance|client_comms|content_brand
  status          enum        pending|running|awaiting_approval|done|failed
  context_id      uuid
  context_type    text
  input_payload   jsonb
  output_payload  jsonb
  approved_by     uuid        FK → users
  approved_at     timestamptz
  tokens_used     int
  model_used      text
  sequence_id     uuid
  created_at      timestamptz

proposals
  id              uuid        PK
  workspace_id    uuid        FK
  client_id       uuid        FK
  title           text
  content_md      text
  tiers           jsonb
  status          enum        draft|sent|accepted|rejected|expired
  amount          numeric
  currency        text
  sent_at         timestamptz
  created_at      timestamptz

projects
  id              uuid        PK
  workspace_id    uuid        FK
  client_id       uuid        FK
  proposal_id     uuid        FK
  name            text
  status          enum        active|paused|complete
  deadline        date
  milestones      jsonb
  weekly_update_day text
  scope_creep_flag boolean
  created_at      timestamptz

invoices
  id              uuid        PK
  workspace_id    uuid        FK
  client_id       uuid        FK
  project_id      uuid        FK
  amount          numeric
  currency        text
  status          enum        draft|sent|paid|overdue
  due_date        date
  paid_at         timestamptz
  pay_link        text
  line_items      jsonb
  created_at      timestamptz

notifications
  id              uuid        PK
  workspace_id    uuid        FK
  run_id          uuid        FK → agent_runs
  type            enum        approval_needed|run_done|payment_due|announcement
  read            boolean
  created_at      timestamptz

time_logs
  id              uuid        PK
  workspace_id    uuid        FK
  project_id      uuid        FK
  date            date
  hours           numeric
  description     text
  billable        boolean
  created_at      timestamptz

integrations
  id              uuid        PK
  workspace_id    uuid        FK
  type            enum        calendly|linkedin|google_calendar|stripe
  access_token    text
  refresh_token   text
  meta            jsonb
  connected_at    timestamptz
```

---

## 9. Feature Specifications

### 9.1 Lead Intake

**Manual Entry (Tab 1):**

- Full name, company, platform (dropdown), project description, budget (optional), source URL (optional)
- Toggle: "Run Lead Scout after saving" — on by default

**Paste & Extract (Tab 2):**

- Large textarea: paste job post, LinkedIn profile, email inquiry, anything
- "Extract with Lead Scout" → pre-fills Tab 1
- Agent pulls: name, company, budget, requirements, contact info

### 9.2 Lead Scoring

Lead Scout scores each lead 0–100 across four dimensions:

| Dimension           | Weight | How scored                                           |
| ------------------- | ------ | ---------------------------------------------------- |
| Niche match         | 35%    | Project requirements vs freelancer specializations   |
| Budget fit          | 30%    | Lead budget vs freelancer minimum rate               |
| Response likelihood | 20%    | Post quality signals (recency, detail, hire history) |
| Project size fit    | 15%    | Scope vs freelancer preferred engagement size        |

**Red flag detection:** "cheapest option" language, no budget, spec work, equity-only, vague brief.

**Scoring data source:** Freelancer's AI Profile (set during onboarding, editable in Settings → AI Profile tab).

### 9.3 Agent Run Approval Flow

Every agent run goes through:

```
pending → running → awaiting_approval → done
                                      → failed
```

Approval card shows:

- Agent name + icon + timestamp
- Input context (collapsed, click to expand)
- Agent output as document preview (NOT chat bubbles)
- Three buttons: Approve & Save (primary), Edit then Approve (secondary), Reject (ghost)
- Token count + model used (subtle footer)

### 9.4 Proposals — 3 Tier System

Proposal Agent generates three pricing tiers:

- **Basic** — core scope, lowest price, shortest timeline
- **Standard** — recommended, balanced scope
- **Premium** — full scope, highest price, longest timeline

Client sees all three tiers in portal, selects one, clicks Accept. Selected tier gets highlighted, others grey out.

### 9.5 Transcript Import

Accessible from Clients page and Projects page. Freelancer pastes raw call transcript (Zoom, Otter.ai, manual notes). Agent extracts:

- Client requirements (bulleted, each approvable)
- Budget mentioned
- Deadline mentioned
- Action items (checklist)
- Suggested project name
- Suggested proposal tier pricing

Approve → saves to project, pre-fills Proposal Agent context.

### 9.6 Client Portal

Token-gated public URL: `agentdeskhub.com/client/[unique-token]`

- No login required for client
- Zero AgentDesk branding (white-label, freelancer's name/logo only)
- Read-only except: accept proposal, leave message, pay invoice, submit testimonial

**Tabs:** Overview | Proposals | Projects | Invoices

After invoice marked paid → testimonial form appears automatically.

### 9.7 Post-Project Automation Sequence

When invoice marked as Paid, dashboard shows sequence card:

```
🎉 Project complete — Acme Corp

✅ Invoice paid
🔄 Case study draft ready     [Review →]
⬜ LinkedIn post scheduled    [Review →]
⬜ Testimonial request sent   [Review →]
```

Each item is a separate agent run awaiting approval.

### 9.8 Onboarding Wizard

5 steps on first login. Cannot skip steps 1–2.

1. **Workspace setup** — name, logo
2. **AI Profile** — skills, niche, rates, preferred project length/size, red flags
3. **Add first lead** — manual or paste (skippable)
4. **Run first agent** — guided Lead Scout run (skippable)
5. **Done** — redirect to dashboard

---

## 10. Build Plan — 12 Weeks

### Phase 1: Foundation (Weeks 1–4)

**Week 1 — Scaffold + Auth**

- Init Next.js 14, pnpm, ESLint, Tailwind, shadcn/ui
- Supabase project: auth (email/password + magic link), RLS policies
- Drizzle schema: users, workspaces, clients — run first migration
- Workspace creation flow (onboarding wizard shell, slug generation)
- Deploy to Vercel, set env vars
- Build in public: first Twitter post

**Week 2 — Core data + dashboard shell**

- Clients table UI (add/edit/delete, status badges)
- Proposals schema + basic form
- Projects + invoices skeleton UI
- Sidebar nav with all 6 agent icons (greyed, coming soon)
- Dashboard layout + metric cards

**Week 3 — Agent infrastructure**

- Upstash Redis + BullMQ: agent job queue with retry/timeout
- agent_runs table + status machine
- Anthropic SDK integration, prompt caching headers
- Human-in-loop: approval UI — show agent output, Approve/Edit/Reject
- Run counter per workspace (enforce plan limits)

**Week 4 — First 2 agents live**

- Lead Scout: input → AI finds/scores leads → approval → saves to clients
- Proposal Agent: client + brief → AI drafts 3-tier proposal → approval → saves
- Notification system (in-app bell + Resend email on approval needed)
- DM 20 freelancers, show demo video

---

### Phase 2: MVP Launch (Weeks 5–8)

**Week 5 — Payments + ProductHunt**

- LemonSqueezy: 3 products, webhook → update workspace plan
- Plan gate middleware: enforce run limits, upgrade prompt at 80%
- Billing page: current plan, usage bar, upgrade CTA
- Trial logic: 14-day timer, 15-run limit, soft lock on expiry
- ProductHunt launch
- Goal: first 3 paying users

**Week 6 — Project Manager Agent**

- PM Agent: project details → AI creates milestone plan (jsonb)
- Project view: milestone timeline, status updates, deadline warnings
- Scope creep detection banner
- Weekly client update toggle + auto-draft

**Week 7 — Finance Agent + invoicing**

- Finance Agent: auto-generate invoice from project + time logs → approval → PDF
- Payment reminder emails (overdue logic)
- Income dashboard: pipeline value, hours this week
- Time logging UI

**Week 8 — Client Comms Agent**

- Client Comms Agent: context + tone → AI drafts email → approval → clipboard
- Follow-up sequence: reminder → agent drafts check-in email
- Target: $300 MRR
- SEO: publish "HoneyBook alternatives 2026" landing page

---

### Phase 3: Growth (Weeks 9–12)

**Week 9 — Content & Brand Agent**

- Content Agent: completed project → case study → approval → saves as markdown
- LinkedIn post generator from project outcomes
- Post-project automation sequence card (4 actions, one card)
- Full lifecycle demo video (hero content)

**Week 10 — Onboarding + retention**

- Onboarding wizard: 5-step setup
- Resend drip: welcome, day 3, day 7, day 14
- Churn signal: 0 runs in 7 days → "need help?" email
- Target: $2K MRR

**Week 11 — Referral + performance**

- Referral: unique link, 1 free month per conversion
- Roll out Batch API for non-urgent runs (50% cost cut)
- Sentry error tracking + Vercel analytics
- Performance audit

**Week 12 — Agency plan + scale prep**

- Agency plan: 300 runs, Sonnet 4.6 routing, basic team seats
- SEO: 3 more pages (Dubsado alternative, Bonsai alternative, AI freelance tools)
- Month-3 retrospective
- Target: $3.5K MRR (personal breakeven)

---

## 11. MRR Milestones

| Month    | Target  | Users needed |
| -------- | ------- | ------------ |
| Month 2  | $300    | ~10 paying   |
| Month 4  | $2,000  | ~50 paying   |
| Month 6  | $3,500  | ~90 paying   |
| Month 12 | $10,000 | ~250 paying  |

---

## 12. Infra Costs at Launch

| Service                | Cost           |
| ---------------------- | -------------- |
| Vercel Pro             | $20/mo         |
| Supabase Pro           | $25/mo         |
| Upstash Redis          | $0–10/mo       |
| Resend                 | $0             |
| Sentry                 | $0             |
| Domain                 | $1/mo          |
| Anthropic API (cached) | $5–15/mo       |
| **Total**              | **~$51–71/mo** |

Break-even: 8–14 paying users.

---

## 13. Go-to-Market

- Build in public on Twitter/X + LinkedIn from day 1
- Post to r/freelance, r/webdev, IndieHackers at launch
- DM 50 freelancers before launch
- SEO targeting "HoneyBook alternatives" keywords
- ProductHunt launch at week 5
- Referral program (1 free month per referral) — months 10–12

---

## 14. Deferred Features

| Feature                      | When                         |
| ---------------------------- | ---------------------------- |
| Apollo API lead enrichment   | Post-launch (month 3+)       |
| Chrome Extension             | Month 3                      |
| Kanban board                 | Month 6 (Agency plan)        |
| RAG / Vector DB              | v2                           |
| NestJS / Docker / AWS        | At significant revenue scale |
| Zapier / webhook lead intake | Month 4+                     |

---

## 15. API Cost Per Run (Post-Caching)

| Tier    | Model             | Effective cost/run |
| ------- | ----------------- | ------------------ |
| Starter | Haiku 4.5 cached  | ~$0.003            |
| Pro     | Mixed             | ~$0.008            |
| Agency  | Sonnet 4.6 cached | ~$0.016            |

Total API cost at full capacity across all plans: under $20/month at launch.
