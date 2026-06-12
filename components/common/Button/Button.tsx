"use client";
import { cn } from "@/lib/cn";
import { Icon } from "../Icon";
import type { ButtonProps } from "./Button.types";
import { BUTTON_SIZE_CLASSES, BUTTON_VARIANT_CLASSES } from "./Button.const";

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
  className,
}: ButtonProps) {
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap tracking-[-0.01em] font-[550] rounded-[var(--r-md)] cursor-pointer transition-[background,border-color,opacity] duration-[120ms] disabled:opacity-50 disabled:cursor-not-allowed",
        BUTTON_SIZE_CLASSES[size],
        BUTTON_VARIANT_CLASSES[variant],
        full && "w-full",
        className,
      )}
    >
      {icon && <Icon name={icon} size={iconSize} strokeWidth={2} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} strokeWidth={2} />}
    </button>
  );
}
