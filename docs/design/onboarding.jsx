/* global React, Icon, Logo, Button, Avatar, TextInput, Select, FieldLabel, AIProfileForm, AI_PROFILE, WORKSPACE */
const { useState: useStateOb } = React;

const PLATFORMS_OB = [
  "Upwork",
  "LinkedIn",
  "Referral",
  "Cold inbound",
  "Website form",
  "Other",
];

const STEPS = [
  { id: "workspace", label: "Workspace" },
  { id: "ai", label: "AI Profile" },
  { id: "lead", label: "First lead" },
  { id: "run", label: "First run" },
  { id: "portal", label: "Client portal" },
];

function StepShell({ eyebrow, title, sub, children, wide }) {
  return React.createElement(
    "div",
    { style: { width: "100%", maxWidth: wide ? 720 : 520, margin: "0 auto" } },
    React.createElement(
      "div",
      {
        style: {
          fontSize: 12,
          fontWeight: 650,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--indigo-600)",
          marginBottom: 10,
        },
      },
      eyebrow,
    ),
    React.createElement(
      "h1",
      {
        style: {
          margin: 0,
          fontSize: 27,
          fontWeight: 680,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        },
      },
      title,
    ),
    sub &&
      React.createElement(
        "p",
        {
          style: {
            margin: "9px 0 26px",
            fontSize: 14.5,
            color: "var(--text-muted)",
            lineHeight: 1.55,
            maxWidth: 540,
          },
        },
        sub,
      ),
    !sub && React.createElement("div", { style: { height: 26 } }),
    children,
  );
}

function Confetti() {
  const cols = [
    "var(--indigo-500)",
    "var(--emerald-500)",
    "var(--amber-500)",
    "var(--rose-500)",
  ];
  const bits = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 7) * 0.12,
    col: cols[i % 4],
    dur: 1.8 + (i % 5) * 0.25,
    rot: (i * 53) % 360,
  }));
  return React.createElement(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      },
    },
    bits.map((b, i) =>
      React.createElement("span", {
        key: i,
        style: {
          position: "absolute",
          top: "-6%",
          left: b.left + "%",
          width: 8,
          height: 12,
          background: b.col,
          borderRadius: 2,
          transform: "rotate(" + b.rot + "deg)",
          animation:
            "ad-confetti " +
            b.dur +
            "s " +
            b.delay +
            "s cubic-bezier(.3,.6,.5,1) forwards",
          opacity: 0.9,
        },
      }),
    ),
  );
}

function OnboardingWizard({ app, onExit }) {
  const [step, setStep] = useStateOb(0);
  const [ws, setWs] = useStateOb({ name: WORKSPACE.workspace });
  const [ai, setAi] = useStateOb(AI_PROFILE);
  const [lead, setLead] = useStateOb({
    name: "",
    company: "",
    platform: "Upwork",
    desc: "",
  });
  const [savedLead, setSavedLead] = useStateOb(null);
  const [running, setRunning] = useStateOb(false);
  const [done, setDone] = useStateOb(false);
  const [copied, setCopied] = useStateOb(false);

  const cur = STEPS[step];
  const canSkip = step >= 2 && step <= 4; // steps 3, 4, 5 skippable; 1 & 2 required
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    try {
      localStorage.setItem("agentdesk_onboarded", "1");
    } catch (e) {}
    onExit("dashboard");
  };

  const saveLead = () => {
    if (lead.name.trim() && lead.company.trim()) {
      const c = app.addLead({ ...lead, _silent: true }, false);
      setSavedLead(lead);
    }
    next();
  };
  const runFirst = () => {
    setRunning(true);
    setTimeout(() => {
      app.runAgent("lead-scout");
      setRunning(false);
      next();
    }, 1300);
  };

  const portalClient = savedLead
    ? { name: savedLead.name, company: savedLead.company }
    : app.clients[0] || { name: "Maya Okonkwo", company: "Lumen Coffee Co." };
  const portalSlug = (portalClient.company || "client")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const portalUrl = "riverastudio.agentdesk.app/portal/" + portalSlug;
  const copyPortal = () => {
    try {
      navigator.clipboard &&
        navigator.clipboard.writeText("https://" + portalUrl);
    } catch (e) {}
    setCopied(true);
    app.toast("Portal link copied", { icon: "copy", tint: "indigo" });
    setTimeout(() => setCopied(false), 1800);
  };

  /* ---- per-step body ---- */
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid var(--border-strong)",
    borderRadius: "var(--r-md)",
    fontSize: 13.5,
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box",
  };

  let body;
  if (cur.id === "workspace") {
    body = React.createElement(
      StepShell,
      {
        eyebrow: "Step 1 of 5",
        title: "Name your workspace",
        sub: "This is your freelance business name — it appears in your client portal.",
      },
      React.createElement(
        "div",
        { style: { marginBottom: 18 } },
        React.createElement(FieldLabel, null, "Workspace name"),
        React.createElement(TextInput, {
          value: ws.name,
          onChange: (x) => setWs({ name: x }),
          placeholder: "Rivera Studio",
        }),
      ),
      React.createElement(
        FieldLabel,
        null,
        "Logo",
        React.createElement(
          "span",
          { style: { fontWeight: 400, color: "var(--text-subtle)" } },
          " (optional)",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 14 } },
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
          (ws.name || "R").slice(0, 2).toUpperCase(),
        ),
        React.createElement(
          Button,
          { variant: "secondary", size: "sm", icon: "upload" },
          "Upload logo",
        ),
      ),
    );
  } else if (cur.id === "ai") {
    body = React.createElement(
      StepShell,
      {
        wide: true,
        eyebrow: "Step 2 of 5",
        title: "Tell us about your work",
        sub: "The more you tell us, the smarter your agents get. This feeds every agent — Lead Scout, Proposal Agent, and Client Comms — not just one.",
      },
      React.createElement(AIProfileForm, {
        value: ai,
        onChange: setAi,
        twoCol: app.layout !== "mobile",
        addCustomFlag: false,
      }),
    );
  } else if (cur.id === "lead") {
    body = React.createElement(
      StepShell,
      {
        eyebrow: "Step 3 of 5",
        title: "Add your first lead",
        sub: "Drop in someone you’re already talking to — or skip and let Lead Scout find leads for you.",
      },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: app.layout === "mobile" ? "1fr" : "1fr 1fr",
            gap: 14,
            marginBottom: 14,
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Full name"),
          React.createElement(TextInput, {
            value: lead.name,
            onChange: (x) => setLead({ ...lead, name: x }),
            placeholder: "Sarah Chen",
          }),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Company"),
          React.createElement(TextInput, {
            value: lead.company,
            onChange: (x) => setLead({ ...lead, company: x }),
            placeholder: "TechStart Inc",
          }),
        ),
      ),
      React.createElement(
        "div",
        { style: { marginBottom: 14, maxWidth: 240 } },
        React.createElement(FieldLabel, null, "Platform"),
        React.createElement(Select, {
          value: lead.platform,
          onChange: (x) => setLead({ ...lead, platform: x }),
          options: PLATFORMS_OB,
        }),
      ),
      React.createElement(FieldLabel, null, "Project description"),
      React.createElement("textarea", {
        value: lead.desc,
        onChange: (e) => setLead({ ...lead, desc: e.target.value }),
        rows: 3,
        placeholder: "What do they need?",
        style: { ...inputStyle, resize: "vertical", lineHeight: 1.55 },
      }),
    );
  } else if (cur.id === "run") {
    const target = savedLead || { name: "your lead", company: "" };
    body = React.createElement(
      StepShell,
      {
        eyebrow: "Step 4 of 5",
        title: "Run your first agent",
        sub: "Lead Scout will score the fit and draft a personalised outreach message — ready for you to review and approve.",
      },
      React.createElement(
        "div",
        {
          style: {
            padding: 22,
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            background: "#fff",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 13,
              marginBottom: 16,
            },
          },
          React.createElement(
            "span",
            {
              style: {
                width: 44,
                height: 44,
                borderRadius: "var(--r-md)",
                background: "var(--indigo-50)",
                color: "var(--indigo-600)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              },
            },
            React.createElement(Icon, { name: "radar", size: 22 }),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: { fontSize: 15, fontWeight: 650 } },
              "Lead Scout",
            ),
            React.createElement(
              "div",
              { style: { fontSize: 13, color: "var(--text-muted)" } },
              savedLead
                ? "Configured for " +
                    target.name +
                    (target.company ? " · " + target.company : "")
                : "Finds and scores leads that match your niche",
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 12.5,
              color: "var(--text-subtle)",
              marginBottom: 18,
              padding: "10px 12px",
              background: "var(--bg-subtle)",
              borderRadius: "var(--r-md)",
            },
          },
          "Nothing is sent automatically — every agent run waits for your approval first.",
        ),
        React.createElement(
          Button,
          {
            variant: "primary",
            size: "lg",
            full: true,
            icon: running ? undefined : "radar",
            iconRight: running ? undefined : "arrowRight",
            onClick: runFirst,
            disabled: running,
          },
          running
            ? React.createElement(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  },
                },
                React.createElement("span", {
                  style: {
                    width: 15,
                    height: 15,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: 99,
                    display: "inline-block",
                    animation: "ad-spin .7s linear infinite",
                  },
                }),
                "Running Lead Scout…",
              )
            : "Run Lead Scout",
        ),
      ),
    );
  } else if (cur.id === "portal") {
    body = React.createElement(
      StepShell,
      {
        eyebrow: "Step 5 of 5",
        title: "Share your first client portal",
        sub:
          "Every client gets a branded portal to see proposals, approve work, and pay invoices — no logins, no chasing. Here’s " +
          portalClient.name +
          "’s.",
      },
      React.createElement(
        "div",
        {
          style: {
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            background: "#fff",
            overflow: "hidden",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 18px",
              borderBottom: "1px solid var(--border)",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                width: 40,
                height: 40,
                borderRadius: "var(--r-md)",
                background: "var(--indigo-600)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontWeight: 700,
                fontSize: 15,
              },
            },
            (portalClient.name || "C")
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join(""),
          ),
          React.createElement(
            "div",
            { style: { minWidth: 0 } },
            React.createElement(
              "div",
              { style: { fontSize: 14, fontWeight: 650 } },
              portalClient.name,
            ),
            React.createElement(
              "div",
              { style: { fontSize: 12.5, color: "var(--text-muted)" } },
              portalClient.company,
            ),
          ),
        ),
        React.createElement(
          "div",
          { style: { padding: 18 } },
          React.createElement(FieldLabel, null, "Portal link"),
          React.createElement(
            "div",
            { style: { display: "flex", gap: 8 } },
            React.createElement(
              "div",
              {
                style: {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: "9px 12px",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--r-md)",
                  background: "var(--bg-subtle)",
                  fontFamily: "var(--mono)",
                  fontSize: 12.5,
                  color: "var(--text-muted)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              },
              portalUrl,
            ),
            React.createElement(
              Button,
              {
                variant: copied ? "secondary" : "primary",
                icon: copied ? "check" : "copy",
                onClick: copyPortal,
              },
              copied ? "Copied" : "Copy link",
            ),
          ),
          React.createElement(
            "div",
            { style: { display: "flex", gap: 16, marginTop: 16 } },
            [
              "Proposals & approvals",
              "Pay invoices via Stripe",
              "Live project status",
            ].map((t) =>
              React.createElement(
                "div",
                {
                  key: t,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "var(--text-muted)",
                  },
                },
                React.createElement(Icon, {
                  name: "check",
                  size: 13,
                  strokeWidth: 2.4,
                  style: { color: "var(--emerald-500)" },
                }),
                t,
              ),
            ),
          ),
        ),
      ),
    );
  }

  /* completion overlay */
  const doneScreen = React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 401,
        background: "var(--bg-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        overflow: "hidden",
      },
    },
    React.createElement(Confetti, null),
    React.createElement(
      "div",
      {
        style: {
          textAlign: "center",
          maxWidth: 460,
          margin: "0 auto",
          position: "relative",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            width: 76,
            height: 76,
            borderRadius: 99,
            background: "var(--emerald-50)",
            color: "var(--emerald-600)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          },
        },
        React.createElement(Icon, {
          name: "check",
          size: 38,
          strokeWidth: 2.6,
        }),
      ),
      React.createElement(
        "h1",
        {
          style: {
            margin: 0,
            fontSize: 28,
            fontWeight: 680,
            letterSpacing: "-0.03em",
          },
        },
        "AgentDesk is ready",
      ),
      React.createElement(
        "p",
        {
          style: {
            margin: "12px 0 28px",
            fontSize: 15,
            color: "var(--text-muted)",
            lineHeight: 1.55,
          },
        },
        "Your first agent run is waiting in Pending Approvals. Review it, approve it, and watch the rest of the lifecycle take care of itself.",
      ),
      React.createElement(
        "div",
        { style: { display: "inline-flex" } },
        React.createElement(
          Button,
          {
            variant: "primary",
            size: "lg",
            iconRight: "arrowRight",
            onClick: finish,
          },
          "Go to dashboard",
        ),
      ),
    ),
  );

  /* ---- footer nav ---- */
  let primary = null;
  if (cur.id === "workspace")
    primary = React.createElement(
      Button,
      {
        variant: "primary",
        iconRight: "arrowRight",
        onClick: next,
        disabled: !ws.name.trim(),
      },
      "Continue",
    );
  else if (cur.id === "ai")
    primary = React.createElement(
      Button,
      { variant: "primary", iconRight: "arrowRight", onClick: next },
      "Continue",
    );
  else if (cur.id === "lead")
    primary = React.createElement(
      Button,
      {
        variant: "primary",
        iconRight: "arrowRight",
        onClick: saveLead,
        disabled: !(lead.name.trim() && lead.company.trim()),
      },
      "Save & continue",
    );
  else if (cur.id === "portal")
    primary = React.createElement(
      Button,
      {
        variant: "primary",
        iconRight: "arrowRight",
        onClick: () => setDone(true),
      },
      "Finish setup",
    );

  if (done) return doneScreen;

  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 400,
        background: "var(--bg-subtle)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      },
    },
    // top bar: logo + progress + steps
    React.createElement(
      "div",
      {
        style: {
          flexShrink: 0,
          padding: "20px 28px 0",
          maxWidth: 960,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 9 } },
          React.createElement(Logo, { size: 26 }),
          React.createElement(
            "span",
            {
              style: {
                fontWeight: 650,
                fontSize: 15,
                letterSpacing: "-0.02em",
              },
            },
            "AgentDesk",
          ),
        ),
        React.createElement(
          "button",
          {
            onClick: finish,
            style: {
              background: "none",
              border: "none",
              color: "var(--text-subtle)",
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
            },
          },
          "Skip setup",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 6 } },
        STEPS.map((s, i) =>
          React.createElement("div", {
            key: s.id,
            style: {
              flex: 1,
              height: 4,
              borderRadius: 99,
              background: i <= step ? "var(--indigo-600)" : "var(--zinc-200)",
              transition: "background .3s",
            },
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          },
        },
        STEPS.map((s, i) =>
          React.createElement(
            "span",
            {
              key: s.id,
              style: {
                fontSize: 11,
                fontWeight: i === step ? 650 : 500,
                color:
                  i === step
                    ? "var(--indigo-600)"
                    : i < step
                      ? "var(--text-muted)"
                      : "var(--text-subtle)",
                flex: 1,
                textAlign:
                  i === 0
                    ? "left"
                    : i === STEPS.length - 1
                      ? "right"
                      : "center",
              },
            },
            s.label,
          ),
        ),
      ),
    ),
    // body (scrolls)
    React.createElement(
      "div",
      {
        style: {
          flex: 1,
          overflowY: "auto",
          padding: "40px 28px 28px",
          width: "100%",
        },
      },
      body,
    ),
    // footer
    React.createElement(
      "div",
      {
        style: {
          flexShrink: 0,
          borderTop: "1px solid var(--border)",
          background: "#fff",
          padding: "14px 28px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          },
        },
        step > 0
          ? React.createElement(
              Button,
              { variant: "ghost", icon: "chevronLeft", onClick: back },
              "Back",
            )
          : React.createElement("span", null),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          canSkip &&
            React.createElement(
              Button,
              {
                variant: "ghost",
                onClick: step === STEPS.length - 1 ? () => setDone(true) : next,
              },
              "Skip",
            ),
          primary,
        ),
      ),
    ),
  );
}

Object.assign(window, { OnboardingWizard });
