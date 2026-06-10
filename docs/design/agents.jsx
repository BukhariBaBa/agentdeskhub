/* global React, Icon, Card, Badge, Button, PageHeader, AGENTS, TINT */
const { useState: useStateAg } = React;

function UsageMeter({ usage, app }) {
  const pct = (usage.used / usage.limit) * 100;
  const tint = pct >= 95 ? "rose" : pct >= 80 ? "amber" : "indigo";
  const near = pct >= 80;
  return React.createElement(
    Card,
    {
      pad: 18,
      style: {
        marginBottom: 24,
        borderColor:
          pct >= 95
            ? "var(--rose-200, #FECDD3)"
            : pct >= 80
              ? "var(--amber-100)"
              : "var(--border)",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        },
      },
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 220 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 9,
            },
          },
          React.createElement(
            "span",
            { style: { fontSize: 14, fontWeight: 650 } },
            usage.used + " / " + usage.limit + " runs used",
          ),
          React.createElement(
            "span",
            { style: { fontSize: 12.5, color: "var(--text-muted)" } },
            "this month",
          ),
          near &&
            React.createElement(
              Badge,
              { tint, size: "sm" },
              pct >= 95 ? "Almost out" : "Running low",
            ),
        ),
        React.createElement(
          "div",
          {
            style: {
              height: 8,
              background: "var(--zinc-200)",
              borderRadius: 99,
              overflow: "hidden",
            },
          },
          React.createElement("div", {
            style: {
              width: pct + "%",
              height: "100%",
              background: TINT[tint].solid,
              borderRadius: 99,
              transition: "width .5s cubic-bezier(.2,.7,.2,1)",
            },
          }),
        ),
        React.createElement(
          "div",
          {
            style: { fontSize: 12, color: "var(--text-subtle)", marginTop: 8 },
          },
          usage.limit - usage.used + " runs left · resets Jul 1 · Pro plan",
        ),
      ),
      near &&
        React.createElement(
          Button,
          {
            variant: pct >= 95 ? "primary" : "secondary",
            icon: "arrowUpRight",
            onClick: () => app.go("settings"),
          },
          "Upgrade plan",
        ),
    ),
  );
}

function AgentCard({ agent, app, atLimit }) {
  const [running, setRunning] = useStateAg(false);
  const run = () => {
    if (atLimit) {
      app.toast("Run limit reached — upgrade to continue", {
        icon: "alert",
        tint: "rose",
      });
      return;
    }
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      app.runAgent(agent.id);
    }, 1000);
  };
  return React.createElement(
    Card,
    {
      pad: 20,
      style: { display: "flex", flexDirection: "column", height: "100%" },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        },
      },
      React.createElement(
        "span",
        {
          style: {
            width: 40,
            height: 40,
            borderRadius: "var(--r-md)",
            background: TINT[agent.tint].bg,
            color: TINT[agent.tint].fg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          },
        },
        React.createElement(Icon, {
          name: agent.icon,
          size: 20,
          strokeWidth: 1.9,
        }),
      ),
      React.createElement(
        "div",
        { style: { flex: 1 } },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14.5,
              fontWeight: 650,
              letterSpacing: "-0.01em",
            },
          },
          agent.name,
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 3,
            },
          },
          React.createElement("span", {
            style: {
              width: 6,
              height: 6,
              borderRadius: 99,
              background:
                agent.lastStatus === "pending"
                  ? "var(--amber-500)"
                  : "var(--emerald-500)",
            },
          }),
          React.createElement(
            "span",
            { style: { fontSize: 11.5, color: "var(--text-subtle)" } },
            agent.lastStatus === "pending"
              ? "Awaiting review · " + agent.lastRun
              : "Last run " + agent.lastRun,
          ),
        ),
      ),
    ),
    React.createElement(
      "p",
      {
        style: {
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.55,
          margin: "0 0 18px",
          flex: 1,
        },
      },
      agent.desc,
    ),
    React.createElement(
      Button,
      {
        variant: "secondary",
        full: true,
        icon: running ? undefined : "sparkle",
        onClick: run,
        disabled: running,
      },
      running
        ? React.createElement(
            "span",
            { style: { display: "inline-flex", alignItems: "center", gap: 7 } },
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
            "Running…",
          )
        : "Run Agent",
    ),
  );
}

function AgentsView({ app }) {
  const atLimit = app.usage.used >= app.usage.limit;
  return React.createElement(
    "div",
    null,
    React.createElement(PageHeader, {
      title: "Agents",
      subtitle:
        "Six autonomous agents handle the freelance lifecycle. Every action waits for your approval.",
    }),
    React.createElement(UsageMeter, { usage: app.usage, app }),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns:
            app.layout === "mobile"
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        },
      },
      AGENTS.map((a) =>
        React.createElement(AgentCard, { key: a.id, agent: a, app, atLimit }),
      ),
    ),
  );
}

Object.assign(window, { AgentsView });
