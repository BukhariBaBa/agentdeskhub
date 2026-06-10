"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_RED_FLAGS,
  ONBOARDING_STEPS,
  ONBOARDING_STORED_KEY,
  ROUTES,
  SKILLS,
} from "@/lib/constants";
import type { RedFlag } from "@/components/common/RedFlagRow";

export type AIProfile = {
  primarySkill: string;
  specializations: string[];
  industriesLove: string[];
  industriesAvoid: string[];
  minBudget: string;
  hourlyRate: string;
  projectLength: string;
  projectSize: string;
  pastWork: string;
  redFlags: RedFlag[];
};

export type LeadData = {
  name: string;
  company: string;
  platform: string;
  desc: string;
};

const INITIAL_AI_PROFILE: AIProfile = {
  primarySkill: SKILLS[0],
  specializations: [],
  industriesLove: [],
  industriesAvoid: [],
  minBudget: "5000",
  hourlyRate: "150",
  projectLength: "1–3 months",
  projectSize: "Medium $1–5K",
  pastWork: "",
  redFlags: DEFAULT_RED_FLAGS.map((f) => ({ ...f })),
};

const INITIAL_LEAD: LeadData = {
  name: "",
  company: "",
  platform: "Upwork",
  desc: "",
};

export function useOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [wsName, setWsName] = useState("");
  const [aiProfile, setAiProfile] = useState<AIProfile>(INITIAL_AI_PROFILE);
  const [lead, setLead] = useState<LeadData>(INITIAL_LEAD);
  const [savedLead, setSavedLead] = useState<LeadData | null>(null);
  const [agentRunning, setAgentRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalSteps = ONBOARDING_STEPS.length;
  const canSkip = step >= 2;
  const currentStepId = ONBOARDING_STEPS[step].id;

  const portalClient = useMemo(() => {
    if (savedLead) return { name: savedLead.name, company: savedLead.company };
    return { name: "Maya Okonkwo", company: "Lumen Coffee Co." };
  }, [savedLead]);

  const portalSlug = useMemo(() => {
    return (portalClient.company || "client")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }, [portalClient.company]);

  const portalUrl = `yourworkspace.agentdesk.app/portal/${portalSlug}`;

  const next = () => setStep((s) => Math.min(totalSteps - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    try {
      localStorage.setItem(ONBOARDING_STORED_KEY, "1");
    } catch {
      // localStorage unavailable in some environments
    }
    router.push(ROUTES.DASHBOARD);
  };

  const saveLead = () => {
    if (lead.name.trim() && lead.company.trim()) {
      setSavedLead({ ...lead });
    }
    next();
  };

  const runAgent = () => {
    setAgentRunning(true);
    setTimeout(() => {
      setAgentRunning(false);
      next();
    }, 1300);
  };

  const copyPortal = () => {
    try {
      navigator.clipboard?.writeText(`https://${portalUrl}`);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const updateAiSkill = (skill: string) => {
    setAiProfile((prev) => ({
      ...prev,
      primarySkill: skill,
      specializations: [],
    }));
  };

  const updateAiProfile = (patch: Partial<AIProfile>) => {
    setAiProfile((prev) => ({ ...prev, ...patch }));
  };

  const updateLead = (patch: Partial<LeadData>) => {
    setLead((prev) => ({ ...prev, ...patch }));
  };

  const canContinueWorkspace = wsName.trim().length > 0;
  const canSaveLead =
    lead.name.trim().length > 0 && lead.company.trim().length > 0;

  return {
    step,
    totalSteps,
    currentStepId,
    canSkip,
    wsName,
    setWsName,
    aiProfile,
    updateAiProfile,
    updateAiSkill,
    lead,
    updateLead,
    savedLead,
    saveLead,
    agentRunning,
    runAgent,
    isDone,
    setIsDone,
    copied,
    copyPortal,
    portalClient,
    portalUrl,
    next,
    back,
    finish,
    canContinueWorkspace,
    canSaveLead,
  };
}
