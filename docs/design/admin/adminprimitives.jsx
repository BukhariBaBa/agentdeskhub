/* global React, Icon, Badge, TINT, money, fmtK */
const { useState: useStateAP, useRef: useRefAP, useEffect: useEffectAP } = React;

/* ---------- status pill mapping for admin ---------- */
const ADMIN_STATUS_TINT = {
  Active: 'emerald', Trial: 'amber', Cancelled: 'zinc', Suspended: 'rose',
  'Past due': 'rose', Paid: 'emerald', Failed: 'rose', Refunded: 'amber',
  Expired: 'zinc', done: 'emerald', failed: 'rose', pending: 'amber',
};
function AStatus({ value }) {
  return React.createElement(Badge, { tint: ADMIN_STATUS_TINT[value] || 'zinc', dot: true, size: 'sm' }, value);
}

/* ---------- dense table ---------- */
function ATable({ columns, children, minWidth }) {
  return React.createElement('div', { style: { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' } },
    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', minWidth: minWidth || 'auto', borderCollapse: 'collapse', fontSize: 13 } },
        React.createElement('thead', null,
          React.createElement('tr', null, columns.map((c, i) => React.createElement('th', {
            key: i, style: { textAlign: c.right ? 'right' : 'left', padding: '10px 16px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-subtle)', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)', whiteSpace: 'nowrap', width: c.w } }, c.label)))),
        React.createElement('tbody', null, children))));
}
function ARow({ children, onClick, active }) {
  return React.createElement('tr', {
    onClick, style: { cursor: onClick ? 'pointer' : 'default', transition: 'background .1s', background: active ? 'var(--indigo-50)' : 'transparent' },
    onMouseEnter: (e) => onClick && !active && (e.currentTarget.style.background = 'var(--bg-subtle)'),
    onMouseLeave: (e) => onClick && !active && (e.currentTarget.style.background = 'transparent'),
  }, children);
}
function ACell({ children, right, mono, color, bold, w, nowrap }) {
  return React.createElement('td', { style: {
    padding: '11px 16px', borderBottom: '1px solid var(--border)', textAlign: right ? 'right' : 'left',
    color: color || 'var(--text)', fontFamily: mono ? 'var(--mono)' : 'inherit', fontWeight: bold ? 600 : 'inherit',
    fontVariantNumeric: mono ? 'tabular-nums' : 'normal', width: w, whiteSpace: nowrap ? 'nowrap' : 'normal',
  } }, children);
}

/* ---------- metric card ---------- */
function MetricCard({ icon, label, value, delta, tint = 'indigo', sub, invertDelta }) {
  const up = delta != null && delta >= 0;
  const good = invertDelta ? !up : up;
  const dtint = delta == null ? null : good ? 'emerald' : 'rose';
  return React.createElement('div', { style: { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '16px 18px' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 } },
      icon && React.createElement('span', { style: { width: 28, height: 28, borderRadius: 'var(--r-sm)', background: TINT[tint].bg, color: TINT[tint].solid, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
        React.createElement(Icon, { name: icon, size: 15, strokeWidth: 2 })),
      React.createElement('span', { style: { fontSize: 12.5, fontWeight: 550, color: 'var(--text-muted)' } }, label)),
    React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 9 } },
      React.createElement('span', { style: { fontSize: 26, fontWeight: 680, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' } }, value),
      delta != null && React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: TINT[dtint].solid } },
        React.createElement(Icon, { name: up ? 'trendingUp' : 'trendingDown', size: 13, strokeWidth: 2.2 }),
        Math.abs(delta) + '%')),
    sub && React.createElement('div', { style: { fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 4 } }, sub));
}

/* ---------- panel wrapper ---------- */
function Panel({ title, sub, action, children, pad = 20, style = {} }) {
  return React.createElement('div', { style: { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', ...style } },
    (title || action) && React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '15px 20px', borderBottom: '1px solid var(--border)' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 14, fontWeight: 650, letterSpacing: '-0.01em' } }, title),
        sub && React.createElement('div', { style: { fontSize: 12, color: 'var(--text-muted)', marginTop: 2 } }, sub)),
      action),
    React.createElement('div', { style: { padding: pad } }, children));
}

/* ---------- bar chart (signups) ---------- */
function BarChart({ data, height = 150, tint = 'indigo', labelEvery = 5, fmt }) {
  const max = Math.max(...data.map((d) => typeof d === 'number' ? d : d.v));
  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 4, height } },
      data.map((d, i) => {
        const v = typeof d === 'number' ? d : d.v;
        const h = max ? Math.max(3, (v / max) * height) : 3;
        return React.createElement('div', { key: i, title: (fmt ? fmt(v) : v), style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' } },
          React.createElement('div', { style: { height: h, borderRadius: '3px 3px 0 0', background: i === data.length - 1 ? TINT[tint].solid : TINT[tint].br, transition: 'height .4s cubic-bezier(.2,.7,.2,1)' } }));
      })),
    React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 7 } },
      data.map((d, i) => React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' } },
        (i % labelEvery === 0 || i === data.length - 1) ? (typeof d === 'number' ? (i + 1) : d.m) : ''))));
}

/* ---------- line chart (revenue) ---------- */
function LineChart({ data, height = 180, tint = 'indigo', fmt }) {
  const ref = useRefAP(null);
  const [w, setW] = useStateAP(640);
  useEffectAP(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((e) => setW(e[0].contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const vals = data.map((d) => d.v);
  const max = Math.max(...vals) * 1.08, min = Math.min(...vals) * 0.9;
  const padX = 8, padY = 12;
  const innerW = w - padX * 2, innerH = height - padY * 2 - 18;
  const x = (i) => padX + (innerW * i) / (data.length - 1);
  const y = (v) => padY + innerH - ((v - min) / (max - min)) * innerH;
  const pts = data.map((d, i) => [x(i), y(d.v)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ' L' + x(data.length - 1).toFixed(1) + ' ' + (padY + innerH) + ' L' + padX + ' ' + (padY + innerH) + ' Z';
  const solid = TINT[tint].solid;
  return React.createElement('div', { ref, style: { width: '100%' } },
    React.createElement('svg', { width: '100%', height, viewBox: '0 0 ' + w + ' ' + height, preserveAspectRatio: 'none', style: { display: 'block' } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'lcfill', x1: 0, y1: 0, x2: 0, y2: 1 },
          React.createElement('stop', { offset: '0%', stopColor: solid, stopOpacity: 0.16 }),
          React.createElement('stop', { offset: '100%', stopColor: solid, stopOpacity: 0 }))),
      [0.25, 0.5, 0.75, 1].map((g, i) => React.createElement('line', { key: i, x1: padX, x2: w - padX, y1: padY + innerH * g, y2: padY + innerH * g, stroke: 'var(--border)', strokeWidth: 1 })),
      React.createElement('path', { d: area, fill: 'url(#lcfill)' }),
      React.createElement('path', { d: line, fill: 'none', stroke: solid, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' }),
      pts.map((p, i) => React.createElement('circle', { key: i, cx: p[0], cy: p[1], r: i === pts.length - 1 ? 3.5 : 2.2, fill: '#fff', stroke: solid, strokeWidth: 1.6 })),
      data.map((d, i) => React.createElement('text', { key: 'l' + i, x: x(i), y: height - 4, textAnchor: 'middle', fontSize: 10, fill: 'var(--text-subtle)' }, d.m))));
}

/* ---------- search input ---------- */
function SearchInput({ value, onChange, placeholder, width = 260 }) {
  return React.createElement('div', { style: { position: 'relative', width } },
    React.createElement(Icon, { name: 'search', size: 15, style: { position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' } }),
    React.createElement('input', { value, onChange: (e) => onChange(e.target.value), placeholder,
      style: { width: '100%', padding: '8px 12px 8px 33px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 13, outline: 'none', background: '#fff', boxSizing: 'border-box' } }));
}

/* ---------- segmented filter ---------- */
function FilterTabs({ options, value, onChange }) {
  return React.createElement('div', { style: { display: 'inline-flex', background: 'var(--bg-muted)', borderRadius: 'var(--r-md)', padding: 3, gap: 2 } },
    options.map((o) => {
      const val = typeof o === 'string' ? o : o.value;
      const label = typeof o === 'string' ? o : o.label;
      const on = value === val;
      return React.createElement('button', { key: val, onClick: () => onChange(val),
        style: { padding: '5px 11px', fontSize: 12.5, fontWeight: on ? 600 : 500, borderRadius: 'var(--r-sm)', border: 'none', cursor: 'pointer',
          background: on ? '#fff' : 'transparent', color: on ? 'var(--text)' : 'var(--text-muted)', boxShadow: on ? 'var(--shadow-sm)' : 'none', transition: 'all .12s' } }, label);
    }));
}

/* ---------- mini select ---------- */
function MiniSelect({ value, onChange, options, width }) {
  return React.createElement('div', { style: { position: 'relative', width } },
    React.createElement('select', { value, onChange: (e) => onChange(e.target.value),
      style: { width: '100%', padding: '7px 30px 7px 11px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 12.5, color: 'var(--text)', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' } },
      options.map((o) => React.createElement('option', { key: o, value: o }, o))),
    React.createElement(Icon, { name: 'chevronDown', size: 14, style: { position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--zinc-400)', pointerEvents: 'none' } }));
}

/* ---------- drawer section header ---------- */
function DrawerHead({ title, sub, onClose, badge }) {
  return React.createElement('div', { style: { padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexShrink: 0 } },
    React.createElement('div', null,
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9 } },
        React.createElement('span', { style: { fontSize: 17, fontWeight: 680, letterSpacing: '-0.02em' } }, title), badge),
      sub && React.createElement('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'var(--mono)' } }, sub)),
    React.createElement('button', { onClick: onClose, style: { width: 30, height: 30, borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' } },
      React.createElement(Icon, { name: 'x', size: 16 })));
}

/* ---------- key/value row ---------- */
function KV({ k, v, mono }) {
  return React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--border)' } },
    React.createElement('span', { style: { fontSize: 12.5, color: 'var(--text-muted)' } }, k),
    React.createElement('span', { style: { fontSize: 12.5, fontWeight: 550, textAlign: 'right', fontFamily: mono ? 'var(--mono)' : 'inherit' } }, v));
}

/* ---------- field label ---------- */
function FieldLabel({ children }) {
  return React.createElement('label', { style: { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 7 } }, children);
}

Object.assign(window, {
  ADMIN_STATUS_TINT, AStatus, ATable, ARow, ACell, MetricCard, Panel,
  BarChart, LineChart, SearchInput, FilterTabs, MiniSelect, DrawerHead, KV, FieldLabel,
});
