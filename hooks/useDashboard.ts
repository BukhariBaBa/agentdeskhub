import { useMemo } from "react";
import {
  MOCK_CLIENTS,
  MOCK_PROPOSALS,
  MOCK_PROJECTS,
  MOCK_INVOICES,
  MOCK_APPROVALS,
  MOCK_ACTIVITY,
  MOCK_WORKSPACE,
  MOCK_USAGE,
  MOCK_COMPLETIONS,
} from "@/lib/mock";
import { money } from "@/lib/utils";
import {
  CLIENT_STATUS,
  PROPOSAL_STATUS,
  PROJECT_STATUS,
  INVOICE_STATUS,
} from "@/lib/constants";

export function useDashboard() {
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  }, []);

  const firstName = useMemo(() => MOCK_WORKSPACE.freelancer.split(" ")[0], []);

  const activeClients = useMemo(
    () => MOCK_CLIENTS.filter((c) => c.status === CLIENT_STATUS.ACTIVE).length,
    [],
  );

  const leadCount = useMemo(
    () => MOCK_CLIENTS.filter((c) => c.status === CLIENT_STATUS.LEAD).length,
    [],
  );

  const openProposals = useMemo(
    () =>
      MOCK_PROPOSALS.filter(
        (p) =>
          p.status === PROPOSAL_STATUS.SENT ||
          p.status === PROPOSAL_STATUS.DRAFT,
      ).length,
    [],
  );

  const openProposalValue = useMemo(
    () =>
      MOCK_PROPOSALS.filter((p) => p.status === PROPOSAL_STATUS.SENT).reduce(
        (s, p) => s + p.amount,
        0,
      ),
    [],
  );

  const activeProjects = useMemo(
    () =>
      MOCK_PROJECTS.filter((p) => p.status === PROJECT_STATUS.ACTIVE).length,
    [],
  );

  const pausedProjects = useMemo(
    () =>
      MOCK_PROJECTS.filter((p) => p.status === PROJECT_STATUS.PAUSED).length,
    [],
  );

  const revenue = useMemo(
    () =>
      MOCK_INVOICES.filter((i) => i.status === INVOICE_STATUS.PAID).reduce(
        (s, i) => s + i.amount,
        0,
      ) + 6250,
    [],
  );

  const hoursThisWeek = useMemo(
    () =>
      MOCK_PROJECTS.reduce(
        (s, p) => s + (p.timeLogs ?? []).reduce((t, l) => t + l.hours, 0),
        0,
      ),
    [],
  );

  const billableHours = useMemo(
    () =>
      MOCK_PROJECTS.reduce(
        (s, p) =>
          s +
          (p.timeLogs ?? [])
            .filter((l) => l.billable)
            .reduce((t, l) => t + l.hours, 0),
        0,
      ),
    [],
  );

  const metrics = useMemo(
    () => [
      {
        label: "Active Clients",
        value: activeClients,
        sub: `${leadCount} new leads`,
        icon: "clients",
        tint: "indigo" as const,
      },
      {
        label: "Open Proposals",
        value: openProposals,
        sub: `${money(openProposalValue)} in play`,
        icon: "proposals",
        tint: "amber" as const,
      },
      {
        label: "Active Projects",
        value: activeProjects,
        sub: `${pausedProjects} paused`,
        icon: "projects",
        tint: "emerald" as const,
      },
      {
        label: "Revenue This Month",
        value: money(revenue),
        sub: "vs. last month",
        icon: "dollar",
        tint: "indigo" as const,
        trend: 18,
      },
      {
        label: "Hours This Week",
        value: hoursThisWeek,
        sub: `${billableHours} billable`,
        icon: "clock",
        tint: "emerald" as const,
      },
    ],
    [
      activeClients,
      leadCount,
      openProposals,
      openProposalValue,
      activeProjects,
      pausedProjects,
      revenue,
      hoursThisWeek,
      billableHours,
    ],
  );

  return {
    greeting,
    firstName,
    metrics,
    approvals: MOCK_APPROVALS,
    activity: MOCK_ACTIVITY,
    completions: MOCK_COMPLETIONS,
    workspace: MOCK_WORKSPACE,
    usage: MOCK_USAGE,
  };
}
