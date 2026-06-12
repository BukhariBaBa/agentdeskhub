export type MockTimeLog = {
  id: string;
  date: string;
  hours: number;
  desc: string;
  billable: boolean;
};

export type MockMilestone = {
  name: string;
  status: "complete" | "active" | "upcoming";
  date: string;
};

export type MockProject = {
  id: string;
  name: string;
  client: string;
  clientId: string;
  status: "Active" | "Paused" | "Complete";
  deadline: string;
  start: string;
  desc: string;
  rate?: number;
  weeklyUpdates?: boolean;
  weeklyDay?: string;
  timeLogs?: MockTimeLog[];
  milestones: MockMilestone[];
  files: string[];
};

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "pr1",
    name: "Lumen Coffee — Brand & Site",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    status: "Active",
    deadline: "Jun 30",
    start: "May 19",
    desc: "Full brand refresh and a 6-page website for the second-location launch.",
    rate: 150,
    weeklyUpdates: true,
    weeklyDay: "Friday",
    timeLogs: [
      {
        id: "tl1",
        date: "May 30",
        hours: 6,
        desc: "Brand guide finalisation",
        billable: true,
      },
      {
        id: "tl2",
        date: "May 28",
        hours: 5.5,
        desc: "Homepage hi-fi design",
        billable: true,
      },
      {
        id: "tl3",
        date: "May 26",
        hours: 4,
        desc: "Logo refinement rounds",
        billable: true,
      },
      {
        id: "tl4",
        date: "May 23",
        hours: 3,
        desc: "Kickoff & discovery call",
        billable: false,
      },
    ],
    milestones: [
      { name: "Discovery & moodboards", status: "complete", date: "May 23" },
      { name: "Brand identity & guide", status: "complete", date: "May 30" },
      { name: "Website design & build", status: "active", date: "Jun 20" },
      { name: "QA & launch", status: "upcoming", date: "Jun 30" },
    ],
    files: ["Lumen_Brand_Guide_v2.pdf", "Homepage_Final.fig", "Logo_Pack.zip"],
  },
  {
    id: "pr2",
    name: "Harbor Wellness — Rebrand",
    client: "Harbor Wellness",
    clientId: "c3",
    status: "Active",
    deadline: "Jul 15",
    start: "May 5",
    desc: "Identity rebrand and a reusable design system for the wellness platform.",
    rate: 150,
    weeklyUpdates: true,
    weeklyDay: "Monday",
    timeLogs: [
      {
        id: "tl5",
        date: "Jun 2",
        hours: 7,
        desc: "Identity direction explorations",
        billable: true,
      },
      {
        id: "tl6",
        date: "May 12",
        hours: 9,
        desc: "Brand audit & competitive review",
        billable: true,
      },
    ],
    milestones: [
      { name: "Brand audit", status: "complete", date: "May 12" },
      { name: "Identity directions", status: "active", date: "Jun 10" },
      { name: "Design system", status: "upcoming", date: "Jun 28" },
      { name: "Marketing site", status: "upcoming", date: "Jul 8" },
      { name: "Handoff", status: "upcoming", date: "Jul 15" },
    ],
    files: ["Brand_Audit.pdf"],
  },
  {
    id: "pr3",
    name: "Northwind — UI Refresh",
    client: "Northwind Apps",
    clientId: "c2",
    status: "Paused",
    deadline: "TBD",
    start: "Apr 2",
    desc: "Visual refresh of the core mobile app screens. Paused pending content.",
    milestones: [
      { name: "Audit & inventory", status: "complete", date: "Apr 9" },
      { name: "New component library", status: "upcoming", date: "TBD" },
      { name: "Screen redesigns", status: "upcoming", date: "TBD" },
    ],
    files: [],
  },
  {
    id: "pr4",
    name: "Cobalt Robotics — Website",
    client: "Cobalt Robotics",
    clientId: "c6",
    status: "Complete",
    deadline: "Mar 20",
    start: "Jan 15",
    desc: "Marketing website and pitch deck for Series A.",
    milestones: [
      { name: "Strategy", status: "complete", date: "Jan 28" },
      { name: "Design", status: "complete", date: "Feb 18" },
      { name: "Build", status: "complete", date: "Mar 10" },
      { name: "Launch", status: "complete", date: "Mar 20" },
      { name: "Handoff", status: "complete", date: "Mar 22" },
    ],
    files: ["Cobalt_Site_Handoff.pdf", "Pitch_Deck.pdf"],
  },
];
