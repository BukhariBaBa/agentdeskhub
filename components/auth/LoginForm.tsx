"use client";
import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Button } from "@/components/common/Button";
import { ROUTES } from "@/lib/constants";
import { AuthCard } from "./AuthCard";
import { GoogleButton } from "./GoogleButton";
import {
  LOGIN_TITLE,
  LOGIN_SUBTITLE,
  LOGIN_EMAIL_LABEL,
  LOGIN_PASSWORD_LABEL,
  LOGIN_CTA,
  LOGIN_SWITCH_PRE,
  LOGIN_SWITCH_LINK,
} from "./LoginForm.const";

function Divider() {
  return (
    <div className="flex items-center gap-3 my-[18px]">
      <div className="flex-1 h-px bg-[var(--border)]" />
      <span className="text-[12px] text-[var(--text-subtle)] font-medium">
        or
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

function PrimarySpinner() {
  return (
    <span className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-[ad-spin_.7s_linear_infinite] inline-block" />
  );
}

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    submit,
    googleSignIn,
    canSubmit,
  } = useLogin();

  return (
    <AuthCard title={LOGIN_TITLE} subtitle={LOGIN_SUBTITLE}>
      <div className="flex flex-col gap-[14px]">
        <div>
          <FieldLabel>{LOGIN_EMAIL_LABEL}</FieldLabel>
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            type="email"
            disabled={loading}
          />
        </div>

        <div>
          <FieldLabel>{LOGIN_PASSWORD_LABEL}</FieldLabel>
          <PasswordInput
            value={password}
            onChange={setPassword}
            disabled={loading}
          />
        </div>

        {error && (
          <div className="px-[13px] py-[10px] rounded-[var(--r-md)] bg-[var(--rose-50)] text-[var(--rose-600)] text-[13px] border border-[var(--rose-100)]">
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
          {loading ? <PrimarySpinner /> : LOGIN_CTA}
        </Button>

        <Divider />

        <GoogleButton onClick={googleSignIn} loading={loading} />

        <p className="text-center text-[13px] text-[var(--text-muted)] mt-2 mb-0">
          {LOGIN_SWITCH_PRE}{" "}
          <Link
            href={ROUTES.SIGNUP}
            className="text-[var(--indigo-600)] font-[550] no-underline"
          >
            {LOGIN_SWITCH_LINK}
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
