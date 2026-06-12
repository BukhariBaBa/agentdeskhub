export type MockApproval = {
  id: string;
  agentId: string;
  agent: string;
  icon: string;
  tint: "indigo" | "emerald" | "amber" | "rose" | "zinc";
  title: string;
  time: string;
  summary: string;
};

export type MockActivity = {
  id: string;
  icon: string;
  text: string;
  meta?: string;
  time: string;
  tint: "indigo" | "emerald" | "amber" | "rose" | "zinc";
};

export const MOCK_APPROVALS: MockApproval[] = [
  {
    id: "ap1",
    agentId: "proposal",
    agent: "Proposal Agent",
    icon: "penTool",
    tint: "indigo",
    title: "Drafted 3-tier proposal — Foxtail Ventures",
    time: "8 min ago",
    summary: "3-tier proposal ready to review for Foxtail Ventures.",
  },
  {
    id: "ap2",
    agentId: "lead-scout",
    agent: "Lead Scout",
    icon: "radar",
    tint: "indigo",
    title: "Found 3 leads, scored & ready to reach out",
    time: "1 hour ago",
    summary: "3 leads matched your niche, each scored with a drafted outreach.",
  },
  {
    id: "ap3",
    agentId: "finance",
    agent: "Finance Agent",
    icon: "receipt",
    tint: "emerald",
    title: "Drafted invoice INV-005 from time logs — Northwind",
    time: "3 hours ago",
    summary: "Invoice built from 20 logged hours on the Northwind audit.",
  },
];

export const MOCK_ACTIVITY: MockActivity[] = [
  {
    id: "a0",
    icon: "calendar",
    text: "Meeting booked via Calendly",
    meta: "Foxtail Ventures — Jun 5 at 3:00pm",
    time: "40 min ago",
    tint: "indigo",
  },
  {
    id: "a1",
    icon: "radar",
    text: "Lead Scout scored 3 new leads",
    meta: "Sage & Stone (88), Foxtail (79), Maple & Co (64)",
    time: "1 hour ago",
    tint: "indigo",
  },
  {
    id: "a2",
    icon: "penTool",
    text: "Proposal Agent drafted a 3-tier proposal",
    meta: "Foxtail Ventures — Pitch Deck",
    time: "8 min ago",
    tint: "indigo",
  },
  {
    id: "a3",
    icon: "alert",
    text: "Invoice INV-003 is now overdue",
    meta: "Harbor Wellness — 15 days",
    time: "Today",
    tint: "rose",
  },
  {
    id: "a4",
    icon: "checkCircle",
    text: "Proposal accepted by client",
    meta: "Lumen Coffee — $12,500",
    time: "May 15",
    tint: "emerald",
  },
  {
    id: "a5",
    icon: "listChecks",
    text: "Milestone completed",
    meta: "Lumen Coffee — Brand identity & guide",
    time: "May 30",
    tint: "emerald",
  },
];
