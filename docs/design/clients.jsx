/* global React, Icon, Card, Badge, Button, IconButton, Avatar, PageHeader, EmptyState, Drawer, Modal, TINT, money, TextInput, Select, FieldLabel, TranscriptModal */
const { useState: useStateCl } = React;

const PLATFORMS = [
  "Upwork",
  "LinkedIn",
  "Referral",
  "Cold inbound",
  "Website form",
  "Other",
];

function fitTint(n) {
  return n >= 71 ? "emerald" : n >= 41 ? "amber" : "rose";
}
function FitScore({ score }) {
  if (score == null)
    return React.createElement(
      "span",
      { style: { color: "var(--zinc-300)", fontSize: 13 } },
      "—",
    );
  const t = TINT[fitTint(score)];
  return React.createElement(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 9 } },
    React.createElement(
      "span",
      {
        style: {
          fontFamily: "var(--mono)",
          fontWeight: 600,
          fontSize: 13,
          color: t.fg,
          fontVariantNumeric: "tabular-nums",
          width: 20,
        },
      },
      score,
    ),
    React.createElement(
      "div",
      {
        style: {
          width: 46,
          height: 5,
          borderRadius: 99,
          background: "var(--zinc-200)",
          overflow: "hidden",
        },
      },
      React.createElement("div", {
        style: {
          width: score + "%",
          height: "100%",
          background: t.solid,
          borderRadius: 99,
        },
      }),
    ),
  );
}

function clientColor(name) {
  const colors = [
    "var(--indigo-600)",
    "var(--emerald-600)",
    "var(--amber-600)",
    "var(--rose-500)",
    "var(--zinc-700)",
  ];
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % colors.length;
  return colors[h];
}
function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* shared table shell */
function DataTable({ columns, children }) {
  return React.createElement(
    "div",
    {
      style: {
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
      },
    },
    React.createElement(
      "div",
      { style: { overflowX: "auto" } },
      React.createElement(
        "table",
        {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13.5,
            minWidth: 640,
          },
        },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            columns.map((c, i) =>
              React.createElement(
                "th",
                {
                  key: i,
                  style: {
                    textAlign: c.right ? "right" : "left",
                    padding: "11px 18px",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "var(--text-subtle)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-subtle)",
                    whiteSpace: "nowrap",
                    width: c.w,
                  },
                },
                c.label,
              ),
            ),
          ),
        ),
        React.createElement("tbody", null, children),
      ),
    ),
  );
}
function Row({ children, onClick }) {
  return React.createElement(
    "tr",
    {
      onClick,
      style: {
        cursor: onClick ? "pointer" : "default",
        transition: "background .1s",
      },
      onMouseEnter: (e) =>
        onClick && (e.currentTarget.style.background = "var(--bg-subtle)"),
      onMouseLeave: (e) =>
        onClick && (e.currentTarget.style.background = "transparent"),
    },
    children,
  );
}
function Td({ children, right, style = {} }) {
  return React.createElement(
    "td",
    {
      style: {
        padding: "13px 18px",
        borderBottom: "1px solid var(--border)",
        textAlign: right ? "right" : "left",
        color: "var(--text)",
        ...style,
      },
    },
    children,
  );
}

function ClientsView({ app }) {
  const [active, setActive] = useStateCl(null);
  const [running, setRunning] = useStateCl(false);
  const [addOpen, setAddOpen] = useStateCl(null); // null | 'manual' | 'paste'
  const [transcriptOpen, setTranscriptOpen] = useStateCl(false);
  const client = app.clients.find((c) => c.id === active);

  const findLeads = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      app.runAgent("lead-scout");
    }, 900);
  };

  const cols = [
    { label: "Name" },
    { label: "Company" },
    { label: "Fit score", w: 110 },
    { label: "Platform", w: 130 },
    { label: "Status" },
    { label: "Last activity" },
    { label: "Portal", right: true, w: 80 },
  ];

  return React.createElement(
    "div",
    null,
    React.createElement(PageHeader, {
      title: "Clients",
      subtitle:
        app.clients.length +
        " total · " +
        app.clients.filter((c) => c.status === "Lead").length +
        " new leads",
      actions: [
        React.createElement(
          Button,
          {
            key: "scout",
            variant: "ghost",
            icon: running ? undefined : "radar",
            onClick: findLeads,
            disabled: running,
          },
          running
            ? React.createElement(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  },
                },
                React.createElement("span", {
                  style: {
                    width: 13,
                    height: 13,
                    border: "2px solid var(--zinc-300)",
                    borderTopColor: "var(--zinc-600)",
                    borderRadius: 99,
                    display: "inline-block",
                    animation: "ad-spin .7s linear infinite",
                  },
                }),
                "Scouting…",
              )
            : "Find Leads",
        ),
        React.createElement(
          Button,
          {
            key: "tr",
            variant: "secondary",
            icon: "message",
            onClick: () => setTranscriptOpen(true),
          },
          "Paste Transcript",
        ),
        React.createElement(
          Button,
          {
            key: "paste",
            variant: "secondary",
            icon: "sparkle",
            onClick: () => setAddOpen("paste"),
          },
          "Paste & Extract",
        ),
        React.createElement(
          Button,
          {
            key: "add",
            variant: "primary",
            icon: "plus",
            onClick: () => setAddOpen("manual"),
          },
          "Add Lead",
        ),
      ],
    }),
    app.clients.length === 0
      ? React.createElement(EmptyState, {
          icon: "radar",
          title: "Lead Scout hasn\u2019t found anyone yet",
          body: "Run Lead Scout to discover and qualify new client leads that match your niche.",
          cta: "Run Lead Scout now",
          onCta: findLeads,
        })
      : React.createElement(
          DataTable,
          { columns: cols },
          app.clients.map((c) =>
            React.createElement(
              Row,
              { key: c.id, onClick: () => setActive(c.id) },
              React.createElement(
                Td,
                null,
                React.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 10 } },
                  React.createElement(Avatar, {
                    initials: initials(c.name),
                    color: clientColor(c.name),
                    size: 30,
                  }),
                  React.createElement(
                    "span",
                    { style: { fontWeight: 550 } },
                    c.name,
                  ),
                ),
              ),
              React.createElement(
                Td,
                { style: { color: "var(--text-muted)" } },
                c.company,
              ),
              React.createElement(
                Td,
                null,
                React.createElement(FitScore, {
                  score: c.status === "Lead" ? c.fit : null,
                }),
              ),
              React.createElement(
                Td,
                { style: { color: "var(--text-muted)" } },
                c.source === "Lead Scout"
                  ? React.createElement(
                      "span",
                      {
                        style: {
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        },
                      },
                      React.createElement(Icon, {
                        name: "radar",
                        size: 13,
                        style: { color: "var(--indigo-500)" },
                      }),
                      c.platform || "Lead Scout",
                    )
                  : c.platform || c.source,
              ),
              React.createElement(
                Td,
                null,
                React.createElement(Badge, { status: c.status, dot: true }),
              ),
              React.createElement(
                Td,
                { style: { color: "var(--text-subtle)" } },
                c.activity,
              ),
              React.createElement(
                Td,
                { right: true },
                React.createElement(
                  "div",
                  {
                    style: {
                      display: "inline-flex",
                      justifyContent: "flex-end",
                    },
                    onClick: (e) => {
                      e.stopPropagation();
                      app.copyPortal(c);
                    },
                  },
                  React.createElement(IconButton, {
                    name: "copy",
                    size: 15,
                    title: "Copy portal link",
                  }),
                ),
              ),
            ),
          ),
        ),
    // drawer
    React.createElement(
      Drawer,
      { open: !!client, onClose: () => setActive(null) },
      client &&
        React.createElement(ClientDetail, {
          client,
          app,
          onClose: () => setActive(null),
        }),
    ),
    // add lead modal
    React.createElement(AddLeadModal, {
      open: !!addOpen,
      initialTab: addOpen || "manual",
      onClose: () => setAddOpen(null),
      app,
    }),
    // transcript modal (shared with Projects)
    React.createElement(TranscriptModal, {
      open: transcriptOpen,
      onClose: () => setTranscriptOpen(false),
      app,
      clients: app.clients,
    }),
  );
}

/* ---- Add Lead modal: Manual Entry + Paste & Extract ---- */
function AddLeadModal({ open, initialTab, onClose, app }) {
  const [tab, setTab] = useStateCl("manual");
  const [form, setForm] = useStateCl({
    name: "",
    company: "",
    platform: "Upwork",
    desc: "",
    budget: "",
    url: "",
  });
  const [runScout, setRunScout] = useStateCl(true);
  const [paste, setPaste] = useStateCl("");
  const [extracting, setExtracting] = useStateCl(false);

  React.useEffect(() => {
    if (open) {
      setTab(initialTab);
      setForm({
        name: "",
        company: "",
        platform: "Upwork",
        desc: "",
        budget: "",
        url: "",
      });
      setPaste("");
      setRunScout(true);
    }
  }, [open, initialTab]);

  const set = (p) => setForm((f) => ({ ...f, ...p }));
  const canSave = form.name.trim() && form.company.trim() && form.desc.trim();

  const extract = () => {
    setExtracting(true);
    setTimeout(() => {
      setExtracting(false);
      setForm({
        name: "Sarah Chen",
        company: "TechStart Inc",
        platform: "LinkedIn",
        desc: "Looking for a React developer to build a customer-facing dashboard and marketing site ahead of their Series A. Wants a modern, fast, design-led build.",
        budget: "$8,000",
        url: "",
      });
      setTab("manual");
    }, 1100);
  };

  const save = () => {
    if (!canSave) return;
    app.addLead(form, runScout);
    onClose();
  };

  const tabBtn = (id, label) =>
    React.createElement(
      "button",
      {
        key: id,
        onClick: () => setTab(id),
        style: {
          flex: 1,
          padding: "11px 12px",
          background: "none",
          border: "none",
          borderBottom:
            "2px solid " + (tab === id ? "var(--primary)" : "transparent"),
          color: tab === id ? "var(--text)" : "var(--text-muted)",
          fontSize: 13.5,
          fontWeight: tab === id ? 600 : 500,
          cursor: "pointer",
          marginBottom: -1,
        },
      },
      label,
    );

  const labeled = (label, node, opt) =>
    React.createElement(
      "div",
      { style: { marginBottom: 15 } },
      React.createElement(
        FieldLabel,
        null,
        label,
        opt &&
          React.createElement(
            "span",
            { style: { color: "var(--text-subtle)", fontWeight: 400 } },
            " (optional)",
          ),
      ),
      node,
    );

  return React.createElement(
    Modal,
    { open, onClose, width: 560 },
    React.createElement(
      "div",
      {
        style: {
          padding: "18px 24px 0",
          borderBottom: "1px solid var(--border)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          },
        },
        React.createElement(
          "div",
          {
            style: { fontSize: 16, fontWeight: 650, letterSpacing: "-0.01em" },
          },
          "Add a lead",
        ),
        React.createElement(IconButton, { name: "x", onClick: onClose }),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 4 } },
        tabBtn("manual", "Manual entry"),
        tabBtn("paste", "Paste & Extract"),
      ),
    ),

    tab === "manual"
      ? React.createElement(
          "div",
          { style: { padding: "20px 24px" } },
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns:
                  app.layout === "mobile" ? "1fr" : "1fr 1fr",
                gap: 15,
              },
            },
            labeled(
              "Full name",
              React.createElement(TextInput, {
                value: form.name,
                onChange: (x) => set({ name: x }),
                placeholder: "Sarah Chen",
              }),
            ),
            labeled(
              "Company name",
              React.createElement(TextInput, {
                value: form.company,
                onChange: (x) => set({ company: x }),
                placeholder: "TechStart Inc",
              }),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns:
                  app.layout === "mobile" ? "1fr" : "1fr 1fr",
                gap: 15,
              },
            },
            labeled(
              "Platform",
              React.createElement(Select, {
                value: form.platform,
                onChange: (x) => set({ platform: x }),
                options: PLATFORMS,
              }),
            ),
            labeled(
              "Estimated budget",
              React.createElement(
                TextInput,
                {
                  value: form.budget,
                  onChange: (x) => set({ budget: x }),
                  placeholder: "$8,000",
                },
                true,
              ),
              true,
            ),
          ),
          labeled(
            "Project description",
            React.createElement("textarea", {
              value: form.desc,
              onChange: (e) => set({ desc: e.target.value }),
              rows: 3,
              placeholder: "What does this client need?",
              style: {
                width: "100%",
                padding: "10px 12px",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--r-md)",
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "var(--text)",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              },
            }),
          ),
          labeled(
            "Source URL",
            React.createElement(TextInput, {
              value: form.url,
              onChange: (x) => set({ url: x }),
              placeholder: "https://…",
            }),
            true,
          ),
          React.createElement(
            "button",
            {
              onClick: () => setRunScout(!runScout),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 11,
                width: "100%",
                textAlign: "left",
                padding: "12px 13px",
                borderRadius: "var(--r-md)",
                cursor: "pointer",
                background: runScout ? "var(--indigo-50)" : "var(--bg-subtle)",
                border:
                  "1px solid " +
                  (runScout ? "var(--indigo-100)" : "var(--border)"),
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  width: 36,
                  height: 21,
                  borderRadius: 99,
                  padding: 2,
                  flexShrink: 0,
                  background: runScout
                    ? "var(--indigo-600)"
                    : "var(--zinc-300)",
                  display: "flex",
                  justifyContent: runScout ? "flex-end" : "flex-start",
                  transition: "background .15s",
                },
              },
              React.createElement("span", {
                style: {
                  width: 17,
                  height: 17,
                  borderRadius: 99,
                  background: "#fff",
                  boxShadow: "var(--shadow-sm)",
                },
              }),
            ),
            React.createElement(
              "span",
              null,
              React.createElement(
                "span",
                {
                  style: {
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: runScout
                      ? "var(--indigo-800, #3730A3)"
                      : "var(--text)",
                  },
                },
                "Run Lead Scout after saving",
              ),
              React.createElement(
                "span",
                { style: { fontSize: 12, color: "var(--text-muted)" } },
                "Score the lead and draft outreach automatically.",
              ),
            ),
          ),
        )
      : React.createElement(
          "div",
          { style: { padding: "20px 24px" } },
          React.createElement(
            "div",
            { style: { fontSize: 13.5, fontWeight: 600, marginBottom: 4 } },
            "Paste a job post, LinkedIn profile, or email inquiry",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 12.5,
                color: "var(--text-muted)",
                marginBottom: 12,
              },
            },
            "Lead Scout will extract the name, company, platform, and project details automatically.",
          ),
          React.createElement("textarea", {
            value: paste,
            onChange: (e) => setPaste(e.target.value),
            rows: 10,
            placeholder: "Paste here…",
            style: {
              width: "100%",
              padding: "12px 13px",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--r-md)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text)",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              fontFamily: "var(--mono)",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 11.5,
                color: "var(--text-subtle)",
                marginTop: 8,
              },
            },
            "Leave blank to use a sample inquiry for this demo.",
          ),
        ),

    React.createElement(
      "div",
      {
        style: {
          padding: "15px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        },
      },
      React.createElement(
        Button,
        { variant: "ghost", onClick: onClose },
        "Cancel",
      ),
      tab === "paste"
        ? React.createElement(
            Button,
            {
              variant: "primary",
              icon: extracting ? undefined : "sparkle",
              iconRight: extracting ? undefined : "arrowRight",
              onClick: extract,
              disabled: extracting,
            },
            extracting
              ? React.createElement(
                  "span",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                    },
                  },
                  React.createElement("span", {
                    style: {
                      width: 13,
                      height: 13,
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff",
                      borderRadius: 99,
                      display: "inline-block",
                      animation: "ad-spin .7s linear infinite",
                    },
                  }),
                  "Extracting…",
                )
              : "Extract with Lead Scout",
          )
        : React.createElement(
            Button,
            {
              variant: "primary",
              icon: "check",
              onClick: save,
              disabled: !canSave,
            },
            runScout ? "Save & run Scout" : "Save lead",
          ),
    ),
  );
}

function ClientDetail({ client, app, onClose }) {
  const props = app.proposals.filter((p) => p.client === client.company);
  const projs = app.projects.filter((p) => p.client === client.company);
  const invs = app.invoices.filter((i) => i.client === client.company);

  const Section = ({ title, count, children }) =>
    React.createElement(
      "div",
      { style: { marginBottom: 22 } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 10,
          },
        },
        title + (count != null ? " · " + count : ""),
      ),
      children,
    );

  const linkRow = (left, right, onClick) =>
    React.createElement(
      "div",
      {
        onClick,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 13px",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
          marginBottom: 7,
          cursor: onClick ? "pointer" : "default",
        },
      },
      left,
      right,
    );

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          borderBottom: "1px solid var(--border)",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 12 } },
        React.createElement(Avatar, {
          initials: initials(client.name),
          color: clientColor(client.name),
          size: 42,
        }),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 16, fontWeight: 650 } },
            client.name,
          ),
          React.createElement(
            "div",
            { style: { fontSize: 13, color: "var(--text-muted)" } },
            client.company,
          ),
        ),
      ),
      React.createElement(IconButton, { name: "x", onClick: onClose }),
    ),
    React.createElement(
      "div",
      { style: { flex: 1, overflowY: "auto", padding: "20px 22px" } },
      React.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginBottom: 20 } },
        React.createElement(Badge, { status: client.status, dot: true }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: 12.5,
              color: "var(--text-muted)",
              alignSelf: "center",
            },
          },
          "via " + client.source,
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginBottom: 24 } },
        React.createElement(
          Button,
          {
            variant: "primary",
            icon: "link",
            full: true,
            onClick: () => app.copyPortal(client),
          },
          "Share Portal",
        ),
        React.createElement(
          Button,
          {
            variant: "secondary",
            icon: "message",
            onClick: () =>
              app.toast("Drafting follow-up with Client Comms…", {
                icon: "message",
                tint: "amber",
              }),
          },
          "Follow up",
        ),
      ),
      React.createElement(
        Section,
        { title: "Proposals", count: props.length },
        props.length
          ? props.map((p) =>
              linkRow(
                React.createElement(
                  "span",
                  { style: { fontSize: 13.5, fontWeight: 500 } },
                  p.title,
                ),
                React.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 10 } },
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--mono)",
                        fontSize: 12.5,
                        color: "var(--text-muted)",
                      },
                    },
                    money(p.amount),
                  ),
                  React.createElement(Badge, { status: p.status, size: "sm" }),
                ),
                () => {
                  onClose();
                  app.go("proposals", { id: p.id });
                },
              ),
            )
          : React.createElement(
              "div",
              { style: { fontSize: 13, color: "var(--text-subtle)" } },
              "No proposals yet.",
            ),
      ),
      React.createElement(
        Section,
        { title: "Projects", count: projs.length },
        projs.length
          ? projs.map((p) =>
              linkRow(
                React.createElement(
                  "span",
                  { style: { fontSize: 13.5, fontWeight: 500 } },
                  p.name,
                ),
                React.createElement(Badge, { status: p.status, size: "sm" }),
                () => {
                  onClose();
                  app.go("projects", { id: p.id });
                },
              ),
            )
          : React.createElement(
              "div",
              { style: { fontSize: 13, color: "var(--text-subtle)" } },
              "No projects yet.",
            ),
      ),
      React.createElement(
        Section,
        { title: "Invoices", count: invs.length },
        invs.length
          ? invs.map((iv) =>
              linkRow(
                React.createElement(
                  "span",
                  {
                    style: {
                      fontSize: 13.5,
                      fontWeight: 500,
                      fontFamily: "var(--mono)",
                    },
                  },
                  iv.num,
                ),
                React.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 10 } },
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--mono)",
                        fontSize: 12.5,
                        color: "var(--text-muted)",
                      },
                    },
                    money(iv.amount),
                  ),
                  React.createElement(Badge, { status: iv.status, size: "sm" }),
                ),
                () => {
                  onClose();
                  app.go("invoices", { id: iv.id });
                },
              ),
            )
          : React.createElement(
              "div",
              { style: { fontSize: 13, color: "var(--text-subtle)" } },
              "No invoices yet.",
            ),
      ),
    ),
  );
}

Object.assign(window, {
  ClientsView,
  DataTable,
  Row,
  Td,
  clientColor,
  initials,
});
