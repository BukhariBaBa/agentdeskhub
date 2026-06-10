import type { FieldLabelProps } from "./FieldLabel.types";
import { FIELD_LABEL_STYLE } from "./FieldLabel.const";

export function FieldLabel({ children, hint }: FieldLabelProps) {
  return (
    <label style={FIELD_LABEL_STYLE}>
      {children}
      {hint && (
        <span
          style={{
            fontWeight: 400,
            color: "var(--text-subtle)",
            marginLeft: 6,
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
