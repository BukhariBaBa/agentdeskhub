import { ROUTES } from "@/lib/constants";
import type { NavItem } from "./Sidebar.types";

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    href: ROUTES.DASHBOARD,
  },
  { id: "clients", label: "Clients", icon: "clients", href: ROUTES.CLIENTS },
  {
    id: "proposals",
    label: "Proposals",
    icon: "proposals",
    href: ROUTES.PROPOSALS,
  },
  {
    id: "projects",
    label: "Projects",
    icon: "projects",
    href: ROUTES.PROJECTS,
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: "invoices",
    href: ROUTES.INVOICES,
  },
  { id: "agents", label: "Agents", icon: "agents", href: ROUTES.AGENTS },
  {
    id: "integrations",
    label: "Integrations",
    icon: "puzzle",
    href: ROUTES.INTEGRATIONS,
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    href: ROUTES.SETTINGS,
  },
];

export const PLAN_BADGE_CLASS =
  "text-[10.5px] font-[650] px-[7px] py-[2px] rounded-full bg-[rgba(99,102,241,0.18)] text-[var(--indigo-200)]";

export const USAGE_BAR_TINT = (pct: number) => {
  if (pct >= 95) return "bg-[var(--rose-500)]";
  if (pct >= 80) return "bg-[var(--amber-500)]";
  return "bg-[var(--indigo-500)]";
};
