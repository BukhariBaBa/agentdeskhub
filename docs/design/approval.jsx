/* global React, Icon, Card, Badge, Button, TINT, money, renderDoc, finalizeDoc, EditPanel, INTERACTIVE_DOCS */
const { useState: useStateAp } = React;

function ApprovalView({ app }) {
  const ap = app.approvals.find((a) => a.id === app.activeApproval);
  const [showInput, setShowInput] = useStateAp(false);
  const [editing, setEditing] = useStateAp(false);
  const [doc, setDoc] = useStateAp(
    ap ? JSON.parse(JSON.stringify(ap.doc)) : null,
  );

  if (!ap)
    return React.createElement(
      "div",
      { style: { textAlign: "center", padding: "80px 20px" } },
      React.createElement(
        "div",
        {
          style: {
            width: 48,
            height: 48,
            borderRadius: 99,
            background: "var(--emerald-50)",
            color: "var(--emerald-600)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          },
        },
        React.createElement(Icon, { name: "checkCircle", size: 24 }),
      ),
      React.createElement(
        "div",
        { style: { fontSize: 16, fontWeight: 600 } },
        "This action was already reviewed",
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 13.5,
            color: "var(--text-muted)",
            margin: "6px 0 18px",
          },
        },
        "Nice work clearing your queue.",
      ),
      React.createElement(
        "div",
        { style: { display: "inline-flex" } },
        React.createElement(
          Button,
          { onClick: () => app.go("dashboard"), icon: "dashboard" },
          "Back to Dashboard",
        ),
      ),
    );

  const interactive = INTERACTIVE_DOCS.includes(ap.docType);
  const finalDoc = finalizeDoc(ap, doc);

  // approve-button label varies by doc type
  const approveLabel = (() => {
    if (editing) return "Save changes & Approve";
    if (ap.docType === "leads") return "Approve & send outreach";
    if (ap.docType === "linkedin")
      return doc.scheduleDate ? "Approve & schedule" : "Approve & post";
    if (ap.docType === "transcript") return "Save to project";
    if (ap.docType === "changeNotice") return "Approve & send notice";
    if (ap.docType === "weeklyUpdate") return "Approve & send update";
    if (ap.docType === "testimonialReq") return "Approve & send request";
    return "Approve & Save";
  })();

  return React.createElement(
    "div",
    { style: { maxWidth: 760, margin: "0 auto" } },
    React.createElement(
      "button",
      {
        onClick: () => app.go("dashboard"),
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
      "Pending Approvals",
    ),

    React.createElement(
      Card,
      { pad: 0, style: { overflow: "hidden" } },
      // header
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 22px",
            borderBottom: "1px solid var(--border)",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              width: 44,
              height: 44,
              borderRadius: "var(--r-md)",
              background: TINT[ap.tint].bg,
              color: TINT[ap.tint].fg,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            },
          },
          React.createElement(Icon, {
            name: ap.icon,
            size: 22,
            strokeWidth: 1.9,
          }),
        ),
        React.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 9 } },
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 15.5,
                  fontWeight: 650,
                  letterSpacing: "-0.01em",
                },
              },
              ap.agent,
            ),
            React.createElement(
              Badge,
              { tint: "amber", dot: true, size: "sm" },
              "Needs review",
            ),
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
            ap.title + " · " + ap.time,
          ),
        ),
      ),

      // input context (collapsed)
      React.createElement(
        "div",
        { style: { borderBottom: "1px solid var(--border)" } },
        React.createElement(
          "button",
          {
            onClick: () => setShowInput((s) => !s),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "12px 22px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 12.5,
              fontWeight: 550,
            },
          },
          React.createElement(Icon, {
            name: "chevronRight",
            size: 15,
            style: {
              transform: showInput ? "rotate(90deg)" : "none",
              transition: "transform .15s",
            },
          }),
          "Input context",
          React.createElement(
            "span",
            {
              style: {
                fontSize: 11.5,
                color: "var(--text-subtle)",
                fontWeight: 400,
              },
            },
            "— what the agent was given",
          ),
        ),
        showInput &&
          React.createElement(
            "div",
            {
              style: {
                padding: "0 22px 18px 22px",
                animation: "ad-fade .15s ease",
              },
            },
            React.createElement(
              "pre",
              {
                style: {
                  margin: 0,
                  padding: 16,
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  fontSize: 12.5,
                  fontFamily: "var(--mono)",
                  lineHeight: 1.65,
                  color: "var(--zinc-600)",
                  whiteSpace: "pre-wrap",
                },
              },
              ap.input,
            ),
          ),
      ),

      // output / editor
      React.createElement(
        "div",
        { style: { padding: "22px", background: "var(--bg-subtle)" } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            },
          },
          React.createElement(
            "span",
            {
              style: {
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              },
            },
            editing
              ? "Editing draft"
              : interactive
                ? "Agent output — editable"
                : "Agent output",
          ),
          editing &&
            React.createElement(
              "button",
              {
                onClick: () => setEditing(false),
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                },
              },
              React.createElement(Icon, { name: "eye", size: 14 }),
              "Preview",
            ),
        ),
        editing
          ? React.createElement(
              Card,
              { pad: 20 },
              React.createElement(EditPanel, { ap, doc, setDoc }),
            )
          : renderDoc(ap, finalDoc, setDoc),
      ),

      // footer: actions + usage
      React.createElement(
        "div",
        {
          style: { padding: "16px 22px", borderTop: "1px solid var(--border)" },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            },
          },
          React.createElement(
            Button,
            {
              variant: "primary",
              icon: "check",
              onClick: () => app.approve(ap, finalDoc),
            },
            approveLabel,
          ),
          !editing &&
            !interactive &&
            React.createElement(
              Button,
              {
                variant: "secondary",
                icon: "edit",
                onClick: () => setEditing(true),
              },
              "Edit then Approve",
            ),
          React.createElement("div", { style: { flex: 1 } }),
          React.createElement(
            Button,
            { variant: "danger", icon: "x", onClick: () => app.reject(ap) },
            "Reject",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 14,
              fontSize: 11.5,
              color: "var(--text-subtle)",
              fontFamily: "var(--mono)",
            },
          },
          React.createElement(
            "span",
            { style: { display: "inline-flex", alignItems: "center", gap: 5 } },
            React.createElement(Icon, { name: "sparkle", size: 13 }),
            ap.model,
          ),
          React.createElement("span", null, ap.tokens + " tokens"),
          React.createElement("span", null, ap.latency),
        ),
      ),
    ),
  );
}

Object.assign(window, { ApprovalView });
