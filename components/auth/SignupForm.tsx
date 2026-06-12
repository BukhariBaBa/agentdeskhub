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
      <div className="flex flex-col gap-[14px]">
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
          {loading ? <PrimarySpinner /> : SIGNUP_CTA}
        </Button>

        <Divider />

        <GoogleButton onClick={googleSignIn} loading={loading} />

        <p className="text-center text-[13px] text-[var(--text-muted)] mt-2 mb-0">
          {SIGNUP_SWITCH_PRE}{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-[var(--indigo-600)] font-[550] no-underline"
          >
            {SIGNUP_SWITCH_LINK}
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
