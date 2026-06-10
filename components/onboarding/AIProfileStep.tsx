import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import { Select } from "@/components/common/Select";
import { PillGroup } from "@/components/common/PillGroup";
import { TagsInput } from "@/components/common/TagsInput";
import { RedFlagRow } from "@/components/common/RedFlagRow";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import {
  SKILLS,
  INDUSTRIES,
  PROJECT_LENGTHS,
  PROJECT_SIZES,
  SKILL_SPECS,
} from "@/lib/constants";
import type { AIProfileStepProps } from "./AIProfileStep.types";
import {
  AI_STEP_EYEBROW,
  AI_STEP_TITLE,
  AI_STEP_SUB,
  CARD_STYLE,
} from "./AIProfileStep.const";

function SubHead({
  icon,
  title,
  desc,
}: {
  icon: IconName;
  title: string;
  desc?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 11,
        marginBottom: 16,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
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
        }}
      >
        <Icon name={icon} size={16} strokeWidth={1.9} />
      </span>
      <div>
        <div
          style={{ fontSize: 14, fontWeight: 650, letterSpacing: "-0.01em" }}
        >
          {title}
        </div>
        {desc && (
          <div
            style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}
          >
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

export function AIProfileStep({
  aiProfile,
  onChangeAi,
  onChangeSkill,
}: AIProfileStepProps) {
  const specs = SKILL_SPECS[aiProfile.primarySkill] ?? [];

  const toggleRedFlag = (id: string) => {
    onChangeAi({
      redFlags: aiProfile.redFlags.map((f) =>
        f.id === id ? { ...f, on: !f.on } : f,
      ),
    });
  };

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
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
        {AI_STEP_EYEBROW}
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
        {AI_STEP_TITLE}
      </h1>
      <p
        style={{
          margin: "9px 0 26px",
          fontSize: 14.5,
          color: "var(--text-muted)",
          lineHeight: 1.55,
          maxWidth: 600,
        }}
      >
        {AI_STEP_SUB}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Skills & Niche */}
        <div style={CARD_STYLE}>
          <SubHead
            icon="sparkle"
            title="Skills & niche"
            desc="Lead Scout uses this to score how well a lead fits you."
          />
          <div style={{ marginBottom: 16 }}>
            <FieldLabel>Primary skill</FieldLabel>
            <Select
              value={aiProfile.primarySkill}
              onChange={onChangeSkill}
              options={SKILLS}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <FieldLabel hint="press Enter">Specializations</FieldLabel>
            <TagsInput
              tags={aiProfile.specializations}
              onChange={(x) => onChangeAi({ specializations: x })}
              placeholder={
                specs.length
                  ? specs.slice(0, 3).join(", ") + "…"
                  : "React, Figma, Shopify…"
              }
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div>
              <FieldLabel>Industries I love</FieldLabel>
              <PillGroup
                options={INDUSTRIES}
                value={aiProfile.industriesLove}
                onChange={(v) => onChangeAi({ industriesLove: v })}
                tint="emerald"
              />
            </div>
            <div>
              <FieldLabel>Industries to avoid</FieldLabel>
              <PillGroup
                options={INDUSTRIES}
                value={aiProfile.industriesAvoid}
                onChange={(v) => onChangeAi({ industriesAvoid: v })}
                tint="rose"
              />
            </div>
          </div>
        </div>

        {/* Rates & Preferences */}
        <div style={CARD_STYLE}>
          <SubHead
            icon="dollar"
            title="Rates & preferences"
            desc="Proposal Agent prices and scopes inside these guardrails."
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div>
              <FieldLabel>Minimum project budget</FieldLabel>
              <TextInput
                value={aiProfile.minBudget}
                onChange={(x) =>
                  onChangeAi({ minBudget: x.replace(/[^0-9]/g, "") })
                }
                prefix="$"
                mono
              />
            </div>
            <div>
              <FieldLabel>Preferred hourly rate</FieldLabel>
              <TextInput
                value={aiProfile.hourlyRate}
                onChange={(x) =>
                  onChangeAi({ hourlyRate: x.replace(/[^0-9]/g, "") })
                }
                prefix="$"
                suffix="/hr"
                mono
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 16,
            }}
          >
            <div>
              <FieldLabel>Preferred project length</FieldLabel>
              <Select
                value={aiProfile.projectLength}
                onChange={(x) => onChangeAi({ projectLength: x })}
                options={PROJECT_LENGTHS}
              />
            </div>
            <div>
              <FieldLabel>Preferred project size</FieldLabel>
              <Select
                value={aiProfile.projectSize}
                onChange={(x) => onChangeAi({ projectSize: x })}
                options={PROJECT_SIZES}
              />
            </div>
          </div>
        </div>

        {/* Past work & voice */}
        <div style={CARD_STYLE}>
          <SubHead
            icon="penTool"
            title="Past work & voice"
            desc="Lead Scout and Proposal Agent learn your tone and positioning from this."
          />
          <textarea
            value={aiProfile.pastWork}
            onChange={(e) => onChangeAi({ pastWork: e.target.value })}
            rows={6}
            placeholder="Paste your best proposal or a project description…"
            style={{
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
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Red flags */}
        <div style={CARD_STYLE}>
          <SubHead
            icon="alert"
            title="Red flags"
            desc="Teach Lead Scout the kinds of leads to flag or skip."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {aiProfile.redFlags.map((f) => (
              <RedFlagRow
                key={f.id}
                flag={f}
                onToggle={() => toggleRedFlag(f.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
