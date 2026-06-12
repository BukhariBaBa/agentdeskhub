export type ActivityTint = "indigo" | "emerald" | "amber" | "rose" | "zinc";

export type ActivityRowProps = {
  icon: string;
  text: string;
  meta?: string;
  time: string;
  tint: ActivityTint;
  isLast?: boolean;
};
