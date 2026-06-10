"use client";
import { useState } from "react";
import { Icon } from "../Icon";
import type { ButtonProps } from "./Button.types";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.const";

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  onClick,
  disabled = false,
  full = false,
  type = "button",
  style = {},
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const s = BUTTON_SIZES[size];
  const v = BUTTON_VARIANTS[variant];
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        padding: s.padding,
        minHeight: s.h,
        fontSize: s.fontSize,
        fontWeight: 550,
        borderRadius: "var(--r-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
        transition: "background .12s, border-color .12s, opacity .12s",
        opacity: disabled ? 0.5 : 1,
        background: hover ? v.hoverBg : v.bg,
        color: v.color,
        border: hover ? v.hoverBorder : v.border,
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={iconSize} strokeWidth={2} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} strokeWidth={2} />}
    </button>
  );
}
