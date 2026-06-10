"use client";
import { Icon } from "../Icon";
import type { RedFlagRowProps } from "./RedFlagRow.types";
import { RED_FLAG_ROW_BASE } from "./RedFlagRow.const";

export function RedFlagRow({ flag, onToggle }: RedFlagRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        ...RED_FLAG_ROW_BASE,
        background: flag.on ? "var(--rose-50)" : "#fff",
        border: `1px solid ${flag.on ? "var(--rose-100)" : "var(--border)"}`,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: flag.on ? "var(--rose-500)" : "#fff",
          border: `1px solid ${flag.on ? "var(--rose-500)" : "var(--border-strong)"}`,
        }}
      >
        {flag.on && (
          <Icon
            name="check"
            size={12}
            strokeWidth={3}
            style={{ color: "#fff" }}
          />
        )}
      </span>
      <span
        style={{
          fontSize: 13,
          color: flag.on ? "var(--rose-700)" : "var(--text-muted)",
          fontWeight: flag.on ? 550 : 450,
        }}
      >
        {flag.label}
      </span>
    </button>
  );
}
