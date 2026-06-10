import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import type { PortalStepProps } from "./PortalStep.types";
import {
  PORTAL_STEP_EYEBROW,
  PORTAL_STEP_TITLE,
  PORTAL_FEATURES,
} from "./PortalStep.const";

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

export function PortalStep({
  portalClient,
  portalUrl,
  copied,
  onCopy,
}: PortalStepProps) {
  const clientInitials = (portalClient.name || "C")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const sub = `Every client gets a branded portal to see proposals, approve work, and pay invoices — no logins, no chasing. Here's ${portalClient.name}'s.`;

  return (
    <StepShell
      eyebrow={PORTAL_STEP_EYEBROW}
      title={PORTAL_STEP_TITLE}
      sub={sub}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 18px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--r-md)",
              background: "var(--indigo-600)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {clientInitials}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 650 }}>
              {portalClient.name}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
              {portalClient.company}
            </div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <label
            style={{
              display: "block",
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: 7,
            }}
          >
            Portal link
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                padding: "9px 12px",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--r-md)",
                background: "var(--bg-subtle)",
                fontFamily: "var(--mono)",
                fontSize: 12.5,
                color: "var(--text-muted)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {portalUrl}
            </div>
            <Button
              variant={copied ? "secondary" : "primary"}
              icon={copied ? "check" : "copy"}
              onClick={onCopy}
            >
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {PORTAL_FEATURES.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                <Icon
                  name="check"
                  size={13}
                  strokeWidth={2.4}
                  style={{ color: "var(--emerald-500)" }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepShell>
  );
}
