/* global React, Icon, Card, Badge, Button, IconButton, Avatar, Modal, PageHeader, DataTable, Row, Td, Toggle, clientColor, initials, ROLES, TEAM, TINT */
const { useState: useStateTm } = React;

function roleTint(role) {
  const r = ROLES.find((x) => x.id === role);
  return r ? r.tint : "zinc";
}

// radio-card role picker
function RolePicker({ value, onChange, excludeOwner }) {
  const roles = excludeOwner ? ROLES.filter((r) => r.id !== "Owner") : ROLES;
  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 8 } },
    roles.map((r) => {
      const sel = value === r.id;
      return React.createElement(
        "button",
        {
          key: r.id,
          type: "button",
          onClick: () => onChange(r.id),
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 11,
            textAlign: "left",
            width: "100%",
            padding: "12px 14px",
            cursor: "pointer",
            background: sel ? "var(--indigo-50)" : "#fff",
            border:
              "1px solid " +
              (sel ? "var(--indigo-600)" : "var(--border-strong)"),
            borderRadius: "var(--r-md)",
            transition: "border-color .12s, background .12s",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              width: 17,
              height: 17,
              borderRadius: 99,
              flexShrink: 0,
              marginTop: 1,
              border:
                "1.5px solid " +
                (sel ? "var(--indigo-600)" : "var(--border-strong)"),
              background: sel ? "var(--indigo-600)" : "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          sel &&
            React.createElement("span", {
              style: {
                width: 6,
                height: 6,
                borderRadius: 99,
                background: "#fff",
              },
            }),
        ),
        React.createElement(
          "span",
          { style: { flex: 1 } },
          React.createElement(
            "span",
            { style: { display: "flex", alignItems: "center", gap: 7 } },
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--text)",
                },
              },
              r.id,
            ),
            React.createElement(
              Badge,
              { tint: r.tint, size: "sm" },
              r.id === "Owner"
                ? "Full access"
                : r.id === "Viewer"
                  ? "Read-only"
                  : "Can edit",
            ),
          ),
          React.createElement(
            "span",
            {
              style: {
                display: "block",
                fontSize: 12.5,
                color: "var(--text-muted)",
                marginTop: 3,
                lineHeight: 1.45,
              },
            },
            r.desc,
          ),
        ),
      );
    }),
  );
}

function InviteModal({ open, onClose, onInvite }) {
  const [email, setEmail] = useStateTm("");
  const [role, setRole] = useStateTm("Member");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const submit = () => {
    if (!valid) return;
    onInvite(email.trim(), role);
    setEmail("");
    setRole("Member");
  };
  return React.createElement(
    Modal,
    { open, onClose, width: 480 },
    React.createElement(
      "div",
      {
        style: {
          padding: "22px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        },
      },
      React.createElement(
        "span",
        {
          style: {
            width: 38,
            height: 38,
            borderRadius: "var(--r-md)",
            background: "var(--indigo-50)",
            color: "var(--indigo-600)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          },
        },
        React.createElement(Icon, { name: "userPlus", size: 19 }),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: { fontSize: 16, fontWeight: 650, letterSpacing: "-0.01em" },
          },
          "Invite a team member",
        ),
        React.createElement(
          "div",
          {
            style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 1 },
          },
          "They\u2019ll get an email to join Rivera Studio.",
        ),
      ),
    ),
    React.createElement(
      "div",
      { style: { padding: "20px 24px" } },
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
        "Email address",
      ),
      React.createElement("input", {
        type: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        placeholder: "name@company.com",
        autoFocus: true,
        onKeyDown: (e) => e.key === "Enter" && submit(),
        style: {
          width: "100%",
          padding: "10px 12px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 14,
          color: "var(--text)",
          outline: "none",
          marginBottom: 18,
        },
      }),
      React.createElement(
        "label",
        {
          style: {
            display: "block",
            fontSize: 12.5,
            fontWeight: 600,
            marginBottom: 8,
          },
        },
        "Role",
      ),
      React.createElement(RolePicker, {
        value: role,
        onChange: setRole,
        excludeOwner: true,
      }),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        },
      },
      React.createElement(
        Button,
        { variant: "secondary", onClick: onClose },
        "Cancel",
      ),
      React.createElement(
        Button,
        { variant: "primary", icon: "send", onClick: submit, disabled: !valid },
        "Send invite",
      ),
    ),
  );
}

function EditModal({ member, onClose, onSave }) {
  const [role, setRole] = useStateTm(member ? member.role : "Member");
  React.useEffect(() => {
    if (member) setRole(member.role);
  }, [member && member.id]);
  if (!member) return null;
  return React.createElement(
    Modal,
    { open: !!member, onClose, width: 480 },
    React.createElement(
      "div",
      {
        style: {
          padding: "22px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        },
      },
      React.createElement(Avatar, {
        initials: initials(member.name),
        color: clientColor(member.name),
        size: 40,
      }),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: { fontSize: 16, fontWeight: 650, letterSpacing: "-0.01em" },
          },
          member.name,
        ),
        React.createElement(
          "div",
          {
            style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 1 },
          },
          member.email,
        ),
      ),
    ),
    React.createElement(
      "div",
      { style: { padding: "20px 24px" } },
      React.createElement(
        "label",
        {
          style: {
            display: "block",
            fontSize: 12.5,
            fontWeight: 600,
            marginBottom: 8,
          },
        },
        "Role",
      ),
      member.role === "Owner"
        ? React.createElement(
            "div",
            {
              style: {
                padding: 14,
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
                background: "var(--bg-subtle)",
                fontSize: 13,
                color: "var(--text-muted)",
              },
            },
            "The workspace Owner has full access. Transfer ownership from Billing to change this.",
          )
        : React.createElement(RolePicker, {
            value: role,
            onChange: setRole,
            excludeOwner: true,
          }),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        },
      },
      React.createElement(
        Button,
        { variant: "secondary", onClick: onClose },
        "Cancel",
      ),
      React.createElement(
        Button,
        {
          variant: "primary",
          icon: "check",
          onClick: () => onSave(member.id, role),
          disabled: member.role === "Owner",
        },
        "Save changes",
      ),
    ),
  );
}

function RemoveModal({ member, onClose, onConfirm }) {
  if (!member) return null;
  const pending = member.status === "Invited";
  return React.createElement(
    Modal,
    { open: !!member, onClose, width: 420 },
    React.createElement(
      "div",
      { style: { padding: "24px" } },
      React.createElement(
        "span",
        {
          style: {
            width: 40,
            height: 40,
            borderRadius: "var(--r-md)",
            background: "var(--rose-50)",
            color: "var(--rose-600)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          },
        },
        React.createElement(Icon, {
          name: pending ? "mail" : "trash",
          size: 19,
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 16.5,
            fontWeight: 650,
            letterSpacing: "-0.01em",
            marginBottom: 6,
          },
        },
        pending ? "Revoke invitation?" : "Remove " + member.name + "?",
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 13.5,
            color: "var(--text-muted)",
            lineHeight: 1.55,
          },
        },
        pending
          ? React.createElement(
              "span",
              null,
              "The invite to ",
              React.createElement(
                "strong",
                { style: { color: "var(--text)" } },
                member.email,
              ),
              " will be cancelled. They won\u2019t be able to join with that link.",
            )
          : React.createElement(
              "span",
              null,
              React.createElement(
                "strong",
                { style: { color: "var(--text)" } },
                member.name,
              ),
              " will immediately lose access to the Rivera Studio workspace. This can\u2019t be undone.",
            ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        },
      },
      React.createElement(
        Button,
        { variant: "secondary", onClick: onClose },
        "Cancel",
      ),
      React.createElement(
        Button,
        {
          variant: "dangerSolid",
          icon: pending ? "x" : "trash",
          onClick: () => onConfirm(member.id),
        },
        pending ? "Revoke invite" : "Remove member",
      ),
    ),
  );
}

function MemberActions({ member, onEdit, onRemove }) {
  const [open, setOpen] = useStateTm(false);
  React.useEffect(() => {
    if (!open) return;
    const h = () => setOpen(false);
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, [open]);
  return React.createElement(
    "div",
    {
      style: { position: "relative", display: "inline-flex" },
      onClick: (e) => e.stopPropagation(),
    },
    React.createElement(IconButton, {
      name: "more",
      size: 16,
      title: "Actions",
      onClick: () => setOpen((o) => !o),
    }),
    open &&
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 38,
            right: 0,
            zIndex: 30,
            minWidth: 168,
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            boxShadow: "var(--shadow-pop)",
            padding: 5,
            animation: "ad-fade-up .12s ease",
          },
        },
        React.createElement(MenuItem, {
          icon: "edit",
          label: member.status === "Invited" ? "Change role" : "Edit role",
          onClick: () => {
            setOpen(false);
            onEdit(member);
          },
        }),
        member.status === "Invited" &&
          React.createElement(MenuItem, {
            icon: "mail",
            label: "Resend invite",
            onClick: () => {
              setOpen(false);
              onEdit({ ...member, _resend: true });
            },
          }),
        !member.you &&
          React.createElement(MenuItem, {
            icon: member.status === "Invited" ? "x" : "trash",
            label: member.status === "Invited" ? "Revoke invite" : "Remove",
            danger: true,
            onClick: () => {
              setOpen(false);
              onRemove(member);
            },
          }),
        member.you &&
          React.createElement(
            "div",
            {
              style: {
                padding: "7px 10px",
                fontSize: 12,
                color: "var(--text-subtle)",
              },
            },
            "This is you",
          ),
      ),
  );
}
function MenuItem({ icon, label, onClick, danger }) {
  const [h, setH] = useStateTm(false);
  return React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        padding: "8px 10px",
        background: h
          ? danger
            ? "var(--rose-50)"
            : "var(--bg-subtle)"
          : "transparent",
        border: "none",
        borderRadius: "var(--r-sm)",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 500,
        color: danger ? "var(--rose-600)" : "var(--text)",
        textAlign: "left",
      },
    },
    React.createElement(Icon, { name: icon, size: 15 }),
    label,
  );
}

function TeamView({ app }) {
  const [team, setTeam] = useStateTm(TEAM);
  const [inviting, setInviting] = useStateTm(false);
  const [editing, setEditing] = useStateTm(null);
  const [removing, setRemoving] = useStateTm(null);

  const invite = (email, role) => {
    const name = email
      .split("@")[0]
      .split(/[._]/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    setTeam((t) => [
      ...t,
      {
        id: "inv" + Date.now(),
        name,
        email,
        role,
        status: "Invited",
        lastActive: "Invite sent just now",
      },
    ]);
    setInviting(false);
    app.toast("Invite sent to " + email, { icon: "mail", tint: "indigo" });
  };
  const save = (id, role) => {
    const m = team.find((x) => x.id === id);
    if (m && m._resend) {
      setEditing(null);
      app.toast("Invite resent to " + m.email, {
        icon: "mail",
        tint: "indigo",
      });
      return;
    }
    setTeam((t) => t.map((x) => (x.id === id ? { ...x, role } : x)));
    setEditing(null);
    app.toast("Role updated to " + role, { icon: "shield", tint: "emerald" });
  };
  const remove = (id) => {
    const m = team.find((x) => x.id === id);
    setTeam((t) => t.filter((x) => x.id !== id));
    setRemoving(null);
    app.toast(
      m.status === "Invited"
        ? "Invitation revoked"
        : m.name + " removed from workspace",
      { icon: m.status === "Invited" ? "x" : "trash", tint: "rose" },
    );
  };

  const activeCount = team.filter((m) => m.status === "Active").length;
  const pendingCount = team.filter((m) => m.status === "Invited").length;

  return React.createElement(
    "div",
    null,
    React.createElement(PageHeader, {
      title: "Team",
      subtitle:
        activeCount +
        " member" +
        (activeCount === 1 ? "" : "s") +
        (pendingCount
          ? " · " +
            pendingCount +
            " pending invite" +
            (pendingCount === 1 ? "" : "s")
          : ""),
      actions: React.createElement(
        Button,
        {
          variant: "primary",
          icon: "userPlus",
          onClick: () => setInviting(true),
        },
        "Invite member",
      ),
    }),
    React.createElement(
      DataTable,
      {
        columns: [
          { label: "Member" },
          { label: "Role", w: 130 },
          { label: "Status", w: 120 },
          { label: "Last active" },
          { label: "", right: true, w: 60 },
        ],
      },
      team.map((m) =>
        React.createElement(
          Row,
          { key: m.id, onClick: () => !m.you && setEditing(m) },
          React.createElement(
            Td,
            null,
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 11 } },
              React.createElement(
                "div",
                { style: { position: "relative" } },
                React.createElement(Avatar, {
                  initials: initials(m.name),
                  color:
                    m.status === "Invited"
                      ? "var(--zinc-300)"
                      : clientColor(m.name),
                  size: 34,
                }),
                m.status === "Active" &&
                  m.lastActive === "Online now" &&
                  React.createElement("span", {
                    style: {
                      position: "absolute",
                      bottom: -1,
                      right: -1,
                      width: 10,
                      height: 10,
                      borderRadius: 99,
                      background: "var(--emerald-500)",
                      border: "2px solid #fff",
                    },
                  }),
              ),
              React.createElement(
                "div",
                { style: { minWidth: 0 } },
                React.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: 7 } },
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontWeight: 550,
                        color:
                          m.status === "Invited"
                            ? "var(--text-muted)"
                            : "var(--text)",
                      },
                    },
                    m.name,
                  ),
                  m.you &&
                    React.createElement(
                      "span",
                      {
                        style: {
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          background: "var(--bg-muted)",
                          padding: "1px 7px",
                          borderRadius: 99,
                        },
                      },
                      "You",
                    ),
                ),
                React.createElement(
                  "div",
                  { style: { fontSize: 12.5, color: "var(--text-subtle)" } },
                  m.email,
                ),
              ),
            ),
          ),
          React.createElement(
            Td,
            null,
            React.createElement(
              "span",
              {
                style: { display: "inline-flex", alignItems: "center", gap: 6 },
              },
              m.role === "Owner" &&
                React.createElement(Icon, {
                  name: "shield",
                  size: 14,
                  style: { color: TINT[roleTint(m.role)].solid },
                }),
              React.createElement(Badge, { tint: roleTint(m.role) }, m.role),
            ),
          ),
          React.createElement(
            Td,
            null,
            React.createElement(
              Badge,
              {
                status: m.status === "Invited" ? "Pending" : "Active",
                dot: true,
              },
              m.status === "Invited" ? "Invited" : "Active",
            ),
          ),
          React.createElement(
            Td,
            { style: { color: "var(--text-subtle)" } },
            m.lastActive,
          ),
          React.createElement(
            Td,
            { right: true },
            React.createElement(MemberActions, {
              member: m,
              onEdit: (mm) => setEditing(mm),
              onRemove: (mm) => setRemoving(mm),
            }),
          ),
        ),
      ),
    ),
    // role legend
    React.createElement(
      "div",
      { style: { marginTop: 22 } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 12,
          },
        },
        "Roles & permissions",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns:
              app.layout === "mobile"
                ? "1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          },
        },
        ROLES.map((r) =>
          React.createElement(
            Card,
            { key: r.id, pad: 16 },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 6,
                },
              },
              React.createElement("span", {
                style: {
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: TINT[r.tint].solid,
                },
              }),
              React.createElement(
                "span",
                { style: { fontSize: 13.5, fontWeight: 650 } },
                r.id,
              ),
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 12.5,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                },
              },
              r.desc,
            ),
          ),
        ),
      ),
    ),
    React.createElement(InviteModal, {
      open: inviting,
      onClose: () => setInviting(false),
      onInvite: invite,
    }),
    React.createElement(EditModal, {
      member: editing,
      onClose: () => setEditing(null),
      onSave: save,
    }),
    React.createElement(RemoveModal, {
      member: removing,
      onClose: () => setRemoving(null),
      onConfirm: remove,
    }),
  );
}

Object.assign(window, { TeamView });
