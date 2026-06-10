import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import type { WorkspaceStepProps } from "./WorkspaceStep.types";
import {
  WORKSPACE_STEP_EYEBROW,
  WORKSPACE_STEP_TITLE,
  WORKSPACE_STEP_SUB,
} from "./WorkspaceStep.const";

function StepShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 650,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--indigo-600)",
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 27,
          fontWeight: 680,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}
      >
        {title}
      </h1>
      {sub ? (
        <p
          style={{
            margin: "9px 0 26px",
            fontSize: 14.5,
            color: "var(--text-muted)",
            lineHeight: 1.55,
            maxWidth: 540,
          }}
        >
          {sub}
        </p>
      ) : (
        <div style={{ height: 26 }} />
      )}
      {children}
    </div>
  );
}

export function WorkspaceStep({ wsName, onChangeName }: WorkspaceStepProps) {
  const initials = (wsName || "W").slice(0, 2).toUpperCase();

  return (
    <StepShell
      eyebrow={WORKSPACE_STEP_EYEBROW}
      title={WORKSPACE_STEP_TITLE}
      sub={WORKSPACE_STEP_SUB}
    >
      <div style={{ marginBottom: 18 }}>
        <FieldLabel>Workspace name</FieldLabel>
        <TextInput
          value={wsName}
          onChange={onChangeName}
          placeholder="Rivera Studio"
        />
      </div>

      <FieldLabel hint="(optional)">Logo</FieldLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
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
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <span style={{ fontSize: 13, color: "var(--text-subtle)" }}>
          Logo upload coming soon
        </span>
      </div>
    </StepShell>
  );
}
