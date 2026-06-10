/* global React, Icon, Card, Badge, Button, PageHeader, EmptyState, DataTable, Row, Td, money */
const { useState: useStateInv } = React;

function InvoicesView({ app }) {
  const [running, setRunning] = useStateInv(false);
  const detail = app.detail && app.invoices.find((i) => i.id === app.detail.id);
  const generate = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      app.runAgent("finance");
    }, 900);
  };

  if (detail) return React.createElement(InvoiceDetail, { iv: detail, app });

  const outstanding = app.invoices
    .filter((i) => i.status === "Sent" || i.status === "Overdue")
    .reduce((s, i) => s + i.amount, 0);

  return React.createElement(
    "div",
    null,
    React.createElement(PageHeader, {
      title: "Invoices",
      subtitle:
        money(outstanding) +
        " outstanding · " +
        app.invoices.filter((i) => i.status === "Overdue").length +
        " overdue",
      actions: React.createElement(
        Button,
        {
          variant: "primary",
          icon: running ? undefined : "receipt",
          onClick: generate,
          disabled: running,
        },
        running
          ? React.createElement(
              "span",
              {
                style: { display: "inline-flex", alignItems: "center", gap: 7 },
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
              "Generating…",
            )
          : "Generate Invoice",
      ),
    }),
    app.invoices.length === 0
      ? React.createElement(EmptyState, {
          icon: "receipt",
          title: "No invoices yet",
          body: "The Finance Agent generates invoices from your completed milestones and chases overdue payments.",
          cta: "Generate an invoice",
          onCta: generate,
        })
      : React.createElement(
          DataTable,
          {
            columns: [
              { label: "Invoice", w: 110 },
              { label: "Client" },
              { label: "Amount", right: true },
              { label: "Due", right: true },
              { label: "Status" },
            ],
          },
          app.invoices.map((iv) =>
            React.createElement(
              "tr",
              {
                key: iv.id,
                onClick: () => app.go("invoices", { id: iv.id }),
                style: {
                  cursor: "pointer",
                  transition: "background .1s",
                  boxShadow:
                    iv.status === "Overdue"
                      ? "inset 3px 0 0 var(--rose-500)"
                      : "none",
                },
                onMouseEnter: (e) =>
                  (e.currentTarget.style.background = "var(--bg-subtle)"),
                onMouseLeave: (e) =>
                  (e.currentTarget.style.background = "transparent"),
              },
              React.createElement(
                Td,
                { style: { fontFamily: "var(--mono)", fontWeight: 600 } },
                iv.num,
              ),
              React.createElement(
                Td,
                { style: { color: "var(--text-muted)" } },
                iv.client,
              ),
              React.createElement(
                Td,
                {
                  right: true,
                  style: { fontFamily: "var(--mono)", fontWeight: 600 },
                },
                money(iv.amount),
              ),
              React.createElement(
                Td,
                { right: true, style: { color: "var(--text-subtle)" } },
                iv.status === "Paid" ? "Paid " + iv.paid : iv.due,
              ),
              React.createElement(
                Td,
                null,
                React.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 8 } },
                  React.createElement(Badge, { status: iv.status, dot: true }),
                  iv.status === "Overdue" &&
                    React.createElement(
                      "span",
                      {
                        style: {
                          fontSize: 11.5,
                          color: "var(--rose-600)",
                          fontWeight: 500,
                        },
                      },
                      iv.overdueDays + "d late",
                    ),
                ),
              ),
            ),
          ),
        ),
  );
}

function InvoiceDetail({ iv, app }) {
  const subtotal = iv.items.reduce((s, it) => s + it.qty * it.rate, 0);
  return React.createElement(
    "div",
    { style: { maxWidth: 720, margin: "0 auto" } },
    React.createElement(
      "button",
      {
        onClick: () => app.go("invoices"),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: 16,
          padding: 0,
        },
      },
      React.createElement(Icon, { name: "chevronLeft", size: 16 }),
      "Invoices",
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 18,
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
              gap: 10,
              marginBottom: 5,
            },
          },
          React.createElement(
            "h1",
            {
              style: {
                margin: 0,
                fontSize: 21,
                fontWeight: 650,
                letterSpacing: "-0.02em",
                fontFamily: "var(--mono)",
              },
            },
            iv.num,
          ),
          React.createElement(Badge, { status: iv.status, dot: true }),
          iv.status === "Overdue" &&
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 12.5,
                  color: "var(--rose-600)",
                  fontWeight: 550,
                },
              },
              iv.overdueDays + " days overdue",
            ),
        ),
        React.createElement(
          "div",
          { style: { fontSize: 13.5, color: "var(--text-muted)" } },
          iv.client +
            " · " +
            (iv.status === "Paid" ? "Paid " + iv.paid : "Due " + iv.due),
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 8 } },
        iv.status !== "Paid" &&
          iv.status !== "Draft" &&
          React.createElement(
            Button,
            {
              variant: "secondary",
              icon: "message",
              onClick: () =>
                app.toast("Payment reminder drafted by Finance Agent", {
                  icon: "receipt",
                  tint: "emerald",
                }),
            },
            "Send reminder",
          ),
        iv.status !== "Paid" &&
          iv.status !== "Draft" &&
          React.createElement(
            Button,
            {
              variant: "success",
              icon: "check",
              onClick: () => {
                app.markInvoicePaid(iv.id);
                app.go("dashboard");
              },
            },
            "Mark as paid",
          ),
        iv.status === "Draft" &&
          React.createElement(
            Button,
            {
              variant: "primary",
              icon: "send",
              onClick: () =>
                app.toast("Invoice " + iv.num + " sent to client", {
                  icon: "send",
                  tint: "emerald",
                }),
            },
            "Send invoice",
          ),
        React.createElement(
          Button,
          {
            variant: "secondary",
            icon: "download",
            onClick: () =>
              app.toast("Downloading " + iv.num + ".pdf…", {
                icon: "download",
              }),
          },
          "PDF",
        ),
      ),
    ),
    React.createElement(
      Card,
      {
        pad: "30px 34px",
        style:
          iv.status === "Overdue"
            ? { borderLeft: "3px solid var(--rose-500)" }
            : {},
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 26,
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
                marginBottom: 4,
              },
            },
            "From",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 13.5, fontWeight: 600 } },
            "Rivera Studio",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 12.5, color: "var(--text-muted)" } },
            "jordan@riverastudio.co",
          ),
        ),
        React.createElement(
          "div",
          { style: { textAlign: "right" } },
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
            "Bill to",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 13.5, fontWeight: 600 } },
            iv.client,
          ),
        ),
      ),
      React.createElement(
        "table",
        {
          style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 },
        },
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
                    padding: "9px 0",
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
          iv.items.map((it, i) =>
            React.createElement(
              "tr",
              { key: i, style: { borderBottom: "1px solid var(--border)" } },
              React.createElement(
                "td",
                { style: { padding: "12px 0" } },
                it.desc,
              ),
              React.createElement(
                "td",
                {
                  style: {
                    padding: "12px 0",
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
                    padding: "12px 0",
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
                    padding: "12px 0",
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
        {
          style: { display: "flex", justifyContent: "flex-end", marginTop: 16 },
        },
        React.createElement(
          "div",
          { style: { width: 220 } },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                fontSize: 13.5,
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
                padding: "6px 0",
                fontSize: 13.5,
                color: "var(--text-muted)",
              },
            },
            React.createElement("span", null, "Tax"),
            React.createElement(
              "span",
              { style: { fontFamily: "var(--mono)" } },
              money(iv.tax || 0),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "11px 0 0",
                marginTop: 5,
                borderTop: "1px solid var(--border-strong)",
                fontSize: 17,
                fontWeight: 700,
              },
            },
            React.createElement("span", null, "Total"),
            React.createElement(
              "span",
              { style: { fontFamily: "var(--mono)" } },
              money(subtotal + (iv.tax || 0)),
            ),
          ),
        ),
      ),
    ),
    // payment link field
    React.createElement(
      Card,
      { pad: 18, style: { marginTop: 16 } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 8,
          },
        },
        "Payment link",
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 8 } },
        React.createElement("input", {
          defaultValue:
            "https://pay.stripe.com/riverastudio/" + iv.num.toLowerCase(),
          style: {
            flex: 1,
            padding: "9px 12px",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r-md)",
            fontSize: 13,
            fontFamily: "var(--mono)",
            color: "var(--text-muted)",
            outline: "none",
          },
        }),
        React.createElement(
          Button,
          {
            variant: "secondary",
            icon: "copy",
            onClick: () =>
              app.toast("Payment link copied", {
                icon: "link",
                tint: "emerald",
              }),
          },
          "Copy",
        ),
      ),
    ),
  );
}

Object.assign(window, { InvoicesView });
