import { cn } from "@/lib/cn";
import type { StatusBadgeProps } from "./StatusBadge.types";
import {
  BADGE_TINT_CLASSES,
  DOT_TINT_CLASSES,
  STATUS_TINT_MAP,
} from "./StatusBadge.const";

export function StatusBadge({ status, dot = true }: StatusBadgeProps) {
  const tint = STATUS_TINT_MAP[status] ?? "zinc";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] px-[8px] py-[3px] rounded-full border text-[12px] font-[550] whitespace-nowrap",
        BADGE_TINT_CLASSES[tint],
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-[6px] h-[6px] rounded-full shrink-0",
            DOT_TINT_CLASSES[tint],
          )}
        />
      )}
      {status}
    </span>
  );
}
