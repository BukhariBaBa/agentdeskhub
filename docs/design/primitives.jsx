/* global React, Icon */
// AgentDesk — UI primitives.

const { useState, useEffect, useRef } = React;

/* ---------- helpers ---------- */
const money = (n) => '$' + n.toLocaleString('en-US');

const TINT = {
  indigo:  { bg: 'var(--indigo-50)',  fg: 'var(--indigo-700)',  solid: 'var(--indigo-600)',  br: 'var(--indigo-100)' },
  emerald: { bg: 'var(--emerald-50)', fg: 'var(--emerald-700)', solid: 'var(--emerald-600)', br: 'var(--emerald-100)' },
  amber:   { bg: 'var(--amber-50)',   fg: 'var(--amber-700)',   solid: 'var(--amber-600)',   br: 'var(--amber-100)' },
  rose:    { bg: 'var(--rose-50)',    fg: 'var(--rose-700)',    solid: 'var(--rose-600)',    br: 'var(--rose-100)' },
  zinc:    { bg: 'var(--zinc-100)',   fg: 'var(--zinc-600)',    solid: 'var(--zinc-500)',    br: 'var(--zinc-200)' },
};

// status -> tint
const STATUS_TINT = {
  Lead: 'amber', Active: 'emerald', Past: 'zinc',
  Draft: 'zinc', Sent: 'indigo', Accepted: 'emerald', Rejected: 'rose', Expired: 'zinc',
  Paused: 'amber', Complete: 'zinc', Completed: 'emerald',
  Paid: 'emerald', Overdue: 'rose', Pending: 'amber',
};

/* ---------- Button ---------- */
function Button({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, disabled, full, type = 'button', style = {} }) {
  const [hover, setHover] = useState(false);
  const sizes = {
    sm: { padding: '5px 10px', fontSize: 12.5, gap: 5, h: 28 },
    md: { padding: '7px 13px', fontSize: 13.5, gap: 6, h: 34 },
    lg: { padding: '10px 18px', fontSize: 14.5, gap: 7, h: 42 },
  }[size];
  const variants = {
    primary: { bg: hover ? 'var(--primary-hover)' : 'var(--primary)', color: '#fff', border: '1px solid transparent' },
    secondary: { bg: hover ? 'var(--zinc-50)' : '#fff', color: 'var(--zinc-800)', border: '1px solid var(--border-strong)' },
    ghost: { bg: hover ? 'var(--zinc-100)' : 'transparent', color: 'var(--zinc-600)', border: '1px solid transparent' },
    danger: { bg: hover ? 'var(--rose-50)' : 'transparent', color: 'var(--rose-600)', border: '1px solid ' + (hover ? 'var(--rose-100)' : 'transparent') },
    success: { bg: hover ? 'var(--emerald-600)' : 'var(--emerald-500)', color: '#fff', border: '1px solid transparent' },
    dangerSolid: { bg: hover ? 'var(--rose-600)' : 'var(--rose-500)', color: '#fff', border: '1px solid transparent' },
  }[variant];
  return React.createElement('button', {
    type, onClick: disabled ? undefined : onClick, disabled,
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sizes.gap,
      padding: sizes.padding, minHeight: sizes.h, fontSize: sizes.fontSize, fontWeight: 550,
      borderRadius: 'var(--r-md)', cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto', whiteSpace: 'nowrap', letterSpacing: '-0.01em',
      transition: 'background .12s, border-color .12s, opacity .12s',
      opacity: disabled ? 0.5 : 1,
      background: variants.bg, color: variants.color, border: variants.border,
      ...style,
    },
  },
    icon && React.createElement(Icon, { name: icon, size: size === 'sm' ? 14 : 16, strokeWidth: 2 }),
    children,
    iconRight && React.createElement(Icon, { name: iconRight, size: size === 'sm' ? 14 : 16, strokeWidth: 2 }),
  );
}

/* ---------- Badge ---------- */
function Badge({ children, tint, status, dot, size = 'md' }) {
  const t = TINT[tint || STATUS_TINT[status] || 'zinc'];
  const pad = size === 'sm' ? '1px 7px' : '2px 9px';
  const fs = size === 'sm' ? 11 : 12;
  return React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: pad, fontSize: fs, fontWeight: 550,
      borderRadius: 'var(--r-full)', background: t.bg, color: t.fg, border: '1px solid ' + t.br,
      lineHeight: 1.5, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
    },
  },
    dot && React.createElement('span', { style: { width: 5, height: 5, borderRadius: 99, background: t.solid } }),
    children || status,
  );
}

/* ---------- Card ---------- */
function Card({ children, style = {}, pad = 20, hover, onClick, className = '' }) {
  const [h, setH] = useState(false);
  return React.createElement('div', {
    onClick, className,
    onMouseEnter: hover ? () => setH(true) : undefined,
    onMouseLeave: hover ? () => setH(false) : undefined,
    style: {
      background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
      padding: pad, transition: 'border-color .12s, box-shadow .12s',
      cursor: onClick ? 'pointer' : 'default',
      borderColor: h ? 'var(--border-strong)' : 'var(--border)',
      boxShadow: h ? 'var(--shadow-sm)' : 'none',
      ...style,
    },
  }, children);
}

/* ---------- ProgressBar ---------- */
function ProgressBar({ value, max = 100, tint = 'indigo', height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  let col = TINT[tint].solid;
  return React.createElement('div', { style: { background: 'var(--zinc-200)', borderRadius: 99, height, overflow: 'hidden', width: '100%' } },
    React.createElement('div', { style: { width: pct + '%', height: '100%', background: col, borderRadius: 99, transition: 'width .5s cubic-bezier(.2,.7,.2,1)' } }),
  );
}

/* ---------- Avatar ---------- */
function Avatar({ initials, color = 'var(--zinc-700)', size = 32, src }) {
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: 'var(--r-full)', background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 600, flexShrink: 0, letterSpacing: '-0.02em',
      overflow: 'hidden',
    },
  }, initials);
}

/* ---------- IconButton ---------- */
function IconButton({ name, onClick, size = 16, title, badge, style = {} }) {
  const [h, setH] = useState(false);
  return React.createElement('button', {
    onClick, title,
    onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: {
      position: 'relative', width: 34, height: 34, borderRadius: 'var(--r-md)', border: '1px solid transparent',
      background: h ? 'var(--zinc-100)' : 'transparent', color: 'var(--zinc-600)', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background .12s', ...style,
    },
  },
    React.createElement(Icon, { name, size }),
    badge ? React.createElement('span', {
      style: { position: 'absolute', top: 3, right: 3, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 99,
        background: 'var(--rose-500)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' },
    }, badge) : null,
  );
}

/* ---------- Drawer ---------- */
function Drawer({ open, onClose, children, width = 480 }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return React.createElement('div', {
    onClick: onClose,
    style: { position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(9,9,11,0.32)', animation: 'ad-fade .15s ease', display: 'flex', justifyContent: 'flex-end' },
  },
    React.createElement('div', {
      onClick: (e) => e.stopPropagation(),
      style: { width: 'min(' + width + 'px, 100%)', height: '100%', background: '#fff', boxShadow: 'var(--shadow-drawer)',
        animation: 'ad-slide-in .22s cubic-bezier(.2,.7,.2,1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    }, children),
  );
}

/* ---------- Modal ---------- */
function Modal({ open, onClose, children, width = 520 }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return React.createElement('div', {
    onClick: onClose,
    style: { position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(9,9,11,0.4)', animation: 'ad-fade .15s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  },
    React.createElement('div', {
      onClick: (e) => e.stopPropagation(),
      style: { width: 'min(' + width + 'px, 100%)', maxHeight: '88vh', overflow: 'auto', background: '#fff',
        border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-pop)',
        animation: 'ad-fade-up .2s cubic-bezier(.2,.7,.2,1)' },
    }, children),
  );
}

/* ---------- Section header ---------- */
function PageHeader({ title, subtitle, actions }) {
  return React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 22, flexWrap: 'wrap' } },
    React.createElement('div', null,
      React.createElement('h1', { style: { margin: 0, fontSize: 22, fontWeight: 650, letterSpacing: '-0.025em', color: 'var(--text)' } }, title),
      subtitle && React.createElement('p', { style: { margin: '5px 0 0', fontSize: 13.5, color: 'var(--text-muted)' } }, subtitle),
    ),
    actions && React.createElement('div', { style: { display: 'flex', gap: 8, flexShrink: 0 } }, actions),
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ icon, title, body, cta, onCta }) {
  return React.createElement('div', {
    style: { textAlign: 'center', padding: '56px 24px', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-lg)', background: 'var(--bg-subtle)' },
  },
    React.createElement('div', { style: { width: 48, height: 48, borderRadius: 'var(--r-lg)', background: 'var(--indigo-50)', color: 'var(--indigo-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 } },
      React.createElement(Icon, { name: icon, size: 22 })),
    React.createElement('div', { style: { fontSize: 15, fontWeight: 600, marginBottom: 5 } }, title),
    React.createElement('div', { style: { fontSize: 13.5, color: 'var(--text-muted)', maxWidth: 360, margin: '0 auto 16px' } }, body),
    cta && React.createElement('div', { style: { display: 'inline-flex' } }, React.createElement(Button, { variant: 'primary', size: 'sm', icon: 'sparkle', iconRight: 'arrowRight', onClick: onCta }, cta)),
  );
}

/* ---------- Markdown (lightweight) ---------- */
function Markdown({ text }) {
  const lines = text.split('\n');
  const blocks = [];
  let list = [];
  const flush = () => { if (list.length) { blocks.push({ t: 'ul', items: list }); list = []; } };
  lines.forEach((ln) => {
    if (/^#\s/.test(ln)) { flush(); blocks.push({ t: 'h1', c: ln.slice(2) }); }
    else if (/^##\s/.test(ln)) { flush(); blocks.push({ t: 'h2', c: ln.slice(3) }); }
    else if (/^\d+\.\s/.test(ln)) { list.push(ln.replace(/^\d+\.\s/, '')); }
    else if (/^[-*]\s/.test(ln)) { list.push(ln.slice(2)); }
    else if (ln.trim() === '') { flush(); }
    else { flush(); blocks.push({ t: 'p', c: ln }); }
  });
  flush();
  const inline = (s) => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => /^\*\*[^*]+\*\*$/.test(p)
      ? React.createElement('strong', { key: i, style: { fontWeight: 650, color: 'var(--text)' } }, p.slice(2, -2))
      : p);
  };
  return React.createElement('div', { style: { color: 'var(--zinc-700)', fontSize: 14, lineHeight: 1.65 } },
    blocks.map((b, i) => {
      if (b.t === 'h1') return React.createElement('h2', { key: i, style: { fontSize: 19, fontWeight: 650, letterSpacing: '-0.02em', color: 'var(--text)', margin: i ? '20px 0 8px' : '0 0 8px' } }, b.c);
      if (b.t === 'h2') return React.createElement('h3', { key: i, style: { fontSize: 14, fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', margin: '20px 0 8px' } }, b.c);
      if (b.t === 'ul') return React.createElement('ul', { key: i, style: { margin: '4px 0', paddingLeft: 20 } }, b.items.map((it, j) => React.createElement('li', { key: j, style: { margin: '4px 0' } }, inline(it))));
      return React.createElement('p', { key: i, style: { margin: '8px 0' } }, inline(b.c));
    }),
  );
}

/* ---------- Toast host ---------- */
function ToastHost({ toasts }) {
  return React.createElement('div', {
    style: { position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 500, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', pointerEvents: 'none' },
  },
    toasts.map((t) => React.createElement('div', {
      key: t.id,
      style: { display: 'flex', alignItems: 'center', gap: 10, background: 'var(--zinc-900)', color: '#fff', padding: '11px 16px',
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-pop)', fontSize: 13.5, fontWeight: 500, animation: 'ad-toast-in .25s cubic-bezier(.2,.7,.2,1)', maxWidth: 420 },
    },
      React.createElement('span', { style: { display: 'flex', color: t.tint ? TINT[t.tint].solid : 'var(--emerald-500)' } },
        React.createElement(Icon, { name: t.icon || 'checkCircle', size: 17, strokeWidth: 2.2 })),
      t.message,
    )),
  );
}

Object.assign(window, {
  money, TINT, STATUS_TINT, Button, Badge, Card, ProgressBar, Avatar, IconButton,
  Drawer, Modal, PageHeader, EmptyState, Markdown, ToastHost,
});
