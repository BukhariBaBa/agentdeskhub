/* global React, Icon, Card, Badge, Button, PageHeader */

function IntegrationCard({ it, app }) {
  const connected = it.connected;
  return React.createElement(
    Card,
    {
      pad: 22,
      style: { display: "flex", flexDirection: "column", height: "100%" },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        },
      },
      React.createElement(
        "span",
        {
          style: {
            width: 46,
            height: 46,
            borderRadius: "var(--r-md)",
            background: it.color,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.02em",
          },
        },
        it.glyph,
      ),
      it.install
        ? null
        : React.createElement(
            Badge,
            { tint: connected ? "emerald" : "zinc", dot: true, size: "sm" },
            connected ? "Connected" : "Not connected",
          ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: 15,
          fontWeight: 650,
          letterSpacing: "-0.01em",
          marginBottom: 6,
        },
      },
      it.name,
    ),
    React.createElement(
      "p",
      {
        style: {
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.55,
          margin: "0 0 14px",
          flex: 1,
        },
      },
      it.desc,
    ),
    it.detail &&
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            color: "var(--text-subtle)",
            marginBottom: 14,
            fontFamily: it.install ? "inherit" : "var(--mono)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          },
        },
        it.install && React.createElement(Icon, { name: "team", size: 13 }),
        it.detail,
      ),
    it.install
      ? React.createElement(
          Button,
          {
            variant: "primary",
            full: true,
            icon: "external",
            iconRight: "arrowUpRight",
            onClick: () =>
              app.toast("Opening Chrome Web Store…", {
                icon: "external",
                tint: "indigo",
              }),
          },
          "Install extension",
        )
      : React.createElement(
          Button,
          {
            variant: connected ? "secondary" : "primary",
            full: true,
            icon: connected ? undefined : "link",
            onClick: () => app.toggleIntegration(it.id),
          },
          connected ? "Disconnect" : "Connect",
        ),
  );
}

function IntegrationsView({ app }) {
  const connectedCount = app.integrations.filter((i) => i.connected).length;
  return React.createElement(
    "div",
    null,
    React.createElement(PageHeader, {
      title: "Integrations",
      subtitle:
        connectedCount +
        " connected · plug your agents into the tools you already use",
    }),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns:
            app.layout === "mobile"
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        },
      },
      app.integrations.map((it) =>
        React.createElement(IntegrationCard, { key: it.id, it, app }),
      ),
    ),
  );
}

Object.assign(window, { IntegrationsView });
