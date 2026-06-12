import type { ReactNode } from "react";
import { Sidebar } from "@/components/common/Sidebar";
import { Topbar } from "@/components/common/Topbar";
import { MobileNav } from "@/components/common/MobileNav";
import { MOCK_WORKSPACE, MOCK_USAGE, MOCK_APPROVALS } from "@/lib/mock";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pendingCount = MOCK_APPROVALS.length;

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)]">
      <Sidebar
        used={MOCK_USAGE.used}
        limit={MOCK_USAGE.limit}
        freelancer={MOCK_WORKSPACE.freelancer}
        initials={MOCK_WORKSPACE.initials}
        plan={MOCK_WORKSPACE.plan}
        pendingCount={pendingCount}
      />
      <Topbar
        workspace={MOCK_WORKSPACE.workspace}
        notificationCount={pendingCount}
      />
      <main className="pt-[var(--topbar-h)] sm:pl-[64px] lg:pl-[240px] pb-[76px] sm:pb-0 transition-[padding-left] duration-[180ms]">
        <div className="max-w-[1180px] mx-auto px-4 py-5 sm:px-8 sm:py-7">
          {children}
        </div>
      </main>
      <MobileNav pendingCount={pendingCount} />
    </div>
  );
}
