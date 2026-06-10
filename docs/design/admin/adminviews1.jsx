/* global React, Icon, Badge, Button, Drawer, MetricCard, Panel, BarChart, LineChart, ATable, ARow, ACell, AStatus, SearchInput, FilterTabs, MiniSelect, DrawerHead, KV, money, fmtK, ADMIN_METRICS, SIGNUPS_30D, REVENUE_12M, ADMIN_WORKSPACES, ADMIN_RUNS, ADMIN_PAYMENTS */
const { useState: useStateV1 } = React;

/* ============ OVERVIEW ============ */
function OverviewScreen({ admin }) {
  const m = ADMIN_METRICS;
  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 22 } },
      React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Overview'),
      React.createElement('p', { style: { margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' } }, 'Platform health across all AgentDesk workspaces · June 2026')),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 14 } },
      React.createElement(MetricCard, { icon: 'building', label: 'Total Workspaces', value: m.totalWorkspaces.toLocaleString(), delta: m.totalWorkspacesDelta, tint: 'indigo' }),
      React.createElement(MetricCard, { icon: 'users', label: 'Active Users', value: m.activeUsers.toLocaleString(), delta: m.activeUsersDelta, tint: 'indigo' }),
      React.createElement(MetricCard, { icon: 'dollar', label: 'MRR', value: fmtK(m.mrr), delta: m.mrrDelta, tint: 'emerald' }),
      React.createElement(MetricCard, { icon: 'trendingUp', label: 'Total Revenue', value: fmtK(m.totalRevenue), delta: m.totalRevenueDelta, tint: 'emerald' })),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 22 } },
      React.createElement(MetricCard, { icon: 'activity', label: 'Runs This Month', value: m.runsThisMonth.toLocaleString(), delta: m.runsDelta, tint: 'indigo' }),
      React.createElement(MetricCard, { icon: 'clock', label: 'Trial Workspaces', value: m.trialWorkspaces, delta: m.trialDelta, tint: 'amber' }),
      React.createElement(MetricCard, { icon: 'ban', label: 'Churned This Month', value: m.churnedThisMonth, delta: m.churnDelta, tint: 'rose', invertDelta: true, sub: 'Cancelled or suspended' })),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: admin.layout === 'narrow' ? '1fr' : '1fr 1.3fr', gap: 14 } },
      React.createElement(Panel, { title: 'New signups', sub: 'Last 30 days', action: React.createElement(Badge, { tint: 'emerald', size: 'sm' }, '+24 today') },
        React.createElement(BarChart, { data: SIGNUPS_30D, height: 160, tint: 'indigo', labelEvery: 6 })),
      React.createElement(Panel, { title: 'Revenue trend', sub: 'Last 12 months · MRR', action: React.createElement(Badge, { tint: 'emerald', size: 'sm', dot: true }, fmtK(REVENUE_12M[REVENUE_12M.length - 1].v)) },
        React.createElement(LineChart, { data: REVENUE_12M, height: 180, tint: 'emerald' }))));
}

/* ============ WORKSPACES ============ */
function WorkspacesScreen({ admin }) {
  const [q, setQ] = useStateV1('');
  const [plan, setPlan] = useStateV1('All plans');
  const [status, setStatus] = useStateV1('All');
  const [active, setActive] = useStateV1(null);

  const ws = ADMIN_WORKSPACES.filter((w) =>
    (q === '' || w.name.toLowerCase().includes(q.toLowerCase()) || w.email.toLowerCase().includes(q.toLowerCase())) &&
    (plan === 'All plans' || w.plan === plan) &&
    (status === 'All' || w.status === status));
  const current = ADMIN_WORKSPACES.find((w) => w.id === active);

  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Workspaces'),
      React.createElement('p', { style: { margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' } }, ADMIN_WORKSPACES.length + ' workspaces · ' + ADMIN_WORKSPACES.filter((w) => w.status === 'Active').length + ' active')),

    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' } },
      React.createElement(SearchInput, { value: q, onChange: setQ, placeholder: 'Search workspace or owner email…', width: 300 }),
      React.createElement(MiniSelect, { value: plan, onChange: setPlan, options: ['All plans', 'Starter', 'Pro', 'Agency'], width: 130 }),
      React.createElement('div', { style: { marginLeft: 'auto' } },
        React.createElement(FilterTabs, { value: status, onChange: setStatus, options: ['All', 'Active', 'Trial', 'Cancelled', 'Suspended'] }))),

    React.createElement(ATable, { minWidth: 820, columns: [
      { label: 'Workspace' }, { label: 'Owner email' }, { label: 'Plan', w: 90 }, { label: 'Runs', right: true, w: 80 },
      { label: 'Joined', w: 120 }, { label: 'Status', w: 120 }, { label: 'Actions', right: true, w: 90 }] },
      ws.map((w) => React.createElement(ARow, { key: w.id, onClick: () => setActive(w.id), active: w.id === active },
        React.createElement(ACell, { bold: true }, w.name),
        React.createElement(ACell, { color: 'var(--text-muted)', mono: true }, w.email),
        React.createElement(ACell, null, React.createElement(Badge, { tint: w.plan === 'Agency' ? 'emerald' : w.plan === 'Pro' ? 'indigo' : 'zinc', size: 'sm' }, w.plan)),
        React.createElement(ACell, { right: true, mono: true }, w.runs),
        React.createElement(ACell, { color: 'var(--text-muted)', mono: true, nowrap: true }, w.joined),
        React.createElement(ACell, null, React.createElement(AStatus, { value: w.status })),
        React.createElement(ACell, { right: true }, React.createElement('span', { onClick: (e) => { e.stopPropagation(); setActive(w.id); }, style: { display: 'inline-flex', color: 'var(--text-subtle)' } }, React.createElement(Icon, { name: 'chevronRight', size: 16 }))))),
      ws.length === 0 && React.createElement('tr', null, React.createElement('td', { colSpan: 7, style: { padding: 40, textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 } }, 'No workspaces match your filters.'))),

    React.createElement(Drawer, { open: !!current, onClose: () => setActive(null), width: 560 },
      current && React.createElement(WorkspaceDetail, { ws: current, admin, onClose: () => setActive(null) })));
}

function WorkspaceDetail({ ws, admin, onClose }) {
  const runs = ADMIN_RUNS.filter((r) => r.wsId === ws.id).slice(0, 6);
  const pays = ADMIN_PAYMENTS.filter((p) => p.workspace === ws.name).slice(0, 5);
  const planHistory = [
    { d: ws.joined, e: 'Signed up · ' + (ws.status === 'Trial' ? 'Trial started' : 'Starter') },
    ws.plan !== 'Starter' ? { d: '2025-12-01', e: 'Upgraded to ' + ws.plan } : null,
    ws.status === 'Suspended' ? { d: '2026-06-09', e: 'Suspended by admin' } : null,
    ws.status === 'Cancelled' ? { d: '2026-05-15', e: 'Subscription cancelled' } : null,
  ].filter(Boolean);

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
    React.createElement(DrawerHead, { title: ws.name, sub: ws.id + ' · ' + ws.email, onClose, badge: React.createElement(AStatus, { value: ws.status }) }),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 22 } },
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' } },
        React.createElement(Button, { size: 'sm', variant: 'secondary', icon: 'sliders', onClick: () => admin.toast('Opening plan editor…', 'sliders') }, 'Edit plan'),
        ws.status === 'Suspended'
          ? React.createElement(Button, { size: 'sm', variant: 'secondary', icon: 'refresh', onClick: () => admin.act('Reinstated workspace', ws.name) }, 'Reinstate')
          : React.createElement(Button, { size: 'sm', variant: 'danger', icon: 'ban', onClick: () => admin.act('Suspended workspace', ws.name) }, 'Suspend'),
        React.createElement(Button, { size: 'sm', variant: 'ghost', icon: 'fileText', onClick: () => admin.toast('Notes saved', 'fileText') }, 'Notes')),

      React.createElement(SectionLabel, null, 'Owner'),
      React.createElement('div', { style: { marginBottom: 22 } },
        React.createElement(KV, { k: 'Name', v: ws.owner }),
        React.createElement(KV, { k: 'Email', v: ws.email, mono: true }),
        React.createElement(KV, { k: 'Plan', v: ws.plan + ' · ' + money(ws.amount) + '/mo' }),
        React.createElement(KV, { k: 'Runs used', v: ws.runs, mono: true }),
        React.createElement(KV, { k: 'Joined', v: ws.joined, mono: true })),

      React.createElement(SectionLabel, null, 'Plan history'),
      React.createElement('div', { style: { marginBottom: 22, display: 'flex', flexDirection: 'column', gap: 0 } },
        planHistory.map((h, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--border)' } },
          React.createElement('span', { style: { fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-subtle)', width: 88, flexShrink: 0 } }, h.d),
          React.createElement('span', { style: { fontSize: 12.5 } }, h.e)))),

      React.createElement(SectionLabel, null, 'Recent agent runs'),
      React.createElement('div', { style: { marginBottom: 22, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' } },
        runs.length ? runs.map((r, i) => React.createElement('div', { key: r.id, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderBottom: i < runs.length - 1 ? '1px solid var(--border)' : 'none' } },
          React.createElement('span', { style: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-subtle)', width: 42 } }, r.ts.slice(11)),
          React.createElement('span', { style: { fontSize: 12.5, flex: 1, fontWeight: 500 } }, r.agent),
          React.createElement('span', { style: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)' } }, r.tokens.toLocaleString() + ' tok'),
          React.createElement(AStatus, { value: r.status }))) :
          React.createElement('div', { style: { padding: 16, fontSize: 12.5, color: 'var(--text-subtle)', textAlign: 'center' } }, 'No runs yet.')),

      React.createElement(SectionLabel, null, 'Payment history'),
      React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' } },
        pays.length ? pays.map((p, i) => React.createElement('div', { key: p.id, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderBottom: i < pays.length - 1 ? '1px solid var(--border)' : 'none' } },
          React.createElement('span', { style: { fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--text-subtle)', width: 80 } }, p.date),
          React.createElement('span', { style: { fontSize: 12.5, flex: 1 } }, p.plan + ' plan'),
          React.createElement('span', { style: { fontFamily: 'var(--mono)', fontSize: 12.5, fontWeight: 600 } }, money(p.amount)),
          React.createElement(AStatus, { value: p.status }))) :
          React.createElement('div', { style: { padding: 16, fontSize: 12.5, color: 'var(--text-subtle)', textAlign: 'center' } }, 'No payments on record.'))));
}

function SectionLabel({ children }) {
  return React.createElement('div', { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 } }, children);
}

Object.assign(window, { OverviewScreen, WorkspacesScreen, SectionLabel });
