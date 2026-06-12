"use client";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/common/Icon";
import { SideLink } from "@/components/common/SideLink";
import type { SidebarProps } from "./Sidebar.types";
import { NAV_ITEMS, PLAN_BADGE_CLASS, USAGE_BAR_TINT } from "./Sidebar.const";

export function Sidebar({
  used,
  limit,
  freelancer,
  initials,
  plan,
  pendingCount,
}: SidebarProps) {
  const pct = Math.min(100, Math.round((used / limit) * 100));

  return (
    <aside className="hidden sm:flex flex-col fixed top-0 left-0 bottom-0 w-[64px] lg:w-[240px] bg-[var(--side-bg)] border-r border-[var(--side-border)] z-50 transition-[width] duration-[180ms]">
      {/* Brand */}
      <div className="flex items-center gap-[9px] px-[14px] h-[60px] shrink-0 border-b border-[var(--side-border)]">
        <Logo size={26} />
        <span className="hidden lg:block font-[650] text-[15px] tracking-[-0.02em] text-[var(--side-text-hi)] truncate">
          AgentDesk Hub
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_ITEMS.map((item) => (
          <SideLink
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            href={item.href}
            badge={
              item.id === "agents" && pendingCount > 0
                ? pendingCount
                : undefined
            }
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--side-border)] p-3">
        {/* Usage meter — full sidebar only */}
        <div className="hidden lg:block mb-3 px-[6px]">
          <div className="flex items-center justify-between mb-[6px]">
            <span className="text-[11.5px] text-[var(--side-text)]">
              {used} / {limit} runs
            </span>
            <span className="text-[11.5px] text-[var(--side-text)]">
              {pct}%
            </span>
          </div>
          <div className="w-full h-[5px] rounded-full bg-[var(--side-border)] overflow-hidden">
            <style>{`.usage-fill{width:${pct}%}`}</style>
            <div
              className={cn(
                "usage-fill h-full rounded-full transition-[width] duration-500",
                USAGE_BAR_TINT(pct),
              )}
            />
          </div>
        </div>

        {/* User button */}
        <button className="w-full flex items-center gap-[10px] rounded-[var(--r-md)] px-[10px] py-[8px] hover:bg-white/5 transition-colors cursor-pointer border-none bg-transparent text-left">
          <span className="w-8 h-8 rounded-full shrink-0 bg-[var(--indigo-600)] flex items-center justify-center text-white text-[12px] font-[650] tracking-[-0.02em]">
            {initials}
          </span>
          <div className="hidden lg:block min-w-0 flex-1">
            <div className="text-[13px] font-[550] text-[var(--side-text-hi)] truncate leading-tight">
              {freelancer}
            </div>
            <div className="text-[11.5px] text-[var(--side-text)] truncate leading-tight">
              {plan} plan
            </div>
          </div>
          <span className={cn("hidden lg:inline-flex", PLAN_BADGE_CLASS)}>
            {plan}
          </span>
        </button>
      </div>
    </aside>
  );
}
