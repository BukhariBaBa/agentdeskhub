import { cn } from "@/lib/cn";
import type { FieldLabelProps } from "./FieldLabel.types";
import { FIELD_LABEL_CLASS } from "./FieldLabel.const";

export function FieldLabel({ children, hint }: FieldLabelProps) {
  return (
    <label className={FIELD_LABEL_CLASS}>
      {children}
      {hint && (
        <span className={cn("font-normal text-[var(--text-subtle)] ml-[6px]")}>
          {hint}
        </span>
      )}
    </label>
  );
}
