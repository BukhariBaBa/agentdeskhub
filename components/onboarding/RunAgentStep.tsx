import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import type { RunAgentStepProps } from "./RunAgentStep.types";
import {
  RUN_STEP_EYEBROW,
  RUN_STEP_TITLE,
  RUN_STEP_SUB,
  RUN_STEP_DISCLAIMER,
} from "./RunAgentStep.const";

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
      <div
        style={{
          padding: 22,
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--r-md)",
              background: "var(--indigo-50)",
              color: "var(--indigo-600)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="radar" size={22} />
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 650 }}>Lead Scout</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {leadLabel}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: "var(--text-subtle)",
            marginBottom: 18,
            padding: "10px 12px",
            background: "var(--bg-subtle)",
            borderRadius: "var(--r-md)",
          }}
        >
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
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  width: 15,
                  height: 15,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: 99,
                  display: "inline-block",
                  animation: "ad-spin .7s linear infinite",
                }}
              />
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
