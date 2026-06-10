"use client";
import Link from "next/link";
import { useSignup } from "@/hooks/useAuth";
import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Button } from "@/components/common/Button";
import { ROUTES } from "@/lib/constants";
import { AuthCard } from "./AuthCard";
import { GoogleButton } from "./GoogleButton";
import {
  SIGNUP_TITLE,
  SIGNUP_SUBTITLE,
  SIGNUP_FULLNAME_LABEL,
  SIGNUP_EMAIL_LABEL,
  SIGNUP_PASSWORD_LABEL,
  SIGNUP_CTA,
  SIGNUP_SWITCH_PRE,
  SIGNUP_SWITCH_LINK,
} from "./SignupForm.const";

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "18px 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span
        style={{
          fontSize: 12,
          color: "var(--text-subtle)",
          fontWeight: 500,
        }}
      >
        or
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function PrimarySpinner() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        animation: "ad-spin .7s linear infinite",
        display: "inline-block",
      }}
    />
  );
}

export function SignupForm() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    submit,
    googleSignIn,
    canSubmit,
  } = useSignup();

  return (
    <AuthCard title={SIGNUP_TITLE} subtitle={SIGNUP_SUBTITLE}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <FieldLabel>{SIGNUP_FULLNAME_LABEL}</FieldLabel>
          <TextInput
            value={fullName}
            onChange={setFullName}
            placeholder="Jane Smith"
            disabled={loading}
          />
        </div>

        <div>
          <FieldLabel>{SIGNUP_EMAIL_LABEL}</FieldLabel>
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            type="email"
            disabled={loading}
          />
        </div>

        <div>
          <FieldLabel>{SIGNUP_PASSWORD_LABEL}</FieldLabel>
          <PasswordInput
            value={password}
            onChange={setPassword}
            disabled={loading}
          />
        </div>

        {error && (
          <div
            style={{
              padding: "10px 13px",
              borderRadius: "var(--r-md)",
              background: "var(--rose-50)",
              color: "var(--rose-600)",
              fontSize: 13,
              border: "1px solid var(--rose-100)",
            }}
          >
            {error}
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          full
          disabled={!canSubmit || loading}
          onClick={submit}
          iconRight={loading ? undefined : "arrowRight"}
        >
          {loading ? <PrimarySpinner /> : SIGNUP_CTA}
        </Button>

        <Divider />

        <GoogleButton onClick={googleSignIn} loading={loading} />

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--text-muted)",
            margin: "8px 0 0",
          }}
        >
          {SIGNUP_SWITCH_PRE}{" "}
          <Link
            href={ROUTES.LOGIN}
            style={{
              color: "var(--indigo-600)",
              fontWeight: 550,
              textDecoration: "none",
            }}
          >
            {SIGNUP_SWITCH_LINK}
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
