/* global React, Icon, Button, TINT, AI_PROFILE, SKILLS, INDUSTRIES, PROJECT_LENGTHS, PROJECT_SIZES */
const { useState: useStateAI } = React;

/* ---------- small shared controls ---------- */
function FieldLabel({ children, hint }) {
  return React.createElement(
    "label",
    {
      style: {
        display: "block",
        fontSize: 12.5,
        fontWeight: 600,
        color: "var(--text)",
        marginBottom: 7,
      },
    },
    children,
    hint &&
      React.createElement(
        "span",
        {
          style: {
            fontWeight: 400,
            color: "var(--text-subtle)",
            marginLeft: 6,
          },
        },
        hint,
      ),
  );
}

function TextInput({
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  type = "text",
  mono,
}) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        background: "#fff",
        overflow: "hidden",
      },
    },
    prefix &&
      React.createElement(
        "span",
        {
          style: {
            padding: "0 0 0 12px",
            color: "var(--text-subtle)",
            fontSize: 13.5,
          },
        },
        prefix,
      ),
    React.createElement("input", {
      value,
      type,
      placeholder,
      onChange: (e) => onChange(e.target.value),
      style: {
        flex: 1,
        padding: "9px 12px",
        border: "none",
        outline: "none",
        fontSize: 13.5,
        color: "var(--text)",
        background: "transparent",
        fontFamily: mono ? "var(--mono)" : "inherit",
        minWidth: 0,
      },
    }),
    suffix &&
      React.createElement(
        "span",
        {
          style: {
            padding: "0 12px 0 0",
            color: "var(--text-subtle)",
            fontSize: 13,
          },
        },
        suffix,
      ),
  );
}

function Select({ value, onChange, options }) {
  return React.createElement(
    "div",
    { style: { position: "relative" } },
    React.createElement(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        style: {
          width: "100%",
          padding: "9px 34px 9px 12px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13.5,
          color: "var(--text)",
          outline: "none",
          appearance: "none",
          background: "#fff",
          cursor: "pointer",
        },
      },
      options.map((o) =>
        React.createElement("option", { key: o, value: o }, o),
      ),
    ),
    React.createElement(Icon, {
      name: "chevronDown",
      size: 15,
      style: {
        position: "absolute",
        right: 11,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--zinc-400)",
        pointerEvents: "none",
      },
    }),
  );
}

/* multi-select chips */
function PillGroup({ options, selected, onToggle, tint = "indigo" }) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
    options.map((o) => {
      const on = selected.includes(o);
      const t = TINT[tint];
      return React.createElement(
        "button",
        {
          key: o,
          type: "button",
          onClick: () => onToggle(o),
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: "var(--r-full)",
            fontSize: 12.5,
            fontWeight: 550,
            cursor: "pointer",
            background: on ? t.bg : "#fff",
            color: on ? t.fg : "var(--text-muted)",
            border: "1px solid " + (on ? t.br : "var(--border-strong)"),
            transition: "all .12s",
          },
        },
        on &&
          React.createElement(Icon, {
            name: "check",
            size: 13,
            strokeWidth: 2.4,
          }),
        o,
      );
    }),
  );
}

/* tag input */
function TagsInput({ tags, onChange, placeholder }) {
  const [draft, setDraft] = useStateAI("");
  const add = () => {
    const v = draft.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setDraft("");
  };
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        alignItems: "center",
        padding: "7px 9px",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        background: "#fff",
      },
    },
    tags.map((t) =>
      React.createElement(
        "span",
        {
          key: t,
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 6px 3px 10px",
            borderRadius: "var(--r-full)",
            background: "var(--indigo-50)",
            color: "var(--indigo-700)",
            fontSize: 12.5,
            fontWeight: 550,
            border: "1px solid var(--indigo-100)",
          },
        },
        t,
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => onChange(tags.filter((x) => x !== t)),
            style: {
              display: "inline-flex",
              border: "none",
              background: "none",
              color: "var(--indigo-600)",
              cursor: "pointer",
              padding: 0,
            },
          },
          React.createElement(Icon, { name: "x", size: 12, strokeWidth: 2.4 }),
        ),
      ),
    ),
    React.createElement("input", {
      value: draft,
      placeholder: tags.length ? "" : placeholder,
      onChange: (e) => setDraft(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault();
          add();
        } else if (e.key === "Backspace" && !draft && tags.length)
          onChange(tags.slice(0, -1));
      },
      onBlur: add,
      style: {
        flex: 1,
        minWidth: 100,
        border: "none",
        outline: "none",
        fontSize: 13,
        padding: "4px 2px",
        background: "transparent",
        color: "var(--text)",
      },
    }),
  );
}

function RedFlagRow({ flag, onToggle }) {
  return React.createElement(
    "button",
    {
      type: "button",
      onClick: onToggle,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: "var(--r-md)",
        cursor: "pointer",
        background: flag.on ? "var(--rose-50)" : "#fff",
        border: "1px solid " + (flag.on ? "var(--rose-100)" : "var(--border)"),
        transition: "all .12s",
      },
    },
    React.createElement(
      "span",
      {
        style: {
          width: 18,
          height: 18,
          borderRadius: 5,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: flag.on ? "var(--rose-500)" : "#fff",
          border:
            "1px solid " +
            (flag.on ? "var(--rose-500)" : "var(--border-strong)"),
        },
      },
      flag.on &&
        React.createElement(Icon, {
          name: "check",
          size: 12,
          strokeWidth: 3,
          style: { color: "#fff" },
        }),
    ),
    React.createElement(
      "span",
      {
        style: {
          fontSize: 13,
          color: flag.on ? "var(--rose-700)" : "var(--text-muted)",
          fontWeight: flag.on ? 550 : 450,
        },
      },
      flag.label,
    ),
  );
}

/* ---------- section sub-header ---------- */
function SubHead({ icon, title, desc }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: 11,
        marginBottom: 16,
        alignItems: "flex-start",
      },
    },
    React.createElement(
      "span",
      {
        style: {
          width: 30,
          height: 30,
          borderRadius: "var(--r-md)",
          background: "var(--indigo-50)",
          color: "var(--indigo-600)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        },
      },
      React.createElement(Icon, { name: icon, size: 16, strokeWidth: 1.9 }),
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { style: { fontSize: 14, fontWeight: 650, letterSpacing: "-0.01em" } },
        title,
      ),
      desc &&
        React.createElement(
          "div",
          {
            style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 },
          },
          desc,
        ),
    ),
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-lg)",
  padding: 22,
};

/* ---------- the form (shared by Settings + Onboarding) ---------- */
function AIProfileForm({
  value,
  onChange,
  twoCol = true,
  addCustomFlag = true,
}) {
  const v = value;
  const set = (patch) => onChange({ ...v, ...patch });
  const grid = (cols) => ({
    display: "grid",
    gridTemplateColumns: twoCol ? cols : "1fr",
    gap: 16,
  });
  const toggleIn = (key, item) =>
    set({
      [key]: v[key].includes(item)
        ? v[key].filter((x) => x !== item)
        : [...v[key], item],
    });
  const [newFlag, setNewFlag] = useStateAI("");

  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 16 } },

    /* Skills & Niche */
    React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(SubHead, {
        icon: "sparkle",
        title: "Skills & niche",
        desc: "Lead Scout uses this to score how well a lead fits you.",
      }),
      React.createElement(
        "div",
        { style: { marginBottom: 16 } },
        React.createElement(FieldLabel, null, "Primary skill"),
        React.createElement(Select, {
          value: v.primarySkill,
          onChange: (x) => set({ primarySkill: x }),
          options: SKILLS,
        }),
      ),
      React.createElement(
        "div",
        { style: { marginBottom: 18 } },
        React.createElement(
          FieldLabel,
          { hint: "press Enter" },
          "Specializations",
        ),
        React.createElement(TagsInput, {
          tags: v.specializations,
          onChange: (x) => set({ specializations: x }),
          placeholder: "React, Figma, Shopify…",
        }),
      ),
      React.createElement(
        "div",
        { style: grid("1fr 1fr") },
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Industries I love"),
          React.createElement(PillGroup, {
            options: INDUSTRIES,
            selected: v.industriesLove,
            onToggle: (o) => toggleIn("industriesLove", o),
            tint: "emerald",
          }),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Industries to avoid"),
          React.createElement(PillGroup, {
            options: INDUSTRIES,
            selected: v.industriesAvoid,
            onToggle: (o) => toggleIn("industriesAvoid", o),
            tint: "rose",
          }),
        ),
      ),
    ),

    /* Rates & Preferences */
    React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(SubHead, {
        icon: "dollar",
        title: "Rates & preferences",
        desc: "Proposal Agent prices and scopes inside these guardrails.",
      }),
      React.createElement(
        "div",
        { style: grid("1fr 1fr") },
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Minimum project budget"),
          React.createElement(TextInput, {
            value: String(v.minBudget),
            onChange: (x) => set({ minBudget: x.replace(/[^0-9]/g, "") }),
            prefix: "$",
            mono: true,
          }),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Preferred hourly rate"),
          React.createElement(TextInput, {
            value: String(v.hourlyRate),
            onChange: (x) => set({ hourlyRate: x.replace(/[^0-9]/g, "") }),
            prefix: "$",
            suffix: "/hr",
            mono: true,
          }),
        ),
      ),
      React.createElement(
        "div",
        { style: { ...grid("1fr 1fr"), marginTop: 16 } },
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Preferred project length"),
          React.createElement(Select, {
            value: v.projectLength,
            onChange: (x) => set({ projectLength: x }),
            options: PROJECT_LENGTHS,
          }),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(FieldLabel, null, "Preferred project size"),
          React.createElement(Select, {
            value: v.projectSize,
            onChange: (x) => set({ projectSize: x }),
            options: PROJECT_SIZES,
          }),
        ),
      ),
    ),

    /* Past work context */
    React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(SubHead, {
        icon: "penTool",
        title: "Past work & voice",
        desc: "Lead Scout and Proposal Agent learn your tone and positioning from this.",
      }),
      React.createElement("textarea", {
        value: v.pastWork,
        onChange: (e) => set({ pastWork: e.target.value }),
        rows: 6,
        placeholder: "Paste your best proposal or a project description…",
        style: {
          width: "100%",
          padding: "11px 13px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "var(--text)",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
        },
      }),
    ),

    /* Red flags */
    React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(SubHead, {
        icon: "alert",
        title: "Red flags",
        desc: "Teach Lead Scout the kinds of leads to flag or skip.",
      }),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 7 } },
        v.redFlags.map((f) =>
          React.createElement(RedFlagRow, {
            key: f.id,
            flag: f,
            onToggle: () =>
              set({
                redFlags: v.redFlags.map((x) =>
                  x.id === f.id ? { ...x, on: !x.on } : x,
                ),
              }),
          }),
        ),
      ),
      addCustomFlag &&
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8, marginTop: 10 } },
          React.createElement(
            "div",
            { style: { flex: 1 } },
            React.createElement(TextInput, {
              value: newFlag,
              onChange: setNewFlag,
              placeholder: "Add a custom red flag…",
            }),
          ),
          React.createElement(
            Button,
            {
              variant: "secondary",
              icon: "plus",
              onClick: () => {
                const t = newFlag.trim();
                if (t) {
                  set({
                    redFlags: [
                      ...v.redFlags,
                      { id: "rf" + Date.now(), label: t, on: true },
                    ],
                  });
                  setNewFlag("");
                }
              },
            },
            "Add",
          ),
        ),
    ),
  );
}

Object.assign(window, {
  AIProfileForm,
  FieldLabel,
  TextInput,
  Select,
  PillGroup,
  TagsInput,
});
