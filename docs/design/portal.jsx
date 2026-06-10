/* global React, Icon, Badge, Button, Markdown, money, WORKSPACE */
const { useState: useStatePo } = React;

// Portal is scoped to ONE client: Lumen Coffee Co.
const PORTAL_CLIENT = { company: 'Lumen Coffee Co.', contact: 'Maya' };

const PORTAL_PROPOSALS = [
  { id: 'pp1', title: 'Brand Identity & Website', amount: 12500, status: 'Accepted', date: 'May 15',
    body: '# Brand Identity & Website — Lumen Coffee Co.\n\n## Overview\nA refreshed identity and a fast, conversion-focused website to support both retail and a new wholesale line.\n\n## Scope of work\n1. **Brand foundations** — logo, type, color, and a one-page brand guide.\n2. **Website** — 6-page responsive site on a CMS you can edit.\n3. **Launch kit** — social templates, email header, packaging label artwork.\n\n## Timeline\n6 weeks across four milestones.\n\n## Investment\n**$12,500** — 50% to begin, 50% on launch.' },
  { id: 'pp2', title: 'Wholesale Packaging Design', status: 'Sent', date: 'Jun 2', recommended: 'Standard',
    intro: 'Label and bag design for your new wholesale line. Pick the option that fits — I’d suggest Standard for the three-SKU launch.',
    tiers: [
      { name: 'Basic', price: 1800, delivery: '1 week', scope: 'Label design for a single hero SKU.', includes: ['1 label design', 'Print-ready file', '1 revision round'] },
      { name: 'Standard', price: 3200, delivery: '2 weeks', scope: 'Full three-SKU label & bag system.', includes: ['3 origin labels', 'Bag + box artwork', 'Print spec sheet', '2 revision rounds'] },
      { name: 'Premium', price: 5400, delivery: '3 weeks', scope: 'Packaging system plus retail display.', includes: ['Everything in Standard', 'Shelf display design', 'Seasonal label template', 'Unlimited revisions (3 wks)'] },
    ] },
];

const PORTAL_PROJECT = {
  name: 'Brand & Website', desc: 'Full brand refresh and a 6-page website for your second-location launch.',
  start: 'May 19', deadline: 'Jun 30', daysLeft: 26,
  milestones: [
    { name: 'Discovery & moodboards', status: 'complete', date: 'May 23' },
    { name: 'Brand identity & guide', status: 'complete', date: 'May 30' },
    { name: 'Website design & build', status: 'active', date: 'Jun 20' },
    { name: 'QA & launch', status: 'upcoming', date: 'Jun 30' },
  ],
  files: [{ name: 'Lumen Brand Guide.pdf', size: '4.2 MB' }, { name: 'Logo Pack.zip', size: '1.1 MB' }],
};

const PORTAL_INVOICES = [
  { num: 'INV-004', desc: 'Brand & website — 50% milestone', amount: 6250, due: 'Jun 10', status: 'Sent',
    items: [{ desc: 'Brand identity system', qty: 1, rate: 4000 }, { desc: 'Website design (6 pages)', qty: 1, rate: 1750 }, { desc: 'Launch kit & templates', qty: 1, rate: 500 }] },
  { num: 'INV-001', desc: 'Brand & website — deposit', amount: 6250, due: 'Apr 18', status: 'Paid', paid: 'Apr 18',
    items: [{ desc: 'Project deposit (50%)', qty: 1, rate: 6250 }] },
];

const P_TABS = ['Overview', 'Proposals', 'Projects', 'Invoices'];

function PortalShell({ children, tab, setTab, exit }) {
  return React.createElement('div', { style: { minHeight: '100vh', background: '#FBFAF8', display: 'flex', flexDirection: 'column' } },
    // top bar — freelancer branding only
    React.createElement('header', { style: { background: '#fff', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 20 } },
      React.createElement('div', { style: { maxWidth: 820, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 11 } },
          React.createElement('div', { style: { width: 34, height: 34, borderRadius: 'var(--r-md)', background: 'var(--zinc-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em' } }, 'RS'),
          React.createElement('span', { style: { fontSize: 15.5, fontWeight: 650, letterSpacing: '-0.02em', color: 'var(--zinc-900)' } }, 'Rivera Studio')),
        React.createElement('button', { onClick: exit, title: 'Exit portal preview (demo only)',
          style: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-subtle)', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 99, padding: '5px 11px', cursor: 'pointer' } },
          React.createElement(Icon, { name: 'chevronLeft', size: 13 }), 'Back to dashboard'),
      ),
      // tabs
      React.createElement('div', { style: { maxWidth: 820, margin: '0 auto', padding: '0 12px', display: 'flex', gap: 2, overflowX: 'auto' } },
        P_TABS.map((t) => React.createElement('button', { key: t, onClick: () => setTab(t),
          style: { padding: '11px 14px', background: 'none', border: 'none', borderBottom: '2px solid ' + (tab === t ? 'var(--zinc-900)' : 'transparent'), color: tab === t ? 'var(--zinc-900)' : 'var(--text-muted)', fontSize: 13.5, fontWeight: tab === t ? 600 : 500, cursor: 'pointer', whiteSpace: 'nowrap' } }, t)),
      ),
    ),
    React.createElement('main', { style: { flex: 1, maxWidth: 820, width: '100%', margin: '0 auto', padding: '24px 20px 56px' } }, children),
    React.createElement('footer', { style: { textAlign: 'center', padding: '20px', fontSize: 11.5, color: 'var(--text-subtle)', borderTop: '1px solid var(--border)' } },
      'Prepared by Rivera Studio · Questions? hello@riverastudio.co'),
  );
}

function PCard({ children, style = {}, pad = 20 }) {
  return React.createElement('div', { style: { background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: pad, ...style } }, children);
}
function PLabel({ children }) { return React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 } }, children); }

function PortalMilestones({ milestones }) {
  return React.createElement('div', null, milestones.map((m, i) => {
    const done = m.status === 'complete', active = m.status === 'active';
    return React.createElement('div', { key: i, style: { display: 'flex', gap: 13, paddingBottom: i === milestones.length - 1 ? 0 : 18, position: 'relative' } },
      i < milestones.length - 1 && React.createElement('div', { style: { position: 'absolute', left: 12, top: 26, bottom: 0, width: 2, background: done ? '#A7F3D0' : 'var(--border)' } }),
      React.createElement('span', { style: { width: 26, height: 26, borderRadius: 99, flexShrink: 0, zIndex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        background: done ? 'var(--emerald-500)' : '#fff', border: '2px solid ' + (done ? 'var(--emerald-500)' : active ? 'var(--zinc-900)' : 'var(--border-strong)'), color: '#fff' } },
        done ? React.createElement(Icon, { name: 'check', size: 14, strokeWidth: 3 }) : active ? React.createElement('span', { style: { width: 9, height: 9, borderRadius: 99, background: 'var(--zinc-900)' } }) : React.createElement('span', { style: { width: 7, height: 7, borderRadius: 99, background: 'var(--zinc-300)' } })),
      React.createElement('div', { style: { paddingTop: 2 } },
        React.createElement('div', { style: { fontSize: 14.5, fontWeight: 550, color: done || active ? 'var(--text)' : 'var(--text-muted)' } }, m.name),
        React.createElement('div', { style: { fontSize: 12.5, color: active ? 'var(--zinc-900)' : 'var(--text-subtle)', marginTop: 2, fontWeight: active ? 550 : 400 } },
          done ? 'Completed ' + m.date : active ? 'In progress · due ' + m.date : 'Upcoming · ' + m.date)),
    );
  }));
}

function PTierCard({ tier, recommended, selected, accepted, onSelect, selectable }) {
  const rec = tier.name === recommended;
  const isAcc = accepted === tier.name;
  const dim = accepted && !isAcc;
  const border = isAcc ? 'var(--emerald-500)' : selected ? 'var(--zinc-900)' : rec ? 'var(--zinc-400)' : 'var(--border)';
  return React.createElement('div', { onClick: selectable ? onSelect : undefined,
    style: { display: 'flex', flexDirection: 'column', border: '1px solid ' + border, borderRadius: 14, overflow: 'hidden', background: '#fff', cursor: selectable ? 'pointer' : 'default', opacity: dim ? 0.5 : 1, boxShadow: (selected || isAcc) ? '0 0 0 1px ' + border : 'none', transition: 'border-color .12s, box-shadow .12s' } },
    (rec || isAcc) && React.createElement('div', { style: { background: isAcc ? 'var(--emerald-500)' : 'var(--zinc-900)', color: '#fff', fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', padding: '4px' } }, isAcc ? 'Your choice' : 'Suggested'),
    React.createElement('div', { style: { padding: '16px 16px 14px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
        React.createElement('span', { style: { fontSize: 13, fontWeight: 650 } }, tier.name),
        selectable && React.createElement('span', { style: { width: 17, height: 17, borderRadius: 99, border: '1.5px solid ' + (selected ? 'var(--zinc-900)' : 'var(--border-strong)'), background: selected ? 'var(--zinc-900)' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }, selected && React.createElement('span', { style: { width: 6, height: 6, borderRadius: 99, background: '#fff' } }))),
      React.createElement('div', { style: { fontSize: 23, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 } }, money(tier.price)),
      React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 } }, React.createElement(Icon, { name: 'clock', size: 12 }), tier.delivery),
      React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.45, minHeight: 36 } }, tier.scope)),
    React.createElement('div', { style: { borderTop: '1px solid var(--border)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 } },
      tier.includes.map((it, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--zinc-700)' } },
        React.createElement(Icon, { name: 'check', size: 14, strokeWidth: 2.5, style: { color: 'var(--emerald-500)', flexShrink: 0, marginTop: 1 } }), it))),
  );
}

function PStars({ n, onSet }) {
  return React.createElement('div', { style: { display: 'inline-flex', gap: 4 } },
    [1, 2, 3, 4, 5].map((i) => React.createElement('span', { key: i, onClick: onSet ? () => onSet(i) : undefined, style: { color: i <= n ? 'var(--amber-500)' : 'var(--zinc-300)', fontSize: 26, cursor: onSet ? 'pointer' : 'default', lineHeight: 1, transition: 'color .1s' } }, '★')));
}

function TestimonialCard({ app, company }) {
  const [stars, setStars] = useStatePo(5);
  const [text, setText] = useStatePo('');
  const [done, setDone] = useStatePo(false);
  if (done) return React.createElement(PCard, { style: { borderColor: 'var(--emerald-100)', background: 'var(--emerald-50)' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, color: 'var(--emerald-700)', fontSize: 14, fontWeight: 550 } }, React.createElement(Icon, { name: 'checkCircle', size: 18 }), 'Thank you for the kind words! 💛'));
  return React.createElement(PCard, { style: { borderColor: 'var(--zinc-300)' } },
    React.createElement(PLabel, null, 'How was working together?'),
    React.createElement('div', { style: { marginBottom: 12 } }, React.createElement(PStars, { n: stars, onSet: setStars })),
    React.createElement('textarea', { value: text, onChange: (e) => setText(e.target.value), placeholder: 'Share a sentence about your experience (optional)…', rows: 3,
      style: { width: '100%', padding: '11px 13px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', lineHeight: 1.5, marginBottom: 12 } }),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end' } },
      React.createElement(Button, { variant: 'primary', icon: 'send', onClick: () => { app.addTestimonial({ client: PORTAL_CLIENT.contact + ' @ ' + company, company, stars, text: text.trim() || 'Loved working with Rivera Studio.', date: 'Jun 2026' }); setDone(true); app.toast('Testimonial submitted — thank you!', { icon: 'checkCircle', tint: 'emerald' }); } }, 'Submit')),
  );
}

function PortalView({ app, exit }) {
  const [tab, setTab] = useStatePo('Overview');
  const [proposals, setProposals] = useStatePo(PORTAL_PROPOSALS);
  const [invoices, setInvoices] = useStatePo(PORTAL_INVOICES);
  const [openProp, setOpenProp] = useStatePo(null);
  const [openInv, setOpenInv] = useStatePo(null);
  const [selTier, setSelTier] = useStatePo({});
  const [msg, setMsg] = useStatePo('');
  const [sent, setSent] = useStatePo(false);
  const [justPaid, setJustPaid] = useStatePo(false);

  const acceptProp = (p) => {
    const chosen = p.tiers ? (selTier[p.id] || p.recommended) : null;
    setProposals((ps) => ps.map((x) => x.id === p.id ? { ...x, status: 'Accepted', date: 'Jun 4', acceptedTier: chosen } : x));
    setOpenProp(null);
    app.toast('Proposal accepted' + (chosen ? ' — ' + chosen + ' tier' : '') + '. Thank you!', { icon: 'checkCircle', tint: 'emerald' });
  };
  const payInvoice = (num) => {
    setInvoices((iv) => iv.map((x) => x.num === num ? { ...x, status: 'Paid', paid: 'Jun 4' } : x));
    setJustPaid(true); setOpenInv(null); setTab('Overview');
    app.toast('Payment received — thank you!', { icon: 'checkCircle', tint: 'emerald' });
  };
  const sendMsg = () => { if (!msg.trim()) return; setSent(true); setMsg(''); app.toast('Message sent to Rivera Studio', { icon: 'send', tint: 'emerald' }); setTimeout(() => setSent(false), 3500); };

  const propAmount = (p) => p.tiers ? (p.acceptedTier ? p.tiers.find((t) => t.name === p.acceptedTier).price : p.tiers.find((t) => t.name === p.recommended).price) : p.amount;
  const latestInv = invoices[0];

  return React.createElement(PortalShell, { tab, setTab, exit },
    // ---------- OVERVIEW ----------
    tab === 'Overview' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
      React.createElement('div', null,
        React.createElement('h1', { style: { margin: 0, fontSize: 25, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Welcome back, ' + PORTAL_CLIENT.company),
        React.createElement('p', { style: { margin: '6px 0 0', fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.55 } }, 'Everything for our project in one place — progress, deliverables, and invoices. Reach out anytime.')),
      justPaid && React.createElement(TestimonialCard, { app, company: PORTAL_CLIENT.company }),
      // active project
      React.createElement(PCard, null,
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 } },
          React.createElement(PLabel, null, 'Active project'),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: 'var(--zinc-900)', background: 'var(--bg-muted)', padding: '3px 9px', borderRadius: 99 } }, PORTAL_PROJECT.daysLeft + ' days left')),
        React.createElement('div', { style: { fontSize: 17, fontWeight: 650, marginBottom: 4 } }, PORTAL_PROJECT.name),
        React.createElement('div', { style: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 } }, 'Due ' + PORTAL_PROJECT.deadline),
        (() => { const done = PORTAL_PROJECT.milestones.filter((m) => m.status === 'complete').length; const pct = (done / PORTAL_PROJECT.milestones.length) * 100;
          return React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 7 } }, React.createElement('span', { style: { color: 'var(--text-muted)' } }, done + ' of ' + PORTAL_PROJECT.milestones.length + ' milestones complete'), React.createElement('span', { style: { fontWeight: 600 } }, Math.round(pct) + '%')),
            React.createElement('div', { style: { height: 8, background: 'var(--zinc-200)', borderRadius: 99, overflow: 'hidden' } }, React.createElement('div', { style: { width: pct + '%', height: '100%', background: 'var(--zinc-900)', borderRadius: 99 } }))); })(),
        React.createElement('button', { onClick: () => setTab('Projects'), style: { marginTop: 14, background: 'none', border: 'none', color: 'var(--zinc-900)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0 } }, 'View milestones', React.createElement(Icon, { name: 'arrowRight', size: 14 })),
      ),
      // latest invoice
      React.createElement(PCard, null,
        React.createElement(PLabel, null, 'Latest invoice'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' } },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9 } }, React.createElement('span', { style: { fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em' } }, money(latestInv.amount)), React.createElement(Badge, { status: latestInv.status, dot: true }, latestInv.status === 'Paid' ? 'Paid ' + latestInv.paid : latestInv.status)),
            React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'var(--mono)' } }, latestInv.num + ' · ' + (latestInv.status === 'Paid' ? 'paid ' + latestInv.paid : 'due ' + latestInv.due))),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            latestInv.status !== 'Paid' && React.createElement(Button, { variant: 'success', onClick: () => payInvoice(latestInv.num) }, 'Pay Now'),
            React.createElement(Button, { variant: 'secondary', onClick: () => { setOpenInv(latestInv.num); setTab('Invoices'); } }, 'View')),
        ),
      ),
      // recent activity
      React.createElement(PCard, null,
        React.createElement(PLabel, null, 'Recent activity'),
        React.createElement('div', null, [
          { t: 'Milestone “Brand identity & guide” completed', d: 'May 30' },
          { t: 'Invoice INV-004 sent', d: 'May 28' },
          { t: 'Proposal accepted', d: 'May 15' },
          { t: 'Project kicked off', d: 'May 19' },
        ].map((a, i, arr) => React.createElement('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--border)' } },
          React.createElement('span', { style: { fontSize: 13.5, color: 'var(--text)' } }, a.t),
          React.createElement('span', { style: { fontSize: 12, color: 'var(--text-subtle)', whiteSpace: 'nowrap' } }, a.d)))),
      ),
      // message box
      React.createElement(PCard, null,
        React.createElement(PLabel, null, 'Leave a message'),
        sent
          ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, color: 'var(--emerald-700)', fontSize: 13.5, fontWeight: 500, padding: '6px 0' } }, React.createElement(Icon, { name: 'checkCircle', size: 18 }), 'Thanks — Jordan will get back to you shortly.')
          : React.createElement('div', null,
              React.createElement('textarea', { value: msg, onChange: (e) => setMsg(e.target.value), placeholder: 'Ask a question or share feedback…', rows: 3,
                style: { width: '100%', padding: '11px 13px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', lineHeight: 1.5, marginBottom: 10 } }),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end' } }, React.createElement(Button, { variant: 'primary', icon: 'send', onClick: sendMsg }, 'Send message'))),
      ),
    ),

    // ---------- PROPOSALS ----------
    tab === 'Proposals' && (openProp
      ? (() => { const p = proposals.find((x) => x.id === openProp); const chosen = selTier[p.id] || p.recommended; return React.createElement('div', null,
          React.createElement('button', { onClick: () => setOpenProp(null), style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 16, padding: 0 } }, React.createElement(Icon, { name: 'chevronLeft', size: 16 }), 'Proposals'),
          React.createElement(PCard, { pad: '28px 28px' },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 18, fontWeight: 650, letterSpacing: '-0.02em' } }, p.title),
                React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 } }, 'Sent ' + p.date)),
              React.createElement(Badge, { status: p.status, dot: true }, p.status === 'Accepted' ? 'Accepted ' + p.date : p.status)),
            p.status === 'Accepted' && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', borderRadius: 'var(--r-md)', color: 'var(--emerald-700)', fontSize: 13, fontWeight: 550, marginBottom: 18 } }, React.createElement(Icon, { name: 'checkCircle', size: 16 }), p.acceptedTier ? 'You accepted the ' + p.acceptedTier + ' option — thank you!' : 'You accepted this proposal — thank you!'),
            p.tiers
              ? React.createElement('div', null,
                  p.intro && React.createElement('p', { style: { fontSize: 14, color: 'var(--zinc-700)', lineHeight: 1.55, margin: '0 0 18px' } }, p.intro),
                  React.createElement('div', { style: { display: 'grid', gridTemplateColumns: app.layout === 'mobile' ? '1fr' : 'repeat(3,1fr)', gap: 12 } },
                    p.tiers.map((t, i) => React.createElement(PTierCard, { key: i, tier: t, recommended: p.recommended, selected: p.status === 'Sent' && chosen === t.name, accepted: p.acceptedTier, selectable: p.status === 'Sent', onSelect: () => setSelTier((s) => ({ ...s, [p.id]: t.name })) }))))
              : React.createElement(Markdown, { text: p.body }),
            p.status === 'Sent' && React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--border)', flexWrap: 'wrap' } },
              React.createElement(Button, { variant: 'success', size: 'lg', icon: 'check', onClick: () => acceptProp(p) }, p.tiers ? 'Accept ' + chosen + ' — ' + money(p.tiers.find((t) => t.name === chosen).price) : 'Accept Proposal'),
              React.createElement(Button, { variant: 'secondary', size: 'lg', onClick: () => app.toast('Change request sent to Rivera Studio', { icon: 'message', tint: 'amber' }) }, 'Request Changes')),
          )); })()
      : React.createElement('div', null,
          React.createElement('h1', { style: { margin: '0 0 18px', fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Proposals'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            proposals.map((p) => React.createElement('div', { key: p.id, onClick: () => setOpenProp(p.id),
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: 18, background: '#fff', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', opacity: p.status === 'Rejected' ? 0.5 : 1 },
              onMouseEnter: (e) => e.currentTarget.style.borderColor = 'var(--border-strong)', onMouseLeave: (e) => e.currentTarget.style.borderColor = 'var(--border)' },
              React.createElement('div', null,
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 } }, React.createElement('span', { style: { fontSize: 15, fontWeight: 600 } }, p.title), p.status === 'Sent' && React.createElement(Badge, { tint: 'amber', size: 'sm', dot: true }, 'Awaiting your decision')),
                React.createElement('div', { style: { fontSize: 13, color: 'var(--text-muted)' } }, (p.tiers ? 'from ' : '') + money(p.tiers ? Math.min.apply(null, p.tiers.map((t) => t.price)) : propAmount(p)) + ' · sent ' + p.date)),
              p.status === 'Accepted' ? React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--emerald-600)', fontSize: 12.5, fontWeight: 600 } }, React.createElement(Icon, { name: 'checkCircle', size: 16 }), 'Accepted') : React.createElement(Icon, { name: 'chevronRight', size: 18, style: { color: 'var(--zinc-300)' } }),
            ))))
    ),

    // ---------- PROJECTS ----------
    tab === 'Projects' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
      React.createElement('div', null,
        React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, PORTAL_PROJECT.name),
        React.createElement('p', { style: { margin: '6px 0 0', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55 } }, PORTAL_PROJECT.desc),
        React.createElement('div', { style: { display: 'flex', gap: 18, marginTop: 12, fontSize: 12.5, color: 'var(--text-subtle)' } }, React.createElement('span', null, 'Started ' + PORTAL_PROJECT.start), React.createElement('span', null, 'Due ' + PORTAL_PROJECT.deadline))),
      React.createElement(PCard, null, React.createElement(PLabel, null, 'Milestones'), React.createElement(PortalMilestones, { milestones: PORTAL_PROJECT.milestones })),
      React.createElement(PCard, null, React.createElement(PLabel, null, 'Deliverables'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } }, PORTAL_PROJECT.files.map((f, i) => React.createElement('div', { key: i, onClick: () => app.toast('Downloading ' + f.name + '…', { icon: 'download' }),
          style: { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', cursor: 'pointer' } },
          React.createElement('span', { style: { width: 34, height: 34, borderRadius: 'var(--r-sm)', background: 'var(--bg-muted)', color: 'var(--zinc-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, React.createElement(Icon, { name: 'proposals', size: 16 })),
          React.createElement('div', { style: { flex: 1 } }, React.createElement('div', { style: { fontSize: 13.5, fontWeight: 550 } }, f.name), React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)' } }, f.size)),
          React.createElement(Icon, { name: 'download', size: 16, style: { color: 'var(--zinc-400)' } }))))),
    ),

    // ---------- INVOICES ----------
    tab === 'Invoices' && (openInv
      ? (() => { const iv = invoices.find((x) => x.num === openInv); const subtotal = iv.items.reduce((s, it) => s + it.qty * it.rate, 0); return React.createElement('div', null,
          React.createElement('button', { onClick: () => setOpenInv(null), style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 16, padding: 0 } }, React.createElement(Icon, { name: 'chevronLeft', size: 16 }), 'Invoices'),
          React.createElement(PCard, { pad: '30px 30px' },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 } },
              React.createElement('div', null, React.createElement('div', { style: { fontSize: 19, fontWeight: 700, fontFamily: 'var(--mono)', letterSpacing: '-0.01em' } }, iv.num), React.createElement('div', { style: { fontSize: 13, color: 'var(--text-muted)', marginTop: 3 } }, iv.desc)),
              React.createElement(Badge, { status: iv.status, dot: true }, iv.status === 'Paid' ? 'Paid ' + iv.paid : iv.status)),
            React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: 13.5 } },
              React.createElement('thead', null, React.createElement('tr', { style: { borderBottom: '1px solid var(--border)' } }, ['Description', 'Qty', 'Rate', 'Amount'].map((h, i) => React.createElement('th', { key: i, style: { textAlign: i ? 'right' : 'left', padding: '9px 0', fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' } }, h)))),
              React.createElement('tbody', null, iv.items.map((it, i) => React.createElement('tr', { key: i, style: { borderBottom: '1px solid var(--border)' } },
                React.createElement('td', { style: { padding: '12px 0' } }, it.desc),
                React.createElement('td', { style: { padding: '12px 0', textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--text-muted)' } }, it.qty),
                React.createElement('td', { style: { padding: '12px 0', textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--text-muted)' } }, money(it.rate)),
                React.createElement('td', { style: { padding: '12px 0', textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 600 } }, money(it.qty * it.rate))))),
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginTop: 14 } }, React.createElement('div', { style: { width: 200 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: 'var(--text-muted)' } }, React.createElement('span', null, 'Subtotal'), React.createElement('span', { style: { fontFamily: 'var(--mono)' } }, money(subtotal))),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', marginTop: 4, borderTop: '1px solid var(--border-strong)', fontSize: 16, fontWeight: 700 } }, React.createElement('span', null, 'Total'), React.createElement('span', { style: { fontFamily: 'var(--mono)' } }, money(subtotal))))),
            React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--border)' } },
              iv.status !== 'Paid' && React.createElement(Button, { variant: 'success', size: 'lg', icon: 'dollar', onClick: () => payInvoice(iv.num) }, 'Pay Now'),
              React.createElement(Button, { variant: 'secondary', size: 'lg', icon: 'download', onClick: () => app.toast('Downloading ' + iv.num + '.pdf…', { icon: 'download' }) }, 'Download PDF')),
            iv.status !== 'Paid' && React.createElement('div', { style: { fontSize: 12, color: 'var(--text-subtle)', marginTop: 14 } }, 'Payment due ' + iv.due + '. Pay securely by card or bank transfer.'),
          )); })()
      : React.createElement('div', null,
          React.createElement('h1', { style: { margin: '0 0 18px', fontSize: 22, fontWeight: 680, letterSpacing: '-0.03em' } }, 'Invoices'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } }, invoices.map((iv) => React.createElement('div', { key: iv.num, onClick: () => setOpenInv(iv.num),
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: 18, background: '#fff', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', boxShadow: iv.status === 'Overdue' ? 'inset 3px 0 0 var(--rose-500)' : 'none' },
            onMouseEnter: (e) => e.currentTarget.style.borderColor = 'var(--border-strong)', onMouseLeave: (e) => e.currentTarget.style.borderColor = 'var(--border)' },
            React.createElement('div', null, React.createElement('div', { style: { fontSize: 14.5, fontWeight: 600, fontFamily: 'var(--mono)', marginBottom: 2 } }, iv.num), React.createElement('div', { style: { fontSize: 13, color: 'var(--text-muted)' } }, iv.desc)),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } }, React.createElement('span', { style: { fontSize: 15, fontWeight: 700, fontFamily: 'var(--mono)' } }, money(iv.amount)), React.createElement(Badge, { status: iv.status, dot: true }, iv.status === 'Paid' ? 'Paid' : iv.status))))),
    )),
  );
}

Object.assign(window, { PortalView });
