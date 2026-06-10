"use client";
import { Icon } from "../Icon";
import { TINT } from "@/lib/constants";
import type { PillGroupProps } from "./PillGroup.types";
import { PILL_BASE_STYLE } from "./PillGroup.const";

export function PillGroup({
  options,
  value,
  onChange,
  tint = "indigo",
}: PillGroupProps) {
  const t = TINT[tint];

  const toggle = (option: string) => {
    onChange(
      value.includes(option)
        ? value.filter((x) => x !== option)
        : [...value, option],
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            style={{
              ...PILL_BASE_STYLE,
              background: on ? t.bg : "#fff",
              color: on ? t.fg : "var(--text-muted)",
              border: `1px solid ${on ? t.br : "var(--border-strong)"}`,
            }}
          >
            {on && <Icon name="check" size={13} strokeWidth={2.4} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}
