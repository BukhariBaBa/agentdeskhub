import type { LeadData } from "@/hooks/useOnboarding";

export type LeadStepProps = {
  lead: LeadData;
  onChangeLead: (patch: Partial<LeadData>) => void;
};
