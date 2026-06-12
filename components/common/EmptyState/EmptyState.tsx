import { Icon } from "@/components/common/Icon";
import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="text-center py-[56px] px-6 border border-dashed border-[var(--border-strong)] rounded-[var(--r-lg)] bg-[var(--bg-subtle)]">
      <div className="w-12 h-12 rounded-[var(--r-lg)] bg-[var(--indigo-50)] text-[var(--indigo-600)] inline-flex items-center justify-center mb-[14px]">
        <Icon name={icon} size={22} />
      </div>
      <div className="text-[15px] font-[600] text-[var(--text)] mb-[5px]">
        {title}
      </div>
      {body && (
        <p className="text-[13.5px] text-[var(--text-muted)] m-0 mb-4">
          {body}
        </p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
