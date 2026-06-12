"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import type { SideLinkProps } from "./SideLink.types";

export function SideLink({ label, icon, href, badge }: SideLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <button
      onClick={() => router.push(href)}
      title={label}
      className={cn(
        "w-full flex items-center gap-3 h-[42px] px-[10px] rounded-[var(--r-md)] mb-[2px] border-none cursor-pointer transition-[background,color] duration-100 relative",
        "justify-center lg:justify-start",
        isActive
          ? "bg-[var(--side-active)] text-[var(--side-active-text)] font-semibold"
          : "text-[var(--side-text)] hover:bg-white/5 hover:text-white bg-transparent",
      )}
    >
      <Icon
        name={icon as IconName}
        size={18}
        strokeWidth={isActive ? 2 : 1.8}
      />
      <span className="hidden lg:block text-[13.5px] truncate">{label}</span>

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <>
          {/* Full sidebar: pill badge */}
          <span className="hidden lg:flex ml-auto min-w-[20px] h-5 px-[6px] rounded-full bg-[var(--rose-500)] text-white text-[11px] font-[700] items-center justify-center">
            {badge}
          </span>
          {/* Rail sidebar: red dot */}
          <span className="absolute top-[8px] right-[8px] w-[7px] h-[7px] rounded-full bg-[var(--rose-500)] flex lg:hidden" />
        </>
      )}
    </button>
  );
}
