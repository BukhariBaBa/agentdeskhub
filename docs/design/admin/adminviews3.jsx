/* global React, Icon, Badge, Button, Drawer, Modal, Panel, BarChart, ATable, ARow, ACell, AStatus, MiniSelect, FilterTabs, DrawerHead, FieldLabel, money, fmtK, SectionLabel, ADMIN_PAYMENTS, REVENUE_6M_BARS, ADMIN_RUNS, AGENT_TYPES, ADMIN_WORKSPACES, ADMIN_ANNOUNCEMENTS */
const { useState: useStateV3 } = React;

/* ============ PAYMENTS ============ */
function PaymentsScreen({ admin }) {
  const [range, setRange] = useStateV3('This month');
  const [plan, setPlan] = useStateV3('All plans');
  const rows = ADMIN_PAYMENTS.filter((p) => plan === 'All plans' || p.plan === plan);
  const total = rows.filter((p) => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 16, flexWrap: 'wrap' } },
      React.createElement('div', null,
        React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Payments'),
        React.createElement('p', { style: { margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' } }, rows.length + ' transactions · ' + money(total) + ' collected')),
      React.createElement(Button, { variant: 'secondary', icon: 'download', onClick: () => admin.toast('Exported ' + rows.length + ' rows to CSV', 'download') }, 'Export CSV')),

    React.createElement(Panel, { title: 'Gross revenue', sub: 'Monthly · last 6 months', style: { marginBottom: 16 },
      action: React.createElement(Badge, { tint: 'emerald', size: 'sm', dot: true }, fmtK(REVENUE_6M_BARS[REVENUE_6M_BARS.length - 1].v)) },
      React.createElement(BarChart, { data: REVENUE_6M_BARS, height: 140, tint: 'emerald', labelEvery: 1, fmt: fmtK })),

    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' } },
      React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 11px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', background: '#fff', fontSize: 12.5, color: 'var(--text-muted)' } },
        React.createElement(Icon, { name: 'calendar', size: 14 }), 'Jun 1 – Jun 30, 2026'),
      React.createElement(MiniSelect, { value: range, onChange: setRange, options: ['This month', 'Last month', 'Last 3 months', 'Year to date'], width: 150 }),
      React.createElement(MiniSelect, { value: plan, onChange: setPlan, options: ['All plans', 'Starter', 'Pro', 'Agency'], width: 130 })),

    React.createElement(ATable, { minWidth: 680, columns: [
      { label: 'Date', w: 120 }, { label: 'Workspace' }, { label: 'Plan', w: 100 }, { label: 'Amount', right: true, w: 110 }, { label: 'Status', right: true, w: 120 }] },
      rows.map((p) => React.createElement(ARow, { key: p.id },
        React.createElement(ACell, { mono: true, color: 'var(--text-muted)', nowrap: true }, p.date),
        React.createElement(ACell, { bold: true }, p.workspace),
        React.createElement(ACell, null, React.createElement(Badge, { tint: p.plan === 'Agency' ? 'emerald' : p.plan === 'Pro' ? 'indigo' : 'zinc', size: 'sm' }, p.plan)),
        React.createElement(ACell, { right: true, mono: true, bold: true }, money(p.amount)),
        React.createElement(ACell, { right: true }, React.createElement('div', { style: { display: 'inline-flex', justifyContent: 'flex-end' } }, React.createElement(AStatus, { value: p.status }))))),
      React.createElement('tr', { style: { background: 'var(--bg-subtle)' } },
        React.createElement('td', { colSpan: 3, style: { padding: '12px 16px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' } }, 'Total · paid in range'),
        React.createElement('td', { style: { padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13.5 } }, money(total)),
        React.createElement('td', null))));
}

/* ============ AGENT RUNS LOG ============ */
function AgentLogsScreen({ admin }) {
  const [agent, setAgent] = useStateV3('All agents');
  const [status, setStatus] = useStateV3('All');
  const [q, setQ] = useStateV3('');
  const [active, setActive] = useStateV3(null);

  const runs = ADMIN_RUNS.filter((r) =>
    (agent === 'All agents' || r.agent === agent) &&
    (status === 'All' || r.status === status) &&
    (q === '' || r.workspace.toLowerCase().includes(q.toLowerCase())));
  const current = ADMIN_RUNS.find((r) => r.id === active);

  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Agent Logs'),
      React.createElement('p', { style: { margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' } }, 'Every agent run across all workspaces · click a row to inspect the payload')),

    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' } },
      React.createElement('div', { style: { position: 'relative', width: 240 } },
        React.createElement(Icon, { name: 'search', size: 15, style: { position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' } }),
        React.createElement('input', { value: q, onChange: (e) => setQ(e.target.value), placeholder: 'Filter by workspace…',
          style: { width: '100%', padding: '8px 12px 8px 33px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13, outline: 'none', boxSizing: 'border-box' } })),
      React.createElement(MiniSelect, { value: agent, onChange: setAgent, options: ['All agents', ...AGENT_TYPES], width: 160 }),
      React.createElement('div', { style: { marginLeft: 'auto' } },
        React.createElement(FilterTabs, { value: status, onChange: setStatus, options: [{ value: 'All', label: 'All' }, { value: 'done', label: 'Done' }, { value: 'failed', label: 'Failed' }, { value: 'pending', label: 'Pending' }] }))),

    React.createElement(ATable, { minWidth: 860, columns: [
      { label: 'Timestamp', w: 150 }, { label: 'Workspace' }, { label: 'Agent', w: 140 }, { label: 'Status', w: 100 },
      { label: 'Tokens', right: true, w: 90 }, { label: 'Model', w: 130 }, { label: 'Duration', right: true, w: 90 }] },
      runs.map((r) => React.createElement(ARow, { key: r.id, onClick: () => setActive(r.id), active: r.id === active },
        React.createElement(ACell, { mono: true, color: 'var(--text-subtle)', nowrap: true }, r.ts),
        React.createElement(ACell, { bold: true }, r.workspace),
        React.createElement(ACell, { color: 'var(--text-muted)' }, r.agent),
        React.createElement(ACell, null, React.createElement(AStatus, { value: r.status })),
        React.createElement(ACell, { right: true, mono: true }, r.tokens.toLocaleString()),
        React.createElement(ACell, { mono: true, color: 'var(--text-muted)' }, r.model),
        React.createElement(ACell, { right: true, mono: true, color: 'var(--text-muted)' }, r.duration))),
      runs.length === 0 && React.createElement('tr', null, React.createElement('td', { colSpan: 7, style: { padding: 40, textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 } }, 'No runs match your filters.'))),

    React.createElement(Drawer, { open: !!current, onClose: () => setActive(null), width: 600 },
      current && React.createElement(RunDetail, { run: current, onClose: () => setActive(null) })));
}

function RunDetail({ run, onClose }) {
  const payloadBox = (label, text, error) => React.createElement('div', { style: { marginBottom: 18 } },
    React.createElement(SectionLabel, null, label),
    React.createElement('pre', { style: { margin: 0, padding: '13px 15px', background: error ? 'var(--rose-50)' : 'var(--zinc-950)', color: error ? 'var(--rose-700)' : 'var(--zinc-100)',
      border: error ? '1px solid var(--rose-100)' : 'none', borderRadius: 'var(--r-md)', fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }, text));

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
    React.createElement(DrawerHead, { title: run.agent, sub: run.id + ' · ' + run.ts, onClose, badge: React.createElement(AStatus, { value: run.status }) }),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 22 } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', marginBottom: 22 } },
        [['Workspace', run.workspace], ['Tokens', run.tokens.toLocaleString()], ['Model', run.model], ['Duration', run.duration]].map((s, i) =>
          React.createElement('div', { key: i, style: { background: '#fff', padding: '11px 13px' } },
            React.createElement('div', { style: { fontSize: 10.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 } }, s[0]),
            React.createElement('div', { style: { fontSize: 12.5, fontWeight: 600, fontFamily: i ? 'var(--mono)' : 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, s[1])))),
      payloadBox('Input payload', run.input),
      payloadBox('Output payload', run.output, run.status === 'failed'),
      React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 7, padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: 'var(--r-md)' } },
        React.createElement(Icon, { name: 'shield', size: 14 }), 'Debug view · payloads are read-only and access is logged to the audit trail.')));
}

/* ============ ANNOUNCEMENTS ============ */
function AnnouncementsScreen({ admin }) {
  const [items, setItems] = useStateV3(ADMIN_ANNOUNCEMENTS);
  const [composing, setComposing] = useStateV3(false);

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 16, flexWrap: 'wrap' } },
      React.createElement('div', null,
        React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Announcements'),
        React.createElement('p', { style: { margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' } }, 'Broadcast to the in-app notification bell · ' + items.length + ' sent')),
      React.createElement(Button, { variant: 'primary', icon: 'plus', onClick: () => setComposing(true) }, 'New Announcement')),

    React.createElement(ATable, { minWidth: 680, columns: [
      { label: 'Date', w: 120 }, { label: 'Target', w: 130 }, { label: 'Message' }, { label: 'Reach', right: true, w: 100 }] },
      items.map((a) => React.createElement(ARow, { key: a.id },
        React.createElement(ACell, { mono: true, color: 'var(--text-muted)', nowrap: true }, a.date),
        React.createElement(ACell, null, React.createElement(Badge, { tint: a.target === 'All users' ? 'indigo' : a.target.includes('Pro') ? 'indigo' : a.target.includes('Agency') ? 'emerald' : 'zinc', size: 'sm' }, a.target)),
        React.createElement(ACell, null, React.createElement('div', null,
          React.createElement('div', { style: { fontWeight: 600, fontSize: 12.5, marginBottom: 2 } }, a.title),
          React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, a.message))),
        React.createElement(ACell, { right: true, mono: true, color: 'var(--text-muted)' }, a.reach.toLocaleString())))),

    React.createElement(ComposeModal, { open: composing, onClose: () => setComposing(false),
      onSend: (a) => { setItems((x) => [{ id: 'a' + Date.now(), date: '2026-06-09', reach: a.target === 'All users' ? 1284 : a.target.includes('Pro') ? 689 : a.target.includes('Agency') ? 142 : 453, ...a }, ...x]); admin.act('Sent announcement', a.target + ' · "' + a.title + '"'); } }));
}

function ComposeModal({ open, onClose, onSend }) {
  const [target, setTarget] = useStateV3('All users');
  const [title, setTitle] = useStateV3('');
  const [message, setMessage] = useStateV3('');
  React.useEffect(() => { if (open) { setTarget('All users'); setTitle(''); setMessage(''); } }, [open]);
  const valid = title.trim() && message.trim();

  return React.createElement(Modal, { open, onClose, width: 600 },
    React.createElement('div', { style: { padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: 650 } }, 'New announcement'),
      React.createElement(Button, { size: 'sm', variant: 'ghost', icon: 'x', onClick: onClose })),
    React.createElement('div', { style: { padding: '20px 24px' } },
      React.createElement('div', { style: { marginBottom: 15 } },
        React.createElement(FieldLabel, null, 'Target audience'),
        React.createElement('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap' } },
          ['All users', 'Starter only', 'Pro only', 'Agency only'].map((t) => React.createElement('button', { key: t, onClick: () => setTarget(t),
            style: { padding: '7px 13px', borderRadius: 'var(--r-md)', fontSize: 12.5, fontWeight: 550, cursor: 'pointer',
              background: target === t ? 'var(--indigo-50)' : '#fff', color: target === t ? 'var(--indigo-700)' : 'var(--text-muted)', border: '1px solid ' + (target === t ? 'var(--indigo-200)' : 'var(--border-strong)') } }, t)))),
      React.createElement('div', { style: { marginBottom: 15 } },
        React.createElement(FieldLabel, null, 'Title'),
        React.createElement('input', { value: title, onChange: (e) => setTitle(e.target.value), placeholder: 'What\u2019s new?',
          style: { width: '100%', padding: '9px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' } })),
      React.createElement('div', { style: { marginBottom: 18 } },
        React.createElement(FieldLabel, null, 'Message'),
        React.createElement('textarea', { value: message, onChange: (e) => setMessage(e.target.value), rows: 3, placeholder: 'Write your announcement…',
          style: { width: '100%', padding: '10px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13.5, lineHeight: 1.55, outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })),
      React.createElement(SectionLabel, null, 'Preview · freelancer dashboard'),
      React.createElement(BellPreview, { title: title || 'Your announcement title', message: message || 'This is how your message appears in the notification bell.', target })),
    React.createElement('div', { style: { padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 8 } },
      React.createElement(Button, { variant: 'ghost', onClick: onClose }, 'Cancel'),
      React.createElement(Button, { variant: 'primary', icon: 'send', disabled: !valid, onClick: () => { onSend({ target, title, message }); onClose(); } }, 'Send announcement')));
}

function BellPreview({ title, message, target }) {
  return React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--bg-subtle)' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 13px', background: '#fff', borderBottom: '1px solid var(--border)' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement(Icon, { name: 'bell', size: 15, style: { color: 'var(--text-muted)' } }),
        React.createElement('span', { style: { fontSize: 12.5, fontWeight: 650 } }, 'Notifications')),
      React.createElement('span', { style: { fontSize: 10.5, color: 'var(--text-subtle)' } }, target)),
    React.createElement('div', { style: { padding: 13, display: 'flex', gap: 11, background: '#fff' } },
      React.createElement('span', { style: { width: 30, height: 30, borderRadius: 'var(--r-md)', background: 'var(--indigo-50)', color: 'var(--indigo-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 } },
        React.createElement(Icon, { name: 'sparkle', size: 15 })),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 13, fontWeight: 650, marginBottom: 2, letterSpacing: '-0.01em' } }, title),
        React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 } }, message),
        React.createElement('div', { style: { fontSize: 10.5, color: 'var(--text-subtle)', marginTop: 5 } }, 'Just now · AgentDesk'))));
}

Object.assign(window, { PaymentsScreen, AgentLogsScreen, AnnouncementsScreen });
