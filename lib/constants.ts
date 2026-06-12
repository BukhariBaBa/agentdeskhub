export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  CLIENTS: "/clients",
  PROPOSALS: "/proposals",
  PROJECTS: "/projects",
  INVOICES: "/invoices",
  AGENTS: "/agents",
  INTEGRATIONS: "/integrations",
  SETTINGS: "/settings",
} as const;

export const CLIENT_STATUS = {
  LEAD: "Lead",
  ACTIVE: "Active",
  PAST: "Past",
  LOST: "Lost",
} as const;

export const PROPOSAL_STATUS = {
  DRAFT: "Draft",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  EXPIRED: "Expired",
} as const;

export const PROJECT_STATUS = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  COMPLETE: "Complete",
} as const;

export const INVOICE_STATUS = {
  DRAFT: "Draft",
  SENT: "Sent",
  PAID: "Paid",
  OVERDUE: "Overdue",
} as const;

export const AGENT_STATUS = {
  PENDING: "pending",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  DONE: "done",
  FAILED: "failed",
} as const;

export const ONBOARDING_STEP_ID = {
  WORKSPACE: "workspace",
  AI: "ai",
  LEAD: "lead",
  RUN: "run",
  PORTAL: "portal",
} as const;

export const ONBOARDING_STEPS = [
  { id: ONBOARDING_STEP_ID.WORKSPACE, label: "Workspace" },
  { id: ONBOARDING_STEP_ID.AI, label: "AI Profile" },
  { id: ONBOARDING_STEP_ID.LEAD, label: "First lead" },
  { id: ONBOARDING_STEP_ID.RUN, label: "First run" },
  { id: ONBOARDING_STEP_ID.PORTAL, label: "Client portal" },
] as const;

export const PLATFORMS = [
  "Upwork",
  "LinkedIn",
  "Referral",
  "Cold inbound",
  "Website form",
  "Other",
] as const;

export const SKILLS = [
  "Design",
  "Web Development",
  "Mobile",
  "Copywriting",
  "Marketing",
  "Video & Animation",
  "Data & Analytics",
  "Business Consulting",
  "Other",
] as const;

export const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "Ecommerce",
  "Healthcare",
  "Real estate",
  "Startups",
  "Agencies",
  "Other",
] as const;

export const PROJECT_LENGTHS = [
  "One-time",
  "1–4 weeks",
  "1–3 months",
  "Ongoing retainer",
] as const;

export const PROJECT_SIZES = [
  "Small <$1K",
  "Medium $1–5K",
  "Large $5–20K",
  "Enterprise $20K+",
] as const;

export const SKILL_SPECS: Record<string, readonly string[]> = {
  Design: [
    "Figma",
    "Illustrator",
    "Photoshop",
    "Motion",
    "Webflow",
    "Framer",
    "Shopify",
    "3D / Blender",
    "After Effects",
  ],
  "Web Development": [
    "React",
    "Next.js",
    "Vue",
    "TypeScript",
    "Node.js",
    "Tailwind",
    "WordPress",
    "Shopify",
    "Laravel",
  ],
  Mobile: [
    "React Native",
    "Flutter",
    "iOS / Swift",
    "Android / Kotlin",
    "Expo",
  ],
  Copywriting: [
    "SEO",
    "Landing pages",
    "Email sequences",
    "UX writing",
    "Technical writing",
    "Ghostwriting",
  ],
  Marketing: [
    "Paid ads",
    "SEO",
    "Email marketing",
    "Content strategy",
    "Social media",
    "Analytics",
  ],
  "Video & Animation": [
    "After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
    "Motion graphics",
    "3D animation",
  ],
  "Data & Analytics": [
    "Python",
    "SQL",
    "Tableau",
    "Power BI",
    "Google Analytics",
    "dbt",
  ],
  "Business Consulting": [
    "Strategy",
    "Operations",
    "Finance",
    "Product",
    "Go-to-market",
  ],
  Other: [],
};

export const TINT = {
  indigo: {
    bg: "var(--indigo-50)",
    fg: "var(--indigo-700)",
    solid: "var(--indigo-600)",
    br: "var(--indigo-100)",
  },
  emerald: {
    bg: "var(--emerald-50)",
    fg: "var(--emerald-700)",
    solid: "var(--emerald-600)",
    br: "var(--emerald-100)",
  },
  amber: {
    bg: "var(--amber-50)",
    fg: "var(--amber-700)",
    solid: "var(--amber-600)",
    br: "var(--amber-100)",
  },
  rose: {
    bg: "var(--rose-50)",
    fg: "var(--rose-700)",
    solid: "var(--rose-600)",
    br: "var(--rose-100)",
  },
  zinc: {
    bg: "var(--zinc-100)",
    fg: "var(--zinc-600)",
    solid: "var(--zinc-500)",
    br: "var(--zinc-200)",
  },
} as const;

export const DEFAULT_RED_FLAGS = [
  { id: "ghost", label: "Clients who ghost after work is done", on: true },
  { id: "micro", label: "Micromanagers & hourly trackers", on: false },
  { id: "rush", label: "Rush jobs with no premium", on: true },
  { id: "revision", label: "Unlimited revision requests", on: true },
  { id: "small", label: "Projects under my minimum budget", on: false },
] as const;

export const ONBOARDING_STORED_KEY = "agentdesk_onboarded";
