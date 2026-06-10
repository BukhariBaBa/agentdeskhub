"use client";
import { useState } from "react";
import { Icon } from "../Icon";
import { TEXT_INPUT_BASE_STYLE } from "../TextInput/TextInput.const";
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
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-md)",
        background: disabled ? "var(--bg-subtle)" : "#fff",
        overflow: "hidden",
      }}
    >
      <input
        value={value}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...TEXT_INPUT_BASE_STYLE,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{
          padding: "0 12px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-subtle)",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={show ? "eyeOff" : "eye"} size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
