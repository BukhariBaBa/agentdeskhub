"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { DashboardView } from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  const { greeting, firstName, metrics, approvals, activity, completions } =
    useDashboard();

  return (
    <DashboardView
      greeting={greeting}
      firstName={firstName}
      metrics={metrics}
      approvals={approvals}
      activity={activity}
      completions={completions}
    />
  );
}
