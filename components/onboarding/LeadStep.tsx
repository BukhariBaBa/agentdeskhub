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
import { StepShell } from "./StepShell";

export function LeadStep({ lead, onChangeLead }: LeadStepProps) {
  return (
    <StepShell
      eyebrow={LEAD_STEP_EYEBROW}
      title={LEAD_STEP_TITLE}
      sub={LEAD_STEP_SUB}
    >
      <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
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

      <div className="mb-[14px] max-w-[240px]">
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
        className="w-full px-3 py-[10px] border border-[var(--border-strong)] rounded-[var(--r-md)] text-[13.5px] text-[var(--text)] outline-none box-border resize-y leading-[1.55] font-[inherit]"
      />
    </StepShell>
  );
}
