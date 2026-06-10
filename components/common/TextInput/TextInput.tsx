import type { TextInputProps } from "./TextInput.types";
import { TEXT_INPUT_BASE_STYLE } from "./TextInput.const";

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
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        background: disabled ? "var(--bg-subtle)" : "#fff",
        overflow: "hidden",
      }}
    >
      {prefix && (
        <span
          style={{
            padding: "0 0 0 12px",
            color: "var(--text-subtle)",
            fontSize: 13.5,
          }}
        >
          {prefix}
        </span>
      )}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...TEXT_INPUT_BASE_STYLE,
          fontFamily: mono ? "var(--mono)" : "inherit",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {suffix && (
        <span
          style={{
            padding: "0 12px 0 0",
            color: "var(--text-subtle)",
            fontSize: 13,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
