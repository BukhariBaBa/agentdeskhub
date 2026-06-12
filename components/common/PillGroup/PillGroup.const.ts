import type { PillTint } from "./PillGroup.types";

export const PILL_BASE_CLASS =
  "inline-flex items-center gap-[6px] px-3 py-[6px] rounded-full text-[12.5px] font-[550] cursor-pointer transition-all duration-[120ms] border";

export const PILL_ON_CLASSES: Record<PillTint, string> = {
  indigo:
    "bg-[var(--indigo-50)] text-[var(--indigo-700)] border-[var(--indigo-100)]",
  emerald:
    "bg-[var(--emerald-50)] text-[var(--emerald-700)] border-[var(--emerald-100)]",
  amber:
    "bg-[var(--amber-50)] text-[var(--amber-700)] border-[var(--amber-100)]",
  rose: "bg-[var(--rose-50)] text-[var(--rose-700)] border-[var(--rose-100)]",
  zinc: "bg-[var(--zinc-100)] text-[var(--zinc-600)] border-[var(--zinc-200)]",
};

export const PILL_OFF_CLASS =
  "bg-white text-[var(--text-muted)] border-[var(--border-strong)]";
