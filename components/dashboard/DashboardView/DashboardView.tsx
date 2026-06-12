"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/common/Icon";
import { EmptyState } from "@/components/common/EmptyState";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ApprovalCard } from "@/components/dashboard/ApprovalCard";
import { ActivityRow } from "@/components/dashboard/ActivityRow";
import { CompletionCard } from "@/components/dashboard/CompletionCard";
import type { DashboardViewProps } from "./DashboardView.types";
import type { IconName } from "@/components/common/Icon";
import { ROUTES } from "@/lib/constants";

export function DashboardView({
  greeting,
  firstName,
  metrics,
  approvals,
  activity,
  completions,
}: DashboardViewProps) {
  const router = useRouter();

  return (
    <div>
      {/* Greeting */}
      <div className="mb-[22px]">
        <h1 className="m-0 text-[22px] font-[650] tracking-[-0.025em] text-[var(--text)]">
          {greeting}, {firstName}
        </h1>
        <p className="mt-[5px] mb-0 text-[13.5px] text-[var(--text-muted)]">
          {approvals.length > 0
            ? `${approvals.length} agent ${approvals.length === 1 ? "action is" : "actions are"} waiting for your review.`
            : "You’re all caught up — no pending approvals."}
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-[14px] mb-[26px] [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            sub={m.sub}
            icon={m.icon}
            tint={m.tint}
            trend={m.trend}
          />
        ))}
      </div>

      {/* Post-project automation */}
      {completions.length > 0 && (
        <div className="mb-[26px]">
          {completions.map((c) => (
            <CompletionCard key={c.id} completion={c} />
          ))}
        </div>
      )}

      {/* Two-column: approvals + activity */}
      <div className="grid gap-[22px] items-start [grid-template-columns:1fr] lg:[grid-template-columns:minmax(0,1.6fr)_minmax(280px,1fr)]">
        {/* Pending approvals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[9px]">
              <h2 className="m-0 text-[15px] font-[650] tracking-[-0.02em] text-[var(--text)]">
                Pending Approvals
              </h2>
              {approvals.length > 0 && (
                <span className="min-w-5 h-5 px-[6px] rounded-full bg-[var(--rose-500)] text-white text-[11.5px] font-[700] inline-flex items-center justify-center">
                  {approvals.length}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push(ROUTES.AGENTS)}
              className="border-none bg-transparent text-[var(--primary)] text-[12.5px] font-[600] cursor-pointer inline-flex items-center gap-1 hover:text-[var(--primary-hover)]"
            >
              Run an agent
              <Icon name="arrowRight" size={14} />
            </button>
          </div>

          {approvals.length > 0 ? (
            <div className="flex flex-col gap-[10px]">
              {approvals.map((ap) => (
                <ApprovalCard
                  key={ap.id}
                  id={ap.id}
                  agent={ap.agent}
                  icon={ap.icon}
                  tint={ap.tint}
                  title={ap.title}
                  time={ap.time}
                  summary={ap.summary}
                  onOpen={() => router.push(ROUTES.AGENTS)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[var(--border)] rounded-[var(--r-lg)] p-7 text-center">
              <div className="w-[42px] h-[42px] rounded-full bg-[var(--emerald-50)] text-[var(--emerald-600)] inline-flex items-center justify-center mb-3">
                <Icon name="checkCircle" size={20} />
              </div>
              <div className="text-[14px] font-[600] text-[var(--text)] mb-[5px]">
                All caught up
              </div>
              <p className="m-0 text-[13px] text-[var(--text-muted)]">
                No agent actions waiting for review.
              </p>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="m-0 text-[15px] font-[650] tracking-[-0.02em] text-[var(--text)] mb-3">
            Recent Activity
          </h2>
          {activity.length > 0 ? (
            <div className="bg-white border border-[var(--border)] rounded-[var(--r-lg)] px-[18px]">
              {activity.map((a, i) => (
                <ActivityRow
                  key={a.id}
                  icon={a.icon as IconName}
                  text={a.text}
                  meta={a.meta}
                  time={a.time}
                  tint={a.tint}
                  isLast={i === activity.length - 1}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="activity"
              title="No activity yet"
              body="Agent runs and client events will appear here."
            />
          )}
        </div>
      </div>
    </div>
  );
}
