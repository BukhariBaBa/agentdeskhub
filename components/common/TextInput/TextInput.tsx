import { cn } from "@/lib/cn";
import type { TextInputProps } from "./TextInput.types";
import { TEXT_INPUT_BASE_CLASS } from "./TextInput.const";

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
  mono = false,
  disabled = false,
}: TextInputProps) {
  return (
    <div
      className={cn(
        "flex items-center border border-[var(--border-strong)] rounded-[var(--r-md)] overflow-hidden",
        disabled ? "bg-[var(--bg-subtle)]" : "bg-white",
      )}
    >
      {prefix && (
        <span className="pl-3 text-[var(--text-subtle)] text-[13.5px]">
          {prefix}
        </span>
      )}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          TEXT_INPUT_BASE_CLASS,
          mono && "font-[var(--mono)]",
          disabled ? "cursor-not-allowed" : "cursor-text",
        )}
      />
      {suffix && (
        <span className="pr-3 text-[var(--text-subtle)] text-[13px]">
          {suffix}
        </span>
      )}
    </div>
  );
}
