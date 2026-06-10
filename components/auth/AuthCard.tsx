import { Logo } from "@/components/common/Icon";
import type { AuthCardProps } from "./AuthCard.types";
import {
  AUTH_CARD_MAX_WIDTH,
  AUTH_CARD_PADDING,
  AUTH_WORDMARK,
} from "./AuthCard.const";

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div style={{ width: "100%", maxWidth: AUTH_CARD_MAX_WIDTH }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          marginBottom: 24,
        }}
      >
        <Logo size={26} />
        <span
          style={{
            fontSize: 15,
            fontWeight: 650,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          {AUTH_WORDMARK}
        </span>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          boxShadow: "var(--shadow-pop)",
          padding: AUTH_CARD_PADDING,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 650,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "6px 0 22px",
            fontSize: 13.5,
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}
