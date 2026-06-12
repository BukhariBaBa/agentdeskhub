import type { IconName } from "../Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "dangerSolid";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};
