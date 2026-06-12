import type { StepKey } from "@/lib/mock/completions";
import type { IconName } from "@/components/common/Icon";

export const STEP_ACTION_LABEL: Record<StepKey, string> = {
  casestudy: "Generate",
  linkedin: "Schedule",
  testimonial: "Send",
};

export const STEP_PENDING_ICON: Record<StepKey, IconName> = {
  casestudy: "fileText",
  linkedin: "megaphone",
  testimonial: "message",
};
