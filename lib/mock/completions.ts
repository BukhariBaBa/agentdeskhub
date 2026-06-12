import type { IconName } from "@/components/common/Icon";

export const STEP_KEYS = {
  CASESTUDY: "casestudy",
  LINKEDIN: "linkedin",
  TESTIMONIAL: "testimonial",
} as const;
export type StepKey = (typeof STEP_KEYS)[keyof typeof STEP_KEYS];

export const STEP_STATUS = {
  DONE: "done",
  REVIEW: "review",
  PENDING: "pending",
} as const;
export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];

export type MockCompletionStep = {
  key: StepKey;
  label: string;
  icon: IconName;
  status: StepStatus;
  approvalId?: string;
};

export type MockCompletion = {
  id: string;
  client: string;
  project: string;
  steps: MockCompletionStep[];
};

export const MOCK_COMPLETIONS: MockCompletion[] = [
  {
    id: "cmp-1",
    client: "Apex Dynamics",
    project: "Brand Identity System",
    steps: [
      {
        key: STEP_KEYS.CASESTUDY,
        label: "Case study",
        icon: "fileText",
        status: STEP_STATUS.DONE,
      },
      {
        key: STEP_KEYS.LINKEDIN,
        label: "LinkedIn article",
        icon: "megaphone",
        status: STEP_STATUS.REVIEW,
        approvalId: "apr-2",
      },
      {
        key: STEP_KEYS.TESTIMONIAL,
        label: "Testimonial request",
        icon: "message",
        status: STEP_STATUS.PENDING,
      },
    ],
  },
];
