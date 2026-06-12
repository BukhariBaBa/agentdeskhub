import { cn } from "@/lib/cn";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import type { ActivityRowProps, ActivityTint } from "./ActivityRow.types";

const ICON_TINT_CLASSES: Record<ActivityTint, string> = {
  indigo: "bg-[var(--indigo-50)] text-[var(--indigo-700)]",
  emerald: "bg-[var(--emerald-50)] text-[var(--emerald-700)]",
  amber: "bg-[var(--amber-50)] text-[var(--amber-700)]",
  rose: "bg-[var(--rose-50)] text-[var(--rose-700)]",
  zinc: "bg-[var(--zinc-100)] text-[var(--zinc-600)]",
};

export function ActivityRow({
  icon,
  text,
  meta,
  time,
  tint,
  isLast = false,
}: ActivityRowProps) {
  return (
    <div
      className={cn(
        "flex gap-3 py-[11px]",
        !isLast && "border-b border-[var(--border)]",
      )}
    >
      <span
        className={`w-7 h-7 rounded-full shrink-0 mt-[1px] inline-flex items-center justify-center ${ICON_TINT_CLASSES[tint]}`}
      >
        <Icon name={icon as IconName} size={14} strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-[var(--text)] font-[500]">{text}</div>
        {meta && (
          <div className="text-[12px] text-[var(--text-muted)] mt-[1px]">
            {meta}
          </div>
        )}
      </div>
      <span className="text-[11.5px] text-[var(--text-subtle)] whitespace-nowrap shrink-0">
        {time}
      </span>
    </div>
  );
}
