/* global React, Icon, Card, Badge, Button, Avatar, PageHeader, TINT, money,
   WORKSPACE, AGENTS */

function MetricCard({ label, value, sub, icon, tint, trend }) {
  return React.createElement(
    Card,
    { pad: 18 },
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
        "span",
        {
          style: {
            fontSize: 12.5,
            color: "var(--text-muted)",
            fontWeight: 550,
          },
        },
        label,
      ),
      React.createElement(
        "span",
        {
          style: {
            width: 30,
            height: 30,
            borderRadius: "var(--r-md)",
            background: TINT[tint].bg,
            color: TINT[tint].fg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        React.createElement(Icon, { name: icon, size: 16, strokeWidth: 2 }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: 27,
          fontWeight: 680,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          lineHeight: 1,
        },
      },
      value,
    ),
    sub &&
      React.createElement(
        "div",
        {
          style: {
            marginTop: 7,
            fontSize: 12,
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          },
        },
        trend &&
          React.createElement(
            "span",
            {
              style: {
                color: trend > 0 ? "var(--emerald-600)" : "var(--rose-600)",
                fontWeight: 600,
              },
            },
            (trend > 0 ? "↑ " : "↓ ") + Math.abs(trend) + "%",
          ),
        sub,
      ),
  );
}

function ApprovalCard({ ap, app }) {
  return React.createElement(
    "div",
    {
      onClick: () => {
        app.openApproval(ap.id);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "15px 18px",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        cursor: "pointer",
        transition: "border-color .12s, box-shadow .12s",
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      },
    },
    React.createElement(
      "span",
      {
        style: {
          width: 40,
          height: 40,
          borderRadius: "var(--r-md)",
          background: TINT[ap.tint].bg,
          color: TINT[ap.tint].fg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        },
      },
      React.createElement(Icon, { name: ap.icon, size: 20, strokeWidth: 1.9 }),
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0, flex: 1 } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
          },
        },
        React.createElement(
          "span",
          { style: { fontSize: 13.5, fontWeight: 600, color: "var(--text)" } },
          ap.agent,
        ),
        React.createElement("span", {
          style: {
            width: 3,
            height: 3,
            borderRadius: 99,
            background: "var(--zinc-300)",
          },
        }),
        React.createElement(
          "span",
          { style: { fontSize: 12, color: "var(--text-subtle)" } },
          ap.time,
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 13,
            color: "var(--text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
        ap.summary,
      ),
    ),
    React.createElement(Badge, { tint: "amber", dot: true }, "Needs review"),
    React.createElement(Icon, {
      name: "chevronRight",
      size: 18,
      style: { color: "var(--zinc-300)" },
    }),
  );
}

function ActivityRow({ a, last }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: 12,
        padding: "11px 0",
        borderBottom: last ? "none" : "1px solid var(--border)",
      },
    },
    React.createElement(
      "span",
      {
        style: {
          width: 28,
          height: 28,
          borderRadius: 99,
          background: TINT[a.tint].bg,
          color: TINT[a.tint].fg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        },
      },
      React.createElement(Icon, { name: a.icon, size: 14, strokeWidth: 2 }),
    ),
    React.createElement(
      "div",
      { style: { flex: 1, minWidth: 0 } },
      React.createElement(
        "div",
        { style: { fontSize: 13, color: "var(--text)", fontWeight: 500 } },
        a.text,
      ),
      a.meta &&
        React.createElement(
          "div",
          { style: { fontSize: 12, color: "var(--text-muted)", marginTop: 1 } },
          a.meta,
        ),
    ),
    React.createElement(
      "span",
      {
        style: {
          fontSize: 11.5,
          color: "var(--text-subtle)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        },
      },
      a.time,
    ),
  );
}

function CompletionCard({ cmp, app }) {
  const project = app.projects.find((p) => p.client === cmp.client) || {
    name: cmp.project,
    client: cmp.client,
  };
  const done = cmp.steps.filter((s) => s.status === "done").length;
  const stepAction = (s) => {
    if (s.status === "done")
      return React.createElement(
        "span",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: "var(--emerald-600)",
            fontWeight: 600,
          },
        },
        React.createElement(Icon, {
          name: "check",
          size: 14,
          strokeWidth: 2.5,
        }),
        "Done",
      );
    if (s.status === "review" && s.approvalId)
      return React.createElement(
        Button,
        {
          size: "sm",
          variant: "primary",
          onClick: () => app.openApproval(s.approvalId),
        },
        "Review",
      );
    const label =
      s.key === "linkedin"
        ? "Schedule"
        : s.key === "testimonial"
          ? "Send"
          : "Generate";
    return React.createElement(
      Button,
      {
        size: "sm",
        variant: "secondary",
        icon: "sparkle",
        onClick: () => {
          if (s.key === "casestudy") app.runCaseStudy(project);
          else if (s.key === "linkedin") app.runLinkedin(project);
          else if (s.key === "testimonial")
            app.runTestimonial(cmp.client, cmp.client);
        },
      },
      label,
    );
  };
  return React.createElement(
    "div",
    {
      style: {
        border: "1px solid var(--emerald-100)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "#fff",
        marginBottom: 22,
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "15px 18px",
          background: "var(--emerald-50)",
          borderBottom: "1px solid var(--emerald-100)",
        },
      },
      React.createElement("span", { style: { fontSize: 20 } }, "🎉"),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 14.5,
              fontWeight: 650,
              letterSpacing: "-0.01em",
              color: "var(--emerald-700)",
            },
          },
          "Project complete — " + cmp.client,
        ),
        React.createElement(
          "div",
          { style: { fontSize: 12.5, color: "var(--emerald-600)" } },
          done +
            " of " +
            cmp.steps.length +
            " follow-ups done · zero manual work",
        ),
      ),
    ),
    React.createElement(
      "div",
      { style: { padding: "6px 18px" } },
      cmp.steps.map((s, i) =>
        React.createElement(
          "div",
          {
            key: s.key,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 0",
              borderBottom:
                i === cmp.steps.length - 1 ? "none" : "1px solid var(--border)",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                width: 28,
                height: 28,
                borderRadius: "var(--r-md)",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  s.status === "done" ? "var(--emerald-50)" : "var(--bg-muted)",
                color:
                  s.status === "done"
                    ? "var(--emerald-600)"
                    : "var(--text-muted)",
              },
            },
            React.createElement(Icon, {
              name: s.status === "done" ? "checkCircle" : s.icon,
              size: 15,
            }),
          ),
          React.createElement(
            "span",
            {
              style: {
                flex: 1,
                fontSize: 13.5,
                fontWeight: 500,
                color:
                  s.status === "done" ? "var(--text-muted)" : "var(--text)",
              },
            },
            s.label,
          ),
          s.status === "review" &&
            React.createElement(
              Badge,
              { tint: "amber", dot: true, size: "sm" },
              "Ready",
            ),
          stepAction(s),
        ),
      ),
    ),
  );
}

function DashboardView({ app }) {
  const { clients, proposals, projects, invoices, approvals, activity } = app;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const openProps = proposals.filter(
    (p) => p.status === "Sent" || p.status === "Draft",
  ).length;
  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const revenue =
    invoices
      .filter((i) => i.status === "Paid")
      .reduce((s, i) => s + i.amount, 0) + 6250; // this-month paid + sent
  const hoursThisWeek = projects.reduce(
    (s, p) => s + (p.timeLogs || []).reduce((t, l) => t + l.hours, 0),
    0,
  );
  const billableHours = projects.reduce(
    (s, p) =>
      s +
      (p.timeLogs || [])
        .filter((l) => l.billable)
        .reduce((t, l) => t + l.hours, 0),
    0,
  );

  const hour = new Date().getHours();
  const greet =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { style: { marginBottom: 22 } },
      React.createElement(
        "h1",
        {
          style: {
            margin: 0,
            fontSize: 22,
            fontWeight: 650,
            letterSpacing: "-0.025em",
          },
        },
        greet + ", " + WORKSPACE.freelancer.split(" ")[0],
      ),
      React.createElement(
        "p",
        {
          style: {
            margin: "5px 0 0",
            fontSize: 13.5,
            color: "var(--text-muted)",
          },
        },
        approvals.length
          ? approvals.length +
              " agent " +
              (approvals.length === 1 ? "action is" : "actions are") +
              " waiting for your review."
          : "You\u2019re all caught up — no pending approvals.",
      ),
    ),
    // metrics
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 14,
          marginBottom: 26,
        },
      },
      React.createElement(MetricCard, {
        label: "Active Clients",
        value: activeClients,
        sub: clients.filter((c) => c.status === "Lead").length + " new leads",
        icon: "clients",
        tint: "indigo",
      }),
      React.createElement(MetricCard, {
        label: "Open Proposals",
        value: openProps,
        sub:
          money(
            proposals
              .filter((p) => p.status === "Sent")
              .reduce((s, p) => s + p.amount, 0),
          ) + " in play",
        icon: "proposals",
        tint: "amber",
      }),
      React.createElement(MetricCard, {
        label: "Active Projects",
        value: activeProjects,
        sub: "1 paused",
        icon: "projects",
        tint: "emerald",
      }),
      React.createElement(MetricCard, {
        label: "Revenue This Month",
        value: money(revenue),
        sub: "vs. last month",
        icon: "dollar",
        tint: "indigo",
        trend: 18,
      }),
      React.createElement(MetricCard, {
        label: "Hours This Week",
        value: hoursThisWeek,
        sub: billableHours + " billable",
        icon: "clock",
        tint: "emerald",
      }),
    ),
    // post-project automation
    (app.completions || []).map((cmp) =>
      React.createElement(CompletionCard, { key: cmp.id, cmp, app }),
    ),
    // two-column: approvals + activity
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns:
            app.layout === "full" ? "minmax(0,1.6fr) minmax(280px,1fr)" : "1fr",
          gap: 22,
          alignItems: "start",
        },
      },
      // approvals
      React.createElement(
        "div",
        null,
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
            "div",
            { style: { display: "flex", alignItems: "center", gap: 9 } },
            React.createElement(
              "h2",
              {
                style: {
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 650,
                  letterSpacing: "-0.02em",
                },
              },
              "Pending Approvals",
            ),
            approvals.length
              ? React.createElement(
                  "span",
                  {
                    style: {
                      minWidth: 20,
                      height: 20,
                      padding: "0 6px",
                      borderRadius: 99,
                      background: "var(--rose-500)",
                      color: "#fff",
                      fontSize: 11.5,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                  approvals.length,
                )
              : null,
          ),
          React.createElement(
            "button",
            {
              onClick: () => app.go("agents"),
              style: {
                background: "none",
                border: "none",
                color: "var(--primary)",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              },
            },
            "Run an agent",
            React.createElement(Icon, { name: "arrowRight", size: 14 }),
          ),
        ),
        approvals.length
          ? React.createElement(
              "div",
              { style: { display: "flex", flexDirection: "column", gap: 10 } },
              approvals.map((ap) =>
                React.createElement(ApprovalCard, { key: ap.id, ap, app }),
              ),
            )
          : React.createElement(
              Card,
              { pad: 28, style: { textAlign: "center" } },
              React.createElement(
                "div",
                {
                  style: {
                    width: 42,
                    height: 42,
                    borderRadius: 99,
                    background: "var(--emerald-50)",
                    color: "var(--emerald-600)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  },
                },
                React.createElement(Icon, { name: "checkCircle", size: 22 }),
              ),
              React.createElement(
                "div",
                { style: { fontSize: 14, fontWeight: 600 } },
                "Inbox zero",
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 3,
                  },
                },
                "No agent actions waiting. Run an agent to get started.",
              ),
            ),
      ),
      // activity
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          {
            style: {
              margin: "0 0 12px",
              fontSize: 15,
              fontWeight: 650,
              letterSpacing: "-0.02em",
            },
          },
          "Recent Activity",
        ),
        React.createElement(
          Card,
          { pad: "4px 16px" },
          activity.slice(0, 7).map((a, i, arr) =>
            React.createElement(ActivityRow, {
              key: a.id,
              a,
              last: i === arr.length - 1,
            }),
          ),
        ),
      ),
    ),
  );
}

Object.assign(window, { DashboardView });
