# AgentDesk — Super Admin Panel PRD
**Version 1.0 | URL: agentdeskhub.com/admin**

---

## 1. Overview

The Super Admin Panel is an internal operations tool for the AgentDesk team (you). It provides full visibility and control over all workspaces, users, subscriptions, payments, and agent activity across the entire platform.

**This is not accessible to freelancers or clients.** It is a separate authentication context with its own login, its own routes, and its own middleware.

---

## 2. Access Model

```
URL:          agentdeskhub.com/admin
Auth:         Separate admin credentials (email + password)
Created by:   Manually inserted into admin_users table
No sign-up:   Admin accounts cannot be self-created
Session:      Separate from freelancer sessions (different cookie)
Middleware:   Every /admin route protected by admin auth guard
Audit log:    Every admin action is logged
```

---

## 3. Database Schema

```sql
admin_users
  id            uuid        PK
  email         text        unique
  password_hash text
  name          text
  role          enum        superadmin|support|readonly
  last_login    timestamptz
  created_at    timestamptz

admin_audit_log
  id            uuid        PK
  admin_id      uuid        FK → admin_users
  action        text        e.g. "upgraded_workspace", "created_discount"
  target_type   text        e.g. "workspace", "discount"
  target_id     uuid
  metadata      jsonb
  ip_address    text
  created_at    timestamptz
```

---

## 4. Navigation

```
Left sidebar (200px, zinc-900):
  AgentDesk logo + "Admin" badge (red)
  ─────────────────
  Overview
  Workspaces
  Subscriptions
  Packages
  Discounts
  Payments
  Agent Logs
  Announcements
  ─────────────────
  [Admin Name]
  [Logout]
```

Style: Dense, data-table focused. Think Stripe dashboard or Vercel admin. No agent output cards, no client portal UI.

---

## 5. Screen Specifications

### 5.1 Overview Dashboard

**Top row — key metrics:**

| Card | Value | Sub-text |
|---|---|---|
| Total Workspaces | Count | +N this month |
| Active Users | Count | Paying only |
| MRR | $X,XXX | +N% vs last month |
| Total Revenue | $XX,XXX | All time |

**Second row — operational metrics:**

| Card | Value |
|---|---|
| Runs This Month | Total agent runs across all workspaces |
| Trial Workspaces | Currently in 14-day trial |
| Churned This Month | Cancelled subscriptions |
| Failed Runs | Agent runs with status=failed (last 7 days) |

**Charts:**
- New signups bar chart (last 30 days, daily)
- Revenue trend line chart (last 12 months, monthly MRR)

---

### 5.2 Workspaces Screen

**Filters:** Plan (all/trial/starter/pro/agency) | Status (all/active/trial/cancelled/suspended) | Date joined (range) | Search (workspace name, owner email)

**Table columns:**
```
Workspace | Owner Email | Plan | Runs Used | Joined | Status | Actions
```

**Status badges:**
- Active (emerald)
- Trial (amber) + days remaining
- Cancelled (zinc)
- Suspended (rose)

**Actions per row:**
- View → opens workspace detail drawer
- Edit Plan → modal to change plan/runs
- Suspend → disables all agent runs immediately
- Notes → add internal admin note

**Workspace detail drawer (full right panel):**
- Owner: name, email, joined date, last active
- Current plan, trial end date, runs used this billing cycle
- All agent runs: table with status, agent type, timestamp
- Payment history: all transactions for this workspace
- Admin notes (editable, internal only)
- Danger zone: suspend account, delete account (confirmation required)

---

### 5.3 Subscriptions Screen

**Source:** LemonSqueezy webhook data synced to DB.

**Table columns:**
```
Workspace | Owner Email | Plan | Amount | Next Billing | Status | Actions
```

**Status badges:**
- Active (emerald)
- Past due (amber)
- Cancelled (zinc)
- Paused (indigo)

**Actions:**
- Override modal: manually change plan tier + update runs_limit in DB
- Cancel subscription (with confirmation)
- View LemonSqueezy record (external link)

**Note to developers:** Subscription overrides must update both the LemonSqueezy subscription AND the local `workspaces` table. Log all manual overrides to `admin_audit_log`.

---

### 5.4 Packages Screen

View and edit the three plan configurations.

**Three plan cards (Starter / Pro / Agency):**

Each card shows and allows editing:
```
Plan name
Price ($/mo)
Run limit (runs/month)
Model tier (haiku / mixed / sonnet)
Features list (text, bullet per line)
```

[Save Changes] button — updates plan config in DB. Does NOT automatically change existing subscriptions (that requires manual override in Subscriptions screen).

**Future:** This will sync to LemonSqueezy product prices once webhook infrastructure is set up for that.

---

### 5.5 Discounts Screen

**[Create Discount] button** opens creation modal:

```
Code name:      [text input, auto-uppercase]
Type:           % off | Fixed amount ($)
Amount:         [number]
Eligible plans: All | Starter only | Pro only | Agency only
Expiry date:    [date picker] (optional)
Usage limit:    [number] (optional — leave blank for unlimited)
Description:    [text, internal note]
```

**Discount table:**
```
Code | Type | Amount | Used / Limit | Plans | Expiry | Status | Actions
```

**Status badges:**
- Active (emerald)
- Expired (zinc)
- Exhausted (amber — usage limit reached)

**Actions:** View usage details | Deactivate | Delete

**Usage details modal:**
- Table of all workspaces that used this code
- Workspace name, owner email, date applied, amount saved

**Developer note:** Discount application logic — when user enters code at checkout (LemonSqueezy), webhook confirms discount and sets `workspaces.discount_code` + `workspaces.discount_pct`. Admin can also manually apply discounts via Workspace detail drawer.

---

### 5.6 Payments Screen

**Filters:** Date range picker | Plan filter | Status filter (all/paid/failed/refunded)

**Revenue chart at top:**
- Monthly bar chart showing revenue for filtered period

**Table columns:**
```
Date | Workspace | Owner Email | Plan | Amount | Status | LemonSqueezy ID
```

**Status badges:**
- Paid (emerald)
- Failed (rose)
- Refunded (amber)
- Pending (zinc)

**Table footer:**
- "Showing X transactions | Total: $X,XXX.XX" for filtered range

**[Export CSV] button:**
- Downloads filtered transactions as CSV
- Columns: date, workspace, email, plan, amount, status, ls_id

---

### 5.7 Agent Runs Log

**Filters:** Agent type | Status | Workspace (search) | Date range

**Table columns:**
```
Timestamp | Workspace | Agent Type | Status | Tokens | Model | Duration | Actions
```

**Status badges:**
- Done (emerald)
- Failed (rose)
- Pending (amber)
- Running (indigo)

**Actions:**
- View → opens run detail modal

**Run detail modal:**
- Workspace, agent type, status, timestamps
- Input payload (formatted JSON, collapsible)
- Output payload (formatted JSON, collapsible)
- Error message if failed
- Model used, tokens consumed, latency

**Use cases for this screen:**
- Debug failed agent runs for users who report issues
- Monitor for systemic failures (many fails = API issue)
- Billing audit (verify token counts)
- Identify most/least used agents

---

### 5.8 Announcements Screen

Send in-app notifications to users.

**[New Announcement] button** opens creation modal:

```
Title:      [text]
Message:    [textarea]
Target:     All users | Trial only | Starter | Pro | Agency
Type:       Info | Warning | Feature
Preview:    [shows how it looks in freelancer bell icon]
```

On send → creates notification records for all matching workspaces with `type = announcement`.

**Announcements table:**
```
Date | Target | Title | Message preview | Sent to | Actions
```

**Actions:** View | Delete (removes from all user inboxes)

**Use cases:**
- "We've launched a new feature — check it out!"
- "Scheduled maintenance on Sunday 2–4am UTC"
- "Trial users: upgrade before your trial ends for 20% off"

---

## 6. Build Timeline

| Week | What ships |
|---|---|
| Week 5 | Admin auth + login page |
| Week 5 | Basic Workspaces list (read-only) |
| Week 5 | Basic Payments view |
| Week 7 | Subscriptions screen + plan override |
| Week 8 | Discounts creation + management |
| Week 9 | Packages editing screen |
| Week 10 | Overview dashboard with charts |
| Week 10 | Agent Runs Log |
| Week 11 | Announcements screen |
| Week 12 | Export CSV, audit log, admin roles |

**At launch (week 5), you only need:**
- See who signed up (Workspaces)
- See what they paid (Payments)
- Change someone's plan manually (Subscriptions override)

Everything else can wait until you have users to manage.

---

## 7. Key Developer Rules

### Authentication
- Admin routes must use a **separate auth middleware** from the freelancer auth
- Admin sessions stored in a different cookie (`agentdesk_admin_session`)
- Failed admin login attempts: rate-limit after 5 attempts (15-minute lockout)
- Admin session expires after 8 hours of inactivity

### Authorization Roles

| Role | Access |
|---|---|
| `superadmin` | Full access, can create other admin users |
| `support` | Read all + edit workspaces/subscriptions, cannot touch admin users or packages |
| `readonly` | Read-only access to all screens |

### Audit Logging
Every write action in admin panel must log to `admin_audit_log`:
- Who did it (admin_id)
- What they did (action string)
- What they did it to (target_type + target_id)
- Any relevant metadata (old value → new value)
- IP address

### Data Safety
- Soft-delete only: never hard-delete workspace data from admin panel
- Suspension means `status = suspended` — data preserved
- "Delete account" requires typing workspace name to confirm
- Password hashes: bcrypt with salt rounds ≥ 12
- Never log or expose full tokens, access tokens, or payment details in audit log

### Route Structure
```
/admin                    → redirect to /admin/overview
/admin/login              → admin login page
/admin/overview           → Overview dashboard
/admin/workspaces         → Workspaces list
/admin/workspaces/[id]    → Workspace detail (drawer or page)
/admin/subscriptions      → Subscriptions
/admin/packages           → Packages
/admin/discounts          → Discounts
/admin/payments           → Payments
/admin/runs               → Agent Runs Log
/admin/announcements      → Announcements
```

All routes except `/admin/login` protected by `adminAuthMiddleware`.

---

## 8. What Admin Screens Must NOT Show

- Individual client data from freelancer workspaces (privacy)
- Full credit card numbers (never stored anyway via LemonSqueezy)
- Agent output content (only payload metadata)
- Client portal token values in plain text
- Freelancer passwords or auth tokens

---

## 9. Future Admin Features (Post-Launch)

| Feature | When |
|---|---|
| Revenue cohort analysis | Month 4+ |
| Churn reason tracking | Month 4+ |
| User impersonation (for support) | Month 6+ |
| A/B test management | Month 6+ |
| Automated churn intervention triggers | Month 6+ |
| API usage cost by workspace | Month 3+ |
