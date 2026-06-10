"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(ROUTES.DASHBOARD);
    }, 750);
  };

  const googleSignIn = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(ROUTES.DASHBOARD);
    }, 750);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    submit,
    googleSignIn,
    canSubmit,
  };
}

export function useSignup() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(ROUTES.ONBOARDING);
    }, 750);
  };

  const googleSignIn = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(ROUTES.ONBOARDING);
    }, 750);
  };

  return {
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
  };
}
