"use client";
import { cn } from "@/lib/cn";
import { Icon } from "../Icon";
import type { RedFlagRowProps } from "./RedFlagRow.types";
import {
  RED_FLAG_CHECKBOX_BASE_CLASS,
  RED_FLAG_CHECKBOX_OFF_CLASS,
  RED_FLAG_CHECKBOX_ON_CLASS,
  RED_FLAG_ROW_BASE_CLASS,
  RED_FLAG_ROW_OFF_CLASS,
  RED_FLAG_ROW_ON_CLASS,
} from "./RedFlagRow.const";

export function RedFlagRow({ flag, onToggle }: RedFlagRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        RED_FLAG_ROW_BASE_CLASS,
        flag.on ? RED_FLAG_ROW_ON_CLASS : RED_FLAG_ROW_OFF_CLASS,
      )}
    >
      <span
        className={cn(
          RED_FLAG_CHECKBOX_BASE_CLASS,
          flag.on ? RED_FLAG_CHECKBOX_ON_CLASS : RED_FLAG_CHECKBOX_OFF_CLASS,
        )}
      >
        {flag.on && (
          <Icon name="check" size={12} strokeWidth={3} className="text-white" />
        )}
      </span>
      <span
        className={cn(
          "text-[13px]",
          flag.on
            ? "text-[var(--rose-700)] font-[550]"
            : "text-[var(--text-muted)] font-[450]",
        )}
      >
        {flag.label}
      </span>
    </button>
  );
}
