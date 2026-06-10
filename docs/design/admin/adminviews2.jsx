/* global React, Icon, Badge, Button, Modal, Panel, ATable, ARow, ACell, AStatus, SearchInput, MiniSelect, FieldLabel, money, SectionLabel, ADMIN_SUBSCRIPTIONS, ADMIN_PACKAGES, ADMIN_DISCOUNTS */
const { useState: useStateV2 } = React;

/* ============ SUBSCRIPTIONS ============ */
function SubscriptionsScreen({ admin }) {
  const [q, setQ] = useStateV2("");
  const [override, setOverride] = useStateV2(null);
  const subs = ADMIN_SUBSCRIPTIONS.filter(
    (s) => q === "" || s.workspace.toLowerCase().includes(q.toLowerCase()),
  );
  const mrr = ADMIN_SUBSCRIPTIONS.filter((s) => s.status === "Active").reduce(
    (a, s) => a + s.amount,
    0,
  );

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { style: { marginBottom: 20 } },
      React.createElement(
        "h1",
        {
          style: {
            margin: 0,
            fontSize: 22,
            fontWeight: 680,
            letterSpacing: "-0.03em",
          },
        },
        "Subscriptions",
      ),
      React.createElement(
        "p",
        {
          style: {
            margin: "4px 0 0",
            fontSize: 13,
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          },
        },
        React.createElement(Icon, { name: "refresh", size: 13 }),
        "Synced from LemonSqueezy webhooks · " + money(mrr) + " active MRR",
      ),
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        },
      },
      React.createElement(SearchInput, {
        value: q,
        onChange: setQ,
        placeholder: "Search workspace…",
        width: 280,
      }),
      React.createElement(
        "div",
        {
          style: {
            marginLeft: "auto",
            fontSize: 12,
            color: "var(--text-subtle)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          },
        },
        React.createElement("span", {
          style: {
            width: 6,
            height: 6,
            borderRadius: 99,
            background: "var(--emerald-500)",
          },
        }),
        "Webhook last synced 2 min ago",
      ),
    ),

    React.createElement(
      ATable,
      {
        minWidth: 760,
        columns: [
          { label: "Workspace" },
          { label: "Plan", w: 100 },
          { label: "Amount", right: true, w: 100 },
          { label: "Next billing", w: 130 },
          { label: "Status", w: 120 },
          { label: "", right: true, w: 100 },
        ],
      },
      subs.map((s) =>
        React.createElement(
          ARow,
          { key: s.id },
          React.createElement(ACell, { bold: true }, s.workspace),
          React.createElement(
            ACell,
            null,
            React.createElement(
              Badge,
              {
                tint:
                  s.plan === "Agency"
                    ? "emerald"
                    : s.plan === "Pro"
                      ? "indigo"
                      : "zinc",
                size: "sm",
              },
              s.plan,
            ),
          ),
          React.createElement(
            ACell,
            { right: true, mono: true },
            money(s.amount) + "/mo",
          ),
          React.createElement(
            ACell,
            { mono: true, color: "var(--text-muted)", nowrap: true },
            s.nextBilling,
          ),
          React.createElement(
            ACell,
            null,
            React.createElement(AStatus, { value: s.status }),
          ),
          React.createElement(
            ACell,
            { right: true },
            React.createElement(
              Button,
              {
                size: "sm",
                variant: "ghost",
                icon: "sliders",
                onClick: () => setOverride(s),
              },
              "Override",
            ),
          ),
        ),
      ),
    ),
    React.createElement(OverrideModal, {
      sub: override,
      onClose: () => setOverride(null),
      admin,
    }),
  );
}

function OverrideModal({ sub, onClose, admin }) {
  const [plan, setPlan] = useStateV2("Pro");
  const [extraRuns, setExtraRuns] = useStateV2("");
  React.useEffect(() => {
    if (sub) {
      setPlan(sub.plan);
      setExtraRuns("");
    }
  }, [sub]);
  if (!sub) return null;

  const apply = () => {
    admin.act(
      "Manual subscription override",
      sub.workspace +
        " → " +
        plan +
        (extraRuns ? " +" + extraRuns + " runs" : ""),
    );
    onClose();
  };

  return React.createElement(
    Modal,
    { open: !!sub, onClose, width: 480 },
    React.createElement(
      "div",
      {
        style: {
          padding: "20px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { style: { fontSize: 16, fontWeight: 650 } },
          "Manual override",
        ),
        React.createElement(
          "div",
          {
            style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 },
          },
          sub.workspace,
        ),
      ),
      React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        icon: "x",
        onClick: onClose,
      }),
    ),
    React.createElement(
      "div",
      { style: { padding: "20px 24px" } },
      React.createElement(
        "div",
        {
          style: {
            padding: "10px 12px",
            background: "var(--amber-50)",
            border: "1px solid var(--amber-100)",
            borderRadius: "var(--r-md)",
            fontSize: 12,
            color: "var(--amber-700)",
            marginBottom: 18,
            display: "flex",
            gap: 8,
          },
        },
        React.createElement(Icon, {
          name: "alert",
          size: 15,
          style: { flexShrink: 0, marginTop: 1 },
        }),
        "Overrides bypass LemonSqueezy billing. The change is logged to the audit trail.",
      ),
      React.createElement(
        "div",
        { style: { marginBottom: 16 } },
        React.createElement(FieldLabel, null, "Change plan"),
        React.createElement(MiniSelect, {
          value: plan,
          onChange: setPlan,
          options: ["Starter", "Pro", "Agency"],
          width: "100%",
        }),
      ),
      React.createElement(
        "div",
        { style: { marginBottom: 16 } },
        React.createElement(
          FieldLabel,
          null,
          "Add bonus runs",
          React.createElement(
            "span",
            { style: { fontWeight: 400, color: "var(--text-subtle)" } },
            " (this cycle)",
          ),
        ),
        React.createElement("input", {
          value: extraRuns,
          onChange: (e) => setExtraRuns(e.target.value.replace(/[^0-9]/g, "")),
          placeholder: "e.g. 100",
          style: {
            width: "100%",
            padding: "9px 12px",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r-md)",
            fontSize: 13.5,
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "var(--mono)",
          },
        }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "14px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
        },
      },
      React.createElement(
        Button,
        {
          variant: "danger",
          icon: "ban",
          onClick: () => {
            admin.act("Cancelled subscription", sub.workspace);
            onClose();
          },
        },
        "Cancel subscription",
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 8 } },
        React.createElement(
          Button,
          { variant: "ghost", onClick: onClose },
          "Dismiss",
        ),
        React.createElement(
          Button,
          { variant: "primary", icon: "check", onClick: apply },
          "Apply override",
        ),
      ),
    ),
  );
}

/* ============ PACKAGES ============ */
function PackagesScreen({ admin }) {
  const [pkgs, setPkgs] = useStateV2(ADMIN_PACKAGES);
  const [dirty, setDirty] = useStateV2(false);
  const upd = (id, patch) => {
    setPkgs((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    setDirty(true);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 16,
          flexWrap: "wrap",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          {
            style: {
              margin: 0,
              fontSize: 22,
              fontWeight: 680,
              letterSpacing: "-0.03em",
            },
          },
          "Packages",
        ),
        React.createElement(
          "p",
          {
            style: {
              margin: "4px 0 0",
              fontSize: 13,
              color: "var(--text-muted)",
            },
          },
          "Edit plan pricing, run limits, and features. Changes sync to the billing config.",
        ),
      ),
      React.createElement(
        Button,
        {
          variant: "primary",
          icon: "check",
          disabled: !dirty,
          onClick: () => {
            admin.act(
              "Updated plan config",
              pkgs.map((p) => p.name + " $" + p.price).join(", "),
            );
            setDirty(false);
          },
        },
        dirty ? "Save changes" : "Saved",
      ),
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns:
            admin.layout === "narrow" ? "1fr" : "repeat(3, 1fr)",
          gap: 16,
        },
      },
      pkgs.map((p) =>
        React.createElement(PackageCard, {
          key: p.id,
          pkg: p,
          upd: (patch) => upd(p.id, patch),
        }),
      ),
    ),
  );
}

function PackageCard({ pkg, upd }) {
  const accent = pkg.accent;
  const field = (label, value, onChange, opts) =>
    React.createElement(
      "div",
      { style: { marginBottom: 12 } },
      React.createElement(
        "label",
        {
          style: {
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            display: "block",
            marginBottom: 5,
          },
        },
        label,
      ),
      opts
        ? React.createElement(MiniSelect, {
            value,
            onChange,
            options: opts,
            width: "100%",
          })
        : React.createElement("input", {
            value,
            onChange: (e) => onChange(e.target.value),
            style: {
              width: "100%",
              padding: "8px 11px",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--r-md)",
              fontSize: 13.5,
              outline: "none",
              boxSizing: "border-box",
            },
          }),
    );

  return React.createElement(
    "div",
    {
      style: {
        background: "#fff",
        border:
          "1px solid " + (pkg.popular ? "var(--indigo-200)" : "var(--border)"),
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: pkg.popular ? "var(--shadow-sm)" : "none",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 18px",
          borderBottom: "1px solid var(--border)",
          background: pkg.popular ? "var(--indigo-50)" : "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
      React.createElement("input", {
        value: pkg.name,
        onChange: (e) => upd({ name: e.target.value }),
        style: {
          fontSize: 16,
          fontWeight: 680,
          letterSpacing: "-0.02em",
          border: "none",
          background: "transparent",
          outline: "none",
          width: "60%",
          color: "var(--text)",
        },
      }),
      pkg.popular &&
        React.createElement(Badge, { tint: "indigo", size: "sm" }, "Popular"),
    ),
    React.createElement(
      "div",
      { style: { padding: 18 } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            marginBottom: 16,
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: 14,
              color: "var(--text-muted)",
              fontWeight: 600,
            },
          },
          "$",
        ),
        React.createElement("input", {
          value: pkg.price,
          onChange: (e) =>
            upd({ price: e.target.value.replace(/[^0-9]/g, "") }),
          style: {
            fontSize: 30,
            fontWeight: 720,
            letterSpacing: "-0.03em",
            border: "none",
            background: "transparent",
            outline: "none",
            width: 70,
            fontFamily: "var(--mono)",
            color: "var(--text)",
          },
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: 13,
              color: "var(--text-subtle)",
              marginBottom: 5,
            },
          },
          "/mo",
        ),
      ),
      field("Run limit", pkg.runLimit, (v) =>
        upd({ runLimit: v.replace(/[^0-9]/g, "") }),
      ),
      field("Model tier", pkg.modelTier, (v) => upd({ modelTier: v }), [
        "Haiku",
        "Sonnet",
        "Sonnet + Opus",
        "Opus",
      ]),
      React.createElement(
        "div",
        { style: { marginTop: 6 } },
        React.createElement(
          "label",
          {
            style: {
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              display: "block",
              marginBottom: 8,
            },
          },
          "Features",
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 7 } },
          pkg.features.map((f, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: { display: "flex", alignItems: "center", gap: 8 },
              },
              React.createElement(Icon, {
                name: "check",
                size: 14,
                strokeWidth: 2.4,
                style: { color: "var(--" + accent + "-500)", flexShrink: 0 },
              }),
              React.createElement("input", {
                value: f,
                onChange: (e) => {
                  const nf = [...pkg.features];
                  nf[i] = e.target.value;
                  upd({ features: nf });
                },
                style: {
                  flex: 1,
                  fontSize: 12.5,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  color: "var(--text-muted)",
                },
              }),
              React.createElement(
                "button",
                {
                  onClick: () =>
                    upd({ features: pkg.features.filter((_, j) => j !== i) }),
                  style: {
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "var(--text-subtle)",
                    display: "inline-flex",
                    padding: 2,
                  },
                },
                React.createElement(Icon, { name: "x", size: 12 }),
              ),
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: () =>
                upd({ features: [...pkg.features, "New feature"] }),
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: 12,
                fontWeight: 550,
                padding: 0,
              },
            },
            React.createElement(Icon, { name: "plus", size: 13 }),
            "Add feature",
          ),
        ),
      ),
    ),
  );
}

/* ============ DISCOUNTS ============ */
function DiscountsScreen({ admin }) {
  const [discounts, setDiscounts] = useStateV2(ADMIN_DISCOUNTS);
  const [creating, setCreating] = useStateV2(false);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 16,
          flexWrap: "wrap",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          {
            style: {
              margin: 0,
              fontSize: 22,
              fontWeight: 680,
              letterSpacing: "-0.03em",
            },
          },
          "Discounts",
        ),
        React.createElement(
          "p",
          {
            style: {
              margin: "4px 0 0",
              fontSize: 13,
              color: "var(--text-muted)",
            },
          },
          discounts.filter((d) => d.status === "Active").length +
            " active codes",
        ),
      ),
      React.createElement(
        Button,
        { variant: "primary", icon: "plus", onClick: () => setCreating(true) },
        "Create Discount",
      ),
    ),

    React.createElement(
      ATable,
      {
        minWidth: 760,
        columns: [
          { label: "Code" },
          { label: "Type", w: 90 },
          { label: "Amount", w: 90 },
          { label: "Used / limit", w: 150 },
          { label: "Expiry", w: 120 },
          { label: "Plans", w: 130 },
          { label: "Status", w: 110 },
        ],
      },
      discounts.map((d) => {
        const pct = Math.round((d.used / d.limit) * 100);
        return React.createElement(
          ARow,
          { key: d.id },
          React.createElement(ACell, { mono: true, bold: true }, d.code),
          React.createElement(
            ACell,
            { color: "var(--text-muted)" },
            d.type === "%" ? "Percent" : "Fixed",
          ),
          React.createElement(
            ACell,
            { mono: true, bold: true },
            d.type === "%" ? d.amount + "%" : "$" + d.amount,
          ),
          React.createElement(
            ACell,
            null,
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 9 } },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    width: 64,
                  },
                },
                d.used + " / " + d.limit,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    width: 50,
                    height: 5,
                    borderRadius: 99,
                    background: "var(--zinc-200)",
                    overflow: "hidden",
                  },
                },
                React.createElement("div", {
                  style: {
                    width: pct + "%",
                    height: "100%",
                    background:
                      pct >= 100 ? "var(--rose-500)" : "var(--indigo-500)",
                  },
                }),
              ),
            ),
          ),
          React.createElement(
            ACell,
            { mono: true, color: "var(--text-muted)", nowrap: true },
            d.expiry,
          ),
          React.createElement(ACell, { color: "var(--text-muted)" }, d.plans),
          React.createElement(
            ACell,
            null,
            React.createElement(AStatus, { value: d.status }),
          ),
        );
      }),
    ),
    React.createElement(DiscountModal, {
      open: creating,
      onClose: () => setCreating(false),
      onCreate: (d) => {
        setDiscounts((ds) => [
          { id: "d" + Date.now(), used: 0, status: "Active", ...d },
          ...ds,
        ]);
        admin.act(
          "Created discount",
          d.code +
            " (" +
            (d.type === "%" ? d.amount + "% off" : "$" + d.amount + " off") +
            ")",
        );
      },
    }),
  );
}

function DiscountModal({ open, onClose, onCreate }) {
  const [f, setF] = useStateV2({
    code: "",
    type: "%",
    amount: "",
    expiry: "",
    limit: "",
    plans: "All",
  });
  React.useEffect(() => {
    if (open)
      setF({
        code: "",
        type: "%",
        amount: "",
        expiry: "",
        limit: "",
        plans: "All",
      });
  }, [open]);
  const set = (p) => setF((x) => ({ ...x, ...p }));
  const valid = f.code.trim() && f.amount && f.limit;
  const fld = (label, node) =>
    React.createElement(
      "div",
      { style: { marginBottom: 15 } },
      React.createElement(FieldLabel, null, label),
      node,
    );
  const input = (val, on, ph, mono) =>
    React.createElement("input", {
      value: val,
      onChange: (e) => on(e.target.value),
      placeholder: ph,
      style: {
        width: "100%",
        padding: "9px 12px",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        fontSize: 13.5,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: mono ? "var(--mono)" : "inherit",
      },
    });

  return React.createElement(
    Modal,
    { open, onClose, width: 500 },
    React.createElement(
      "div",
      {
        style: {
          padding: "20px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
      React.createElement(
        "div",
        { style: { fontSize: 16, fontWeight: 650 } },
        "Create discount",
      ),
      React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        icon: "x",
        onClick: onClose,
      }),
    ),
    React.createElement(
      "div",
      { style: { padding: "20px 24px" } },
      fld(
        "Code name",
        input(
          f.code,
          (v) => set({ code: v.toUpperCase().replace(/\s/g, "") }),
          "SUMMER25",
          true,
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } },
        fld(
          "Type",
          React.createElement(MiniSelect, {
            value: f.type === "%" ? "Percentage" : "Fixed amount",
            onChange: (v) => set({ type: v === "Percentage" ? "%" : "fixed" }),
            options: ["Percentage", "Fixed amount"],
            width: "100%",
          }),
        ),
        fld(
          f.type === "%" ? "Amount (%)" : "Amount ($)",
          input(
            f.amount,
            (v) => set({ amount: v.replace(/[^0-9]/g, "") }),
            f.type === "%" ? "25" : "20",
            true,
          ),
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } },
        fld(
          "Expiry date",
          input(f.expiry, (v) => set({ expiry: v }), "2026-12-31", true),
        ),
        fld(
          "Usage limit",
          input(
            f.limit,
            (v) => set({ limit: v.replace(/[^0-9]/g, "") }),
            "500",
            true,
          ),
        ),
      ),
      fld(
        "Eligible plans",
        React.createElement(MiniSelect, {
          value: f.plans,
          onChange: (v) => set({ plans: v }),
          options: ["All", "Starter", "Pro", "Agency", "Pro, Agency"],
          width: "100%",
        }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "14px 24px",
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
      React.createElement(
        Button,
        {
          variant: "primary",
          icon: "check",
          disabled: !valid,
          onClick: () => {
            onCreate({
              ...f,
              amount: +f.amount,
              limit: +f.limit,
              expiry: f.expiry || "2026-12-31",
            });
            onClose();
          },
        },
        "Create code",
      ),
    ),
  );
}

Object.assign(window, { SubscriptionsScreen, PackagesScreen, DiscountsScreen });
