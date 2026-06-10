"use client";
import { useState } from "react";
import { Icon } from "../Icon";
import type { TagsInputProps } from "./TagsInput.types";
import { TAG_STYLE } from "./TagsInput.const";

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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        alignItems: "center",
        padding: "7px 9px",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        background: "#fff",
      }}
    >
      {tags.map((t) => (
        <span key={t} style={TAG_STYLE}>
          {t}
          <button
            type="button"
            onClick={() => onChange(tags.filter((x) => x !== t))}
            style={{
              display: "inline-flex",
              border: "none",
              background: "none",
              color: "var(--indigo-600)",
              cursor: "pointer",
              padding: 0,
            }}
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
        style={{
          flex: 1,
          minWidth: 100,
          border: "none",
          outline: "none",
          fontSize: 13,
          padding: "4px 2px",
          background: "transparent",
          color: "var(--text)",
        }}
      />
    </div>
  );
}
