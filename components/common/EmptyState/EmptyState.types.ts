import type { ReactNode } from "react";
import type { IconName } from "@/components/common/Icon";

export type EmptyStateProps = {
  icon: IconName;
  title: string;
  body?: string;
  action?: ReactNode;
};
