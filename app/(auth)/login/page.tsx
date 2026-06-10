import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign in — AgentDesk",
};

export default function LoginPage() {
  return <LoginForm />;
}
