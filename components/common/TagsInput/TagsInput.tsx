"use client";
import { useState } from "react";
import { Icon } from "../Icon";
import type { TagsInputProps } from "./TagsInput.types";
import { TAG_CLASS } from "./TagsInput.const";

export function TagsInput({ tags, onChange, placeholder }: TagsInputProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    } else if (e.key === "Backspace" && !draft && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap gap-[7px] items-center px-[9px] py-[7px] border border-[var(--border-strong)] rounded-[var(--r-md)] bg-white">
      {tags.map((t) => (
        <span key={t} className={TAG_CLASS}>
          {t}
          <button
            type="button"
            onClick={() => onChange(tags.filter((x) => x !== t))}
            className="inline-flex border-none bg-transparent text-[var(--indigo-600)] cursor-pointer p-0"
          >
            <Icon name="x" size={12} strokeWidth={2.4} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        placeholder={tags.length ? "" : placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={add}
        className="flex-1 min-w-[100px] border-none outline-none text-[13px] py-[4px] px-[2px] bg-transparent text-[var(--text)]"
      />
    </div>
  );
}
