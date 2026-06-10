/* global React, ReactDOM, Icon, Logo, Button, ToastHost, Badge,
   ADMIN_USER, ADMIN_AUDIT,
   OverviewScreen, WorkspacesScreen, SubscriptionsScreen, PackagesScreen, DiscountsScreen,
   PaymentsScreen, AgentLogsScreen, AnnouncementsScreen */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'workspaces', label: 'Workspaces', icon: 'building' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'creditCard' },
  { id: 'packages', label: 'Packages', icon: 'box' },
  { id: 'discounts', label: 'Discounts', icon: 'percent' },
  { id: 'payments', label: 'Payments', icon: 'dollar' },
  { id: 'logs', label: 'Agent Logs', icon: 'activity' },
  { id: 'announcements', label: 'Announcements', icon: 'megaphone' },
];

/* ============ LOGIN ============ */
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useStateApp('sasha@agentdeskhub.com');
  const [pw, setPw] = useStateApp('••••••••••');
  const [show, setShow] = useStateApp(false);
  const [loading, setLoading] = useStateApp(false);

  const submit = (e) => { e.preventDefault(); setLoading(true); setTimeout(onLogin, 750); };

  const input = (props) => React.createElement('input', { ...props,
    style: { width: '100%', padding: '11px 13px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' } });

  return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--zinc-950)', padding: 24 } },
    React.createElement('div', { style: { width: 'min(400px, 100%)' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 } },
        React.createElement(Logo, { size: 30 }),
        React.createElement('span', { style: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' } }, 'AgentDesk'),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 650, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--indigo-200)', background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)', padding: '2px 7px', borderRadius: 'var(--r-full)' } }, 'Admin')),
      React.createElement('p', { style: { textAlign: 'center', color: 'var(--zinc-400)', fontSize: 13, margin: '0 0 28px' } }, 'Internal operations · authorized staff only'),
      React.createElement('form', { onSubmit: submit, style: { background: '#fff', borderRadius: 'var(--r-xl)', padding: 26, boxShadow: 'var(--shadow-pop)' } },
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { fontSize: 12.5, fontWeight: 600, display: 'block', marginBottom: 7 } }, 'Work email'),
          input({ type: 'email', value: email, onChange: (e) => setEmail(e.target.value), autoComplete: 'username' })),
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('label', { style: { fontSize: 12.5, fontWeight: 600, display: 'block', marginBottom: 7 } }, 'Password'),
          React.createElement('div', { style: { position: 'relative' } },
            input({ type: show ? 'text' : 'password', value: pw, onChange: (e) => setPw(e.target.value), autoComplete: 'current-password' }),
            React.createElement('button', { type: 'button', onClick: () => setShow(!show), style: { position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'inline-flex', padding: 4 } },
              React.createElement(Icon, { name: show ? 'eyeOff' : 'eye', size: 16 })))),
        React.createElement(Button, { type: 'submit', variant: 'primary', full: true, size: 'lg', icon: loading ? undefined : 'lock' },
          loading ? React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8 } }, React.createElement('span', { style: { width: 15, height: 15, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: 99, display: 'inline-block', animation: 'ad-spin .7s linear infinite' } }), 'Authenticating…') : 'Sign in to Admin'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', marginTop: 16, fontSize: 11.5, color: 'var(--text-subtle)' } },
          React.createElement(Icon, { name: 'shield', size: 13 }), 'Protected by admin auth · all actions are logged')),
      React.createElement('p', { style: { textAlign: 'center', color: 'var(--zinc-600)', fontSize: 11.5, margin: '20px 0 0' } }, 'agentdeskhub.com/admin')));
}

/* ============ AUDIT DRAWER ============ */
function AuditDrawer({ open, onClose, audit }) {
  if (!open) return null;
  return React.createElement('div', { onClick: onClose, style: { position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(9,9,11,0.32)', display: 'flex', justifyContent: 'flex-end' } },
    React.createElement('div', { onClick: (e) => e.stopPropagation(), style: { width: 'min(440px, 100%)', height: '100%', background: '#fff', boxShadow: 'var(--shadow-drawer)', animation: 'ad-slide-in .22s cubic-bezier(.2,.7,.2,1)', display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { style: { padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9 } },
          React.createElement(Icon, { name: 'shield', size: 17, style: { color: 'var(--indigo-600)' } }),
          React.createElement('span', { style: { fontSize: 16, fontWeight: 680, letterSpacing: '-0.02em' } }, 'Audit trail')),
        React.createElement('button', { onClick: onClose, style: { width: 30, height: 30, borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' } },
          React.createElement(Icon, { name: 'x', size: 16 }))),
      React.createElement('div', { style: { padding: '8px 12px', fontSize: 11.5, color: 'var(--text-subtle)', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' } }, 'Every admin write action is recorded with actor + timestamp.'),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '8px 0' } },
        audit.map((a) => React.createElement('div', { key: a.id, style: { display: 'flex', gap: 12, padding: '12px 22px', borderBottom: '1px solid var(--border)' } },
          React.createElement('span', { style: { width: 7, height: 7, borderRadius: 99, background: 'var(--' + a.tint + '-500)', marginTop: 6, flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600 } }, a.action),
            React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', marginTop: 1 } }, a.target),
            React.createElement('div', { style: { fontSize: 11, color: 'var(--text-subtle)', marginTop: 4, fontFamily: 'var(--mono)' } }, a.ts + ' · ' + a.actor)))))));
}

/* ============ SHELL ============ */
function AdminApp() {
  const [authed, setAuthed] = useStateApp(() => { try { return sessionStorage.getItem('agentdesk_admin') === '1'; } catch (e) { return false; } });
  const [view, setView] = useStateApp('overview');
  const [toasts, setToasts] = useStateApp([]);
  const [audit, setAudit] = useStateApp(ADMIN_AUDIT);
  const [auditOpen, setAuditOpen] = useStateApp(false);
  const [layout, setLayout] = useStateApp(window.innerWidth < 1100 ? 'narrow' : 'wide');
  const [mobileNav, setMobileNav] = useStateApp(false);

  useEffectApp(() => {
    const r = () => setLayout(window.innerWidth < 1100 ? 'narrow' : 'wide');
    window.addEventListener('resize', r); return () => window.removeEventListener('resize', r);
  }, []);

  const toast = (message, icon, tint) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, icon: icon || 'checkCircle', tint: tint || 'indigo' }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };
  const act = (action, target) => {
    setAudit((a) => [{ id: 'au' + Date.now(), ts: '2026-06-09 ' + new Date().toTimeString().slice(0, 5), actor: ADMIN_USER.name, action, target, tint: 'indigo' }, ...a]);
    toast(action, 'shield', 'indigo');
  };
  const login = () => { try { sessionStorage.setItem('agentdesk_admin', '1'); } catch (e) {} setAuthed(true); };
  const logout = () => { try { sessionStorage.removeItem('agentdesk_admin'); } catch (e) {} setAuthed(false); };

  const admin = { toast, act, layout };

  if (!authed) return React.createElement(React.Fragment, null,
    React.createElement(AdminLogin, { onLogin: login }), React.createElement(ToastHost, { toasts }));

  const screens = {
    overview: OverviewScreen, workspaces: WorkspacesScreen, subscriptions: SubscriptionsScreen,
    packages: PackagesScreen, discounts: DiscountsScreen, payments: PaymentsScreen,
    logs: AgentLogsScreen, announcements: AnnouncementsScreen,
  };
  const Screen = screens[view];
  const sidebarVisible = layout === 'wide' || mobileNav;

  return React.createElement('div', { style: { display: 'flex', minHeight: '100vh', background: 'var(--bg-subtle)' } },
    // sidebar
    sidebarVisible && React.createElement('aside', { style: { width: 200, background: 'var(--side-bg)', borderRight: '1px solid var(--side-border)', display: 'flex', flexDirection: 'column', position: layout === 'wide' ? 'sticky' : 'fixed', top: 0, height: '100vh', zIndex: 90, flexShrink: 0 } },
      React.createElement('div', { style: { padding: '18px 16px 16px', borderBottom: '1px solid var(--side-border)' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Logo, { size: 24 }),
          React.createElement('span', { style: { fontSize: 14.5, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--side-text-hi)' } }, 'AgentDesk'),
          React.createElement('span', { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--indigo-200)', background: 'rgba(99,102,241,0.2)', padding: '2px 6px', borderRadius: 'var(--r-full)' } }, 'Admin'))),
      React.createElement('nav', { style: { flex: 1, padding: '10px 10px', overflowY: 'auto' } },
        NAV.map((n) => {
          const on = view === n.id;
          return React.createElement('button', { key: n.id, onClick: () => { setView(n.id); setMobileNav(false); },
            style: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 10px', marginBottom: 2, borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: on ? 'var(--side-active)' : 'transparent', color: on ? 'var(--side-active-text)' : 'var(--side-text)', fontSize: 13, fontWeight: on ? 600 : 500, transition: 'background .12s, color .12s' },
            onMouseEnter: (e) => { if (!on) e.currentTarget.style.color = 'var(--side-text-hi)'; },
            onMouseLeave: (e) => { if (!on) e.currentTarget.style.color = 'var(--side-text)'; } },
            React.createElement(Icon, { name: n.icon, size: 16, strokeWidth: on ? 2.2 : 1.8 }), n.label);
        })),
      React.createElement('div', { style: { padding: '12px 12px', borderTop: '1px solid var(--side-border)' } },
        React.createElement('button', { onClick: () => setAuditOpen(true),
          style: { display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '8px 10px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--side-text)', fontSize: 12.5, fontWeight: 500, marginBottom: 6 } },
          React.createElement(Icon, { name: 'shield', size: 15 }), 'Audit trail'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px' } },
          React.createElement('span', { style: { width: 28, height: 28, borderRadius: 99, background: 'var(--indigo-600)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 } }, 'SK'),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: 'var(--side-text-hi)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, ADMIN_USER.name),
            React.createElement('div', { style: { fontSize: 10.5, color: 'var(--side-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, ADMIN_USER.role)),
          React.createElement('button', { onClick: logout, title: 'Sign out', style: { border: 'none', background: 'none', cursor: 'pointer', color: 'var(--side-text)', display: 'inline-flex', padding: 4 } },
            React.createElement(Icon, { name: 'logout', size: 15 }))))),
    mobileNav && layout === 'narrow' && React.createElement('div', { onClick: () => setMobileNav(false), style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 85 } }),

    // main
    React.createElement('main', { style: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' } },
      layout === 'narrow' && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border)', background: '#fff', position: 'sticky', top: 0, zIndex: 80 } },
        React.createElement('button', { onClick: () => setMobileNav(true), style: { border: '1px solid var(--border-strong)', background: '#fff', borderRadius: 'var(--r-md)', width: 36, height: 36, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'menu', size: 18 })),
        React.createElement('span', { style: { fontSize: 14, fontWeight: 650 } }, NAV.find((n) => n.id === view).label)),
      React.createElement('div', { style: { flex: 1, padding: layout === 'narrow' ? '20px 16px 60px' : '28px 32px 60px', maxWidth: 1240, width: '100%', margin: '0 auto', boxSizing: 'border-box' } },
        React.createElement(Screen, { admin }))),

    React.createElement(AuditDrawer, { open: auditOpen, onClose: () => setAuditOpen(false), audit }),
    React.createElement(ToastHost, { toasts }));
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(AdminApp));
