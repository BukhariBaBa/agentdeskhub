import type { ButtonSize, ButtonVariant } from "./Button.types";

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-[10px] py-[5px] text-[12.5px] gap-[5px] min-h-[28px]",
  md: "px-[13px] py-[7px] text-[13.5px] gap-[6px] min-h-[34px]",
  lg: "px-[18px] py-[10px] text-[14.5px] gap-[7px] min-h-[42px]",
};

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white border border-transparent",
  secondary:
    "bg-white hover:bg-[var(--zinc-50)] text-[var(--zinc-800)] border border-[var(--border-strong)]",
  ghost:
    "bg-transparent hover:bg-[var(--zinc-100)] text-[var(--zinc-600)] border border-transparent",
  danger:
    "bg-transparent hover:bg-[var(--rose-50)] text-[var(--rose-600)] border border-transparent hover:border-[var(--rose-100)]",
  success:
    "bg-[var(--emerald-500)] hover:bg-[var(--emerald-600)] text-white border border-transparent",
  dangerSolid:
    "bg-[var(--rose-500)] hover:bg-[var(--rose-600)] text-white border border-transparent",
};
