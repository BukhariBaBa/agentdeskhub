import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import { Select } from "@/components/common/Select";
import { PLATFORMS } from "@/lib/constants";
import type { LeadStepProps } from "./LeadStep.types";
import {
  LEAD_STEP_EYEBROW,
  LEAD_STEP_TITLE,
  LEAD_STEP_SUB,
} from "./LeadStep.const";

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

export function LeadStep({ lead, onChangeLead }: LeadStepProps) {
  return (
    <StepShell
      eyebrow={LEAD_STEP_EYEBROW}
      title={LEAD_STEP_TITLE}
      sub={LEAD_STEP_SUB}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <div>
          <FieldLabel>Full name</FieldLabel>
          <TextInput
            value={lead.name}
            onChange={(x) => onChangeLead({ name: x })}
            placeholder="Sarah Chen"
          />
        </div>
        <div>
          <FieldLabel>Company</FieldLabel>
          <TextInput
            value={lead.company}
            onChange={(x) => onChangeLead({ company: x })}
            placeholder="TechStart Inc"
          />
        </div>
      </div>

      <div style={{ marginBottom: 14, maxWidth: 240 }}>
        <FieldLabel>Platform</FieldLabel>
        <Select
          value={lead.platform}
          onChange={(x) => onChangeLead({ platform: x })}
          options={PLATFORMS}
        />
      </div>

      <FieldLabel>Project description</FieldLabel>
      <textarea
        value={lead.desc}
        onChange={(e) => onChangeLead({ desc: e.target.value })}
        rows={3}
        placeholder="What do they need?"
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          fontSize: 13.5,
          color: "var(--text)",
          outline: "none",
          boxSizing: "border-box",
          resize: "vertical",
          lineHeight: 1.55,
          fontFamily: "inherit",
        }}
      />
    </StepShell>
  );
}
