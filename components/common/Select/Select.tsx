import { Icon } from "../Icon";
import type { SelectProps } from "./Select.types";
import { SELECT_STYLE } from "./Select.const";

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={SELECT_STYLE}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Icon
        name="chevronDown"
        size={15}
        style={{
          position: "absolute",
          right: 11,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--zinc-400)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
