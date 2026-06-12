"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import type { MobileNavProps } from "./MobileNav.types";
import { MOBILE_NAV_ITEMS } from "./MobileNav.const";

export function MobileNav({ pendingCount }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[var(--side-bg)] border-t border-[var(--side-border)] z-50 flex items-stretch">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const hasBadge = item.id === "agents" && pendingCount > 0;

        return (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-[3px] border-none bg-transparent cursor-pointer relative transition-colors",
              isActive
                ? "text-[var(--side-active-text)]"
                : "text-[var(--side-text)] hover:text-white",
            )}
          >
            <Icon
              name={item.icon as IconName}
              size={20}
              strokeWidth={isActive ? 2 : 1.8}
            />
            <span className="text-[10.5px] font-[500]">{item.label}</span>
            {hasBadge && (
              <span className="absolute top-[8px] right-[calc(50%-14px)] w-[7px] h-[7px] rounded-full bg-[var(--rose-500)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
