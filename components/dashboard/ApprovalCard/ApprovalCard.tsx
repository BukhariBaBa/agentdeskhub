import { Icon } from "@/components/common/Icon";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { IconName } from "@/components/common/Icon";
import type { ApprovalCardProps, ApprovalTint } from "./ApprovalCard.types";

const ICON_TINT_CLASSES: Record<ApprovalTint, string> = {
  indigo: "bg-[var(--indigo-50)] text-[var(--indigo-700)]",
  emerald: "bg-[var(--emerald-50)] text-[var(--emerald-700)]",
  amber: "bg-[var(--amber-50)] text-[var(--amber-700)]",
  rose: "bg-[var(--rose-50)] text-[var(--rose-700)]",
  zinc: "bg-[var(--zinc-100)] text-[var(--zinc-600)]",
};

export function ApprovalCard({
  id,
  agent,
  icon,
  tint,
  time,
  summary,
  onOpen,
}: ApprovalCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(id)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(id)}
      className="flex items-center gap-[14px] px-[18px] py-[15px] bg-white border border-[var(--border)] rounded-[var(--r-lg)] cursor-pointer hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] duration-[120ms]"
    >
      <span
        className={`w-10 h-10 rounded-[var(--r-md)] inline-flex items-center justify-center shrink-0 ${ICON_TINT_CLASSES[tint]}`}
      >
        <Icon name={icon as IconName} size={20} strokeWidth={1.9} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-[2px]">
          <span className="text-[13.5px] font-[600] text-[var(--text)]">
            {agent}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[var(--zinc-300)] shrink-0" />
          <span className="text-[12px] text-[var(--text-subtle)]">{time}</span>
        </div>
        <div className="text-[13px] text-[var(--text-muted)] overflow-hidden text-ellipsis whitespace-nowrap">
          {summary}
        </div>
      </div>

      <StatusBadge status="Needs review" dot={false} />
      <Icon
        name="chevronRight"
        size={18}
        className="text-[var(--zinc-300)] shrink-0"
      />
    </div>
  );
}
