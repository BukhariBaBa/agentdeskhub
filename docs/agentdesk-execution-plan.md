# AgentDesk — Complete Execution Plan

**Solo founder build plan | 12 weeks to launch + growth**

---

## Quick Reference

| Item           | Detail                                               |
| -------------- | ---------------------------------------------------- |
| Product        | AgentDesk — AI-powered freelance OS                  |
| Domain         | agentdeskhub.com                                     |
| Stack          | Next.js 14, Supabase, Drizzle, BullMQ, Anthropic SDK |
| Payments       | LemonSqueezy                                         |
| Hosting        | Vercel                                               |
| Launch target  | Week 5 (ProductHunt)                                 |
| Breakeven      | 8–14 paying users                                    |
| Month 6 target | $3,500 MRR (personal breakeven)                      |

---

## Pre-Build Checklist (Do These Before Writing Code)

- [ ] Buy domain: agentdeskhub.com (Namecheap or Cloudflare Registrar)
- [ ] Create Vercel account, connect GitHub repo
- [ ] Create Supabase project (free tier to start)
- [ ] Create Upstash account (free tier)
- [ ] Create LemonSqueezy account, verify identity
- [ ] Create Resend account (email)
- [ ] Create Sentry account (free tier)
- [ ] Create Anthropic API account, get API key
- [ ] Set up Twitter/X account (@agentdeskhub) — check availability
- [ ] Set up LinkedIn page (AgentDeskHub)
- [ ] Set up GitHub org/repo (agentdeskhub)
- [ ] Set up ProductHunt account (prepare hunter outreach)

---

## Phase 1 — Foundation (Weeks 1–4)

### Week 1: Project Scaffold + Auth

**Goal:** Working Next.js app deployed on Vercel with auth and DB connected.

**Step-by-step:**

```
Day 1 — Project init
□ npx create-next-app@latest agentdesk --typescript --tailwind --app
□ Install dependencies:
    npm install @supabase/supabase-js @supabase/ssr
    npm install drizzle-orm drizzle-kit
    npm install @trpc/server @trpc/client @trpc/next
    npm install zod
    npm install lucide-react
    npx shadcn-ui@latest init
□ Set up ESLint + Prettier config
□ Create GitHub repo, push initial commit
□ Connect repo to Vercel, set up auto-deploy

Day 2 — Supabase setup
□ Create Supabase project
□ Set up env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
□ Enable email auth in Supabase dashboard
□ Configure Supabase SSR client (server + client components)
□ Create auth middleware (protect /dashboard routes)

Day 3 — Drizzle schema (users + workspaces)
□ Install: npm install drizzle-orm pg
□ Create /db/schema.ts with users + workspaces tables
□ Create /db/index.ts (Drizzle + Postgres connection)
□ Run first migration: npx drizzle-kit push
□ Add RLS policies in Supabase dashboard

Day 4 — Auth pages
□ /app/(auth)/login/page.tsx — email + password form
□ /app/(auth)/signup/page.tsx — signup form
□ /app/(auth)/magic-link/page.tsx — magic link option
□ Auth callback route handler
□ Test login/logout flow end to end

Day 5 — Workspace creation + onboarding shell
□ After signup → redirect to /onboarding
□ Step 1: workspace name + slug generation
□ Create workspace in DB on submit
□ Redirect to /dashboard after workspace created
□ Basic /dashboard layout (sidebar + topbar shell, no content yet)
□ Deploy to Vercel, test on live URL

Day 6 — Polish + build in public
□ Add loading states to auth forms
□ Add error handling (duplicate email, wrong password)
□ Set up Resend: welcome email on signup
□ Tweet: "Day 1 of building AgentDesk in public — agentic AI for freelancers"
□ Post on LinkedIn same content
```

**Week 1 deliverable:** agentdeskhub.com is live, you can sign up, create a workspace, see an empty dashboard.

---

### Week 2: Core Data + Dashboard Shell

**Goal:** Clients CRUD, dashboard layout, all screens scaffolded (empty but navigable).

**Step-by-step:**

```
Day 1 — Extend Drizzle schema
□ Add to schema.ts:
    clients table (all fields including fit_score, portal_token, etc.)
    proposals table
    projects table
    invoices table
    notifications table
    time_logs table
    integrations table
□ Run migration: npx drizzle-kit push
□ Seed script: create 3 sample clients for dev

Day 2 — tRPC setup + Clients CRUD
□ Set up tRPC router (/server/trpc.ts, /server/routers/)
□ clients router: getAll, getById, create, update, delete
□ /app/dashboard/clients/page.tsx — table view
□ Status badges (lead/contacted/active/past/lost)
□ Add Lead button (opens drawer, no agent yet — manual form only)
□ Test: add a client manually, see in table

Day 3 — Dashboard home
□ 5 metric cards: Active Clients, Open Proposals, Active Projects,
  Revenue This Month, Hours This Week
□ "Pending Approvals" section — empty state for now
□ Recent Activity feed — empty state for now
□ Sidebar nav: all links working (Clients ✅, rest go to empty pages)

Day 4 — Remaining pages scaffold
□ /dashboard/proposals — empty table + "Generate Proposal" button (disabled)
□ /dashboard/projects — empty table + "New Project" button (disabled)
□ /dashboard/invoices — empty table + "Generate Invoice" button (disabled)
□ /dashboard/agents — 6 agent cards, all greyed "Coming Soon"
□ /dashboard/integrations — placeholder
□ /dashboard/settings — placeholder

Day 5 — Notifications + topbar
□ Notifications table routes
□ Bell icon in topbar with unread count badge
□ Dropdown: empty state "No notifications yet"
□ Plan usage bar in sidebar (mock data for now)

Day 6 — Onboarding wizard skeleton
□ /onboarding multi-step shell (5 steps, progress bar)
□ Step 1: workspace name (done in week 1)
□ Step 2: AI Profile form (skills, niche, rates, red flags)
□ Save AI profile to workspace metadata
□ Steps 3–5: placeholder "Skip" only for now
□ Tweet: "Dashboard is taking shape — here's what AgentDesk looks like"
    (screenshot)
```

**Week 2 deliverable:** Full navigation, clients CRUD working, all pages exist (most empty), AI Profile can be saved.

---

### Week 3: Agent Infrastructure

**Goal:** BullMQ queue running, agent_runs table working, approval UI built. No real AI yet — just the plumbing.

**Step-by-step:**

```
Day 1 — Upstash Redis + BullMQ
□ npm install bullmq ioredis
□ Set up Upstash Redis connection
□ Create /lib/queue.ts — AgentQueue with BullMQ
□ Create /lib/worker.ts — job processor (stub, no AI yet)
□ Test: enqueue a job, see it process

Day 2 — agent_runs table + state machine
□ Add agent_runs to Drizzle schema, migrate
□ agent_runs tRPC router: create, updateStatus, getByWorkspace
□ State machine: pending → running → awaiting_approval → done/failed
□ Run counter enforcement: check runs_used < runs_limit before enqueue
□ Increment runs_used on job start

Day 3 — Anthropic SDK integration
□ npm install @anthropic-ai/sdk ai (Vercel AI SDK)
□ /lib/anthropic.ts — client with prompt caching headers
□ Model router: plan → model mapping
    starter → claude-haiku-4-5
    pro → claude-haiku-4-5 (complex) + claude-sonnet-4-6 (simple)
    agency → claude-sonnet-4-6
□ Test: one raw API call works

Day 4 — Approval UI
□ /dashboard/approvals/[id]/page.tsx
□ ApprovalCard component:
    Agent name + icon + timestamp
    Input context (collapsed section)
    Output as document preview (NOT chat bubble)
    Three buttons: Approve & Save | Edit then Approve | Reject
    Token count + model (subtle footer)
□ Pending Approvals section on dashboard now shows real data
□ Bell icon notification count live

Day 5 — Agent runner base
□ /lib/agents/base.ts — AgentRunner class
□ Methods: run(), approve(), reject(), edit()
□ On approve: saves output to relevant table (client, proposal, etc.)
□ On reject: marks run as rejected, no side effects
□ Error handling: failed jobs → status=failed + error message stored

Day 6 — Run limits + upgrade prompts
□ UsageMeter component (sidebar + agents page):
    default: indigo fill
    80%: amber fill + "Consider upgrading"
    95%: rose fill + "Upgrade now to avoid interruption"
□ Gate: at limit → show upgrade modal, block run
□ Test full flow: mock run → approval card → approve → done
□ Tweet: "Built the human-in-loop approval system today — every AI
    action needs your sign-off before anything happens"
```

**Week 3 deliverable:** Full agent queue working, approval UI live, run limits enforced. Ready to plug in real agent prompts.

---

### Week 4: First Two Agents Live

**Goal:** Lead Scout + Proposal Agent working end to end with real AI.

**Step-by-step:**

```
Day 1 — Lead Scout prompt
□ /lib/agents/lead-scout.ts
□ System prompt using AI Profile data:
    Freelancer skills, niche, rates, industries, red flags
□ Input: raw lead text or structured data
□ Output (JSON):
    fit_score (0-100)
    fit_breakdown {niche, budget, response, size}
    red_flags []
    recommendation (pursue/maybe/skip)
    drafted_outreach (text)
□ Test prompt with 3 sample leads

Day 2 — Lead Scout UI
□ Add Lead modal Tab 2 (Paste & Extract) now works
□ "Run Lead Scout" toggle on manual entry form
□ Lead Scout approval card renders:
    Fit Score ring (rose/amber/emerald)
    Score breakdown bars
    Red flags detected
    Drafted outreach (editable text area)
□ Approve → saves fit_score to client, marks outreach_sent

Day 3 — Transcript import
□ "Paste Call Transcript" button on Clients + Projects pages
□ TranscriptModal component
□ /lib/agents/transcript-extractor.ts prompt:
    Input: raw transcript text
    Output: requirements[], budget, deadline, action_items[], project_name
□ Approval card renders extracted data
□ Approve → saves to project, pre-fills Proposal Agent

Day 4 — Proposal Agent prompt
□ /lib/agents/proposal.ts
□ System prompt: uses client data + transcript extraction + freelancer profile
□ Output (JSON):
    three_tiers: [{name, price, timeline, scope, includes[]}]
    cover_letter (markdown)
    notes (internal)
□ Test with 2 sample clients

Day 5 — Proposal Agent UI
□ Proposal approval card:
    Three tier cards side by side (Basic/Standard/Premium)
    Cover letter below
    Each tier editable before approve
□ Approve → saves to proposals table with tiers jsonb
□ "Send to Client" button → enables portal visibility
□ Proposals page now shows real data

Day 6 — Demo + outreach
□ Record 3-minute demo video: Lead → Proposal flow
□ DM 20 freelancers on Twitter/LinkedIn with demo video
□ "Which part of freelancing do you hate most?" poll on Twitter
□ Fix any bugs from testing
□ Deploy, smoke test on production
```

**Week 4 deliverable:** Lead Scout + Proposal Agent working. Real AI. Real approval flow. Demo-ready.

---

## Phase 2 — MVP Launch (Weeks 5–8)

### Week 5: Payments + ProductHunt Launch

**Goal:** First paying users.

**Step-by-step:**

```
Day 1 — LemonSqueezy setup
□ Create 3 products in LemonSqueezy:
    Starter $19/mo (30 runs)
    Pro $39/mo (100 runs)
    Agency $79/mo (300 runs)
□ Get product/variant IDs
□ Create checkout URLs for each plan

Day 2 — Trial system
□ trial_ends_at column added to workspaces
□ Set trial_ends_at = created_at + 14 days on signup
□ runs_limit = 15 during trial
□ Trial expiry check middleware:
    If trial_ends_at < now AND plan = 'trial':
      agents blocked, show upgrade modal
      data still visible (soft lock)
□ Trial countdown banner on dashboard

Day 3 — LemonSqueezy webhook
□ /api/webhooks/lemonsqueezy route handler
□ Verify webhook signature
□ On subscription_created: update plan + runs_limit
□ On subscription_updated: update plan
□ On subscription_cancelled: set status = cancelled
□ On payment_success: log to payments (future admin use)
□ Test with LemonSqueezy webhook simulator

Day 4 — Billing page
□ /dashboard/settings/billing
□ Current plan card (name, price, renewal date)
□ Usage bar (runs used / limit)
□ Upgrade button → LemonSqueezy checkout URL
□ Payment history table (from DB)
□ Top-up option: $2 / 10 runs

Day 5 — ProductHunt prep
□ Write PH tagline: "The first agentic AI OS for freelancers"
□ Create PH assets: logo, 3 screenshots, demo GIF
□ Write PH description (250 words)
□ Reach out to 5 potential hunters
□ Schedule launch for Day 6

Day 6 — ProductHunt launch day
□ Post to ProductHunt (aim for 6am EST)
□ Post to Twitter/X, LinkedIn, Reddit r/freelance, r/webdev, IndieHackers
□ DM another 30 freelancers
□ Reply to every comment on PH throughout the day
□ Goal: first 3 paying users this week
```

---

### Week 6: Project Manager Agent

```
□ PM Agent prompt:
    Input: project name, description, client, deadline, budget
    Output: milestones[], tasks per milestone, suggested weekly update day
□ Milestone timeline UI (vertical, ✅/🔄/⬜)
□ Scope creep detection:
    PM Agent monitors client messages for out-of-scope requests
    Banner: "⚠ Scope creep detected — [description]. Draft Change Notice?"
□ Weekly update toggle on project settings
    Auto-queues Comms Agent run every chosen weekday
□ Projects page now fully functional
□ Fix ProductHunt launch bugs
□ Reply to every PH comment + review
```

---

### Week 7: Finance Agent + Client Portal

```
Day 1-2 — Finance Agent
□ Finance Agent prompt:
    Input: project, time_logs, client
    Output: invoice line_items[], total, payment_instructions
□ Invoice approval card: line items table, total, due date
□ PDF generation: Supabase Storage
□ Payment reminder logic: cron job checks overdue invoices daily
□ Income dashboard widget: pipeline value, hours this week

Day 3-5 — Client Portal
□ /app/client/[token]/page.tsx — public route
□ Token validation middleware (404 if disabled)
□ Overview tab: project card, invoice summary, activity timeline, message box
□ Proposals tab: 3-tier cards, Accept / Request Changes buttons
□ Projects tab: milestone timeline (read-only), deliverables download
□ Invoices tab: line items, Pay Now (external link), Download PDF
□ Testimonial form: appears after invoice marked paid
□ Mobile-first responsive layout
□ Zero AgentDesk branding

Day 6 — Portal settings + polish
□ Settings → Portal tab: enable/disable toggle, custom message
□ Per-client portal toggle in Clients table
□ Copy portal link button + toast confirmation
□ "Share with Client" button on proposal/project detail
```

---

### Week 8: Client Comms Agent + SEO

```
Day 1-2 — Client Comms Agent
□ Comms Agent prompt:
    Input: context (email thread / message / situation), tone, client info
    Output: drafted reply, subject line, suggested send time
□ Calendly integration: OAuth connect, auto-append booking link
□ Follow-up sequence: schedule → agent drafts check-in on date
□ Client Messages tab on project detail (from portal messages)

Day 3 — Post-project automation sequence
□ Invoice paid trigger → create sequence card on dashboard
□ 4 agent runs queued automatically:
    1. Content Agent: draft case study
    2. Content Agent: draft LinkedIn post
    3. Comms Agent: draft testimonial request
□ Sequence card shows all 4 with [Review →] links

Day 4 — SEO landing pages
□ /app/(marketing)/alternatives/honeybook/page.tsx
□ /app/(marketing)/page.tsx — main homepage
□ Target keywords: "HoneyBook alternative", "freelance OS", "AI for freelancers"
□ Submit sitemap to Google Search Console

Day 5 — Revenue push
□ Target: $300 MRR this week
□ Personal outreach to 50 freelancers total
□ Offer: "I'll personally onboard you and give you 1 month free if you
    give me honest feedback"
□ Fix top 3 bugs from user feedback
```

---

## Phase 3 — Growth (Weeks 9–12)

### Week 9: Content & Brand Agent

```
□ Content Agent prompt (case study):
    Input: project details, outcomes, client info
    Output: case_study_md (full markdown), linkedin_post, testimonial_request_email
□ Content approval card: case study preview + LinkedIn post preview
□ LinkedIn OAuth: connect account, schedule post
□ Schedule picker: date/time selector before approving LinkedIn post
□ Testimonial form triggers in portal
□ Testimonials saved to workspace, shown in Settings → Social Proof
□ Record full lifecycle demo video (the hero content):
    Lead Scout → Proposal → Project → Invoice → Case Study → LinkedIn
□ Post video: "I built an AI that runs my entire freelance business"
```

---

### Week 10: Onboarding + Retention

```
□ Complete onboarding wizard (all 5 steps functional):
    Step 1: Workspace ✅ (done week 1)
    Step 2: AI Profile ✅ (done week 2)
    Step 3: Add first lead (Lead Scout modal)
    Step 4: Run first agent (guided)
    Step 5: Share first portal link
□ Resend drip sequence:
    Day 0:  Welcome + "here's how to get started"
    Day 3:  "Have you run Lead Scout yet? Here's how"
    Day 7:  "Proposal Agent tip: paste your call transcript"
    Day 14: "Your trial is ending — here's what you'll lose access to"
□ Churn signal: workspace with 0 runs in 7 days
    Trigger: "need help?" email with 1-click Calendly booking
□ Target: $2K MRR
□ Post milestone publicly: "$2K MRR — here's what worked"
```

---

### Week 11: Super Admin + Referral

```
Day 1-2 — Super Admin (basic)
□ /admin login page (separate auth)
□ admin_users table + bcrypt auth
□ adminAuthMiddleware for all /admin routes
□ /admin/workspaces — table with search + filters
□ /admin/payments — transactions table
□ Workspace detail drawer: owner info, runs, plan history
□ Manual plan override modal

Day 3 — Super Admin (discounts)
□ /admin/subscriptions — LemonSqueezy data
□ /admin/discounts — create/manage discount codes
□ Discount application in checkout flow

Day 4 — Referral program
□ Unique referral link per workspace
□ /r/[code] redirect + attribution tracking
□ On referee upgrade: credit 1 free month to referrer
□ "Refer a freelancer" section in Settings

Day 5 — Performance
□ Batch API rollout for non-urgent runs (50% cost reduction)
□ Sentry error tracking live + alerts set up
□ Vercel Analytics: track signups, upgrade events
□ Lighthouse audit: fix top issues
□ npm audit: fix vulnerabilities
```

---

### Week 12: Agency Plan + Scale Prep

```
Day 1-2 — Agency plan features
□ Sonnet 4.6 routing for Agency plan confirmed
□ Basic team seats: invite team member (read-only access)
□ Agency badge in sidebar
□ 300 runs/month confirmed

Day 3-4 — More SEO
□ /alternatives/dubsado — "Dubsado alternative 2026"
□ /alternatives/bonsai — "Bonsai alternative 2026"
□ /blog/ai-freelance-tools — "Best AI tools for freelancers 2026"
□ Submit all new pages to Search Console

Day 5-6 — Month 3 retrospective
□ Write "Month 3 of building AgentDesk — $X MRR, X users, what worked"
□ Post on Twitter/X, LinkedIn, IndieHackers
□ Target: $3,500 MRR (personal breakeven)
□ Decision: double down solo or bring in first collaborator?
□ Plan month 4: based on what users actually asked for
```

---

## MRR Milestones Tracker

| Month    | Target            | Status |
| -------- | ----------------- | ------ |
| Month 1  | First paying user | —      |
| Month 2  | $300 MRR          | —      |
| Month 4  | $2,000 MRR        | —      |
| Month 6  | $3,500 MRR        | —      |
| Month 12 | $10,000 MRR       | —      |

---

## Weekly Rhythm (Every Week)

```
Monday:    Plan the week (30 min) — what ships by Sunday?
Daily:     1 build in public post (Twitter/X or LinkedIn)
           What you built, what you learned, what's next
Wednesday: Fix any bugs from user reports
Friday:    Deploy week's work, smoke test on production
Sunday:    Write 1 tweet thread about something you learned
```

---

## Agent Prompt Files to Create

Create these files in `/lib/agents/`:

```
/lib/agents/
  base.ts              ← AgentRunner base class
  lead-scout.ts        ← Lead Scout prompt + parser
  proposal.ts          ← Proposal Agent prompt + parser
  project-manager.ts   ← PM Agent prompt + parser
  finance.ts           ← Finance Agent prompt + parser
  client-comms.ts      ← Comms Agent prompt + parser
  content-brand.ts     ← Content Agent prompt + parser
  transcript.ts        ← Transcript extractor
```

Each agent file exports:

```typescript
export const agentConfig = {
  name: string
  systemPrompt: string (uses freelancer profile)
  inputSchema: z.ZodSchema
  outputSchema: z.ZodSchema
  model: (plan: Plan) => string
}
```

---

## Environment Variables Checklist

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database
DATABASE_URL=

# Anthropic
ANTHROPIC_API_KEY=

# LemonSqueezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_STORE_ID=

# Upstash Redis (BullMQ)
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# Resend (email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@agentdeskhub.com

# Sentry
SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=https://agentdeskhub.com
ADMIN_JWT_SECRET=        ← for super admin sessions
```

---

## Folder Structure

```
agentdesk/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── magic-link/
│   ├── (marketing)/
│   │   ├── page.tsx            ← homepage
│   │   └── alternatives/
│   ├── dashboard/
│   │   ├── layout.tsx          ← sidebar + topbar
│   │   ├── page.tsx            ← dashboard home
│   │   ├── clients/
│   │   ├── proposals/
│   │   ├── projects/
│   │   ├── invoices/
│   │   ├── agents/
│   │   ├── integrations/
│   │   └── settings/
│   ├── client/
│   │   └── [token]/            ← client portal
│   ├── admin/
│   │   ├── login/
│   │   ├── overview/
│   │   ├── workspaces/
│   │   ├── subscriptions/
│   │   ├── packages/
│   │   ├── discounts/
│   │   ├── payments/
│   │   ├── runs/
│   │   └── announcements/
│   └── api/
│       ├── trpc/
│       ├── webhooks/
│       │   └── lemonsqueezy/
│       ├── portal/
│       │   └── [token]/
│       └── auth/
│           └── callback/
├── components/
│   ├── ui/                     ← shadcn components
│   ├── dashboard/              ← dashboard-specific
│   ├── portal/                 ← client portal
│   └── admin/                  ← admin panel
├── lib/
│   ├── agents/                 ← all 6 agent files + base
│   ├── queue.ts                ← BullMQ setup
│   ├── worker.ts               ← job processor
│   ├── anthropic.ts            ← Anthropic client
│   ├── supabase/               ← server + client helpers
│   └── email/                  ← Resend templates
├── server/
│   ├── trpc.ts
│   └── routers/
│       ├── clients.ts
│       ├── proposals.ts
│       ├── projects.ts
│       ├── invoices.ts
│       ├── agents.ts
│       ├── notifications.ts
│       └── billing.ts
└── db/
    ├── schema.ts               ← all Drizzle tables
    ├── index.ts                ← DB connection
    └── migrations/
```

---

## Risk Register

| Risk                           | Likelihood | Impact | Mitigation                                                          |
| ------------------------------ | ---------- | ------ | ------------------------------------------------------------------- |
| Anthropic API outage           | Low        | High   | Graceful error in approval UI, retry queue                          |
| LemonSqueezy payment failure   | Low        | High   | Webhook idempotency, manual override in admin                       |
| BullMQ job stuck               | Medium     | Medium | 5-min timeout, dead letter queue, Sentry alert                      |
| Supabase RLS misconfiguration  | Medium     | High   | Test RLS policies before launch, separate test workspace            |
| Trial abuse (fake accounts)    | Medium     | Low    | Email verification required, monitor in admin                       |
| Low ProductHunt conversion     | Medium     | Medium | Pre-warm 50 DMs before launch, have fallback (Reddit, IndieHackers) |
| Scope creep (feature requests) | High       | Medium | Stick to plan. New features go in a backlog, not current sprint     |

---

## Definition of Done (Per Feature)

A feature is done when:

- [ ] Works on production (not just local)
- [ ] Error states handled (empty state, loading state, failure state)
- [ ] RLS policies verified (one workspace can't access another's data)
- [ ] Mobile layout checked (at 375px viewport)
- [ ] No TypeScript errors
- [ ] No console errors in production

---

## Post-Launch Backlog (Month 3+)

These are confirmed future features — do NOT build during 12-week sprint:

```
Priority 1 (Month 3–4):
  □ Apollo.io API for autonomous lead enrichment
  □ Chrome Extension ("Add to AgentDesk" button on LinkedIn/Upwork)
  □ Full super admin panel (charts, announcements, agent logs)

Priority 2 (Month 5–6):
  □ Kanban view on projects (Agency plan only)
  □ Multi-seat Agency workspaces (invite team members)
  □ Zapier / webhook lead intake

Priority 3 (Month 6+):
  □ RAG / Vector DB (learn from past proposals)
  □ Mobile app (React Native)
  □ NestJS extraction (if scale demands it)
  □ White-label (resell AgentDesk under your own brand)
```
