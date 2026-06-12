import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import type { MetricCardProps, MetricTint } from "./MetricCard.types";

const ICON_BG: Record<MetricTint, string> = {
  indigo: "bg-[var(--indigo-50)] text-[var(--indigo-700)]",
  emerald: "bg-[var(--emerald-50)] text-[var(--emerald-700)]",
  amber: "bg-[var(--amber-50)] text-[var(--amber-700)]",
  rose: "bg-[var(--rose-50)] text-[var(--rose-700)]",
  zinc: "bg-[var(--zinc-100)] text-[var(--zinc-600)]",
};

export function MetricCard({
  label,
  value,
  sub,
  icon,
  tint,
  trend,
}: MetricCardProps) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-[var(--r-lg)] p-[18px]">
      <div className="flex items-center justify-between mb-[14px]">
        <span className="text-[12.5px] text-[var(--text-muted)] font-[550]">
          {label}
        </span>
        <span
          className={`w-[30px] h-[30px] rounded-[var(--r-md)] inline-flex items-center justify-center ${ICON_BG[tint]}`}
        >
          <Icon name={icon as IconName} size={16} strokeWidth={2} />
        </span>
      </div>
      <div className="text-[27px] font-[680] tracking-[-0.03em] text-[var(--text)] leading-none">
        {value}
      </div>
      {sub && (
        <div className="mt-[7px] text-[12px] text-[var(--text-muted)] flex items-center gap-[5px]">
          {trend !== undefined && (
            <span
              className={
                trend > 0
                  ? "text-[var(--emerald-600)] font-[600]"
                  : "text-[var(--rose-600)] font-[600]"
              }
            >
              {trend > 0 ? "↑ " : "↓ "}
              {Math.abs(trend)}%
            </span>
          )}
          {sub}
        </div>
      )}
    </div>
  );
}
