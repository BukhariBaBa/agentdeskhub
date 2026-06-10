/* global React, Icon, Card, Badge, Button, PageHeader, EmptyState, Markdown, DataTable, Row, Td, money */
const { useState: useStatePr } = React;

function StatusTimeline({ status }) {
  const steps = ['Draft', 'Sent', 'Accepted'];
  const order = { Draft: 0, Sent: 1, Accepted: 2, Rejected: 1 };
  const cur = order[status] ?? 0;
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 0 } },
    steps.map((s, i) => React.createElement(React.Fragment, { key: s },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
        React.createElement('span', { style: { width: 22, height: 22, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: i <= cur ? 'var(--indigo-600)' : '#fff', color: i <= cur ? '#fff' : 'var(--text-subtle)', border: '1.5px solid ' + (i <= cur ? 'var(--indigo-600)' : 'var(--border-strong)') } },
          i < cur ? React.createElement(Icon, { name: 'check', size: 12, strokeWidth: 3 }) : React.createElement('span', { style: { fontSize: 11, fontWeight: 700 } }, i + 1)),
        React.createElement('span', { style: { fontSize: 11.5, fontWeight: 550, color: i <= cur ? 'var(--text)' : 'var(--text-subtle)' } }, s)),
      i < steps.length - 1 && React.createElement('div', { style: { flex: 1, height: 1.5, minWidth: 36, background: i < cur ? 'var(--indigo-600)' : 'var(--border-strong)', margin: '0 6px', marginBottom: 18 } }),
    )),
  );
}

function ProposalsView({ app }) {
  const [running, setRunning] = useStatePr(false);
  const detail = app.detail && app.proposals.find((p) => p.id === app.detail.id);

  const generate = () => { setRunning(true); setTimeout(() => { setRunning(false); app.runAgent('proposal'); }, 900); };

  if (detail) return React.createElement(ProposalDetail, { p: detail, app });

  return React.createElement('div', null,
    React.createElement(PageHeader, {
      title: 'Proposals', subtitle: app.proposals.length + ' total · ' + money(app.proposals.filter((p) => p.status === 'Sent').reduce((s, p) => s + p.amount, 0)) + ' awaiting decision',
      actions: React.createElement(Button, { variant: 'primary', icon: running ? undefined : 'penTool', onClick: generate, disabled: running },
        running ? React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7 } }, React.createElement('span', { style: { width: 13, height: 13, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: 99, display: 'inline-block', animation: 'ad-spin .7s linear infinite' } }), 'Drafting…') : 'Generate Proposal'),
    }),
    app.proposals.length === 0
      ? React.createElement(EmptyState, { icon: 'penTool', title: 'No proposals yet', body: 'Let the Proposal Agent turn a client brief into a polished, ready-to-send proposal.', cta: 'Generate a proposal', onCta: generate })
      : React.createElement(DataTable, { columns: [{ label: 'Proposal' }, { label: 'Client' }, { label: 'Amount', right: true }, { label: 'Status' }, { label: 'Sent', right: true }] },
          app.proposals.map((p) => React.createElement(Row, { key: p.id, onClick: () => app.go('proposals', { id: p.id }) },
            React.createElement(Td, null, React.createElement('span', { style: { fontWeight: 550 } }, p.title)),
            React.createElement(Td, { style: { color: 'var(--text-muted)' } }, p.client),
            React.createElement(Td, { right: true, style: { fontFamily: 'var(--mono)', fontWeight: 600 } }, money(p.amount)),
            React.createElement(Td, null, React.createElement(Badge, { status: p.status, dot: true })),
            React.createElement(Td, { right: true, style: { color: 'var(--text-subtle)' } }, p.sent),
          )),
        ),
  );
}

function ProposalDetail({ p, app }) {
  return React.createElement('div', { style: { maxWidth: 760, margin: '0 auto' } },
    React.createElement('button', { onClick: () => app.go('proposals'), style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 16, padding: 0 } },
      React.createElement(Icon, { name: 'chevronLeft', size: 16 }), 'Proposals'),
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' } },
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 } },
          React.createElement('h1', { style: { margin: 0, fontSize: 21, fontWeight: 650, letterSpacing: '-0.02em' } }, p.title),
          React.createElement(Badge, { status: p.status, dot: true })),
        React.createElement('div', { style: { fontSize: 13.5, color: 'var(--text-muted)' } }, p.client + ' · ' + money(p.amount))),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        p.status === 'Draft'
          ? React.createElement(Button, { variant: 'primary', icon: 'send', onClick: () => app.toast('Proposal sent — now visible in the client portal', { icon: 'send', tint: 'indigo' }) }, 'Send to Client')
          : React.createElement(Button, { variant: 'secondary', icon: 'eye', onClick: () => app.setMode('portal') }, 'View in portal'),
        React.createElement(Button, { variant: 'secondary', icon: 'download', onClick: () => app.toast('Downloading proposal PDF…', { icon: 'download' }) }, 'PDF'),
      ),
    ),
    React.createElement(Card, { pad: 22, style: { marginBottom: 18 } },
      React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 } }, 'Status'),
      React.createElement(StatusTimeline, { status: p.status }),
    ),
    p.tiers
      ? React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 } }, 'Pricing options'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: app.layout === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 12 } },
            p.tiers.map((t, i) => React.createElement(PropTier, { key: i, tier: t, recommended: p.recommended, accepted: p.acceptedTier }))))
      : React.createElement(Card, { pad: '30px 34px' }, React.createElement(Markdown, { text: p.body })),
  );
}

function PropTier({ tier, recommended, accepted }) {
  const rec = tier.name === recommended;
  const acc = tier.name === accepted;
  const dim = accepted && !acc;
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: '1px solid ' + (acc ? 'var(--emerald-500)' : rec ? 'var(--indigo-600)' : 'var(--border)'), borderRadius: 'var(--r-lg)', overflow: 'hidden', background: '#fff', opacity: dim ? 0.5 : 1, boxShadow: (acc || rec) ? '0 0 0 1px ' + (acc ? 'var(--emerald-500)' : 'var(--indigo-600)') : 'none' } },
    (rec || acc) && React.createElement('div', { style: { background: acc ? 'var(--emerald-500)' : 'var(--indigo-600)', color: '#fff', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', padding: '4px' } }, acc ? 'Accepted' : 'Recommended'),
    React.createElement('div', { style: { padding: '16px 16px 14px' } },
      React.createElement('div', { style: { fontSize: 13, fontWeight: 650, marginBottom: 8 } }, tier.name),
      React.createElement('div', { style: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 } }, money(tier.price)),
      React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 } }, React.createElement(Icon, { name: 'clock', size: 12 }), tier.delivery + ' delivery'),
      React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.45, minHeight: 36 } }, tier.scope)),
    React.createElement('div', { style: { borderTop: '1px solid var(--border)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 } },
      tier.includes.map((it, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--zinc-700)' } },
        React.createElement(Icon, { name: 'check', size: 14, strokeWidth: 2.5, style: { color: 'var(--emerald-500)', flexShrink: 0, marginTop: 1 } }), it))),
  );
}

Object.assign(window, { ProposalsView });
