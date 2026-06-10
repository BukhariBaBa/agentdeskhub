export type PillTint = "indigo" | "emerald" | "rose" | "amber" | "zinc";

export type PillGroupProps = {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  tint?: PillTint;
};
