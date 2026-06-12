"use client";
import { cn } from "@/lib/cn";
import { Icon } from "../Icon";
import type { PillGroupProps } from "./PillGroup.types";
import {
  PILL_BASE_CLASS,
  PILL_OFF_CLASS,
  PILL_ON_CLASSES,
} from "./PillGroup.const";

export function PillGroup({
  options,
  value,
  onChange,
  tint = "indigo",
}: PillGroupProps) {
  const toggle = (option: string) => {
    onChange(
      value.includes(option)
        ? value.filter((x) => x !== option)
        : [...value, option],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={cn(
              PILL_BASE_CLASS,
              on ? PILL_ON_CLASSES[tint] : PILL_OFF_CLASS,
            )}
          >
            {on && <Icon name="check" size={13} strokeWidth={2.4} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}
