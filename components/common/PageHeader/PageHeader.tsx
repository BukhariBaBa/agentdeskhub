import type { PageHeaderProps } from "./PageHeader.types";

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-[22px] flex-wrap">
      <div>
        <h1 className="m-0 text-[22px] font-[650] tracking-[-0.025em] text-[var(--text)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[5px] mb-0 text-[13.5px] text-[var(--text-muted)]">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex gap-2 shrink-0">{action}</div>}
    </div>
  );
}
