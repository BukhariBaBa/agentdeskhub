import type { ButtonSize, ButtonVariant } from "./Button.types";

export const BUTTON_SIZES: Record<
  ButtonSize,
  { padding: string; fontSize: number; gap: number; h: number }
> = {
  sm: { padding: "5px 10px", fontSize: 12.5, gap: 5, h: 28 },
  md: { padding: "7px 13px", fontSize: 13.5, gap: 6, h: 34 },
  lg: { padding: "10px 18px", fontSize: 14.5, gap: 7, h: 42 },
};

export const BUTTON_VARIANTS: Record<
  ButtonVariant,
  {
    bg: string;
    hoverBg: string;
    color: string;
    border: string;
    hoverBorder: string;
  }
> = {
  primary: {
    bg: "var(--primary)",
    hoverBg: "var(--primary-hover)",
    color: "#fff",
    border: "1px solid transparent",
    hoverBorder: "1px solid transparent",
  },
  secondary: {
    bg: "#fff",
    hoverBg: "var(--zinc-50)",
    color: "var(--zinc-800)",
    border: "1px solid var(--border-strong)",
    hoverBorder: "1px solid var(--border-strong)",
  },
  ghost: {
    bg: "transparent",
    hoverBg: "var(--zinc-100)",
    color: "var(--zinc-600)",
    border: "1px solid transparent",
    hoverBorder: "1px solid transparent",
  },
  danger: {
    bg: "transparent",
    hoverBg: "var(--rose-50)",
    color: "var(--rose-600)",
    border: "1px solid transparent",
    hoverBorder: "1px solid var(--rose-100)",
  },
  success: {
    bg: "var(--emerald-500)",
    hoverBg: "var(--emerald-600)",
    color: "#fff",
    border: "1px solid transparent",
    hoverBorder: "1px solid transparent",
  },
  dangerSolid: {
    bg: "var(--rose-500)",
    hoverBg: "var(--rose-600)",
    color: "#fff",
    border: "1px solid transparent",
    hoverBorder: "1px solid transparent",
  },
};
