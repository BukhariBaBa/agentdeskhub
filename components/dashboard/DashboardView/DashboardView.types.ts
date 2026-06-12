import type { MockApproval, MockActivity, MockCompletion } from "@/lib/mock";

export type DashboardMetric = {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  tint: "indigo" | "emerald" | "amber" | "rose" | "zinc";
  trend?: number;
};

export type DashboardViewProps = {
  greeting: string;
  firstName: string;
  metrics: DashboardMetric[];
  approvals: MockApproval[];
  activity: MockActivity[];
  completions: MockCompletion[];
};
