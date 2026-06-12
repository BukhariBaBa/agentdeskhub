import type { StatusTint } from "./StatusBadge.types";

export const STATUS_TINT_MAP: Record<string, StatusTint> = {
  "Needs review": "amber",
  Ready: "amber",
  Lead: "amber",
  Active: "emerald",
  Past: "zinc",
  Lost: "zinc",
  Draft: "zinc",
  Sent: "indigo",
  Accepted: "emerald",
  Rejected: "rose",
  Expired: "zinc",
  Paid: "emerald",
  Overdue: "rose",
  Paused: "amber",
  Complete: "emerald",
  pending: "amber",
  running: "indigo",
  awaiting_approval: "amber",
  done: "emerald",
  failed: "rose",
};

export const BADGE_TINT_CLASSES: Record<StatusTint, string> = {
  indigo:
    "bg-[var(--indigo-50)] text-[var(--indigo-700)] border-[var(--indigo-100)]",
  emerald:
    "bg-[var(--emerald-50)] text-[var(--emerald-700)] border-[var(--emerald-100)]",
  amber:
    "bg-[var(--amber-50)] text-[var(--amber-700)] border-[var(--amber-100)]",
  rose: "bg-[var(--rose-50)] text-[var(--rose-700)] border-[var(--rose-100)]",
  zinc: "bg-[var(--zinc-100)] text-[var(--zinc-600)] border-[var(--zinc-200)]",
};

export const DOT_TINT_CLASSES: Record<StatusTint, string> = {
  indigo: "bg-[var(--indigo-500)]",
  emerald: "bg-[var(--emerald-500)]",
  amber: "bg-[var(--amber-500)]",
  rose: "bg-[var(--rose-500)]",
  zinc: "bg-[var(--zinc-400)]",
};
