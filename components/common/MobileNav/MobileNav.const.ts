import { ROUTES } from "@/lib/constants";

export type MobileNavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
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
    id: "invoices",
    label: "Invoices",
    icon: "invoices",
    href: ROUTES.INVOICES,
  },
  { id: "agents", label: "Agents", icon: "agents", href: ROUTES.AGENTS },
];
