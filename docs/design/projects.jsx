/* global React, Icon, Card, Badge, Button, IconButton, Modal, PageHeader, ProgressBar, DataTable, Row, Td, money */
const { useState: useStatePr } = React;

function MilestoneTimeline({ milestones }) {
  return React.createElement('div', { style: { position: 'relative' } },
    milestones.map((m, i) => {
      const done = m.status === 'complete';
      const active = m.status === 'active';
      const color = done ? 'var(--emerald-500)' : active ? 'var(--indigo-600)' : 'var(--zinc-300)';
      return React.createElement('div', { key: i, style: { display: 'flex', gap: 14, paddingBottom: i === milestones.length - 1 ? 0 : 20, position: 'relative' } },
        i < milestones.length - 1 && React.createElement('div', { style: { position: 'absolute', left: 11, top: 24, bottom: 0, width: 2, background: done ? '#A7F3D0' : 'var(--border)' } }),
        React.createElement('span', { style: { width: 24, height: 24, borderRadius: 99, flexShrink: 0, zIndex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: done ? 'var(--emerald-500)' : '#fff', border: '2px solid ' + color, color: '#fff' } },
          done ? React.createElement(Icon, { name: 'check', size: 13, strokeWidth: 3 })
            : active ? React.createElement('span', { style: { width: 8, height: 8, borderRadius: 99, background: 'var(--indigo-600)', animation: 'ad-pulse-dot 1.6s ease-in-out infinite' } })
            : React.createElement('span', { style: { width: 7, height: 7, borderRadius: 99, background: 'var(--zinc-300)' } })),
        React.createElement('div', { style: { flex: 1, paddingTop: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 550, color: active || done ? 'var(--text)' : 'var(--text-muted)' } }, m.name),
            React.createElement(Badge, { status: done ? 'Completed' : active ? 'Active' : 'Pending', size: 'sm' }, done ? 'Completed' : active ? 'In progress' : 'Upcoming')),
          React.createElement('div', { style: { fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 } }, (done ? 'Completed ' : 'Due ') + m.date)),
      );
    }),
  );
}

/* ---- scope creep banner ---- */
function ScopeCreepBanner({ pr, app }) {
  return React.createElement('div', { style: { display: 'flex', gap: 13, padding: '15px 18px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)', borderRadius: 'var(--r-lg)', marginBottom: 18, animation: 'ad-fade-up .2s ease' } },
    React.createElement('span', { style: { width: 34, height: 34, borderRadius: 'var(--r-md)', background: '#fff', color: 'var(--amber-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--amber-100)' } }, React.createElement(Icon, { name: 'alert', size: 18 })),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { fontSize: 13.5, fontWeight: 650, color: 'var(--amber-700)', marginBottom: 3 } }, 'Scope creep detected'),
      React.createElement('div', { style: { fontSize: 13, color: 'var(--zinc-700)', lineHeight: 1.5, marginBottom: 12 } },
        'The client requested ', React.createElement('strong', null, pr.scopeCreep.requested.toLowerCase()), ', which is outside the original proposal. Draft a scope change notice?'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement(Button, { size: 'sm', variant: 'primary', icon: 'penTool', onClick: () => { const run = app.runChangeNotice(pr); app.openApproval(run.id); } }, 'Draft Change Notice'),
        React.createElement(Button, { size: 'sm', variant: 'ghost', onClick: () => app.dismissScopeCreep(pr.id) }, 'Dismiss')),
    ),
  );
}

/* ---- time logging ---- */
function TimeLogSection({ pr, app }) {
  const [adding, setAdding] = useStatePr(false);
  const [date, setDate] = useStatePr('Jun 4');
  const [hours, setHours] = useStatePr('');
  const [desc, setDesc] = useStatePr('');
  const [billable, setBillable] = useStatePr(true);
  const logs = pr.timeLogs || [];
  const total = logs.reduce((s, l) => s + l.hours, 0);
  const billableTotal = logs.filter((l) => l.billable).reduce((s, l) => s + l.hours, 0);
  const submit = () => { const h = parseFloat(hours); if (!h || !desc.trim()) return; app.addTimeLog(pr.id, { date, hours: h, desc: desc.trim(), billable }); setHours(''); setDesc(''); setAdding(false); };

  const inp = (val, set, props = {}) => React.createElement('input', { value: val, onChange: (e) => set(e.target.value),
    style: { padding: '8px 10px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--text)', outline: 'none', ...props.style }, ...props });

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 } },
      React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Time log'),
      React.createElement(Button, { size: 'sm', variant: 'secondary', icon: 'plus', onClick: () => setAdding((a) => !a) }, 'Log Time')),
    React.createElement(Card, { pad: 0, style: { overflow: 'hidden' } },
      adding && React.createElement('div', { style: { padding: 14, background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10, animation: 'ad-fade .15s ease' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '90px 70px 1fr', gap: 8 } },
          inp(date, setDate, { placeholder: 'Date' }),
          inp(hours, setHours, { placeholder: 'Hrs', type: 'number', style: { fontFamily: 'var(--mono)' } }),
          inp(desc, setDesc, { placeholder: 'What did you work on?' })),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--text-muted)', cursor: 'pointer' } },
            React.createElement('input', { type: 'checkbox', checked: billable, onChange: () => setBillable((b) => !b), style: { width: 15, height: 15, accentColor: 'var(--indigo-600)' } }), 'Billable'),
          React.createElement(Button, { size: 'sm', variant: 'primary', onClick: submit }, 'Add entry')),
      ),
      logs.length ? logs.map((l, i) => React.createElement('div', { key: l.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: i === logs.length - 1 ? 'none' : '1px solid var(--border)' } },
        React.createElement('span', { style: { fontSize: 12, color: 'var(--text-subtle)', width: 54, flexShrink: 0, fontFamily: 'var(--mono)' } }, l.date),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, fontFamily: 'var(--mono)', width: 44, flexShrink: 0 } }, l.hours + 'h'),
        React.createElement('span', { style: { flex: 1, fontSize: 13, color: 'var(--text)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, l.desc),
        React.createElement('button', { onClick: () => app.toggleBillable(pr.id, l.id), title: 'Toggle billable',
          style: { cursor: 'pointer', background: 'none', border: 'none', padding: 0 } },
          React.createElement(Badge, { tint: l.billable ? 'emerald' : 'zinc', size: 'sm' }, l.billable ? 'Billable' : 'Non-billable'))),
      ) : React.createElement('div', { style: { padding: 16, fontSize: 13, color: 'var(--text-subtle)' } }, 'No time logged yet.'),
    ),
    logs.length ? React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12.5, color: 'var(--text-muted)' } },
      React.createElement('span', null, React.createElement('span', { style: { fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--text)' } }, billableTotal + 'h'), ' billable of ', total + 'h'),
      React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5 } }, React.createElement(Icon, { name: 'receipt', size: 13 }), 'Finance Agent bills from these')) : null,
  );
}

/* ---- weekly update control ---- */
function WeeklyUpdateCard({ pr, app }) {
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return React.createElement(Card, { pad: 16 },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: pr.weeklyUpdates ? 12 : 0 } },
      React.createElement('div', { style: { minWidth: 0 } },
        React.createElement('div', { style: { fontSize: 13.5, fontWeight: 600 } }, 'Weekly client updates'),
        React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', marginTop: 1 } }, pr.weeklyUpdates ? 'Auto-drafted every ' + pr.weeklyDay : 'Paused')),
      React.createElement('button', { onClick: () => app.setWeeklyUpdates(pr.id, !pr.weeklyUpdates), style: { width: 40, height: 23, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 2, background: pr.weeklyUpdates ? 'var(--indigo-600)' : 'var(--zinc-300)', display: 'flex', justifyContent: pr.weeklyUpdates ? 'flex-end' : 'flex-start' } },
        React.createElement('span', { style: { width: 19, height: 19, borderRadius: 99, background: '#fff' } }))),
    pr.weeklyUpdates && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('select', { value: pr.weeklyDay, onChange: (e) => app.setWeeklyUpdates(pr.id, true, e.target.value),
        style: { flex: 1, padding: '7px 10px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--text)', outline: 'none', background: '#fff', fontFamily: 'var(--font)' } },
        DAYS.map((d) => React.createElement('option', { key: d, value: d }, d))),
      React.createElement(Button, { size: 'sm', variant: 'secondary', icon: 'send', onClick: () => { const run = app.runWeeklyUpdate(pr); app.openApproval(run.id); } }, 'Draft now')),
  );
}

/* ---- transcript import modal ---- */
function TranscriptModal({ open, onClose, app, clients }) {
  const [text, setText] = useStatePr('');
  const [client, setClient] = useStatePr('');
  const [busy, setBusy] = useStatePr(false);
  const sample = 'Jordan: Thanks for hopping on! So tell me what you\u2019re looking for.\nClient: We\u2019re launching next quarter and need a full brand — logo, colors, the works — plus a website. Maybe 6 pages. Budget is somewhere around 10 to 14k. We\u2019d love it to feel premium but still approachable. Oh, and we need it mobile-first. Deadline is mid-August. Also — could you add a wholesale page?';
  const extract = () => { setBusy(true); setTimeout(() => { const run = app.runTranscript(text || sample, client); setBusy(false); setText(''); onClose(); app.openApproval(run.id); }, 1000); };
  return React.createElement(Modal, { open, onClose, width: 560 },
    React.createElement('div', { style: { padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 } },
      React.createElement('span', { style: { width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, React.createElement(Icon, { name: 'listChecks', size: 19 })),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 16, fontWeight: 650, letterSpacing: '-0.01em' } }, 'Paste call transcript'),
        React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 1 } }, 'Project Manager extracts requirements, budget, and action items.'))),
    React.createElement('div', { style: { padding: '20px 24px' } },
      React.createElement('label', { style: { display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6 } }, 'Client (optional)'),
      React.createElement('select', { value: client, onChange: (e) => setClient(e.target.value), style: { width: '100%', padding: '9px 11px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13.5, color: 'var(--text)', outline: 'none', background: '#fff', fontFamily: 'var(--font)', marginBottom: 16 } },
        React.createElement('option', { value: '' }, 'Select a client…'),
        clients.map((c) => React.createElement('option', { key: c.id, value: c.company }, c.company))),
      React.createElement('label', { style: { display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6 } }, 'Transcript'),
      React.createElement('textarea', { value: text, onChange: (e) => setText(e.target.value), placeholder: sample, rows: 8,
        style: { width: '100%', padding: '11px 13px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13, lineHeight: 1.55, color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'var(--mono)' } }),
      React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 6 } }, 'Leave blank to use a sample transcript for this demo.')),
    React.createElement('div', { style: { padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 8 } },
      React.createElement(Button, { variant: 'secondary', onClick: onClose }, 'Cancel'),
      React.createElement(Button, { variant: 'primary', icon: busy ? undefined : 'sparkle', onClick: extract, disabled: busy },
        busy ? React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7 } }, React.createElement('span', { style: { width: 13, height: 13, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: 99, display: 'inline-block', animation: 'ad-spin .7s linear infinite' } }), 'Extracting…') : 'Extract with AI')),
  );
}

function ProjectsView({ app }) {
  const [transcript, setTranscript] = useStatePr(false);
  const detail = app.detail && app.projects.find((p) => p.id === app.detail.id);
  if (detail) return React.createElement(ProjectDetail, { pr: detail, app });

  return React.createElement('div', null,
    React.createElement(PageHeader, { title: 'Projects', subtitle: app.projects.filter((p) => p.status === 'Active').length + ' active · ' + app.projects.filter((p) => p.status === 'Complete').length + ' complete',
      actions: React.createElement(Button, { variant: 'secondary', icon: 'message', onClick: () => setTranscript(true) }, 'Paste Call Transcript') }),
    React.createElement(DataTable, { columns: [{ label: 'Project' }, { label: 'Client' }, { label: 'Status' }, { label: 'Deadline', right: true }, { label: 'Progress', w: 160 }] },
      app.projects.map((p) => {
        const done = p.milestones.filter((m) => m.status === 'complete').length;
        return React.createElement(Row, { key: p.id, onClick: () => app.go('projects', { id: p.id }) },
          React.createElement(Td, null, React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } }, React.createElement('span', { style: { fontWeight: 550 } }, p.name), p.scopeCreep && React.createElement(Icon, { name: 'alert', size: 14, style: { color: 'var(--amber-500)' }, title: 'Scope creep flagged' }))),
          React.createElement(Td, { style: { color: 'var(--text-muted)' } }, p.client),
          React.createElement(Td, null, React.createElement(Badge, { status: p.status, dot: true })),
          React.createElement(Td, { right: true, style: { color: 'var(--text-subtle)' } }, p.deadline),
          React.createElement(Td, null, React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { flex: 1 } }, React.createElement(ProgressBar, { value: done, max: p.milestones.length, tint: p.status === 'Complete' ? 'emerald' : 'indigo' })),
            React.createElement('span', { style: { fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' } }, done + '/' + p.milestones.length))),
        );
      }),
    ),
    React.createElement(TranscriptModal, { open: transcript, onClose: () => setTranscript(false), app, clients: app.clients }),
  );
}

function ProjectDetail({ pr, app }) {
  const [transcript, setTranscript] = useStatePr(false);
  const inv = app.invoices.find((i) => i.client === pr.client);
  return React.createElement('div', { style: { maxWidth: 820, margin: '0 auto' } },
    React.createElement('button', { onClick: () => app.go('projects'), style: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 16, padding: 0 } },
      React.createElement(Icon, { name: 'chevronLeft', size: 16 }), 'Projects'),
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 6, flexWrap: 'wrap' } },
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 } },
          React.createElement('h1', { style: { margin: 0, fontSize: 21, fontWeight: 650, letterSpacing: '-0.02em' } }, pr.name),
          React.createElement(Badge, { status: pr.status, dot: true })),
        React.createElement('div', { style: { fontSize: 13.5, color: 'var(--text-muted)' } }, pr.client + ' · ' + pr.start + ' → ' + pr.deadline)),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement(Button, { variant: 'secondary', icon: 'message', onClick: () => setTranscript(true) }, 'Transcript'),
        React.createElement(Button, { variant: 'primary', icon: 'link', onClick: () => { const c = app.clients.find((x) => x.company === pr.client); app.copyPortal(c || { company: pr.client }); } }, 'Share with Client')),
    ),
    React.createElement('p', { style: { fontSize: 14, color: 'var(--zinc-600)', maxWidth: 620, margin: '10px 0 22px' } }, pr.desc),
    pr.scopeCreep && React.createElement(ScopeCreepBanner, { pr, app }),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: app.layout === 'mobile' ? '1fr' : 'minmax(0,1.5fr) minmax(250px,1fr)', gap: 18, alignItems: 'start' } },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 22 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 } }, 'Milestones'),
          React.createElement(Card, { pad: 22 }, React.createElement(MilestoneTimeline, { milestones: pr.milestones }))),
        React.createElement(TimeLogSection, { pr, app }),
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
        React.createElement(WeeklyUpdateCard, { pr, app }),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 } }, 'Files'),
          React.createElement(Card, { pad: pr.files.length ? 10 : 18 },
            pr.files.length ? pr.files.map((f, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 'var(--r-md)', cursor: 'pointer' }, onMouseEnter: (e) => e.currentTarget.style.background = 'var(--bg-subtle)', onMouseLeave: (e) => e.currentTarget.style.background = 'transparent', onClick: () => app.toast('Downloading ' + f, { icon: 'download' }) },
              React.createElement('span', { style: { width: 30, height: 30, borderRadius: 'var(--r-sm)', background: 'var(--indigo-50)', color: 'var(--indigo-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, React.createElement(Icon, { name: 'proposals', size: 15 })),
              React.createElement('span', { style: { fontSize: 12.5, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--mono)' } }, f),
              React.createElement(Icon, { name: 'download', size: 14, style: { color: 'var(--zinc-400)' } }),
            )) : React.createElement('div', { style: { fontSize: 13, color: 'var(--text-subtle)' } }, 'No files uploaded yet.')),
        ),
        inv && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 } }, 'Linked invoice'),
          React.createElement(Card, { pad: 16, hover: true, onClick: () => app.go('invoices', { id: inv.id }) },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
              React.createElement('div', null, React.createElement('div', { style: { fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 13.5 } }, inv.num), React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', marginTop: 1 } }, money(inv.amount))),
              React.createElement(Badge, { status: inv.status, dot: true, size: 'sm' })),
          ),
        ),
      ),
    ),
    React.createElement(TranscriptModal, { open: transcript, onClose: () => setTranscript(false), app, clients: app.clients }),
  );
}

Object.assign(window, { ProjectsView, TranscriptModal });
