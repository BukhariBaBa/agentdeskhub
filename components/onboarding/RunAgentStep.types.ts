import type { LeadData } from "@/hooks/useOnboarding";

export type RunAgentStepProps = {
  savedLead: LeadData | null;
  running: boolean;
  onRun: () => void;
};
