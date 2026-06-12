import { Icon } from "../Icon";
import type { SelectProps } from "./Select.types";
import { SELECT_CLASS } from "./Select.const";

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={SELECT_CLASS}
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
        className="absolute right-[11px] top-1/2 -translate-y-1/2 text-[var(--zinc-400)] pointer-events-none"
      />
    </div>
  );
}
