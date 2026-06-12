"use client";
import { cn } from "@/lib/cn";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Logo } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { WorkspaceStep } from "./WorkspaceStep";
import { AIProfileStep } from "./AIProfileStep";
import { LeadStep } from "./LeadStep";
import { RunAgentStep } from "./RunAgentStep";
import { PortalStep } from "./PortalStep";
import { DoneScreen } from "./DoneScreen";
import { ONBOARDING_STEPS, ONBOARDING_STEP_ID } from "@/lib/constants";
import { STEP_INDEX } from "./OnboardingWizard.const";

export function OnboardingWizard() {
  const ob = useOnboarding();

  if (ob.isDone) {
    return <DoneScreen onFinish={ob.finish} />;
  }

  const renderStep = () => {
    switch (ob.currentStepId) {
      case ONBOARDING_STEP_ID.WORKSPACE:
        return <WorkspaceStep wsName={ob.wsName} onChangeName={ob.setWsName} />;
      case ONBOARDING_STEP_ID.AI:
        return (
          <AIProfileStep
            aiProfile={ob.aiProfile}
            onChangeAi={ob.updateAiProfile}
            onChangeSkill={ob.updateAiSkill}
          />
        );
      case ONBOARDING_STEP_ID.LEAD:
        return <LeadStep lead={ob.lead} onChangeLead={ob.updateLead} />;
      case ONBOARDING_STEP_ID.RUN:
        return (
          <RunAgentStep
            savedLead={ob.savedLead}
            running={ob.agentRunning}
            onRun={ob.runAgent}
          />
        );
      case ONBOARDING_STEP_ID.PORTAL:
        return (
          <PortalStep
            portalClient={ob.portalClient}
            portalUrl={ob.portalUrl}
            copied={ob.copied}
            onCopy={ob.copyPortal}
          />
        );
      default:
        return null;
    }
  };

  const renderFooterPrimary = () => {
    switch (ob.currentStepId) {
      case ONBOARDING_STEP_ID.WORKSPACE:
        return (
          <Button
            variant="primary"
            iconRight="arrowRight"
            onClick={ob.next}
            disabled={!ob.canContinueWorkspace}
          >
            Continue
          </Button>
        );
      case ONBOARDING_STEP_ID.AI:
        return (
          <Button variant="primary" iconRight="arrowRight" onClick={ob.next}>
            Continue
          </Button>
        );
      case ONBOARDING_STEP_ID.LEAD:
        return (
          <Button
            variant="primary"
            iconRight="arrowRight"
            onClick={ob.saveLead}
            disabled={!ob.canSaveLead}
          >
            Save & continue
          </Button>
        );
      case ONBOARDING_STEP_ID.RUN:
        return null;
      case ONBOARDING_STEP_ID.PORTAL:
        return (
          <Button
            variant="primary"
            iconRight="arrowRight"
            onClick={() => ob.setIsDone(true)}
          >
            Finish setup
          </Button>
        );
      default:
        return null;
    }
  };

  const isLastStep = ob.step === ONBOARDING_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[400] bg-[var(--bg-subtle)] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 pt-5 px-7 max-w-[960px] w-full mx-auto box-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-[9px]">
            <Logo size={26} />
            <span className="font-[650] text-[15px] tracking-[-0.02em] text-[var(--text)]">
              AgentDesk
            </span>
          </div>
          <button
            onClick={ob.finish}
            className="bg-transparent border-none text-[var(--text-subtle)] text-[12.5px] font-medium cursor-pointer"
          >
            Skip setup
          </button>
        </div>

        {/* Progress bar segments */}
        <div className="flex gap-[6px]">
          {ONBOARDING_STEPS.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "flex-1 h-[4px] rounded-full transition-[background] duration-300",
                i <= ob.step
                  ? "bg-[var(--indigo-600)]"
                  : "bg-[var(--zinc-200)]",
              )}
            />
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {ONBOARDING_STEPS.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "text-[11px] flex-1",
                i === 0
                  ? "text-left"
                  : i === ONBOARDING_STEPS.length - 1
                    ? "text-right"
                    : "text-center",
                i === ob.step
                  ? "font-[650] text-[var(--indigo-600)]"
                  : i < ob.step
                    ? "font-medium text-[var(--text-muted)]"
                    : "font-medium text-[var(--text-subtle)]",
              )}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scrollable step body */}
      <div className="flex-1 overflow-y-auto pt-10 px-7 pb-7 w-full">
        {renderStep()}
      </div>

      {/* Footer nav */}
      <div className="shrink-0 border-t border-[var(--border)] bg-white px-7 py-[14px]">
        <div className="max-w-[720px] mx-auto flex items-center justify-between gap-3">
          {ob.step > STEP_INDEX.WORKSPACE ? (
            <Button variant="ghost" icon="chevronLeft" onClick={ob.back}>
              Back
            </Button>
          ) : (
            <span />
          )}

          <div className="flex gap-2">
            {ob.canSkip && (
              <Button
                variant="ghost"
                onClick={isLastStep ? () => ob.setIsDone(true) : ob.next}
              >
                Skip
              </Button>
            )}
            {renderFooterPrimary()}
          </div>
        </div>
      </div>
    </div>
  );
}
