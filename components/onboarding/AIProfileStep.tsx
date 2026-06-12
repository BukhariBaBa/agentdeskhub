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
  CARD_CLASS,
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
    <div className="flex gap-[11px] mb-4 items-start">
      <span className="w-[30px] h-[30px] rounded-[var(--r-md)] bg-[var(--indigo-50)] text-[var(--indigo-600)] inline-flex items-center justify-center shrink-0 mt-[1px]">
        <Icon name={icon} size={16} strokeWidth={1.9} />
      </span>
      <div>
        <div className="text-[14px] font-[650] tracking-[-0.01em]">{title}</div>
        {desc && (
          <div className="text-[12.5px] text-[var(--text-muted)] mt-[2px]">
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
    <div className="w-full max-w-[720px] mx-auto">
      <div className="text-[12px] font-[650] tracking-[0.08em] uppercase text-[var(--indigo-600)] mb-[10px]">
        {AI_STEP_EYEBROW}
      </div>
      <h1 className="m-0 text-[27px] font-[680] tracking-[-0.03em] text-[var(--text)]">
        {AI_STEP_TITLE}
      </h1>
      <p className="mt-[9px] mb-[26px] text-[14.5px] text-[var(--text-muted)] leading-[1.55] max-w-[600px]">
        {AI_STEP_SUB}
      </p>

      <div className="flex flex-col gap-4">
        {/* Skills & Niche */}
        <div className={CARD_CLASS}>
          <SubHead
            icon="sparkle"
            title="Skills & niche"
            desc="Lead Scout uses this to score how well a lead fits you."
          />
          <div className="mb-4">
            <FieldLabel>Primary skill</FieldLabel>
            <Select
              value={aiProfile.primarySkill}
              onChange={onChangeSkill}
              options={SKILLS}
            />
          </div>
          <div className="mb-[18px]">
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
          <div className="grid grid-cols-2 gap-4">
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
        <div className={CARD_CLASS}>
          <SubHead
            icon="dollar"
            title="Rates & preferences"
            desc="Proposal Agent prices and scopes inside these guardrails."
          />
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4 mt-4">
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
        <div className={CARD_CLASS}>
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
            className="w-full px-[13px] py-[11px] border border-[var(--border-strong)] rounded-[var(--r-md)] text-[13.5px] leading-[1.6] text-[var(--text)] outline-none resize-y box-border font-[inherit]"
          />
        </div>

        {/* Red flags */}
        <div className={CARD_CLASS}>
          <SubHead
            icon="alert"
            title="Red flags"
            desc="Teach Lead Scout the kinds of leads to flag or skip."
          />
          <div className="flex flex-col gap-[7px]">
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
