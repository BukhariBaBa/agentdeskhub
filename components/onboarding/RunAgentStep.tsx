import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import type { RunAgentStepProps } from "./RunAgentStep.types";
import {
  RUN_STEP_EYEBROW,
  RUN_STEP_TITLE,
  RUN_STEP_SUB,
  RUN_STEP_DISCLAIMER,
} from "./RunAgentStep.const";
import { StepShell } from "./StepShell";

export function RunAgentStep({ savedLead, running, onRun }: RunAgentStepProps) {
  const leadLabel = savedLead
    ? `Configured for ${savedLead.name}${savedLead.company ? ` · ${savedLead.company}` : ""}`
    : "Finds and scores leads that match your niche";

  return (
    <StepShell
      eyebrow={RUN_STEP_EYEBROW}
      title={RUN_STEP_TITLE}
      sub={RUN_STEP_SUB}
    >
      <div className="p-[22px] border border-[var(--border)] rounded-[var(--r-lg)] bg-white">
        <div className="flex items-center gap-[13px] mb-4">
          <span className="w-[44px] h-[44px] rounded-[var(--r-md)] bg-[var(--indigo-50)] text-[var(--indigo-600)] inline-flex items-center justify-center shrink-0">
            <Icon name="radar" size={22} />
          </span>
          <div>
            <div className="text-[15px] font-[650]">Lead Scout</div>
            <div className="text-[13px] text-[var(--text-muted)]">
              {leadLabel}
            </div>
          </div>
        </div>

        <div className="text-[12.5px] text-[var(--text-subtle)] mb-[18px] px-3 py-[10px] bg-[var(--bg-subtle)] rounded-[var(--r-md)]">
          {RUN_STEP_DISCLAIMER}
        </div>

        <Button
          variant="primary"
          size="lg"
          full
          icon={running ? undefined : "radar"}
          iconRight={running ? undefined : "arrowRight"}
          onClick={onRun}
          disabled={running}
        >
          {running ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-[15px] h-[15px] border-2 border-white/40 border-t-white rounded-full inline-block animate-[ad-spin_.7s_linear_infinite]" />
              Running Lead Scout…
            </span>
          ) : (
            "Run Lead Scout"
          )}
        </Button>
      </div>
    </StepShell>
  );
}
