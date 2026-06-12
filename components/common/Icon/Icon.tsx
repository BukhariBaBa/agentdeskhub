import { cn } from "@/lib/cn";
import type { IconProps, LogoProps } from "./Icon.types";
import { ICON_PATHS } from "./Icon.const";

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
  className = "",
}: IconProps) {
  const path = ICON_PATHS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

export function Logo({ size = 26 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect
        x={2}
        y={2}
        width={28}
        height={28}
        rx={8}
        fill="var(--indigo-600)"
      />
      <path
        d="M10 21V13l6-3.5 6 3.5v8"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={16} cy={16} r={2.2} fill="#fff" />
    </svg>
  );
}
