export type MetricTint = "indigo" | "emerald" | "amber" | "rose" | "zinc";

export type MetricCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  tint: MetricTint;
  trend?: number;
};
