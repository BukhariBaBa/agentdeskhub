"use client";
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        background: "var(--bg-subtle)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          flexShrink: 0,
          padding: "20px 28px 0",
          maxWidth: 960,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Logo size={26} />
            <span
              style={{
                fontWeight: 650,
                fontSize: 15,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              AgentDesk
            </span>
          </div>
          <button
            onClick={ob.finish}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-subtle)",
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Skip setup
          </button>
        </div>

        {/* Progress bar segments */}
        <div style={{ display: "flex", gap: 6 }}>
          {ONBOARDING_STEPS.map((s, i) => (
            <div
              key={s.id}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 99,
                background:
                  i <= ob.step ? "var(--indigo-600)" : "var(--zinc-200)",
                transition: "background .3s",
              }}
            />
          ))}
        </div>

        {/* Step labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          {ONBOARDING_STEPS.map((s, i) => (
            <span
              key={s.id}
              style={{
                fontSize: 11,
                fontWeight: i === ob.step ? 650 : 500,
                color:
                  i === ob.step
                    ? "var(--indigo-600)"
                    : i < ob.step
                      ? "var(--text-muted)"
                      : "var(--text-subtle)",
                flex: 1,
                textAlign:
                  i === 0
                    ? "left"
                    : i === ONBOARDING_STEPS.length - 1
                      ? "right"
                      : "center",
              }}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scrollable step body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 28px 28px",
          width: "100%",
        }}
      >
        {renderStep()}
      </div>

      {/* Footer nav */}
      <div
        style={{
          flexShrink: 0,
          borderTop: "1px solid var(--border)",
          background: "#fff",
          padding: "14px 28px",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {ob.step > STEP_INDEX.WORKSPACE ? (
            <Button variant="ghost" icon="chevronLeft" onClick={ob.back}>
              Back
            </Button>
          ) : (
            <span />
          )}

          <div style={{ display: "flex", gap: 8 }}>
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
