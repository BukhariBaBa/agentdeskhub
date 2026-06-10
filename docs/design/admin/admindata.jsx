/* AgentDesk — Super-Admin data model. Internal ops, not freelancer-facing. */

const ADMIN_USER = { name: 'Sasha Kim', email: 'sasha@agentdeskhub.com', role: 'Super Admin' };

/* ---------- KPI summary ---------- */
const ADMIN_METRICS = {
  totalWorkspaces: 1284,
  totalWorkspacesDelta: +6.2,
  activeUsers: 947,
  activeUsersDelta: +4.1,
  mrr: 38940,
  mrrDelta: +8.7,
  totalRevenue: 412680,
  totalRevenueDelta: +11.3,
  runsThisMonth: 28431,
  runsDelta: +14.0,
  trialWorkspaces: 162,
  trialDelta: -2.4,
  churnedThisMonth: 23,
  churnDelta: +1.8,
};

/* new signups, last 30 days (bar chart) */
const SIGNUPS_30D = [
  6, 9, 7, 12, 8, 5, 4, 11, 14, 10, 7, 9, 13, 16, 12, 8, 6, 10, 15, 18, 14, 11, 9, 13, 17, 21, 16, 12, 19, 24,
];

/* revenue trend, last 12 months (line chart), in $ */
const REVENUE_12M = [
  { m: 'Jul', v: 21400 }, { m: 'Aug', v: 23800 }, { m: 'Sep', v: 24950 }, { m: 'Oct', v: 26100 },
  { m: 'Nov', v: 27300 }, { m: 'Dec', v: 29600 }, { m: 'Jan', v: 30800 }, { m: 'Feb', v: 32100 },
  { m: 'Mar', v: 33400 }, { m: 'Apr', v: 35200 }, { m: 'May', v: 36900 }, { m: 'Jun', v: 38940 },
];

/* monthly gross revenue for payments chart (last 6 mo) */
const REVENUE_6M_BARS = [
  { m: 'Jan', v: 30800 }, { m: 'Feb', v: 32100 }, { m: 'Mar', v: 33400 },
  { m: 'Apr', v: 35200 }, { m: 'May', v: 36900 }, { m: 'Jun', v: 38940 },
];

/* ---------- Plans ---------- */
const ADMIN_PACKAGES = [
  { id: 'starter', name: 'Starter', price: 19, runLimit: 50, modelTier: 'Haiku', accent: 'zinc',
    features: ['1 freelancer seat', 'Lead Scout + Proposal Agent', 'Client portal', 'Email support'] },
  { id: 'pro', name: 'Pro', price: 49, runLimit: 200, modelTier: 'Sonnet', accent: 'indigo', popular: true,
    features: ['Everything in Starter', 'All 6 agents', 'Stripe payouts', 'Priority support', 'Custom branding'] },
  { id: 'agency', name: 'Agency', price: 129, runLimit: 800, modelTier: 'Sonnet + Opus', accent: 'emerald',
    features: ['Everything in Pro', '5 team seats', 'Shared agent library', 'Audit log & SSO', 'Dedicated manager'] },
];

/* ---------- Workspaces ---------- */
const WS_NAMES = [
  ['Rivera Studio', 'jordan@riverastudio.com', 'Pro', 24, '2025-11-02', 'Active'],
  ['Pixelhaus', 'mara@pixelhaus.de', 'Agency', 142, '2025-09-14', 'Active'],
  ['Bolt Freelance', 'devon@boltwork.io', 'Starter', 38, '2026-01-20', 'Trial'],
  ['Nguyen Creative', 'an@nguyencreative.com', 'Pro', 76, '2025-12-08', 'Active'],
  ['Studio Maray', 'lea@maray.studio', 'Pro', 51, '2025-10-30', 'Active'],
  ['Forge & Co', 'sam@forgeand.co', 'Agency', 203, '2025-08-19', 'Active'],
  ['Halcyon Design', 'ivy@halcyon.design', 'Starter', 12, '2026-02-15', 'Trial'],
  ['Northpoint Dev', 'rio@northpoint.dev', 'Pro', 64, '2025-11-25', 'Active'],
  ['Quill & Pixel', 'tess@quillpixel.com', 'Starter', 7, '2026-03-01', 'Trial'],
  ['Verde Labs', 'max@verdelabs.io', 'Agency', 188, '2025-07-22', 'Active'],
  ['Mono Studio', 'kit@monostudio.co', 'Pro', 0, '2025-12-19', 'Suspended'],
  ['Atlas Freelance', 'noa@atlasfreelance.com', 'Pro', 41, '2025-10-11', 'Cancelled'],
  ['Birch & Bramble', 'wren@birchbramble.com', 'Starter', 29, '2026-01-05', 'Active'],
  ['Cobalt Works', 'jay@cobaltworks.io', 'Agency', 95, '2025-09-28', 'Active'],
  ['Lumen Freelance', 'isa@lumenfreelance.com', 'Starter', 3, '2026-03-08', 'Trial'],
  ['Mercer Studio', 'eli@mercer.studio', 'Pro', 58, '2025-11-17', 'Active'],
  ['Driftwood Co', 'gus@driftwood.co', 'Starter', 18, '2025-12-30', 'Active'],
  ['Vantage Design', 'rae@vantage.design', 'Agency', 167, '2025-08-04', 'Active'],
  ['Plume Creative', 'ada@plumecreative.com', 'Pro', 33, '2026-02-01', 'Cancelled'],
  ['Summit Freelance', 'leo@summitfreelance.io', 'Starter', 22, '2026-01-12', 'Active'],
];
const ADMIN_WORKSPACES = WS_NAMES.map((w, i) => ({
  id: 'ws' + (i + 1), name: w[0], email: w[1], plan: w[2], runs: w[3], joined: w[4], status: w[5],
  owner: w[1].split('@')[0].replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\./g, ' '),
  amount: w[2] === 'Agency' ? 129 : w[2] === 'Pro' ? 49 : 19,
  nextBilling: '2026-0' + ((i % 6) + 4).toString().padStart(1, '0') + '-' + (((i * 7) % 27) + 1).toString().padStart(2, '0'),
}));

/* ---------- Subscriptions (from LemonSqueezy webhooks) ---------- */
const ADMIN_SUBSCRIPTIONS = ADMIN_WORKSPACES
  .filter((w) => w.status !== 'Trial')
  .map((w) => ({
    id: 'sub_' + w.id, workspace: w.name, wsId: w.id, plan: w.plan, amount: w.amount,
    nextBilling: w.status === 'Cancelled' ? '—' : w.nextBilling,
    status: w.status === 'Active' ? 'Active' : w.status === 'Suspended' ? 'Past due' : 'Cancelled',
    provider: 'LemonSqueezy',
  }));

/* ---------- Discounts ---------- */
const ADMIN_DISCOUNTS = [
  { id: 'd1', code: 'LAUNCH40', type: '%', amount: 40, used: 318, limit: 500, expiry: '2026-07-31', plans: 'All', status: 'Active' },
  { id: 'd2', code: 'PRODUCTHUNT', type: '%', amount: 30, used: 204, limit: 250, expiry: '2026-06-30', plans: 'Pro, Agency', status: 'Active' },
  { id: 'd3', code: 'AGENCY20', type: 'fixed', amount: 20, used: 47, limit: 100, expiry: '2026-09-30', plans: 'Agency', status: 'Active' },
  { id: 'd4', code: 'WELCOME10', type: 'fixed', amount: 10, used: 892, limit: 1000, expiry: '2026-12-31', plans: 'All', status: 'Active' },
  { id: 'd5', code: 'BLACKFRIDAY', type: '%', amount: 50, used: 500, limit: 500, expiry: '2025-12-02', plans: 'All', status: 'Expired' },
  { id: 'd6', code: 'SPRING25', type: '%', amount: 25, used: 73, limit: 300, expiry: '2026-05-31', plans: 'Pro', status: 'Active' },
];

/* ---------- Payments ---------- */
const PAY_WS = ['Rivera Studio', 'Pixelhaus', 'Nguyen Creative', 'Forge & Co', 'Studio Maray', 'Verde Labs', 'Cobalt Works', 'Vantage Design', 'Northpoint Dev', 'Mercer Studio', 'Atlas Freelance', 'Plume Creative'];
const ADMIN_PAYMENTS = Array.from({ length: 32 }, (_, i) => {
  const ws = PAY_WS[i % PAY_WS.length];
  const plan = ['Pro', 'Agency', 'Starter', 'Pro', 'Agency'][i % 5];
  const amount = plan === 'Agency' ? 129 : plan === 'Pro' ? 49 : 19;
  const day = 28 - Math.floor(i * 0.85);
  const status = i % 11 === 4 ? 'Refunded' : i % 13 === 7 ? 'Failed' : 'Paid';
  return { id: 'pay_' + (1000 + i), date: '2026-06-' + String(Math.max(1, day)).padStart(2, '0'), workspace: ws, plan, amount, status };
});

/* ---------- Agent runs log ---------- */
const AGENT_TYPES = ['Lead Scout', 'Proposal Agent', 'Project Setup', 'Client Comms', 'Invoice Agent', 'Follow-up Agent'];
const MODELS = ['claude-haiku', 'claude-sonnet', 'claude-opus'];
const RUN_WS = ADMIN_WORKSPACES.slice(0, 12);
const ADMIN_RUNS = Array.from({ length: 40 }, (_, i) => {
  const ws = RUN_WS[i % RUN_WS.length];
  const agent = AGENT_TYPES[i % AGENT_TYPES.length];
  const status = i % 9 === 3 ? 'failed' : i % 7 === 5 ? 'pending' : 'done';
  const model = ws.plan === 'Starter' ? 'claude-haiku' : i % 5 === 0 ? 'claude-opus' : 'claude-sonnet';
  const tokens = 1800 + ((i * 617) % 8400);
  const hh = String(9 + (i % 12)).padStart(2, '0');
  const mm = String((i * 13) % 60).padStart(2, '0');
  return {
    id: 'run_' + (50231 - i), ts: '2026-06-09 ' + hh + ':' + mm, workspace: ws.name, wsId: ws.id,
    agent, status, tokens, model, duration: (1.2 + (i % 7) * 0.6).toFixed(1) + 's',
    input: agent === 'Lead Scout'
      ? 'Score this lead: Sarah Chen, TechStart Inc — "Looking for a React dev to build a customer dashboard ahead of our Series A. Budget flexible."'
      : agent === 'Proposal Agent'
        ? 'Draft a 3-tier proposal for a brand identity + Webflow site. Client: Lumen Coffee Co. Budget signal: $8–12k.'
        : 'Generate the next client-facing artifact for this project context.',
    output: status === 'failed'
      ? 'Error: upstream model timeout after 30000ms (request_id req_8f2a). Retried 2×.'
      : status === 'pending'
        ? '(streaming — awaiting completion)'
        : agent === 'Lead Scout'
          ? 'Fit score: 88/100. Strong match on React + SaaS niche. Budget ambiguous (flag: "flexible"). Drafted warm outreach referencing their Series A timeline.'
          : 'Generated 3 proposal tiers ($6.5k / $9.8k / $14.2k) with scoped deliverables and a recommended middle tier. Tone matched freelancer voice profile.',
  };
});

/* ---------- Announcements ---------- */
const ADMIN_ANNOUNCEMENTS = [
  { id: 'a1', date: '2026-06-02', target: 'All users', title: 'Follow-up Agent is live', message: 'Your sixth agent is here — Follow-up Agent automatically nudges clients on unpaid invoices and stale proposals. Enable it from the Agents page.', reach: 1284 },
  { id: 'a2', date: '2026-05-21', target: 'Pro only', title: 'Custom branding for client portals', message: 'Pro workspaces can now add a logo and accent color to every client portal. Head to Settings → Portal.', reach: 689 },
  { id: 'a3', date: '2026-05-09', target: 'Agency only', title: 'Team seats + shared agent library', message: 'Agency plans now include up to 5 seats and a shared library of saved agent configurations across your team.', reach: 142 },
  { id: 'a4', date: '2026-04-28', target: 'Starter only', title: 'Upgrade and save 40%', message: 'Hitting your 50-run limit? Upgrade to Pro this week with code LAUNCH40 and unlock all 6 agents at 40% off.', reach: 453 },
];

/* ---------- Audit log (admin actions) ---------- */
const ADMIN_AUDIT = [
  { id: 'au1', ts: '2026-06-09 11:42', actor: 'Sasha Kim', action: 'Suspended workspace', target: 'Mono Studio (ws11)', tint: 'rose' },
  { id: 'au2', ts: '2026-06-09 10:18', actor: 'Sasha Kim', action: 'Edited plan', target: 'Pro · run limit 200→250', tint: 'indigo' },
  { id: 'au3', ts: '2026-06-08 16:55', actor: 'Devon Ali', action: 'Created discount', target: 'SPRING25 (25% off Pro)', tint: 'emerald' },
  { id: 'au4', ts: '2026-06-08 09:30', actor: 'Sasha Kim', action: 'Issued refund', target: 'Atlas Freelance · $49', tint: 'amber' },
  { id: 'au5', ts: '2026-06-07 14:12', actor: 'Devon Ali', action: 'Sent announcement', target: 'All users · "Follow-up Agent is live"', tint: 'indigo' },
];

const fmtK = (n) => n >= 1000 ? '$' + (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : '$' + n;

Object.assign(window, {
  ADMIN_USER, ADMIN_METRICS, SIGNUPS_30D, REVENUE_12M, REVENUE_6M_BARS,
  ADMIN_PACKAGES, ADMIN_WORKSPACES, ADMIN_SUBSCRIPTIONS, ADMIN_DISCOUNTS,
  ADMIN_PAYMENTS, ADMIN_RUNS, AGENT_TYPES, ADMIN_ANNOUNCEMENTS, ADMIN_AUDIT, fmtK,
});
