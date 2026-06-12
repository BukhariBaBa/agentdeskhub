import { Logo } from "@/components/common/Icon";
import type { AuthCardProps } from "./AuthCard.types";
import { AUTH_WORDMARK } from "./AuthCard.const";

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex items-center justify-center gap-[9px] mb-6">
        <Logo size={26} />
        <span className="text-[15px] font-[650] tracking-[-0.02em] text-[var(--text)]">
          {AUTH_WORDMARK}
        </span>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[var(--r-xl)] shadow-[var(--shadow-pop)] p-7">
        <h1 className="m-0 text-[22px] font-[650] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h1>
        <p className="mt-[6px] mb-[22px] text-[13.5px] text-[var(--text-muted)] leading-[1.5]">
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}
