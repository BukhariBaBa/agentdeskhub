"use client";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/common/Icon";
import { StatusBadge } from "@/components/common/StatusBadge";
import { STEP_STATUS } from "@/lib/mock/completions";
import type { MockCompletionStep } from "@/lib/mock/completions";
import type { CompletionCardProps } from "./CompletionCard.types";
import { STEP_ACTION_LABEL } from "./CompletionCard.const";

function StepAction({ step }: { step: MockCompletionStep }) {
  if (step.status === STEP_STATUS.DONE) {
    return (
      <span className="inline-flex items-center gap-[5px] text-[12px] font-[550] text-[var(--emerald-600)]">
        <Icon name="checkCircle" size={13} />
        Done
      </span>
    );
  }

  if (step.status === STEP_STATUS.REVIEW) {
    return (
      <div className="inline-flex items-center gap-[8px]">
        <StatusBadge status="Ready" />
        <button
          onClick={() => {}}
          className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-[var(--r-md)] border border-[var(--indigo-200)] bg-[var(--indigo-50)] text-[var(--indigo-700)] text-[12px] font-[600] cursor-pointer hover:bg-[var(--indigo-100)] transition-colors"
        >
          Review
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {}}
      className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-[var(--r-md)] border border-[var(--border)] bg-white text-[var(--text)] text-[12px] font-[600] cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors"
    >
      <Icon name="sparkle" size={12} />
      {STEP_ACTION_LABEL[step.key]}
    </button>
  );
}

export function CompletionCard({ completion }: CompletionCardProps) {
  const done = completion.steps.filter(
    (s) => s.status === STEP_STATUS.DONE,
  ).length;
  const total = completion.steps.length;

  return (
    <div className="border border-[var(--emerald-100)] rounded-[var(--r-lg)] overflow-hidden bg-white mb-[22px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-[18px] py-[15px] bg-[var(--emerald-50)] border-b border-[var(--emerald-100)]">
        <span className="text-xl leading-none">🎉</span>
        <div className="flex-1 min-w-0">
          <div className="text-[14.5px] font-[650] tracking-[-0.01em] text-[var(--emerald-700)] truncate">
            Project complete — {completion.client}
          </div>
          <div className="text-[12.5px] text-[var(--emerald-600)] mt-[2px]">
            {done} of {total} follow-ups done · zero manual work
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="px-[18px]">
        {completion.steps.map((step, i) => (
          <div
            key={step.key}
            className={cn(
              "flex items-center gap-3 py-[11px]",
              i < completion.steps.length - 1 &&
                "border-b border-[var(--border)]",
            )}
          >
            {/* Step icon */}
            <span
              className={cn(
                "w-7 h-7 rounded-[var(--r-md)] shrink-0 inline-flex items-center justify-center",
                step.status === STEP_STATUS.DONE
                  ? "bg-[var(--emerald-50)] text-[var(--emerald-600)]"
                  : "bg-[var(--bg-muted)] text-[var(--text-muted)]",
              )}
            >
              <Icon
                name={
                  step.status === STEP_STATUS.DONE ? "checkCircle" : step.icon
                }
                size={15}
              />
            </span>

            {/* Label */}
            <span
              className={cn(
                "flex-1 text-[13.5px] font-[500]",
                step.status === STEP_STATUS.DONE
                  ? "text-[var(--text-muted)]"
                  : "text-[var(--text)]",
              )}
            >
              {step.label}
            </span>

            {/* Action */}
            <StepAction step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}
