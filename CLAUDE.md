@AGENTS.md

# AgentDesk Hub — Project Guide

**Product:** AI-powered freelance OS — automates the full freelance lifecycle with 6 autonomous agents.
**Domain:** agentdeskhub.com
**Stack:** Next.js 14 (App Router), Supabase, Drizzle ORM, Inngest (job queue), Anthropic SDK, LemonSqueezy, Vercel

---

## Project Structure

```
agentdesk/
├── app/
│   ├── (auth)/login | signup | magic-link
│   ├── (marketing)/          ← homepage + /alternatives/* SEO pages
│   ├── dashboard/            ← protected; layout.tsx = sidebar + topbar
│   │   ├── clients/
│   │   ├── proposals/
│   │   ├── projects/
│   │   ├── invoices/
│   │   ├── agents/
│   │   ├── integrations/
│   │   └── settings/
│   ├── client/[token]/       ← public client portal (token-gated, no auth)
│   ├── admin/                ← separate auth; superadmin/support/readonly roles
│   └── api/
│       ├── trpc/
│       ├── webhooks/lemonsqueezy/
│       └── auth/callback/
├── components/               ← one folder per page/feature (see Component Rules)
├── hooks/                    ← all custom hooks; one file per domain
├── services/                 ← all API/data access logic; one file per domain
├── lib/
│   ├── agents/               ← base.ts + one file per agent (lead-scout, proposal, etc.)
│   ├── inngest.ts            ← Inngest client + event definitions
│   ├── anthropic.ts          ← Anthropic client with model routing
│   ├── supabase/             ← server.ts + client.ts helpers
│   └── email/                ← Resend templates
├── server/
│   ├── trpc.ts
│   └── routers/              ← clients, proposals, projects, invoices, agents, billing
└── db/
    ├── schema.ts             ← all Drizzle table definitions
    ├── index.ts              ← DB connection
    └── migrations/
```

---

## The Six Agents

Each agent lives in `/lib/agents/<name>.ts` and exports a typed `agentConfig`:

| Agent | File | Tint | Output type |
|---|---|---|---|
| Lead Scout | `lead-scout.ts` | indigo | `LeadScoringOutput` |
| Proposal Agent | `proposal.ts` | indigo | `ProposalOutput` |
| Project Manager | `project-manager.ts` | emerald | `ProjectPlanOutput` |
| Finance Agent | `finance.ts` | emerald | `InvoiceOutput` |
| Client Comms | `client-comms.ts` | amber | `CommsOutput` |
| Content & Brand | `content-brand.ts` | amber | `ContentOutput` |

Agent state machine: `pending → running → awaiting_approval → done | failed`

Human-in-loop: every agent run produces an approval card. Nothing is saved until approved.

---

## Model Routing

Defined in `/lib/anthropic.ts`:

- Trial / Starter → `claude-haiku-4-5-20251001`
- Pro → `claude-haiku-4-5-20251001` (simple) / `claude-sonnet-4-6` (complex)
- Agency → `claude-sonnet-4-6`

Use prompt caching headers on all system prompts.

---

## Pricing Tiers

| Plan | Price | Runs/mo |
|---|---|---|
| Trial | Free | 15 |
| Starter | $19 | 30 |
| Pro | $39 | 100 |
| Agency | $79 | 300 |

Top-up: $2 / 10 runs. Payments via LemonSqueezy webhooks.

---

## Design System

Reference `docs/design/tokens.css` for all values. Do not hardcode colors, radii, or shadows.

- **Primary:** `--indigo-600` (#4F46E5)
- **Success:** `--emerald-500`
- **Warning:** `--amber-500`
- **Danger:** `--rose-500`
- **Neutrals:** `--zinc-*` scale
- **Sidebar:** dark (`--zinc-950`) with indigo active state (`rgba(99,102,241,0.16)`)
- **Font:** Geist (body) + Geist Mono (code/tokens)
- **Aesthetic:** flat + borders, Linear/Notion/Stripe style — no heavy shadows

Usage meter color thresholds: indigo (default) → amber (≥80%) → rose (≥95%).

Interactive prototype for all screens is in `docs/design/AgentDesk (standalone).html`. Open it before building any screen.

---

## TypeScript Rules

**Never use `any`.** Every value must be explicitly typed.

```ts
// bad
const handler = (data: any) => { ... }

// good
const handler = (data: CreateClientInput) => { ... }
```

If you genuinely don't know the shape yet, use `unknown` and narrow it — never `any`.

---

## No `useEffect`

`useEffect` is banned. Use these instead:

- **Data fetching** → tRPC hooks (`trpc.clients.getAll.useQuery()`) or React Query
- **Derived state** → `useMemo`
- **Event-driven side effects** → event handlers directly
- **One-time setup** → server components or `use` with Suspense
- **Subscriptions** → Supabase realtime hooks in `/hooks/`

If you find yourself reaching for `useEffect`, stop and reconsider the data flow.

---

## No Inline String Literals

Never write raw strings for routes, labels, keys, status values, or any repeated value. Define typed constants and import them.

```ts
// bad
if (client.status === 'Active') { ... }
router.push('/dashboard/clients')

// good — in constants.ts
export const CLIENT_STATUS = {
  LEAD: 'Lead',
  ACTIVE: 'Active',
  PAST: 'Past',
  LOST: 'Lost',
} as const

export const ROUTES = {
  DASHBOARD: '/dashboard',
  CLIENTS: '/dashboard/clients',
  // ...
} as const

// then in component
if (client.status === CLIENT_STATUS.ACTIVE) { ... }
router.push(ROUTES.CLIENTS)
```

---

## Component Folder Structure

Each page or feature section gets its own folder under `components/`. A component folder contains exactly these files — no more, no less:

```
components/
└── clients/
    ├── ClientsTable.tsx       ← render only, no logic
    ├── ClientsTable.types.ts  ← all types/interfaces for this component
    ├── ClientsTable.const.ts  ← all constants for this component
    └── index.ts               ← re-exports
```

Rules:
- **Types/interfaces** → always in `<ComponentName>.types.ts`, never inside the component file
- **Constants** → always in `<ComponentName>.const.ts`, never inside the component file
- Component files contain **JSX/render code only**
- Never put two unrelated components in the same folder

---

## No Duplicate Components — Use `components/common/`

Never write the same component twice. Before creating any new component, check `components/common/` first. If a component is used in more than one page/feature, it must live in `common/` — not copied into each feature folder.

```
components/
├── common/                        ← shared across 2+ features
│   ├── StatusBadge/
│   │   ├── StatusBadge.tsx
│   │   ├── StatusBadge.types.ts
│   │   ├── StatusBadge.const.ts
│   │   └── index.ts
│   ├── EmptyState/
│   ├── PageHeader/
│   ├── ConfirmModal/
│   ├── UsageMeter/
│   └── AgentRunCard/
├── clients/                       ← used only in clients pages
├── proposals/
└── dashboard/
```

Examples of what belongs in `common/`:
- `StatusBadge` — used on clients, proposals, projects, invoices
- `EmptyState` — every list page has one
- `PageHeader` — title + subtitle + action button pattern
- `AgentRunCard` — approval card used on dashboard and agents page
- `UsageMeter` — sidebar + agents page
- `ConfirmModal` — any destructive action

If you duplicate a component and the duplication is later discovered, consolidate into `common/` immediately — do not leave two versions alive.

---

## Separate Logic from Render

Component files must not contain business logic. Extract everything to hooks or services.

```ts
// bad — logic inside component
function ClientsView() {
  const [clients, setClients] = useState([])
  const filtered = clients.filter(c => c.status === 'Active')
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name))
  // ... render
}

// good — logic in hook
// hooks/useClients.ts
export function useClients() {
  const { data } = trpc.clients.getAll.useQuery()
  const activeClients = useMemo(
    () => data?.filter(c => c.status === CLIENT_STATUS.ACTIVE).sort(...),
    [data]
  )
  return { activeClients }
}

// components/clients/ClientsView.tsx — render only
function ClientsView() {
  const { activeClients } = useClients()
  return <ClientsTable clients={activeClients} />
}
```

---

## API Requests: Hooks + Services

All data access goes through two layers:

**Services** (`/services/<domain>.ts`) — raw tRPC/fetch calls, no React, no hooks:
```ts
// services/clients.ts
export const clientsService = {
  getAll: () => trpc.clients.getAll.query(),
  create: (input: CreateClientInput) => trpc.clients.create.mutate(input),
}
```

**Hooks** (`/hooks/use<Domain>.ts`) — React wrapper, handles loading/error state:
```ts
// hooks/useClients.ts
export function useClients() {
  const query = trpc.clients.getAll.useQuery()
  return {
    clients: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  }
}
```

Components import hooks only — never call tRPC or fetch directly from a component.

---

## Format + Lint After Every Change

After every code change or new file written, always run both commands before considering the task done:

```bash
npx prettier --write .
npx eslint . --fix
```

Never leave a task in a state where formatting or lint errors exist. If `eslint --fix` cannot auto-fix a violation, resolve it manually before moving on.

---

## Definition of Done

A feature is complete when:
- [ ] Works on production (Vercel preview URL), not just locally
- [ ] Error state, loading state, and empty state all handled
- [ ] RLS policies verified — one workspace cannot read another's data
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No `any`, no `useEffect`, no inline string literals
- [ ] Mobile layout checked at 375px viewport
- [ ] No console errors in production build

---

## Key Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
ANTHROPIC_API_KEY=
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_STORE_ID=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@agentdeskhub.com
SENTRY_DSN=
NEXT_PUBLIC_APP_URL=https://agentdeskhub.com
ADMIN_JWT_SECRET=
```
