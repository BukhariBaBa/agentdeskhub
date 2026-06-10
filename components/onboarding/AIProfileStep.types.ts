import type { AIProfile } from "@/hooks/useOnboarding";

export type AIProfileStepProps = {
  aiProfile: AIProfile;
  onChangeAi: (patch: Partial<AIProfile>) => void;
  onChangeSkill: (skill: string) => void;
};
