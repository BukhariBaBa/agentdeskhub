export type ApprovalTint = "indigo" | "emerald" | "amber" | "rose" | "zinc";

export type ApprovalCardProps = {
  id: string;
  agent: string;
  icon: string;
  tint: ApprovalTint;
  title: string;
  time: string;
  summary: string;
  onOpen: (id: string) => void;
};
