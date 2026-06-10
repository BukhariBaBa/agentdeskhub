import type { Metadata } from "next";
import { SignupForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Create account — AgentDesk",
};

export default function SignupPage() {
  return <SignupForm />;
}
