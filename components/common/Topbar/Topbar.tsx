"use client";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/common/Icon";
import type { TopbarProps } from "./Topbar.types";
import { PAGE_TITLES } from "./Topbar.const";

export function Topbar({ workspace, notificationCount = 0 }: TopbarProps) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="fixed top-0 left-0 sm:left-[64px] lg:left-[240px] right-0 h-[var(--topbar-h)] bg-white/95 backdrop-blur-sm border-b border-[var(--border)] z-40 flex items-center px-4 sm:px-6 gap-4 transition-[left] duration-[180ms]">
      {/* Left: workspace crumb + page */}
      <div className="hidden sm:flex items-center gap-[6px] min-w-0">
        <span className="text-[13px] text-[var(--text-muted)] font-[500] truncate">
          {workspace}
        </span>
        <Icon
          name="chevronRight"
          size={14}
          className="text-[var(--text-subtle)] shrink-0"
        />
        <span className="text-[13px] text-[var(--text)] font-[550] truncate">
          {pageTitle}
        </span>
      </div>

      {/* Mobile: page title */}
      <span className="sm:hidden text-[15px] font-[650] text-[var(--text)] tracking-[-0.02em]">
        {pageTitle}
      </span>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative w-[34px] h-[34px] rounded-[var(--r-md)] border border-transparent bg-transparent hover:bg-[var(--zinc-100)] text-[var(--zinc-600)] cursor-pointer inline-flex items-center justify-center transition-colors">
          <Icon name="bell" size={16} />
          {notificationCount > 0 && (
            <span className="absolute top-[3px] right-[3px] min-w-4 h-4 px-[4px] rounded-full bg-[var(--rose-500)] text-white text-[10px] font-[700] flex items-center justify-center border-2 border-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Portal preview */}
        <button className="hidden sm:inline-flex items-center gap-[6px] h-8 px-3 rounded-[var(--r-md)] border border-[var(--border)] bg-white text-[12.5px] font-[550] text-[var(--text)] hover:bg-[var(--zinc-50)] hover:border-[var(--border-strong)] cursor-pointer transition-colors">
          <Icon name="external" size={13} />
          Portal preview
        </button>
      </div>
    </header>
  );
}
