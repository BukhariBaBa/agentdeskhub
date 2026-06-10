/* AgentDesk — sample data model. Freelancer: Jordan Rivera, brand & web designer. */

const WORKSPACE = {
  freelancer: "Jordan Rivera",
  email: "jordan@riverastudio.co",
  workspace: "Rivera Studio",
  role: "Brand & Web Designer",
  bio: "Independent brand & web designer helping early-stage companies look like the category leader. 9 years, 40+ launches.",
  plan: "Pro",
  initials: "JR",
  avatarColor: "var(--indigo-600)",
};

const USAGE = { used: 23, limit: 30 };

// ---- Agents ----
const AGENTS = [
  {
    id: "lead-scout",
    name: "Lead Scout",
    icon: "radar",
    tint: "indigo",
    desc: "Finds leads, scores fit 0–100, drafts outreach.",
    lastRun: "1 hour ago",
    lastStatus: "pending",
  },
  {
    id: "proposal",
    name: "Proposal Agent",
    icon: "penTool",
    tint: "indigo",
    desc: "Turns call notes into 3-tier proposals with pricing.",
    lastRun: "8 min ago",
    lastStatus: "pending",
  },
  {
    id: "project-mgr",
    name: "Project Manager",
    icon: "listChecks",
    tint: "emerald",
    desc: "Creates milestones, flags scope creep, sends weekly updates.",
    lastRun: "Yesterday",
    lastStatus: "complete",
  },
  {
    id: "finance",
    name: "Finance Agent",
    icon: "receipt",
    tint: "emerald",
    desc: "Invoices from time logs, chases payments, logs revenue.",
    lastRun: "3 hours ago",
    lastStatus: "pending",
  },
  {
    id: "comms",
    name: "Client Comms",
    icon: "message",
    tint: "amber",
    desc: "Drafts replies, books meetings, sends testimonial requests.",
    lastRun: "2 days ago",
    lastStatus: "complete",
  },
  {
    id: "content",
    name: "Content & Brand",
    icon: "palette",
    tint: "amber",
    desc: "Writes case studies, schedules LinkedIn posts, builds social proof.",
    lastRun: "4 days ago",
    lastStatus: "complete",
  },
];

// ---- Clients ----
const CLIENTS = [
  {
    id: "c1",
    name: "Maya Okonkwo",
    company: "Lumen Coffee Co.",
    status: "Active",
    source: "Referral",
    platform: "Referral",
    activity: "2 days ago",
    email: "maya@lumencoffee.com",
  },
  {
    id: "c2",
    name: "David Park",
    company: "Northwind Apps",
    status: "Active",
    source: "Lead Scout",
    platform: "LinkedIn",
    activity: "5 hours ago",
    email: "david@northwind.io",
  },
  {
    id: "c3",
    name: "Elena Vance",
    company: "Harbor Wellness",
    status: "Active",
    source: "Inbound",
    platform: "Website form",
    activity: "1 week ago",
    email: "elena@harborwellness.com",
  },
  {
    id: "c4",
    name: "Tom Bradley",
    company: "Sage & Stone",
    status: "Lead",
    source: "Lead Scout",
    platform: "LinkedIn",
    fit: 88,
    activity: "1 day ago",
    email: "tom@sageandstone.shop",
  },
  {
    id: "c5",
    name: "Priya Nair",
    company: "Foxtail Ventures",
    status: "Lead",
    source: "Lead Scout",
    platform: "Cold inbound",
    fit: 79,
    activity: "3 hours ago",
    email: "priya@foxtail.vc",
  },
  {
    id: "c6",
    name: "Greg Saunders",
    company: "Cobalt Robotics",
    status: "Past",
    source: "Referral",
    platform: "Referral",
    activity: "2 months ago",
    email: "greg@cobaltrobotics.ai",
  },
  {
    id: "c7",
    name: "Hannah Lee",
    company: "Maple & Co",
    status: "Lead",
    source: "Lead Scout",
    platform: "Upwork",
    fit: 64,
    activity: "4 hours ago",
    email: "hannah@mapleandco.studio",
  },
];

// ---- Proposals ----
const PROPOSAL_BODY = `# Brand Identity & Website — Lumen Coffee Co.

**Prepared for:** Maya Okonkwo, Founder
**Prepared by:** Jordan Rivera, Rivera Studio
**Date:** May 15, 2026

## Overview
Lumen Coffee is opening its second location and needs a brand system that scales beyond the original hand-painted signage. This engagement delivers a refreshed identity and a fast, conversion-focused website to support both retail and a new wholesale line.

## Scope of work
1. **Brand foundations** — logo refinement, type system, color, and a one-page brand guide.
2. **Website** — 6-page responsive site (Home, Menu, Wholesale, Locations, About, Contact) on a CMS you can edit.
3. **Launch kit** — social templates, email header, and packaging label artwork.

## Timeline
6 weeks from kickoff, in four milestones.

## Investment
**$12,500** — 50% to begin, 50% on launch.`;

const PROPOSALS = [
  {
    id: "p1",
    title: "Brand Identity & Website",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    amount: 12500,
    status: "Accepted",
    sent: "May 15",
    body: PROPOSAL_BODY,
  },
  {
    id: "p2",
    title: "Mobile App UI Refresh",
    client: "Northwind Apps",
    clientId: "c2",
    amount: 18000,
    status: "Sent",
    sent: "May 28",
    body: PROPOSAL_BODY.replace("Lumen Coffee Co.", "Northwind Apps"),
  },
  {
    id: "p3",
    title: "Rebrand & Design System",
    client: "Harbor Wellness",
    clientId: "c3",
    amount: 14200,
    status: "Accepted",
    sent: "Apr 30",
    body: PROPOSAL_BODY.replace("Lumen Coffee Co.", "Harbor Wellness"),
  },
  {
    id: "p4",
    title: "E-commerce Redesign",
    client: "Sage & Stone",
    clientId: "c4",
    amount: 9800,
    status: "Draft",
    sent: "—",
    body: PROPOSAL_BODY.replace("Lumen Coffee Co.", "Sage & Stone"),
  },
];

// ---- Projects ----
const PROJECTS = [
  {
    id: "pr1",
    name: "Lumen Coffee — Brand & Site",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    status: "Active",
    deadline: "Jun 30",
    start: "May 19",
    desc: "Full brand refresh and a 6-page website for the second-location launch.",
    rate: 150,
    weeklyUpdates: true,
    weeklyDay: "Friday",
    scopeCreep: {
      requested: "A full online ordering / checkout flow with Stripe",
      original:
        "The proposal covers a 6-page marketing site — e-commerce was explicitly out of scope.",
      source:
        "Client message from Maya, May 31: “Could we also add online ordering so people can buy beans directly?”",
      estHours: 28,
      estCost: 4200,
      estWeeks: 2,
    },
    timeLogs: [
      {
        id: "tl1",
        date: "May 30",
        hours: 6,
        desc: "Brand guide finalisation",
        billable: true,
      },
      {
        id: "tl2",
        date: "May 28",
        hours: 5.5,
        desc: "Homepage hi-fi design",
        billable: true,
      },
      {
        id: "tl3",
        date: "May 26",
        hours: 4,
        desc: "Logo refinement rounds",
        billable: true,
      },
      {
        id: "tl4",
        date: "May 23",
        hours: 3,
        desc: "Kickoff & discovery call",
        billable: false,
      },
    ],
    milestones: [
      { name: "Discovery & moodboards", status: "complete", date: "May 23" },
      { name: "Brand identity & guide", status: "complete", date: "May 30" },
      { name: "Website design & build", status: "active", date: "Jun 20" },
      { name: "QA & launch", status: "upcoming", date: "Jun 30" },
    ],
    files: ["Lumen_Brand_Guide_v2.pdf", "Homepage_Final.fig", "Logo_Pack.zip"],
  },
  {
    id: "pr2",
    name: "Harbor Wellness — Rebrand",
    client: "Harbor Wellness",
    clientId: "c3",
    status: "Active",
    deadline: "Jul 15",
    start: "May 5",
    desc: "Identity rebrand and a reusable design system for the wellness platform.",
    rate: 150,
    weeklyUpdates: true,
    weeklyDay: "Monday",
    timeLogs: [
      {
        id: "tl5",
        date: "Jun 2",
        hours: 7,
        desc: "Identity direction explorations",
        billable: true,
      },
      {
        id: "tl6",
        date: "May 12",
        hours: 9,
        desc: "Brand audit & competitive review",
        billable: true,
      },
    ],
    milestones: [
      { name: "Brand audit", status: "complete", date: "May 12" },
      { name: "Identity directions", status: "active", date: "Jun 10" },
      { name: "Design system", status: "upcoming", date: "Jun 28" },
      { name: "Marketing site", status: "upcoming", date: "Jul 8" },
      { name: "Handoff", status: "upcoming", date: "Jul 15" },
    ],
    files: ["Brand_Audit.pdf"],
  },
  {
    id: "pr3",
    name: "Northwind — UI Refresh",
    client: "Northwind Apps",
    clientId: "c2",
    status: "Paused",
    deadline: "TBD",
    start: "Apr 2",
    desc: "Visual refresh of the core mobile app screens. Paused pending content.",
    milestones: [
      { name: "Audit & inventory", status: "complete", date: "Apr 9" },
      { name: "New component library", status: "upcoming", date: "TBD" },
      { name: "Screen redesigns", status: "upcoming", date: "TBD" },
    ],
    files: [],
  },
  {
    id: "pr4",
    name: "Cobalt Robotics — Website",
    client: "Cobalt Robotics",
    clientId: "c6",
    status: "Complete",
    deadline: "Mar 20",
    start: "Jan 15",
    desc: "Marketing website and pitch deck for Series A.",
    milestones: [
      { name: "Strategy", status: "complete", date: "Jan 28" },
      { name: "Design", status: "complete", date: "Feb 18" },
      { name: "Build", status: "complete", date: "Mar 10" },
      { name: "Launch", status: "complete", date: "Mar 20" },
      { name: "Handoff", status: "complete", date: "Mar 22" },
    ],
    files: ["Cobalt_Site_Handoff.pdf", "Pitch_Deck.pdf"],
  },
];

// ---- Invoices ----
const INV_ITEMS = [
  { desc: "Brand identity system", qty: 1, rate: 4000 },
  { desc: "Website design (6 pages)", qty: 1, rate: 1750 },
  { desc: "Launch kit & templates", qty: 1, rate: 500 },
];
const INVOICES = [
  {
    id: "i4",
    num: "INV-004",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    amount: 6250,
    due: "Jun 10",
    status: "Sent",
    items: INV_ITEMS,
    tax: 0,
  },
  {
    id: "i3",
    num: "INV-003",
    client: "Harbor Wellness",
    clientId: "c3",
    amount: 7100,
    due: "May 20",
    status: "Overdue",
    overdueDays: 15,
    items: [
      { desc: "Brand audit & strategy", qty: 1, rate: 3500 },
      { desc: "Identity direction (3 routes)", qty: 1, rate: 3600 },
    ],
    tax: 0,
  },
  {
    id: "i2",
    num: "INV-002",
    client: "Cobalt Robotics",
    clientId: "c6",
    amount: 9000,
    due: "May 2",
    status: "Paid",
    paid: "May 2",
    items: [{ desc: "Website build — final 50%", qty: 1, rate: 9000 }],
    tax: 0,
  },
  {
    id: "i1",
    num: "INV-001",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    amount: 6250,
    due: "Apr 18",
    status: "Paid",
    paid: "Apr 18",
    items: INV_ITEMS,
    tax: 0,
  },
];

// ---- Recent activity ----
const ACTIVITY = [
  {
    id: "a0",
    icon: "calendar",
    text: "Meeting booked via Calendly",
    meta: "Foxtail Ventures — Jun 5 at 3:00pm",
    time: "40 min ago",
    tint: "indigo",
  },
  {
    id: "a1",
    icon: "radar",
    text: "Lead Scout scored 3 new leads",
    meta: "Sage & Stone (88), Foxtail (79), Maple & Co (64)",
    time: "1 hour ago",
    tint: "indigo",
  },
  {
    id: "a2",
    icon: "penTool",
    text: "Proposal Agent drafted a 3-tier proposal",
    meta: "Foxtail Ventures — Pitch Deck",
    time: "8 min ago",
    tint: "indigo",
  },
  {
    id: "a3",
    icon: "alert",
    text: "Invoice INV-003 is now overdue",
    meta: "Harbor Wellness — 15 days",
    time: "Today",
    tint: "rose",
  },
  {
    id: "a4",
    icon: "checkCircle",
    text: "Proposal accepted by client",
    meta: "Lumen Coffee — $12,500",
    time: "May 15",
    tint: "emerald",
  },
  {
    id: "a5",
    icon: "listChecks",
    text: "Milestone completed",
    meta: "Lumen Coffee — Brand identity & guide",
    time: "May 30",
    tint: "emerald",
  },
];

// ---- Pending approvals (the core loop) ----
const APPROVALS = [
  {
    id: "ap1",
    agentId: "proposal",
    agent: "Proposal Agent",
    icon: "penTool",
    tint: "indigo",
    title: "Drafted 3-tier proposal — Foxtail Ventures",
    time: "8 min ago",
    summary: "3-tier proposal ready to review for Foxtail Ventures.",
    input:
      "Client: Foxtail Ventures (Priya Nair, Partner)\nSource: extracted from intro call transcript (Jun 1).\nRequirements: 12-slide Series A deck, existing brand, design + light copy polish, ~2 week timeline.\nReference: your rate card + Lumen proposal template.",
    docType: "proposal",
    doc: {
      title: "Series A Pitch Deck",
      client: "Foxtail Ventures",
      recommended: "Standard",
      tiers: [
        {
          name: "Basic",
          price: 3200,
          delivery: "1 week",
          scope: "Design polish on your existing deck.",
          includes: [
            "12 slides redesigned",
            "Brand system applied",
            "1 revision round",
          ],
        },
        {
          name: "Standard",
          price: 4500,
          delivery: "2 weeks",
          scope: "Design plus narrative and copy polish.",
          includes: [
            "Everything in Basic",
            "Narrative restructure",
            "Custom data visualisations",
            "2 revision rounds",
          ],
        },
        {
          name: "Premium",
          price: 6800,
          delivery: "3 weeks",
          scope: "End-to-end fundraise design partner.",
          includes: [
            "Everything in Standard",
            "45-min pitch coaching session",
            "Investor one-pager",
            "Unlimited revisions (3 wks)",
          ],
        },
      ],
    },
    model: "Claude Sonnet",
    tokens: "1,820",
    latency: "3.1s",
  },
  {
    id: "ap2",
    agentId: "lead-scout",
    agent: "Lead Scout",
    icon: "radar",
    tint: "indigo",
    title: "Found 3 leads, scored & ready to reach out",
    time: "1 hour ago",
    summary: "3 leads matched your niche, each scored with a drafted outreach.",
    input:
      "Niche: brand + web design for seed/Series A startups.\nFilters: US/remote, design budget ≥ $5k, founded < 3 years.\nSources: public funding announcements, design job boards, LinkedIn, your referral graph.",
    docType: "leads",
    doc: {
      leads: [
        {
          company: "Sage & Stone",
          contact: "Tom Bradley",
          role: "Founder",
          platform: "LinkedIn",
          score: 88,
          breakdown: {
            "Budget fit": 85,
            "Niche match": 95,
            "Response likelihood": 82,
            "Project size": 90,
          },
          note: "Boutique e-commerce, just closed pre-seed. No brand system yet.",
          budget: "$8–12k",
          outreach:
            "Hi Tom — congrats on the pre-seed! I came across Sage & Stone and the products look beautiful, but the brand could really do them justice. I help early-stage consumer companies build a brand + storefront that converts. Worth a quick 20-min call this week?",
        },
        {
          company: "Foxtail Ventures",
          contact: "Priya Nair",
          role: "Partner",
          platform: "Funding announcement",
          score: 79,
          breakdown: {
            "Budget fit": 70,
            "Niche match": 88,
            "Response likelihood": 75,
            "Project size": 65,
          },
          note: "VC firm launching a new fund — needs a deck and a microsite.",
          budget: "$4–6k",
          outreach:
            "Hi Priya — saw the new Foxtail fund announcement, congrats. I design pitch decks and microsites for funds and their portfolio companies. Happy to share a few relevant examples if useful — open to a quick chat?",
        },
        {
          company: "Maple & Co",
          contact: "Hannah Lee",
          role: "Head of Growth",
          platform: "Design job board",
          score: 64,
          breakdown: {
            "Budget fit": 75,
            "Niche match": 60,
            "Response likelihood": 55,
            "Project size": 80,
          },
          note: "DTC home goods, rebrand on the roadmap for Q3.",
          budget: "$10–15k",
          outreach:
            "Hi Hannah — I noticed Maple & Co is hiring for brand help. If a Q3 rebrand is on your radar, I partner with growth teams on identity + web as a focused project rather than a hire. Would love to compare notes.",
        },
      ],
    },
    model: "Claude Sonnet",
    tokens: "4,210",
    latency: "7.4s",
  },
  {
    id: "ap3",
    agentId: "finance",
    agent: "Finance Agent",
    icon: "receipt",
    tint: "emerald",
    title: "Drafted invoice INV-005 from time logs — Northwind",
    time: "3 hours ago",
    summary: "Invoice built from 20 logged hours on the Northwind audit.",
    input:
      'Project: Northwind — UI Refresh\nTrigger: Milestone "Audit & inventory" marked complete.\nRead 20 billable hours from time log @ $150/hr. Net-14 terms.',
    docType: "invoice",
    doc: {
      num: "INV-005",
      client: "Northwind Apps",
      due: "Jun 18",
      items: [
        {
          desc: "App UI audit & inventory — 20 hrs @ $150",
          qty: 20,
          rate: 150,
        },
      ],
      amount: 3000,
    },
    model: "Claude Sonnet",
    tokens: "890",
    latency: "1.7s",
  },
  {
    id: "ap4",
    agentId: "content",
    agent: "Content & Brand",
    icon: "palette",
    tint: "amber",
    title: "Drafted case study — Cobalt Robotics",
    time: "5 hours ago",
    summary: "Case study drafted from the completed Cobalt Robotics project.",
    input:
      "Project: Cobalt Robotics — Website (Complete, invoice paid)\nPulled milestones, deliverables, and the Series A outcome from the project record.",
    docType: "caseStudy",
    completion: "cmp1",
    doc: {
      note: "# Cobalt Robotics — A Series A Website in 9 Weeks\n\n## The challenge\nWhen Cobalt set out to raise their Series A, their website looked like a seed-stage science project. They needed to look like the category leader they were becoming — fast.\n\n## What we did\nA full marketing site and investor pitch deck in nine weeks: strategy, design, build, and launch. A clear narrative, custom data visualisations, and a system their team could extend.\n\n## The outcome\nCobalt closed their Series A six weeks after launch. Inbound demo requests tripled in the first month.\n\n> “Rivera Studio made us look like a company three times our size.”\n> — Greg Saunders, CEO, Cobalt Robotics",
    },
    model: "Claude Sonnet",
    tokens: "2,060",
    latency: "4.2s",
  },
];

// ---- Client portal activity ----
const PORTAL_ACTIVITY = [
  {
    text: "Milestone “Brand identity & guide” marked complete",
    date: "May 30",
  },
  { text: "Invoice INV-004 sent", date: "May 28" },
  { text: "Proposal accepted", date: "May 15" },
  { text: "Project kicked off", date: "May 19" },
];

// ---- Team / internal users ----
const ROLES = [
  {
    id: "Owner",
    desc: "Full access including billing and workspace settings.",
    tint: "indigo",
  },
  {
    id: "Admin",
    desc: "Manage clients, projects, agents, and team members.",
    tint: "emerald",
  },
  {
    id: "Member",
    desc: "Run agents and manage assigned client work.",
    tint: "amber",
  },
  {
    id: "Viewer",
    desc: "Read-only access to clients, projects, and invoices.",
    tint: "zinc",
  },
];

const TEAM = [
  {
    id: "t1",
    name: "Jordan Rivera",
    email: "jordan@riverastudio.co",
    role: "Owner",
    status: "Active",
    lastActive: "Online now",
    you: true,
  },
  {
    id: "t2",
    name: "Sofia Mendes",
    email: "sofia@riverastudio.co",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "t3",
    name: "Liam Carter",
    email: "liam@riverastudio.co",
    role: "Member",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "t4",
    name: "Aisha Bello",
    email: "aisha.bello@gmail.com",
    role: "Member",
    status: "Invited",
    lastActive: "Invite sent 1 day ago",
  },
  {
    id: "t5",
    name: "Noah Kim",
    email: "noah@bookkeepingpro.co",
    role: "Viewer",
    status: "Active",
    lastActive: "3 days ago",
  },
];

Object.assign(window, { ROLES, TEAM });

// ---- Integrations ----
const INTEGRATIONS = [
  {
    id: "calendly",
    name: "Calendly",
    glyph: "Cal",
    color: "#006BFF",
    icon: "calendar",
    connected: true,
    detail: "calendly.com/jordan-rivera/intro",
    desc: "Auto-append your booking link when Client Comms drafts a first-meeting reply.",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    glyph: "in",
    color: "#0A66C2",
    icon: "external",
    connected: false,
    desc: "Let Content & Brand schedule and publish the posts it drafts for you.",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    glyph: "GC",
    color: "#1A73E8",
    icon: "calendar",
    connected: false,
    desc: "Sync project deadlines and milestone dates straight to your calendar.",
  },
  {
    id: "stripe",
    name: "Stripe",
    glyph: "S",
    color: "#635BFF",
    icon: "dollar",
    connected: true,
    detail: "acct · Rivera Studio",
    desc: "Adds a real Pay Now button to client portal invoices.",
  },
  {
    id: "chrome",
    name: "Chrome Extension",
    glyph: "◎",
    color: "#1A73E8",
    icon: "puzzle",
    connected: false,
    install: true,
    detail: "4,200+ freelancers installed",
    desc: "Add leads directly from Upwork and LinkedIn without leaving the page.",
  },
];

// ---- AI Profile (feeds every agent) ----
const SKILLS = [
  "Web Development",
  "Mobile",
  "Design",
  "Copywriting",
  "Marketing",
  "Video",
  "Other",
];
const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "Ecommerce",
  "Healthcare",
  "Real estate",
  "Startups",
  "Agencies",
  "Other",
];
const PROJECT_LENGTHS = [
  "One-time",
  "1–4 weeks",
  "1–3 months",
  "Ongoing retainer",
];
const PROJECT_SIZES = [
  "Small <$1K",
  "Medium $1–5K",
  "Large $5–20K",
  "Enterprise $20K+",
];
const RED_FLAG_PRESETS = [
  { id: "rf1", label: "“Looking for cheapest option” language", on: true },
  { id: "rf2", label: "No budget mentioned", on: true },
  { id: "rf3", label: "Spec work or trial projects", on: true },
  { id: "rf4", label: "Equity-only compensation", on: true },
  { id: "rf5", label: "Extremely vague brief", on: true },
  { id: "rf6", label: "Short turnaround (less than 1 week)", on: false },
  { id: "rf7", label: "First-time buyers with no hire history", on: false },
];
const AI_PROFILE = {
  primarySkill: "Design",
  specializations: [
    "Brand identity",
    "Webflow",
    "Figma",
    "Shopify",
    "Design systems",
  ],
  industriesLove: ["SaaS", "Startups", "Ecommerce"],
  industriesAvoid: ["Real estate"],
  minBudget: 5000,
  hourlyRate: 150,
  projectLength: "1–4 weeks",
  projectSize: "Large $5–20K",
  pastWork:
    "I help seed and Series A founders look like the category leader. My work is calm, confident, and editorial — never loud. I lead with strategy, price in clear tiers, and always ship a system the in-house team can extend. Tone: warm, direct, a peer rather than a vendor.",
  redFlags: RED_FLAG_PRESETS,
};

// ---- Testimonials / social proof ----
const TESTIMONIALS = [
  {
    id: "ts1",
    client: "Greg Saunders",
    company: "Cobalt Robotics",
    stars: 5,
    date: "Apr 2026",
    text: "Rivera Studio made us look like a company three times our size. We closed our Series A six weeks after launch.",
  },
  {
    id: "ts2",
    client: "Elena Vance",
    company: "Harbor Wellness",
    stars: 5,
    date: "Mar 2026",
    text: "Jordan is the rare designer who gets brand AND business. Our rebrand paid for itself within a quarter.",
  },
];

// ---- Post-project automation sequences ----
const COMPLETIONS = [
  {
    id: "cmp1",
    project: "Cobalt Robotics — Website",
    client: "Cobalt Robotics",
    invoice: "INV-002",
    paid: "May 2",
    steps: [
      {
        key: "invoice",
        label: "Invoice paid",
        icon: "receipt",
        status: "done",
      },
      {
        key: "casestudy",
        label: "Case study draft ready",
        icon: "palette",
        status: "review",
        approvalId: "ap4",
        agentId: "content",
      },
      {
        key: "linkedin",
        label: "LinkedIn post",
        icon: "external",
        status: "pending",
        agentId: "content",
      },
      {
        key: "testimonial",
        label: "Testimonial request",
        icon: "message",
        status: "pending",
        agentId: "comms",
      },
    ],
  },
];

Object.assign(window, {
  INTEGRATIONS,
  TESTIMONIALS,
  COMPLETIONS,
  AI_PROFILE,
  SKILLS,
  INDUSTRIES,
  PROJECT_LENGTHS,
  PROJECT_SIZES,
  RED_FLAG_PRESETS,
});
