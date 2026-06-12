export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export type SidebarProps = {
  used: number;
  limit: number;
  freelancer: string;
  initials: string;
  plan: string;
  pendingCount: number;
};
