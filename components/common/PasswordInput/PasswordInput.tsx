"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../Icon";
import { TEXT_INPUT_BASE_CLASS } from "../TextInput/TextInput.const";
import type { PasswordInputProps } from "./PasswordInput.types";
import { PASSWORD_INPUT_DEFAULT_PLACEHOLDER } from "./PasswordInput.const";

export function PasswordInput({
  value,
  onChange,
  placeholder = PASSWORD_INPUT_DEFAULT_PLACEHOLDER,
  disabled = false,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center border border-[var(--border-strong)] rounded-[var(--r-md)] overflow-hidden",
        disabled ? "bg-[var(--bg-subtle)]" : "bg-white",
      )}
    >
      <input
        value={value}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          TEXT_INPUT_BASE_CLASS,
          disabled ? "cursor-not-allowed" : "cursor-text",
        )}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="px-3 bg-transparent border-none cursor-pointer text-[var(--text-subtle)] flex items-center shrink-0"
      >
        <Icon name={show ? "eyeOff" : "eye"} size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
