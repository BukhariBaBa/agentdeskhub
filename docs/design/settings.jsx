/* global React, Icon, Card, Badge, Button, PageHeader, Avatar, ProgressBar, WORKSPACE, TINT, money, AIProfileForm, AI_PROFILE */
const { useState: useStateSet } = React;

function Field({ label, value, hint, mono, textarea }) {
  return React.createElement(
    "div",
    { style: { marginBottom: 16 } },
    React.createElement(
      "label",
      {
        style: {
          display: "block",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: 6,
        },
      },
      label,
    ),
    textarea
      ? React.createElement("textarea", {
          defaultValue: value,
          rows: 3,
          style: {
            width: "100%",
            padding: "9px 12px",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r-md)",
            fontSize: 13.5,
            color: "var(--text)",
            outline: "none",
            resize: "vertical",
            lineHeight: 1.55,
          },
        })
      : React.createElement("input", {
          defaultValue: value,
          style: {
            width: "100%",
            padding: "9px 12px",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r-md)",
            fontSize: 13.5,
            fontFamily: mono ? "var(--mono)" : "inherit",
            color: "var(--text)",
            outline: "none",
          },
        }),
    hint &&
      React.createElement(
        "div",
        {
          style: { fontSize: 11.5, color: "var(--text-subtle)", marginTop: 5 },
        },
        hint,
      ),
  );
}

function Toggle({ on, onChange }) {
  return React.createElement(
    "button",
    {
      onClick: () => onChange(!on),
      style: {
        width: 40,
        height: 23,
        borderRadius: 99,
        border: "none",
        cursor: "pointer",
        padding: 2,
        background: on ? "var(--indigo-600)" : "var(--zinc-300)",
        transition: "background .15s",
        display: "flex",
        justifyContent: on ? "flex-end" : "flex-start",
      },
    },
    React.createElement("span", {
      style: {
        width: 19,
        height: 19,
        borderRadius: 99,
        background: "#fff",
        boxShadow: "var(--shadow-sm)",
        transition: "all .15s",
      },
    }),
  );
}

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "workspace", label: "Workspace" },
  { id: "billing", label: "Billing" },
  { id: "portal", label: "Portal" },
  { id: "ai", label: "AI Profile" },
  { id: "social", label: "Social proof" },
];

function Stars({ n, size = 15, onSet }) {
  return React.createElement(
    "div",
    { style: { display: "inline-flex", gap: 2 } },
    [1, 2, 3, 4, 5].map((i) =>
      React.createElement(
        "span",
        {
          key: i,
          onClick: onSet ? () => onSet(i) : undefined,
          style: {
            color: i <= n ? "var(--amber-500)" : "var(--zinc-300)",
            fontSize: size,
            cursor: onSet ? "pointer" : "default",
            lineHeight: 1,
          },
        },
        "★",
      ),
    ),
  );
}

function SettingsView({ app }) {
  const [tab, setTab] = useStateSet("profile");
  const [portalOn, setPortalOn] = useStateSet(true);
  const [aiProfile, setAiProfile] = useStateSet(AI_PROFILE);
  const pct = (app.usage.used / app.usage.limit) * 100;

  const SectionCard = ({ title, desc, children }) =>
    React.createElement(
      Card,
      { pad: 24, style: { marginBottom: 18 } },
      React.createElement(
        "div",
        { style: { fontSize: 15, fontWeight: 650, letterSpacing: "-0.01em" } },
        title,
      ),
      desc &&
        React.createElement(
          "div",
          {
            style: {
              fontSize: 13,
              color: "var(--text-muted)",
              margin: "3px 0 18px",
            },
          },
          desc,
        ),
      !desc && React.createElement("div", { style: { height: 16 } }),
      children,
    );

  return React.createElement(
    "div",
    { style: { maxWidth: 720, margin: "0 auto" } },
    React.createElement(PageHeader, { title: "Settings" }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: 4,
          borderBottom: "1px solid var(--border)",
          marginBottom: 22,
          overflowX: "auto",
        },
      },
      TABS.map((t) =>
        React.createElement(
          "button",
          {
            key: t.id,
            onClick: () => setTab(t.id),
            style: {
              padding: "9px 14px",
              background: "none",
              border: "none",
              borderBottom:
                "2px solid " +
                (tab === t.id ? "var(--primary)" : "transparent"),
              color: tab === t.id ? "var(--text)" : "var(--text-muted)",
              fontSize: 13.5,
              fontWeight: tab === t.id ? 600 : 500,
              cursor: "pointer",
              marginBottom: -1,
              whiteSpace: "nowrap",
            },
          },
          t.label,
        ),
      ),
    ),

    tab === "ai" &&
      React.createElement(
        "div",
        null,
        React.createElement(
          Card,
          {
            pad: 20,
            style: {
              marginBottom: 16,
              background: "var(--indigo-50)",
              borderColor: "var(--indigo-100)",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                width: 34,
                height: 34,
                borderRadius: "var(--r-md)",
                background: "var(--indigo-600)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              },
            },
            React.createElement(Icon, { name: "sparkle", size: 18 }),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 14,
                  fontWeight: 650,
                  color: "var(--indigo-800, #3730A3)",
                },
              },
              "The more you tell us, the smarter your agents get",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12.5,
                  color: "var(--indigo-700)",
                  marginTop: 2,
                  lineHeight: 1.5,
                },
              },
              "Every field here feeds Lead Scout, Proposal Agent, and Client Comms. Takes 2 minutes, saves hours every week.",
            ),
          ),
        ),
        React.createElement(AIProfileForm, {
          value: aiProfile,
          onChange: setAiProfile,
          twoCol: app.layout !== "mobile",
        }),
        React.createElement(
          "div",
          { style: { marginTop: 16 } },
          React.createElement(
            Button,
            {
              variant: "primary",
              icon: "check",
              onClick: () =>
                app.toast("AI Profile saved — agents updated", {
                  icon: "sparkle",
                  tint: "indigo",
                }),
            },
            "Save AI Profile",
          ),
        ),
      ),

    tab === "social" &&
      React.createElement(
        SectionCard,
        {
          title: "Social proof",
          desc: "Testimonials collected from clients after payment. Reuse them in proposals and on your site.",
        },
        app.testimonials.length
          ? React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: -4,
                },
              },
              app.testimonials.map((t) =>
                React.createElement(
                  "div",
                  {
                    key: t.id,
                    style: {
                      padding: 16,
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)",
                      background: "var(--bg-subtle)",
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      },
                    },
                    React.createElement(Stars, { n: t.stars }),
                    React.createElement(
                      "span",
                      {
                        style: { fontSize: 11.5, color: "var(--text-subtle)" },
                      },
                      t.date,
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 13.5,
                        color: "var(--zinc-700)",
                        lineHeight: 1.55,
                        fontStyle: "italic",
                        marginBottom: 8,
                      },
                    },
                    "“" + t.text + "”",
                  ),
                  React.createElement(
                    "div",
                    { style: { fontSize: 12.5, fontWeight: 600 } },
                    t.client,
                    React.createElement(
                      "span",
                      {
                        style: { color: "var(--text-muted)", fontWeight: 400 },
                      },
                      " · " + t.company,
                    ),
                  ),
                ),
              ),
            )
          : React.createElement(
              "div",
              { style: { fontSize: 13.5, color: "var(--text-subtle)" } },
              "No testimonials yet. They appear here once clients respond to a request.",
            ),
      ),

    tab === "profile" &&
      React.createElement(
        SectionCard,
        {
          title: "Profile",
          desc: "Your name and bio appear on the client portal.",
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            },
          },
          React.createElement(Avatar, {
            initials: WORKSPACE.initials,
            color: WORKSPACE.avatarColor,
            size: 56,
          }),
          React.createElement(
            Button,
            { variant: "secondary", size: "sm", icon: "upload" },
            "Change photo",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: app.layout === "mobile" ? "1fr" : "1fr 1fr",
              gap: 16,
            },
          },
          React.createElement(Field, {
            label: "Full name",
            value: WORKSPACE.freelancer,
          }),
          React.createElement(Field, {
            label: "Email",
            value: WORKSPACE.email,
          }),
        ),
        React.createElement(Field, {
          label: "Bio",
          value: WORKSPACE.bio,
          textarea: true,
          hint: "Shown on your client portal home.",
        }),
        React.createElement(
          Button,
          { variant: "primary", onClick: () => app.toast("Profile saved") },
          "Save changes",
        ),
      ),

    tab === "workspace" &&
      React.createElement(
        SectionCard,
        {
          title: "Workspace",
          desc: "Branding shown to clients in the portal.",
        },
        React.createElement(Field, {
          label: "Workspace name",
          value: WORKSPACE.workspace,
        }),
        React.createElement(
          "label",
          {
            style: {
              display: "block",
              fontSize: 12.5,
              fontWeight: 600,
              marginBottom: 6,
            },
          },
          "Logo",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                width: 52,
                height: 52,
                borderRadius: "var(--r-md)",
                background: "var(--zinc-900)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "-0.02em",
              },
            },
            "RS",
          ),
          React.createElement(
            Button,
            { variant: "secondary", size: "sm", icon: "upload" },
            "Upload logo",
          ),
          React.createElement(
            "span",
            { style: { fontSize: 11.5, color: "var(--text-subtle)" } },
            "PNG or SVG, shown white-label in portal",
          ),
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          React.createElement(
            Button,
            { variant: "primary", onClick: () => app.toast("Workspace saved") },
            "Save changes",
          ),
          React.createElement(
            Button,
            {
              variant: "secondary",
              icon: "sparkle",
              onClick: () => app.startOnboarding(),
            },
            "Run setup wizard",
          ),
        ),
      ),

    tab === "billing" &&
      React.createElement(
        "div",
        null,
        React.createElement(
          Card,
          { pad: 22, style: { marginBottom: 18 } },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              },
            },
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 4,
                  },
                },
                React.createElement(
                  "span",
                  { style: { fontSize: 17, fontWeight: 650 } },
                  "Pro plan",
                ),
                React.createElement(Badge, { tint: "indigo" }, "Current"),
              ),
              React.createElement(
                "div",
                { style: { fontSize: 13, color: "var(--text-muted)" } },
                "$29/mo · 30 agent runs/month · unlimited clients",
              ),
            ),
            React.createElement(
              Button,
              {
                variant: "primary",
                icon: "arrowUpRight",
                onClick: () =>
                  app.toast("Opening upgrade options…", {
                    icon: "sparkle",
                    tint: "indigo",
                  }),
              },
              "Upgrade to Agency",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 18,
                paddingTop: 18,
                borderTop: "1px solid var(--border)",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  marginBottom: 8,
                },
              },
              React.createElement(
                "span",
                { style: { color: "var(--text-muted)", fontWeight: 500 } },
                "Agent runs this month",
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                  },
                },
                app.usage.used + " / " + app.usage.limit,
              ),
            ),
            React.createElement(ProgressBar, {
              value: app.usage.used,
              max: app.usage.limit,
              tint: pct >= 95 ? "rose" : pct >= 80 ? "amber" : "indigo",
              height: 8,
            }),
          ),
        ),
        React.createElement(
          Card,
          { pad: "8px 0" },
          React.createElement(
            "div",
            {
              style: {
                padding: "8px 22px",
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              },
            },
            "Payment history",
          ),
          [
            ["May 1, 2026", "$29.00", "Pro · Monthly"],
            ["Apr 1, 2026", "$29.00", "Pro · Monthly"],
            ["Mar 1, 2026", "$29.00", "Pro · Monthly"],
          ].map((r, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 22px",
                  borderTop: "1px solid var(--border)",
                },
              },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  { style: { fontSize: 13, fontWeight: 500 } },
                  r[0],
                ),
                React.createElement(
                  "div",
                  { style: { fontSize: 12, color: "var(--text-subtle)" } },
                  r[2],
                ),
              ),
              React.createElement(
                "div",
                { style: { display: "flex", alignItems: "center", gap: 14 } },
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      fontWeight: 600,
                    },
                  },
                  r[1],
                ),
                React.createElement(Badge, { status: "Paid", size: "sm" }),
                React.createElement(
                  "button",
                  {
                    onClick: () =>
                      app.toast("Downloading receipt…", { icon: "download" }),
                    style: {
                      background: "none",
                      border: "none",
                      color: "var(--zinc-400)",
                      cursor: "pointer",
                      display: "flex",
                    },
                  },
                  React.createElement(Icon, { name: "download", size: 15 }),
                ),
              ),
            ),
          ),
        ),
      ),

    tab === "portal" &&
      React.createElement(
        SectionCard,
        {
          title: "Client portal",
          desc: "Control the white-label portal your clients see.",
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              marginBottom: 18,
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: { fontSize: 13.5, fontWeight: 600 } },
              "Enable client portal",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12.5,
                  color: "var(--text-muted)",
                  marginTop: 2,
                },
              },
              "Globally turn portal access on or off for all clients.",
            ),
          ),
          React.createElement(Toggle, {
            on: portalOn,
            onChange: (v) => {
              setPortalOn(v);
              app.toast("Portal " + (v ? "enabled" : "disabled"));
            },
          }),
        ),
        React.createElement(Field, {
          label: "Portal welcome message",
          value:
            "Welcome! Here\u2019s everything for our project in one place — proposals, progress, deliverables, and invoices. Reach out anytime.",
          textarea: true,
          hint: "Shown to clients on the portal home.",
        }),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          React.createElement(
            Button,
            {
              variant: "primary",
              onClick: () => app.toast("Portal settings saved"),
            },
            "Save changes",
          ),
          React.createElement(
            Button,
            {
              variant: "secondary",
              icon: "eye",
              onClick: () => app.setMode("portal"),
            },
            "Preview portal",
          ),
        ),
      ),
  );
}

Object.assign(window, { SettingsView });
