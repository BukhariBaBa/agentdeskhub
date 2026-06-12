import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import type { PortalStepProps } from "./PortalStep.types";
import {
  PORTAL_STEP_EYEBROW,
  PORTAL_STEP_TITLE,
  PORTAL_FEATURES,
} from "./PortalStep.const";
import { StepShell } from "./StepShell";

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
      <div className="border border-[var(--border)] rounded-[var(--r-lg)] bg-white overflow-hidden">
        <div className="flex items-center gap-3 px-[18px] py-4 border-b border-[var(--border)]">
          <span className="w-[40px] h-[40px] rounded-[var(--r-md)] bg-[var(--indigo-600)] text-white inline-flex items-center justify-center shrink-0 font-bold text-[15px]">
            {clientInitials}
          </span>
          <div className="min-w-0">
            <div className="text-[14px] font-[650]">{portalClient.name}</div>
            <div className="text-[12.5px] text-[var(--text-muted)]">
              {portalClient.company}
            </div>
          </div>
        </div>

        <div className="p-[18px]">
          <label className="block text-[12.5px] font-semibold text-[var(--text)] mb-[7px]">
            Portal link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center px-3 py-[9px] border border-[var(--border-strong)] rounded-[var(--r-md)] bg-[var(--bg-subtle)] font-[var(--mono)] text-[12.5px] text-[var(--text-muted)] overflow-hidden whitespace-nowrap text-ellipsis">
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

          <div className="flex gap-4 mt-4">
            {PORTAL_FEATURES.map((t) => (
              <div
                key={t}
                className="flex items-center gap-[6px] text-[12px] text-[var(--text-muted)]"
              >
                <Icon
                  name="check"
                  size={13}
                  strokeWidth={2.4}
                  className="text-[var(--emerald-500)]"
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
