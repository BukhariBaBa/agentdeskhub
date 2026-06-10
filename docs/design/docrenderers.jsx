/* global React, Icon, Badge, Button, Markdown, TINT, money */
const { useState: useStateDoc } = React;

/* ---------- shared frame ---------- */
function DocFrame({ children, label }) {
  return React.createElement(
    "div",
    {
      style: {
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "#fff",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-subtle)",
        },
      },
      React.createElement(
        "span",
        { style: { display: "flex", gap: 5 } },
        React.createElement("span", {
          style: {
            width: 9,
            height: 9,
            borderRadius: 99,
            background: "var(--zinc-300)",
          },
        }),
        React.createElement("span", {
          style: {
            width: 9,
            height: 9,
            borderRadius: 99,
            background: "var(--zinc-200)",
          },
        }),
        React.createElement("span", {
          style: {
            width: 9,
            height: 9,
            borderRadius: 99,
            background: "var(--zinc-200)",
          },
        }),
      ),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 11.5,
            fontFamily: "var(--mono)",
            color: "var(--text-subtle)",
            marginLeft: 4,
          },
        },
        label,
      ),
    ),
    React.createElement("div", { style: { padding: "24px 28px" } }, children),
  );
}

const docInput = (val, onChange, props = {}) =>
  React.createElement("input", {
    value: val,
    onChange: (e) => onChange(e.target.value),
    style: {
      width: "100%",
      padding: "8px 11px",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--r-md)",
      fontSize: 13.5,
      color: "var(--text)",
      outline: "none",
      ...props.style,
    },
    ...props,
  });

/* ---------- lead scoring ---------- */
function scoreTint(s) {
  return s >= 71 ? "emerald" : s >= 41 ? "amber" : "rose";
}
function ScoreRing({ score, size = 56 }) {
  const t = TINT[scoreTint(score)];
  const sw = 6,
    r = (size - sw) / 2,
    c = 2 * Math.PI * r,
    off = c * (1 - score / 100);
  return React.createElement(
    "div",
    {
      style: { position: "relative", width: size, height: size, flexShrink: 0 },
    },
    React.createElement(
      "svg",
      { width: size, height: size, style: { transform: "rotate(-90deg)" } },
      React.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r,
        fill: "none",
        stroke: "var(--zinc-200)",
        strokeWidth: sw,
      }),
      React.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r,
        fill: "none",
        stroke: t.solid,
        strokeWidth: sw,
        strokeDasharray: c,
        strokeDashoffset: off,
        strokeLinecap: "round",
        style: { transition: "stroke-dashoffset .6s cubic-bezier(.2,.7,.2,1)" },
      }),
    ),
    React.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      React.createElement(
        "span",
        {
          style: {
            fontSize: size * 0.32,
            fontWeight: 700,
            color: t.fg,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          },
        },
        score,
      ),
    ),
  );
}
function BreakdownBars({ data }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px 18px",
      },
    },
    Object.entries(data).map(([k, v]) =>
      React.createElement(
        "div",
        { key: k },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11.5,
              marginBottom: 4,
            },
          },
          React.createElement(
            "span",
            { style: { color: "var(--text-muted)" } },
            k,
          ),
          React.createElement(
            "span",
            {
              style: {
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                color: TINT[scoreTint(v)].fg,
              },
            },
            v,
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              height: 5,
              background: "var(--zinc-200)",
              borderRadius: 99,
              overflow: "hidden",
            },
          },
          React.createElement("div", {
            style: {
              width: v + "%",
              height: "100%",
              background: TINT[scoreTint(v)].solid,
              borderRadius: 99,
            },
          }),
        ),
      ),
    ),
  );
}
function LeadsDoc({ doc, setDoc }) {
  const update = (i, patch) => {
    const leads = doc.leads.map((l, j) => (j === i ? { ...l, ...patch } : l));
    setDoc({ ...doc, leads });
  };
  return React.createElement(
    DocFrame,
    { label: "scored-leads.json" },
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 16 } },
      doc.leads.map((l, i) =>
        React.createElement(
          "div",
          {
            key: i,
            style: {
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              opacity: l._excluded ? 0.5 : 1,
              transition: "opacity .15s",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 16,
                padding: 16,
                background: "var(--bg-subtle)",
                borderBottom: l._excluded ? "none" : "1px solid var(--border)",
              },
            },
            React.createElement(ScoreRing, { score: l.score }),
            React.createElement(
              "div",
              { style: { flex: 1, minWidth: 0 } },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 2,
                    flexWrap: "wrap",
                  },
                },
                React.createElement(
                  "span",
                  { style: { fontSize: 15, fontWeight: 650 } },
                  l.company,
                ),
                React.createElement(
                  Badge,
                  { tint: scoreTint(l.score), size: "sm" },
                  l.score >= 71
                    ? "Strong fit"
                    : l.score >= 41
                      ? "Moderate fit"
                      : "Weak fit",
                ),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 12.5,
                    color: "var(--text-muted)",
                    marginBottom: 3,
                  },
                },
                l.contact + " · " + l.role,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 11.5,
                    color: "var(--text-subtle)",
                  },
                },
                React.createElement(
                  "span",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    },
                  },
                  React.createElement(Icon, { name: "search", size: 12 }),
                  "Found on " + l.platform,
                ),
                React.createElement(
                  "span",
                  { style: { fontFamily: "var(--mono)" } },
                  "est. " + l.budget,
                ),
              ),
            ),
            React.createElement(
              "label",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  flexShrink: 0,
                },
              },
              React.createElement("input", {
                type: "checkbox",
                checked: !l._excluded,
                onChange: () => update(i, { _excluded: !l._excluded }),
                style: {
                  width: 15,
                  height: 15,
                  accentColor: "var(--indigo-600)",
                },
              }),
              "Include",
            ),
          ),
          !l._excluded &&
            React.createElement(
              "div",
              { style: { padding: 16 } },
              React.createElement(
                "div",
                { style: { marginBottom: 14 } },
                React.createElement(BreakdownBars, { data: l.breakdown }),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-subtle)",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  },
                },
                React.createElement(Icon, { name: "sparkle", size: 12 }),
                "Drafted outreach",
              ),
              React.createElement("textarea", {
                value: l.outreach,
                onChange: (e) => update(i, { outreach: e.target.value }),
                style: {
                  width: "100%",
                  minHeight: 84,
                  padding: "10px 12px",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--r-md)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "var(--zinc-700)",
                  outline: "none",
                  resize: "vertical",
                  background: "#fff",
                },
              }),
            ),
        ),
      ),
    ),
  );
}

/* ---------- 3-tier proposal ---------- */
function TierCard({ tier, recommended }) {
  const rec = tier.name === recommended;
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid " + (rec ? "var(--indigo-600)" : "var(--border)"),
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "#fff",
        boxShadow: rec ? "0 0 0 1px var(--indigo-600)" : "none",
      },
    },
    rec &&
      React.createElement(
        "div",
        {
          style: {
            background: "var(--indigo-600)",
            color: "#fff",
            fontSize: 10.5,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "4px",
          },
        },
        "Recommended",
      ),
    React.createElement(
      "div",
      { style: { padding: "16px 16px 14px" } },
      React.createElement(
        "div",
        { style: { fontSize: 13, fontWeight: 650, marginBottom: 8 } },
        tier.name,
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            marginBottom: 4,
          },
        },
        React.createElement(
          "span",
          {
            style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" },
          },
          money(tier.price),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            color: "var(--text-subtle)",
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 12,
          },
        },
        React.createElement(Icon, { name: "clock", size: 12 }),
        tier.delivery + " delivery",
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 12.5,
            color: "var(--text-muted)",
            lineHeight: 1.45,
            minHeight: 36,
          },
        },
        tier.scope,
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          borderTop: "1px solid var(--border)",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        },
      },
      tier.includes.map((it, i) =>
        React.createElement(
          "div",
          {
            key: i,
            style: {
              display: "flex",
              gap: 8,
              fontSize: 12.5,
              color: "var(--zinc-700)",
            },
          },
          React.createElement(Icon, {
            name: "check",
            size: 14,
            strokeWidth: 2.5,
            style: { color: "var(--emerald-500)", flexShrink: 0, marginTop: 1 },
          }),
          it,
        ),
      ),
    ),
  );
}
function ProposalDoc({ doc }) {
  // legacy single-amount proposal fallback
  if (!doc.tiers)
    return React.createElement(
      DocFrame,
      { label: "proposal.md" },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 18,
            paddingBottom: 18,
            borderBottom: "1px solid var(--border)",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                marginBottom: 5,
              },
            },
            "Proposal",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 12.5, color: "var(--text-muted)" } },
            doc.client,
          ),
        ),
        React.createElement(
          "div",
          { style: { textAlign: "right" } },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 23,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              },
            },
            money(doc.amount),
          ),
        ),
      ),
      React.createElement(Markdown, { text: doc.body }),
    );
  return React.createElement(
    DocFrame,
    { label: "proposal.md" },
    React.createElement(
      "div",
      { style: { marginBottom: 18 } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: 4,
          },
        },
        "Proposal · " + doc.client,
      ),
      React.createElement(
        "div",
        { style: { fontSize: 18, fontWeight: 650, letterSpacing: "-0.02em" } },
        doc.title,
      ),
      React.createElement(
        "div",
        { style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 3 } },
        "Three options for the client to choose from — recommended tier highlighted.",
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        },
      },
      doc.tiers.map((t, i) =>
        React.createElement(TierCard, {
          key: i,
          tier: t,
          recommended: doc.recommended,
        }),
      ),
    ),
  );
}

/* ---------- invoice ---------- */
function InvoiceDoc({ doc }) {
  const subtotal = doc.items.reduce((s, it) => s + it.qty * it.rate, 0);
  return React.createElement(
    DocFrame,
    { label: doc.num + ".pdf" },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" },
          },
          doc.num,
        ),
        React.createElement(
          "div",
          {
            style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 },
          },
          "Billed to " + doc.client,
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            textAlign: "right",
            fontSize: 12.5,
            color: "var(--text-muted)",
          },
        },
        React.createElement("div", null, "Due " + doc.due),
        React.createElement("div", { style: { marginTop: 2 } }, "Net-14"),
      ),
    ),
    React.createElement(
      "table",
      { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          { style: { borderBottom: "1px solid var(--border)" } },
          ["Description", "Qty", "Rate", "Amount"].map((h, i) =>
            React.createElement(
              "th",
              {
                key: i,
                style: {
                  textAlign: i ? "right" : "left",
                  padding: "8px 0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
              },
              h,
            ),
          ),
        ),
      ),
      React.createElement(
        "tbody",
        null,
        doc.items.map((it, i) =>
          React.createElement(
            "tr",
            { key: i, style: { borderBottom: "1px solid var(--border)" } },
            React.createElement(
              "td",
              { style: { padding: "11px 0", color: "var(--text)" } },
              it.desc,
            ),
            React.createElement(
              "td",
              {
                style: {
                  padding: "11px 0",
                  textAlign: "right",
                  fontFamily: "var(--mono)",
                  color: "var(--text-muted)",
                },
              },
              it.qty,
            ),
            React.createElement(
              "td",
              {
                style: {
                  padding: "11px 0",
                  textAlign: "right",
                  fontFamily: "var(--mono)",
                  color: "var(--text-muted)",
                },
              },
              money(it.rate),
            ),
            React.createElement(
              "td",
              {
                style: {
                  padding: "11px 0",
                  textAlign: "right",
                  fontFamily: "var(--mono)",
                  fontWeight: 600,
                },
              },
              money(it.qty * it.rate),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "div",
      { style: { display: "flex", justifyContent: "flex-end", marginTop: 14 } },
      React.createElement(
        "div",
        { style: { width: 200 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              fontSize: 13,
              color: "var(--text-muted)",
            },
          },
          React.createElement("span", null, "Subtotal"),
          React.createElement(
            "span",
            { style: { fontFamily: "var(--mono)" } },
            money(subtotal),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0 0",
              marginTop: 4,
              borderTop: "1px solid var(--border)",
              fontSize: 15,
              fontWeight: 700,
            },
          },
          React.createElement("span", null, "Total"),
          React.createElement(
            "span",
            { style: { fontFamily: "var(--mono)" } },
            money(subtotal),
          ),
        ),
      ),
    ),
  );
}

/* ---------- transcript extraction ---------- */
function TranscriptDoc({ doc, setDoc }) {
  const toggle = (i) => {
    const items = doc.actionItems.map((a, j) =>
      j === i ? { ...a, _excluded: !a._excluded } : a,
    );
    setDoc({ ...doc, actionItems: items });
  };
  const Field = ({ label, children }) =>
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-subtle)",
            marginBottom: 8,
          },
        },
        label,
      ),
      children,
    );
  return React.createElement(
    DocFrame,
    { label: "extracted.md" },
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 20 } },
      React.createElement(
        "div",
        { style: { display: "flex", gap: 12, flexWrap: "wrap" } },
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              minWidth: 160,
              padding: 12,
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              background: "var(--bg-subtle)",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--text-subtle)",
                marginBottom: 3,
              },
            },
            "Suggested project",
          ),
          React.createElement("input", {
            value: doc.projectName,
            onChange: (e) => setDoc({ ...doc, projectName: e.target.value }),
            style: {
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text)",
              outline: "none",
            },
          }),
        ),
        React.createElement(
          "div",
          {
            style: {
              padding: 12,
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              minWidth: 110,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--text-subtle)",
                marginBottom: 3,
              },
            },
            "Budget",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--mono)",
              },
            },
            doc.budget,
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              padding: 12,
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              minWidth: 110,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--text-subtle)",
                marginBottom: 3,
              },
            },
            "Deadline",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 14, fontWeight: 600 } },
            doc.deadline,
          ),
        ),
      ),
      React.createElement(
        Field,
        { label: "Client requirements" },
        React.createElement(
          "ul",
          {
            style: {
              margin: 0,
              paddingLeft: 18,
              color: "var(--zinc-700)",
              fontSize: 13.5,
              lineHeight: 1.7,
            },
          },
          doc.requirements.map((r, i) =>
            React.createElement("li", { key: i }, r),
          ),
        ),
      ),
      React.createElement(
        Field,
        { label: "Action items — tick to include" },
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 7 } },
          doc.actionItems.map((a, i) =>
            React.createElement(
              "label",
              {
                key: i,
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 12px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  cursor: "pointer",
                  opacity: a._excluded ? 0.45 : 1,
                },
              },
              React.createElement("input", {
                type: "checkbox",
                checked: !a._excluded,
                onChange: () => toggle(i),
                style: {
                  width: 15,
                  height: 15,
                  accentColor: "var(--indigo-600)",
                  marginTop: 1,
                },
              }),
              React.createElement(
                "span",
                { style: { fontSize: 13.5, color: "var(--text)" } },
                a.text,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

/* ---------- scope change notice ---------- */
function ChangeNoticeDoc({ doc }) {
  return React.createElement(
    DocFrame,
    { label: "change-notice.md" },
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginBottom: 18,
        },
      },
      [
        ["Added hours", "+" + doc.estHours + " hrs", "amber"],
        ["Added cost", "+" + money(doc.estCost), "indigo"],
        [
          "Timeline",
          "+" + doc.estWeeks + " wk" + (doc.estWeeks > 1 ? "s" : ""),
          "amber",
        ],
      ].map((m, i) =>
        React.createElement(
          "div",
          {
            key: i,
            style: {
              padding: 12,
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              textAlign: "center",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--text-subtle)",
                marginBottom: 4,
              },
            },
            m[0],
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 17,
                fontWeight: 700,
                color: TINT[m[2]].fg,
                fontFamily: "var(--mono)",
              },
            },
            m[1],
          ),
        ),
      ),
    ),
    React.createElement(Markdown, { text: doc.body }),
  );
}

/* ---------- weekly update ---------- */
function WeeklyUpdateDoc({ doc }) {
  const Section = ({ label, items, tint, icon }) =>
    items && items.length
      ? React.createElement(
          "div",
          { style: { marginBottom: 16 } },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--text-subtle)",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              },
            },
            React.createElement(Icon, {
              name: icon,
              size: 13,
              style: { color: TINT[tint].solid },
            }),
            label,
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 6 } },
            items.map((it, i) =>
              React.createElement(
                "div",
                {
                  key: i,
                  style: {
                    display: "flex",
                    gap: 8,
                    fontSize: 13.5,
                    color: "var(--zinc-700)",
                  },
                },
                React.createElement(
                  "span",
                  { style: { color: TINT[tint].solid, flexShrink: 0 } },
                  "•",
                ),
                it,
              ),
            ),
          ),
        )
      : null;
  return React.createElement(
    DocFrame,
    { label: "weekly-update.eml" },
    React.createElement(
      "div",
      {
        style: {
          paddingBottom: 14,
          marginBottom: 16,
          borderBottom: "1px solid var(--border)",
        },
      },
      React.createElement(
        "div",
        { style: { fontSize: 12.5, color: "var(--text-muted)" } },
        React.createElement(
          "strong",
          { style: { color: "var(--text)" } },
          "Subject: ",
        ),
        doc.subject,
      ),
      React.createElement(
        "div",
        { style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 } },
        React.createElement(
          "strong",
          { style: { color: "var(--text)" } },
          "To: ",
        ),
        doc.to,
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: 13.5,
          color: "var(--zinc-700)",
          marginBottom: 16,
          lineHeight: 1.6,
        },
      },
      doc.intro,
    ),
    React.createElement(Section, {
      label: "Completed this week",
      items: doc.completed,
      tint: "emerald",
      icon: "checkCircle",
    }),
    React.createElement(Section, {
      label: "Up next",
      items: doc.next,
      tint: "indigo",
      icon: "arrowRight",
    }),
    React.createElement(Section, {
      label: "Blockers",
      items: doc.blockers,
      tint: "amber",
      icon: "alert",
    }),
  );
}

/* ---------- LinkedIn post + scheduler ---------- */
function LinkedinDoc({ doc, setDoc }) {
  return React.createElement(
    DocFrame,
    { label: "linkedin-post.txt" },
    React.createElement(
      "div",
      {
        style: {
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          padding: 16,
          marginBottom: 16,
          background: "var(--bg-subtle)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              width: 40,
              height: 40,
              borderRadius: 99,
              background: "var(--indigo-600)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 15,
            },
          },
          "JR",
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 13.5, fontWeight: 650 } },
            "Jordan Rivera",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 11.5, color: "var(--text-subtle)" } },
            "Brand & Web Designer · Rivera Studio",
          ),
        ),
      ),
      React.createElement("textarea", {
        value: doc.text,
        onChange: (e) => setDoc({ ...doc, text: e.target.value }),
        style: {
          width: "100%",
          minHeight: 150,
          padding: "11px 13px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "var(--zinc-800)",
          outline: "none",
          resize: "vertical",
          background: "#fff",
        },
      }),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        },
      },
      React.createElement(
        "span",
        {
          style: {
            fontSize: 12.5,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          },
        },
        React.createElement(Icon, {
          name: "calendar",
          size: 15,
          style: { color: "var(--indigo-600)" },
        }),
        "Schedule for:",
      ),
      React.createElement("input", {
        type: "date",
        value: doc.scheduleDate,
        onChange: (e) => setDoc({ ...doc, scheduleDate: e.target.value }),
        style: {
          padding: "7px 10px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13,
          color: "var(--text)",
          outline: "none",
          fontFamily: "var(--font)",
        },
      }),
      React.createElement("input", {
        type: "time",
        value: doc.scheduleTime,
        onChange: (e) => setDoc({ ...doc, scheduleTime: e.target.value }),
        style: {
          padding: "7px 10px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13,
          color: "var(--text)",
          outline: "none",
          fontFamily: "var(--font)",
        },
      }),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 11.5,
            color: "var(--text-subtle)",
            fontStyle: "italic",
          },
        },
        doc.connected
          ? "Posts via LinkedIn"
          : "LinkedIn not connected — will copy to clipboard",
      ),
    ),
  );
}

/* ---------- case study / testimonial email / generic note ---------- */
function NoteDoc({ ap, doc }) {
  const isMd = /^#\s/.test(doc.note);
  const label =
    ap.docType === "caseStudy"
      ? "case-study.md"
      : ap.docType === "testimonialReq"
        ? "testimonial-request.eml"
        : ap.agentId === "comms"
          ? "reply.eml"
          : "notes.txt";
  return React.createElement(
    DocFrame,
    { label },
    isMd
      ? React.createElement(Markdown, { text: doc.note })
      : React.createElement(
          "div",
          {
            style: {
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--zinc-700)",
              whiteSpace: "pre-wrap",
            },
          },
          doc.note,
        ),
  );
}

/* ---------- router ---------- */
const INTERACTIVE_DOCS = ["leads", "transcript", "linkedin"];
function renderDoc(ap, doc, setDoc) {
  if (ap.docType === "leads")
    return React.createElement(LeadsDoc, { doc, setDoc });
  if (ap.docType === "proposal")
    return React.createElement(ProposalDoc, { doc });
  if (ap.docType === "invoice") return React.createElement(InvoiceDoc, { doc });
  if (ap.docType === "transcript")
    return React.createElement(TranscriptDoc, { doc, setDoc });
  if (ap.docType === "changeNotice")
    return React.createElement(ChangeNoticeDoc, { doc });
  if (ap.docType === "weeklyUpdate")
    return React.createElement(WeeklyUpdateDoc, { doc });
  if (ap.docType === "linkedin")
    return React.createElement(LinkedinDoc, { doc, setDoc });
  return React.createElement(NoteDoc, { ap, doc });
}
function finalizeDoc(ap, doc) {
  if (ap.docType === "leads")
    return { ...doc, leads: doc.leads.filter((l) => !l._excluded) };
  if (ap.docType === "transcript")
    return { ...doc, actionItems: doc.actionItems.filter((a) => !a._excluded) };
  return doc;
}

/* ---------- edit panel (for non-interactive docs) ---------- */
function EditPanel({ ap, doc, setDoc }) {
  const lbl = (t) =>
    React.createElement(
      "label",
      {
        style: {
          display: "block",
          fontSize: 11.5,
          fontWeight: 600,
          color: "var(--text-muted)",
          marginBottom: 5,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        },
      },
      t,
    );
  const area = (val, onChange, min = 220) =>
    React.createElement("textarea", {
      value: val,
      onChange: (e) => onChange(e.target.value),
      style: {
        width: "100%",
        minHeight: min,
        padding: "12px 14px",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        fontSize: 13,
        fontFamily: "var(--mono)",
        lineHeight: 1.6,
        color: "var(--text)",
        outline: "none",
        resize: "vertical",
      },
    });

  if (ap.docType === "proposal" && doc.tiers)
    return React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 16 } },
      React.createElement(
        "div",
        null,
        lbl("Proposal title"),
        docInput(doc.title, (v) => setDoc({ ...doc, title: v })),
      ),
      React.createElement(
        "div",
        null,
        lbl("Recommended tier"),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          doc.tiers.map((t) =>
            React.createElement(
              "button",
              {
                key: t.name,
                type: "button",
                onClick: () => setDoc({ ...doc, recommended: t.name }),
                style: {
                  flex: 1,
                  padding: "8px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  borderRadius: "var(--r-md)",
                  cursor: "pointer",
                  border:
                    "1px solid " +
                    (doc.recommended === t.name
                      ? "var(--indigo-600)"
                      : "var(--border-strong)"),
                  background:
                    doc.recommended === t.name ? "var(--indigo-50)" : "#fff",
                  color:
                    doc.recommended === t.name
                      ? "var(--indigo-700)"
                      : "var(--text-muted)",
                },
              },
              t.name,
            ),
          ),
        ),
      ),
      doc.tiers.map((t, i) =>
        React.createElement(
          "div",
          {
            key: i,
            style: {
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: 14,
            },
          },
          React.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 650, marginBottom: 10 } },
            t.name,
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              },
            },
            React.createElement(
              "div",
              null,
              lbl("Price ($)"),
              docInput(
                t.price,
                (v) => {
                  const tiers = [...doc.tiers];
                  tiers[i] = {
                    ...t,
                    price: parseInt(v.replace(/\D/g, "") || 0, 10),
                  };
                  setDoc({ ...doc, tiers });
                },
                { style: { fontFamily: "var(--mono)" } },
              ),
            ),
            React.createElement(
              "div",
              null,
              lbl("Delivery"),
              docInput(t.delivery, (v) => {
                const tiers = [...doc.tiers];
                tiers[i] = { ...t, delivery: v };
                setDoc({ ...doc, tiers });
              }),
            ),
          ),
          React.createElement(
            "div",
            { style: { marginTop: 10 } },
            lbl("Scope summary"),
            docInput(t.scope, (v) => {
              const tiers = [...doc.tiers];
              tiers[i] = { ...t, scope: v };
              setDoc({ ...doc, tiers });
            }),
          ),
        ),
      ),
    );

  if (ap.docType === "invoice")
    return React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 14 } },
      React.createElement(
        "div",
        null,
        lbl("Due date"),
        docInput(doc.due, (v) => setDoc({ ...doc, due: v })),
      ),
      React.createElement(
        "div",
        null,
        lbl("Line items"),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 8 } },
          doc.items.map((it, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 80px",
                  gap: 8,
                },
              },
              docInput(it.desc, (v) => {
                const items = [...doc.items];
                items[i] = { ...it, desc: v };
                setDoc({
                  ...doc,
                  items,
                  amount: items.reduce((s, x) => s + x.qty * x.rate, 0),
                });
              }),
              docInput(
                it.qty,
                (v) => {
                  const items = [...doc.items];
                  items[i] = {
                    ...it,
                    qty: parseInt(v.replace(/\D/g, "") || 0, 10),
                  };
                  setDoc({
                    ...doc,
                    items,
                    amount: items.reduce((s, x) => s + x.qty * x.rate, 0),
                  });
                },
                { style: { fontFamily: "var(--mono)", textAlign: "center" } },
              ),
              docInput(
                it.rate,
                (v) => {
                  const items = [...doc.items];
                  items[i] = {
                    ...it,
                    rate: parseInt(v.replace(/\D/g, "") || 0, 10),
                  };
                  setDoc({
                    ...doc,
                    items,
                    amount: items.reduce((s, x) => s + x.qty * x.rate, 0),
                  });
                },
                { style: { fontFamily: "var(--mono)", textAlign: "right" } },
              ),
            ),
          ),
        ),
      ),
    );

  if (ap.docType === "changeNotice")
    return React.createElement(
      "div",
      null,
      lbl("Change notice (Markdown)"),
      area(doc.body, (v) => setDoc({ ...doc, body: v }), 260),
    );
  if (ap.docType === "weeklyUpdate")
    return React.createElement(
      "div",
      null,
      lbl("Intro message"),
      area(doc.intro, (v) => setDoc({ ...doc, intro: v }), 120),
    );
  // caseStudy / testimonialReq / note
  return React.createElement(
    "div",
    null,
    lbl("Content"),
    area(doc.note, (v) => setDoc({ ...doc, note: v }), 260),
  );
}

Object.assign(window, {
  DocFrame,
  renderDoc,
  finalizeDoc,
  EditPanel,
  INTERACTIVE_DOCS,
  ScoreRing,
  scoreTint,
});
