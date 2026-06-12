import type { ICON_PATHS } from "./Icon.const";

export type IconName = keyof typeof ICON_PATHS;

export type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export type LogoProps = {
  size?: number;
};
