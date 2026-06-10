/* global React, Icon, Logo, Avatar, IconButton, ProgressBar, ToastHost,
   WORKSPACE, USAGE, CLIENTS, PROPOSALS, PROJECTS, INVOICES, APPROVALS, ACTIVITY, AGENTS, INTEGRATIONS, TESTIMONIALS, COMPLETIONS, AI_PROFILE,
   DashboardView, ApprovalView, ClientsView, ProposalsView, ProjectsView, InvoicesView, AgentsView, IntegrationsView, TeamView, SettingsView, PortalView, OnboardingWizard */

const { useState, useEffect, useMemo, useCallback } = React;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "clients", label: "Clients", icon: "clients" },
  { id: "proposals", label: "Proposals", icon: "proposals" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "invoices", label: "Invoices", icon: "invoices" },
  { id: "agents", label: "Agents", icon: "agents" },
  { id: "integrations", label: "Integrations", icon: "puzzle" },
  { id: "team", label: "Team", icon: "team" },
  { id: "settings", label: "Settings", icon: "settings" },
];

// agent-run templates -> produce a new pending approval
const META = { model: "Claude Sonnet" };
function makeRun(agentId) {
  const id = "r" + Date.now();
  if (agentId === "lead-scout")
    return {
      id,
      agentId,
      agent: "Lead Scout",
      icon: "radar",
      tint: "indigo",
      title: "Found 2 leads, scored & ready to reach out",
      time: "Just now",
      summary:
        "2 leads matched your niche, each scored with a drafted outreach.",
      input:
        "Niche: brand + web design for seed/Series A startups.\nFilters: US/remote, design budget ≥ $5k.\nSources: funding announcements, design boards, LinkedIn, referral graph.",
      docType: "leads",
      doc: {
        leads: [
          {
            company: "Vela Health",
            contact: "Ana Cruz",
            role: "Founder",
            platform: "Funding announcement",
            score: 84,
            breakdown: {
              "Budget fit": 90,
              "Niche match": 82,
              "Response likelihood": 78,
              "Project size": 86,
            },
            note: "Seed-stage telehealth, needs full brand + site.",
            budget: "$12–18k",
            outreach:
              "Hi Ana — congrats on the seed round! Telehealth lives and dies on trust, and a sharp brand + site is the fastest way to build it. I help seed-stage founders launch a brand and website in weeks, not months. Open to a quick call?",
          },
          {
            company: "Kindling",
            contact: "Owen Fry",
            role: "CEO",
            platform: "LinkedIn",
            score: 61,
            breakdown: {
              "Budget fit": 65,
              "Niche match": 58,
              "Response likelihood": 60,
              "Project size": 62,
            },
            note: "Dev-tools startup, marketing site refresh.",
            budget: "$6–9k",
            outreach:
              "Hi Owen — I came across Kindling and love the direction. If a marketing-site refresh is on your radar, I specialise in making technical products feel approachable without dumbing them down. Worth a chat?",
          },
        ],
      },
      tokens: "3,020",
      latency: "5.6s",
    };
  if (agentId === "proposal")
    return {
      id,
      agentId,
      agent: "Proposal Agent",
      icon: "penTool",
      tint: "indigo",
      title: "Drafted 3-tier proposal — Sage & Stone",
      time: "Just now",
      summary: "3-tier proposal ready to review for Sage & Stone.",
      input:
        'Client: Sage & Stone (Tom Bradley, Founder)\nBrief: "Boutique e-commerce redesign, ~20 products, Shopify."\nReference: your rate card + Lumen template.',
      docType: "proposal",
      doc: {
        title: "E-commerce Redesign",
        client: "Sage & Stone",
        recommended: "Standard",
        tiers: [
          {
            name: "Basic",
            price: 6500,
            delivery: "3 weeks",
            scope: "Theme refresh on your current Shopify store.",
            includes: [
              "Home + product + cart redesign",
              "Brand applied",
              "1 revision round",
            ],
          },
          {
            name: "Standard",
            price: 9800,
            delivery: "5 weeks",
            scope: "Full storefront redesign and brand layer.",
            includes: [
              "Everything in Basic",
              "Collection + about pages",
              "Photography direction",
              "2 revision rounds",
            ],
          },
          {
            name: "Premium",
            price: 14500,
            delivery: "7 weeks",
            scope: "Storefront plus a growth-ready brand system.",
            includes: [
              "Everything in Standard",
              "Email + social templates",
              "Packaging artwork",
              "Unlimited revisions (7 wks)",
            ],
          },
        ],
      },
      tokens: "1,980",
      latency: "3.2s",
    };
  if (agentId === "finance")
    return {
      id,
      agentId,
      agent: "Finance Agent",
      icon: "receipt",
      tint: "emerald",
      title: "Drafted invoice INV-006 from time logs — Harbor",
      time: "Just now",
      summary: "Invoice built from 16 logged hours on Harbor Wellness.",
      input:
        "Project: Harbor Wellness — Rebrand\nRead 16 billable hours from time log @ $150/hr.\nNet-14 terms.",
      docType: "invoice",
      doc: {
        num: "INV-006",
        client: "Harbor Wellness",
        due: "Jun 20",
        items: [
          { desc: "Identity directions — 16 hrs @ $150", qty: 16, rate: 150 },
        ],
        amount: 2400,
      },
      tokens: "910",
      latency: "1.8s",
    };
  if (agentId === "project-mgr")
    return makeWeeklyUpdateRun(
      "Lumen Coffee — Brand & Site",
      "Lumen Coffee Co.",
      "maya@lumencoffee.com",
    );
  if (agentId === "comms")
    return {
      id,
      agentId,
      agent: "Client Comms",
      icon: "message",
      tint: "amber",
      title: "Drafted reply to Maya (Lumen Coffee)",
      time: "Just now",
      summary:
        "Reply drafted to a new client message — Calendly link appended.",
      input:
        "Incoming message from Maya Okonkwo (Lumen Coffee):\n“Could we hop on a quick call about the wholesale page?”\nContext detected: first meeting request → Calendly link auto-appended.",
      docType: "note",
      doc: {
        note: "Hi Maya — happy to talk it through! The wholesale page is a great candidate to ship first; I’ll walk you through a couple of layout options on the call.\n\nGrab whatever time works for you here: calendly.com/jordan-rivera/intro\n\nTalk soon,\nJordan",
      },
      tokens: "760",
      latency: "1.5s",
    };
  if (agentId === "content")
    return makeLinkedinRun("Lumen Coffee — Brand & Site", false);
  // fallback
  return {
    id,
    agentId,
    agent: "Agent",
    icon: "sparkle",
    tint: "indigo",
    title: "Drafted output",
    time: "Just now",
    summary: "Draft ready for review.",
    input: "—",
    docType: "note",
    doc: { note: "Draft content." },
    tokens: "1,000",
    latency: "2.0s",
  };
}

// ---- contextual run builders ----
function makeTranscriptRun(transcript, clientName) {
  return {
    id: "r" + Date.now(),
    agentId: "project-mgr",
    agent: "Project Manager",
    icon: "listChecks",
    tint: "emerald",
    title: "Extracted requirements from call transcript",
    time: "Just now",
    summary:
      "Requirements, budget, and action items pulled from your call" +
      (clientName ? " with " + clientName : "") +
      ".",
    input:
      "Pasted call transcript (" +
      (transcript ? transcript.length : 0) +
      " chars).\nTask: extract client requirements, budget, deadline, action items, and a suggested project name.",
    docType: "transcript",
    doc: {
      projectName: (clientName || "New Client") + " — Brand & Website",
      budget: "$10–14k",
      deadline: "Aug 15",
      requirements: [
        "Full brand identity — logo, type, color system",
        "Marketing website, ~6 pages, editable CMS",
        "Mobile-first; fast load times are a priority",
        "Wants a “premium but approachable” feel",
      ],
      actionItems: [
        { text: "Send a 3-tier proposal by end of week" },
        { text: "Share 3 relevant case studies" },
        { text: "Confirm launch deadline of Aug 15" },
        { text: "Add a wholesale page to scope (mentioned late in call)" },
      ],
    },
    model: "Claude Sonnet",
    tokens: "2,640",
    latency: "4.8s",
  };
}
function makeChangeNoticeRun(project) {
  const sc = project.scopeCreep;
  return {
    id: "r" + Date.now(),
    agentId: "project-mgr",
    agent: "Project Manager",
    icon: "listChecks",
    tint: "amber",
    title: "Drafted scope change notice — " + project.client,
    time: "Just now",
    summary:
      "A client-ready notice for the out-of-scope request on " +
      project.name +
      ".",
    input:
      "Project: " +
      project.name +
      "\nDetected request outside original proposal:\n“" +
      sc.requested +
      "”\n" +
      sc.source,
    docType: "changeNotice",
    doc: {
      estHours: sc.estHours,
      estCost: sc.estCost,
      estWeeks: sc.estWeeks,
      body:
        "# Scope Change Notice\n\nHi " +
        project.client.split(" ")[0] +
        ",\n\nThanks for the note about adding **" +
        sc.requested.toLowerCase() +
        "**. I love the idea — flagging that it sits outside our original agreement so we keep everything transparent.\n\n## What changes\n" +
        sc.original +
        "\n\n## Impact\n- **Additional effort:** ~" +
        sc.estHours +
        " hours\n- **Additional cost:** $" +
        sc.estCost.toLocaleString() +
        "\n- **Timeline:** +" +
        sc.estWeeks +
        " week" +
        (sc.estWeeks > 1 ? "s" : "") +
        "\n\nIf you’re happy to proceed, I’ll send an updated invoice and timeline. Otherwise we stay on plan — no pressure at all.\n\nBest,\nJordan",
    },
    model: "Claude Sonnet",
    tokens: "1,340",
    latency: "2.6s",
  };
}
function makeWeeklyUpdateRun(projectName, clientName, clientEmail) {
  return {
    id: "r" + Date.now(),
    agentId: "project-mgr",
    agent: "Project Manager",
    icon: "listChecks",
    tint: "emerald",
    title: "Drafted weekly update — " + (clientName || projectName),
    time: "Just now",
    summary:
      "Automated weekly update ready to send to " +
      (clientName || "the client") +
      ".",
    input:
      "Project: " +
      projectName +
      "\nTrigger: scheduled weekly update.\nSummarised milestones, next steps, and blockers from the project record.",
    docType: "weeklyUpdate",
    doc: {
      subject:
        "Your weekly update — " + (projectName.split(" — ")[0] || projectName),
      to: clientName + (clientEmail ? " <" + clientEmail + ">" : ""),
      intro:
        "Hi " +
        (clientName ? clientName.split(" ")[0] : "there") +
        ", here’s where things stand this week.",
      completed: [
        "Brand identity & guide signed off",
        "Homepage hi-fi design delivered",
      ],
      next: ["Build out remaining 5 pages", "Wholesale page content review"],
      blockers: ["Waiting on final product photography"],
    },
    model: "Claude Sonnet",
    tokens: "1,120",
    latency: "2.2s",
  };
}
function makeLinkedinRun(projectName, connected) {
  return {
    id: "r" + Date.now(),
    agentId: "content",
    agent: "Content & Brand",
    icon: "palette",
    tint: "amber",
    title: "Drafted LinkedIn post — " + projectName.split(" — ")[0],
    time: "Just now",
    summary: "A hook-first LinkedIn post ready to schedule.",
    input:
      "Project: " +
      projectName +
      "\nTask: write a short, hook-first LinkedIn post with a CTA, from the finished work.",
    docType: "linkedin",
    doc: {
      connected,
      text: "Most brands wait until they’ve “made it” to look the part.\n\nThe smart ones do it backwards.\n\nJust wrapped a brand + site for a coffee company opening their second location — and watching a small team suddenly look like a national brand never gets old.\n\nIf you’re scaling and your brand hasn’t caught up yet, let’s talk. 👇",
      scheduleDate: "",
      scheduleTime: "09:00",
    },
    model: "Claude Sonnet",
    tokens: "980",
    latency: "2.0s",
  };
}
function makeTestimonialRun(clientName, company) {
  return {
    id: "r" + Date.now(),
    agentId: "comms",
    agent: "Client Comms",
    icon: "message",
    tint: "amber",
    title: "Drafted testimonial request — " + (company || clientName),
    time: "Just now",
    summary:
      "A warm testimonial request ready to send to " +
      (clientName || "the client") +
      ".",
    input:
      "Trigger: invoice marked paid for " +
      (company || clientName) +
      ".\nTask: draft a short, warm email requesting a testimonial.",
    docType: "testimonialReq",
    doc: {
      note:
        "Hi " +
        (clientName ? clientName.split(" ")[0] : "there") +
        ",\n\nIt’s been such a pleasure working with you — thank you again for the trust.\n\nWould you be open to sharing a sentence or two about the experience? It helps other founders know what to expect, and means a lot to a small studio like mine. No pressure, and feel free to edit anything I draft for you.\n\nWith thanks,\nJordan",
    },
    model: "Claude Sonnet",
    tokens: "720",
    latency: "1.4s",
  };
}
function makeCaseStudyRun(projectName) {
  return {
    id: "r" + Date.now(),
    agentId: "content",
    agent: "Content & Brand",
    icon: "palette",
    tint: "amber",
    title: "Drafted case study — " + projectName.split(" — ")[0],
    time: "Just now",
    summary: "Case study drafted from the completed project.",
    input:
      "Project: " +
      projectName +
      " (Complete)\nPulled milestones, deliverables, and outcomes from the project record.",
    docType: "caseStudy",
    doc: {
      note:
        "# " +
        projectName.split(" — ")[0] +
        " — Case Study\n\n## The challenge\nThe client needed to look like the category leader, fast.\n\n## What we did\nA full brand and web engagement delivered on time and on budget, with a system the team can extend.\n\n## The outcome\nA launch that punched well above the company’s size — and a client who’s already referred two more.",
    },
    model: "Claude Sonnet",
    tokens: "1,840",
    latency: "3.9s",
  };
}

function App() {
  const [mode, setMode] = useState("app"); // 'app' | 'portal'
  const [onboarding, setOnboarding] = useState(() => {
    try {
      return !localStorage.getItem("agentdesk_onboarded");
    } catch (e) {
      return true;
    }
  });
  const [view, setView] = useState("dashboard");
  const [detail, setDetail] = useState(null); // { type, id }
  const [w, setW] = useState(window.innerWidth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // mutable data
  const [clients, setClients] = useState(CLIENTS);
  const [proposals, setProposals] = useState(PROPOSALS);
  const [projects, setProjects] = useState(PROJECTS);
  const [invoices, setInvoices] = useState(INVOICES);
  const [approvals, setApprovals] = useState(APPROVALS);
  const [activity, setActivity] = useState(ACTIVITY);
  const [usage, setUsage] = useState(USAGE);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [completions, setCompletions] = useState(COMPLETIONS);
  const [activeApproval, setActiveApproval] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const r = () => setW(window.innerWidth);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  const layout = w >= 1024 ? "full" : w >= 700 ? "rail" : "mobile";
  const sidebarW = layout === "full" ? 240 : layout === "rail" ? 64 : 0;

  const toast = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, ...opts }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const go = useCallback((v, d = null) => {
    setView(v);
    setDetail(d);
    setActiveApproval(null);
    setMobileNavOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const openApproval = useCallback((id) => {
    setView("approval");
    setDetail(null);
    setActiveApproval(id);
    setMobileNavOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const pushActivity = (a) =>
    setActivity((list) => [
      { id: "act" + Date.now(), time: "Just now", ...a },
      ...list,
    ]);

  const runAgent = useCallback((agentId) => {
    const run = makeRun(agentId);
    return runCustom(run);
  }, []);

  const runCustom = useCallback(
    (run) => {
      setApprovals((a) => [run, ...a]);
      setUsage((u) => ({ ...u, used: Math.min(u.limit, u.used + 1) }));
      pushActivity({
        icon: run.icon,
        text: run.agent + " produced a draft",
        meta: run.title.replace(/^[^—]*— ?/, ""),
        tint: run.tint,
      });
      toast(run.agent + " finished — 1 approval pending", {
        icon: run.icon,
        tint: run.tint,
      });
      return run;
    },
    [toast],
  );

  // contextual runners
  const runTranscript = useCallback(
    (text, clientName) => runCustom(makeTranscriptRun(text, clientName)),
    [runCustom],
  );
  const runChangeNotice = useCallback(
    (project) => runCustom(makeChangeNoticeRun(project)),
    [runCustom],
  );
  const runWeeklyUpdate = useCallback(
    (project) =>
      runCustom(makeWeeklyUpdateRun(project.name, project.client, "")),
    [runCustom],
  );
  const runLinkedin = useCallback(
    (project) => {
      const li = integrations.find((x) => x.id === "linkedin");
      return runCustom(
        makeLinkedinRun(project.name || project, li ? li.connected : false),
      );
    },
    [runCustom, integrations],
  );
  const runCaseStudy = useCallback(
    (project) => runCustom(makeCaseStudyRun(project.name || project)),
    [runCustom],
  );
  const runTestimonial = useCallback(
    (clientName, company) => runCustom(makeTestimonialRun(clientName, company)),
    [runCustom],
  );

  // project mutations
  const addTimeLog = useCallback(
    (projectId, entry) => {
      setProjects((ps) =>
        ps.map((p) =>
          p.id === projectId
            ? {
                ...p,
                timeLogs: [
                  { id: "tl" + Date.now(), ...entry },
                  ...(p.timeLogs || []),
                ],
              }
            : p,
        ),
      );
      toast("Time logged — " + entry.hours + " hrs", {
        icon: "clock",
        tint: "emerald",
      });
    },
    [toast],
  );
  const toggleBillable = useCallback((projectId, logId) => {
    setProjects((ps) =>
      ps.map((p) =>
        p.id === projectId
          ? {
              ...p,
              timeLogs: p.timeLogs.map((l) =>
                l.id === logId ? { ...l, billable: !l.billable } : l,
              ),
            }
          : p,
      ),
    );
  }, []);
  const dismissScopeCreep = useCallback(
    (projectId) => {
      setProjects((ps) =>
        ps.map((p) => (p.id === projectId ? { ...p, scopeCreep: null } : p)),
      );
      toast("Scope flag dismissed", { icon: "x" });
    },
    [toast],
  );
  const setWeeklyUpdates = useCallback(
    (projectId, on, day) => {
      setProjects((ps) =>
        ps.map((p) =>
          p.id === projectId
            ? { ...p, weeklyUpdates: on, weeklyDay: day || p.weeklyDay }
            : p,
        ),
      );
      toast("Weekly updates " + (on ? "enabled" : "paused"), {
        icon: "calendar",
        tint: on ? "emerald" : "zinc",
      });
    },
    [toast],
  );
  const toggleIntegration = useCallback(
    (id) => {
      let nowConnected;
      setIntegrations((ints) =>
        ints.map((x) => {
          if (x.id === id) {
            nowConnected = !x.connected;
            return { ...x, connected: nowConnected };
          }
          return x;
        }),
      );
      setTimeout(
        () =>
          toast(
            (nowConnected ? "Connected " : "Disconnected ") +
              (INTEGRATIONS.find((i) => i.id === id) || {}).name,
            {
              icon: nowConnected ? "checkCircle" : "x",
              tint: nowConnected ? "emerald" : "zinc",
            },
          ),
        0,
      );
    },
    [toast],
  );
  const addTestimonial = useCallback(
    (t) => setTestimonials((ts) => [{ id: "ts" + Date.now(), ...t }, ...ts]),
    [],
  );

  const addLead = useCallback(
    (lead, runScout) => {
      const client = {
        id: "lead" + Date.now(),
        name: lead.name,
        company: lead.company,
        status: "Lead",
        source:
          lead.platform === "Referral"
            ? "Referral"
            : lead.platform === "Cold inbound" ||
                lead.platform === "Website form"
              ? "Inbound"
              : "Manual",
        platform: lead.platform,
        activity: "Just now",
        email:
          lead.email ||
          (lead.name || "lead").toLowerCase().replace(/\s/g, ".") +
            "@" +
            (lead.company || "company").toLowerCase().replace(/[^a-z]/g, "") +
            ".com",
        desc: lead.desc,
        budget: lead.budget,
      };
      setClients((c) => [client, ...c]);
      pushActivity({
        icon: "clients",
        text: "Lead added",
        meta: lead.name + " · " + lead.company,
        tint: "indigo",
      });
      if (runScout) {
        toast("Lead saved — running Lead Scout…", {
          icon: "radar",
          tint: "indigo",
        });
        setTimeout(() => runCustom(makeRun("lead-scout")), 350);
      } else {
        toast("Lead added — " + lead.name, {
          icon: "checkCircle",
          tint: "emerald",
        });
      }
      return client;
    },
    [toast, runCustom],
  );

  const approve = useCallback(
    (ap, editedDoc) => {
      const doc = editedDoc || ap.doc;
      if (ap.docType === "leads") {
        const newClients = doc.leads.map((l, i) => ({
          id: "lead" + Date.now() + i,
          name: l.contact,
          company: l.company,
          status: "Lead",
          source: "Lead Scout",
          activity: "Just now",
          email:
            l.contact.toLowerCase().replace(/\s/g, ".") +
            "@" +
            l.company.toLowerCase().replace(/[^a-z]/g, "") +
            ".com",
        }));
        setClients((c) => [...newClients, ...c]);
        toast(
          doc.leads.length +
            " lead" +
            (doc.leads.length === 1 ? "" : "s") +
            " added · outreach sent",
          { icon: "send", tint: "indigo" },
        );
      } else if (ap.docType === "proposal") {
        const amount = doc.tiers
          ? (doc.tiers.find((t) => t.name === doc.recommended) || doc.tiers[0])
              .price
          : doc.amount;
        setProposals((p) => [
          {
            id: "np" + Date.now(),
            title: doc.title.replace(/ — .*/, ""),
            client: doc.client,
            amount,
            status: "Draft",
            sent: "—",
            tiers: doc.tiers,
            body: doc.body,
          },
          ...p,
        ]);
        toast("Proposal saved as draft", { icon: "proposals", tint: "indigo" });
      } else if (ap.docType === "invoice") {
        setInvoices((iv) => [
          {
            id: "ni" + Date.now(),
            num: doc.num,
            client: doc.client,
            amount: doc.amount,
            due: doc.due,
            status: "Draft",
            items: doc.items,
            tax: 0,
          },
          ...iv,
        ]);
        toast("Invoice " + doc.num + " saved as draft", {
          icon: "invoices",
          tint: "emerald",
        });
      } else if (ap.docType === "transcript") {
        toast("Requirements saved · Proposal Agent pre-filled", {
          icon: "listChecks",
          tint: "emerald",
        });
      } else if (ap.docType === "changeNotice") {
        toast("Scope change notice sent to client", {
          icon: "send",
          tint: "amber",
        });
      } else if (ap.docType === "weeklyUpdate") {
        toast("Weekly update sent to client", {
          icon: "send",
          tint: "emerald",
        });
      } else if (ap.docType === "linkedin") {
        const li = integrations.find((x) => x.id === "linkedin");
        toast(
          doc.scheduleDate
            ? "LinkedIn post scheduled for " + doc.scheduleDate
            : li && li.connected
              ? "Posted to LinkedIn"
              : "Post copied to clipboard",
          { icon: "external", tint: "amber" },
        );
        if (doc.text && navigator.clipboard && !(li && li.connected))
          navigator.clipboard.writeText(doc.text).catch(() => {});
        advanceCompletion(ap.completion, "linkedin");
      } else if (ap.docType === "caseStudy") {
        toast("Case study saved to Social Proof", {
          icon: "palette",
          tint: "amber",
        });
        advanceCompletion(ap.completion, "casestudy");
      } else if (ap.docType === "testimonialReq") {
        toast("Testimonial request sent", { icon: "send", tint: "amber" });
        advanceCompletion(ap.completion, "testimonial");
      } else {
        toast(ap.agent + " output approved", {
          icon: "checkCircle",
          tint: "emerald",
        });
      }
      setApprovals((a) => a.filter((x) => x.id !== ap.id));
      pushActivity({
        icon: "checkCircle",
        text: "Approved " + ap.agent + " output",
        meta: ap.title.replace(/^[^—]*— ?/, ""),
        tint: "emerald",
      });
      setActiveApproval(null);
      go("dashboard");
    },
    [toast, go, integrations],
  );

  const advanceCompletion = (cmpId, stepKey) => {
    if (!cmpId) return;
    setCompletions((cs) =>
      cs.map((c) =>
        c.id === cmpId
          ? {
              ...c,
              steps: c.steps.map((s) =>
                s.key === stepKey ? { ...s, status: "done" } : s,
              ),
            }
          : c,
      ),
    );
  };

  // mark an invoice paid -> spin up / surface its post-project sequence
  const markInvoicePaid = useCallback(
    (invoiceId) => {
      setInvoices((iv) =>
        iv.map((x) =>
          x.id === invoiceId
            ? { ...x, status: "Paid", paid: "Just now", overdueDays: undefined }
            : x,
        ),
      );
      const inv = invoices.find((x) => x.id === invoiceId);
      if (inv) {
        toast("Invoice " + inv.num + " marked paid 🎉", {
          icon: "checkCircle",
          tint: "emerald",
        });
        setCompletions((cs) =>
          cs.some((c) => c.invoice === inv.num)
            ? cs
            : [
                {
                  id: "cmp" + Date.now(),
                  project: inv.client + " — Project",
                  client: inv.client,
                  invoice: inv.num,
                  paid: "Just now",
                  steps: [
                    {
                      key: "invoice",
                      label: "Invoice paid",
                      icon: "receipt",
                      status: "done",
                    },
                    {
                      key: "casestudy",
                      label: "Case study draft",
                      icon: "palette",
                      status: "pending",
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
                ...cs,
              ],
        );
      }
    },
    [toast, invoices],
  );

  const reject = useCallback(
    (ap) => {
      setApprovals((a) => a.filter((x) => x.id !== ap.id));
      pushActivity({
        icon: "x",
        text: "Rejected " + ap.agent + " output",
        meta: ap.title.replace(/^[^—]*— ?/, ""),
        tint: "rose",
      });
      toast(ap.agent + " output rejected", { icon: "x", tint: "rose" });
      setActiveApproval(null);
      go("dashboard");
    },
    [toast, go],
  );

  const copyPortal = useCallback(
    (client) => {
      const token =
        (client.company || "client")
          .toLowerCase()
          .replace(/[^a-z]/g, "")
          .slice(0, 8) +
        "-" +
        Math.random().toString(36).slice(2, 8);
      const url = "agentdesk.app/client/" + token;
      if (navigator.clipboard)
        navigator.clipboard.writeText("https://" + url).catch(() => {});
      toast("Portal link copied — " + url, { icon: "link", tint: "indigo" });
    },
    [toast],
  );

  const app = {
    view,
    go,
    openApproval,
    detail,
    layout,
    clients,
    proposals,
    projects,
    invoices,
    approvals,
    activity,
    usage,
    integrations,
    testimonials,
    completions,
    runAgent,
    runCustom,
    runTranscript,
    runChangeNotice,
    runWeeklyUpdate,
    runLinkedin,
    runCaseStudy,
    runTestimonial,
    addTimeLog,
    toggleBillable,
    dismissScopeCreep,
    setWeeklyUpdates,
    toggleIntegration,
    addTestimonial,
    addLead,
    markInvoicePaid,
    approve,
    reject,
    copyPortal,
    toast,
    activeApproval,
    setActiveApproval,
    setMode,
    startOnboarding: () => setOnboarding(true),
  };

  // ---------- ONBOARDING ----------
  if (onboarding) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(OnboardingWizard, {
        app,
        onExit: (dest) => {
          setOnboarding(false);
          if (dest) go(dest);
        },
      }),
      React.createElement(ToastHost, { toasts }),
    );
  }

  // ---------- PORTAL MODE ----------
  if (mode === "portal") {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(PortalView, { app, exit: () => setMode("app") }),
      React.createElement(ToastHost, { toasts }),
    );
  }

  // ---------- APP MODE ----------
  const pendingCount = approvals.length;

  const viewNode = (() => {
    if (view === "dashboard")
      return React.createElement(DashboardView, { app });
    if (view === "approval") return React.createElement(ApprovalView, { app });
    if (view === "clients") return React.createElement(ClientsView, { app });
    if (view === "proposals")
      return React.createElement(ProposalsView, { app });
    if (view === "projects") return React.createElement(ProjectsView, { app });
    if (view === "invoices") return React.createElement(InvoicesView, { app });
    if (view === "agents") return React.createElement(AgentsView, { app });
    if (view === "integrations")
      return React.createElement(IntegrationsView, { app });
    if (view === "team") return React.createElement(TeamView, { app });
    if (view === "settings") return React.createElement(SettingsView, { app });
    return null;
  })();

  return React.createElement(
    "div",
    { style: { minHeight: "100vh", background: "var(--bg-subtle)" } },
    // Sidebar
    layout !== "mobile" &&
      React.createElement(Sidebar, { layout, view, go, pendingCount, usage }),
    // Topbar
    React.createElement(Topbar, {
      app,
      layout,
      sidebarW,
      pendingCount,
      onMenu: () => setMobileNavOpen(true),
    }),
    // Main
    React.createElement(
      "main",
      {
        style: {
          marginLeft: sidebarW,
          paddingTop: "var(--topbar-h)",
          paddingBottom: layout === "mobile" ? 76 : 0,
          minHeight: "100vh",
          transition: "margin-left .18s",
        },
      },
      React.createElement(
        "div",
        {
          key: view + (detail ? detail.id : "") + (activeApproval || ""),
          style: {
            maxWidth: 1180,
            margin: "0 auto",
            padding: layout === "mobile" ? "20px 16px" : "28px 32px",
          },
        },
        viewNode,
      ),
    ),
    // Mobile bottom nav
    layout === "mobile" &&
      React.createElement(MobileNav, { view, go, pendingCount }),
    React.createElement(ToastHost, { toasts }),
  );
}

/* ---------------- Sidebar ---------------- */
function Sidebar({ layout, view, go, pendingCount, usage }) {
  const rail = layout === "rail";
  const overPct = (usage.used / usage.limit) * 100;
  return React.createElement(
    "aside",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: rail ? 64 : 240,
        zIndex: 60,
        background: "var(--side-bg)",
        borderRight: "1px solid var(--side-border)",
        display: "flex",
        flexDirection: "column",
        transition: "width .18s",
        overflow: "hidden",
      },
    },
    // brand
    React.createElement(
      "div",
      {
        style: {
          height: "var(--topbar-h)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: rail ? "0" : "0 18px",
          justifyContent: rail ? "center" : "flex-start",
          borderBottom: "1px solid var(--side-border)",
        },
      },
      React.createElement(Logo, { size: 28 }),
      !rail &&
        React.createElement(
          "span",
          {
            style: {
              color: "#fff",
              fontWeight: 650,
              fontSize: 16,
              letterSpacing: "-0.02em",
            },
          },
          "AgentDesk",
        ),
    ),
    // nav
    React.createElement(
      "nav",
      {
        style: {
          flex: 1,
          padding: rail ? "12px 8px" : "12px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        },
      },
      NAV.map((n) =>
        React.createElement(SideLink, {
          key: n.id,
          n,
          active:
            view === n.id || (view === "approval" && n.id === "dashboard"),
          rail,
          onClick: () => go(n.id),
          badge: n.id === "agents" && pendingCount ? pendingCount : 0,
        }),
      ),
    ),
    // usage mini + user
    React.createElement(
      "div",
      {
        style: {
          padding: rail ? "10px 8px" : "12px",
          borderTop: "1px solid var(--side-border)",
        },
      },
      !rail &&
        React.createElement(
          "div",
          {
            style: {
              padding: "10px 12px",
              background: "var(--side-bg-2)",
              border: "1px solid var(--side-border)",
              borderRadius: "var(--r-md)",
              marginBottom: 10,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11.5,
                color: "var(--side-text)",
                marginBottom: 7,
                fontWeight: 500,
              },
            },
            React.createElement("span", null, "Agent runs"),
            React.createElement(
              "span",
              { style: { color: "#fff", fontVariantNumeric: "tabular-nums" } },
              usage.used + " / " + usage.limit,
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                height: 5,
                background: "#000",
                borderRadius: 99,
                overflow: "hidden",
              },
            },
            React.createElement("div", {
              style: {
                width: overPct + "%",
                height: "100%",
                background:
                  overPct >= 95
                    ? "var(--rose-500)"
                    : overPct >= 80
                      ? "var(--amber-500)"
                      : "var(--indigo-500)",
                borderRadius: 99,
              },
            }),
          ),
        ),
      React.createElement(
        "button",
        {
          onClick: () => go("settings"),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: rail ? 0 : "7px 8px",
            justifyContent: rail ? "center" : "flex-start",
            background: "transparent",
            border: "none",
            borderRadius: "var(--r-md)",
            cursor: "pointer",
            color: "var(--side-text)",
          },
        },
        React.createElement(Avatar, {
          initials: WORKSPACE.initials,
          color: WORKSPACE.avatarColor,
          size: 30,
        }),
        !rail &&
          React.createElement(
            "div",
            { style: { textAlign: "left", overflow: "hidden" } },
            React.createElement(
              "div",
              {
                style: {
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 550,
                  whiteSpace: "nowrap",
                },
              },
              WORKSPACE.freelancer,
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "var(--side-text)",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    display: "inline-block",
                    padding: "0px 6px",
                    borderRadius: 99,
                    background: "var(--side-active)",
                    color: "var(--side-active-text)",
                    fontWeight: 600,
                    fontSize: 10,
                  },
                },
                WORKSPACE.plan,
              ),
            ),
          ),
      ),
    ),
  );
}

function SideLink({ n, active, rail, onClick, badge }) {
  const [h, setH] = useState(false);
  return React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      title: rail ? n.label : undefined,
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: rail ? "0" : "8px 12px",
        height: rail ? 42 : "auto",
        justifyContent: rail ? "center" : "flex-start",
        background: active
          ? "var(--side-active)"
          : h
            ? "rgba(255,255,255,0.05)"
            : "transparent",
        color: active
          ? "var(--side-active-text)"
          : h
            ? "#fff"
            : "var(--side-text)",
        border: "none",
        borderRadius: "var(--r-md)",
        cursor: "pointer",
        fontSize: 13.5,
        fontWeight: active ? 600 : 500,
        transition: "background .12s, color .12s",
        letterSpacing: "-0.01em",
      },
    },
    React.createElement(Icon, {
      name: n.icon,
      size: 18,
      strokeWidth: active ? 2 : 1.8,
    }),
    !rail && n.label,
    badge
      ? React.createElement(
          "span",
          {
            style: {
              marginLeft: "auto",
              minWidth: 18,
              height: 18,
              padding: "0 5px",
              borderRadius: 99,
              background: "var(--rose-500)",
              color: "#fff",
              fontSize: 10.5,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          badge,
        )
      : null,
    rail && badge
      ? React.createElement("span", {
          style: {
            position: "absolute",
            top: 6,
            right: 8,
            width: 7,
            height: 7,
            borderRadius: 99,
            background: "var(--rose-500)",
            border: "1.5px solid var(--side-bg)",
          },
        })
      : null,
  );
}

/* ---------------- Topbar ---------------- */
function Topbar({ app, layout, sidebarW, pendingCount, onMenu }) {
  const titles = {
    dashboard: "Dashboard",
    approval: "Review",
    clients: "Clients",
    proposals: "Proposals",
    projects: "Projects",
    invoices: "Invoices",
    agents: "Agents",
    integrations: "Integrations",
    team: "Team",
    settings: "Settings",
  };
  const [searchFocus, setSearchFocus] = useState(false);
  return React.createElement(
    "header",
    {
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: sidebarW,
        height: "var(--topbar-h)",
        zIndex: 55,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "saturate(180%) blur(8px)",
        WebkitBackdropFilter: "saturate(180%) blur(8px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: layout === "mobile" ? "0 14px" : "0 24px",
        transition: "left .18s",
      },
    },
    layout === "mobile" &&
      React.createElement(IconButton, { name: "menu", onClick: onMenu }),
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 9, minWidth: 0 } },
      React.createElement(
        "span",
        {
          style: {
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--text)",
            whiteSpace: "nowrap",
          },
        },
        WORKSPACE.workspace,
      ),
      layout !== "mobile" &&
        React.createElement(Icon, {
          name: "chevronRight",
          size: 15,
          style: { color: "var(--zinc-300)" },
        }),
      layout !== "mobile" &&
        React.createElement(
          "span",
          { style: { fontSize: 14.5, color: "var(--text-muted)" } },
          titles[app.view] || "",
        ),
    ),
    React.createElement("div", { style: { flex: 1 } }),
    // search
    layout !== "mobile" &&
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: searchFocus ? 280 : 220,
            transition: "width .15s",
            padding: "7px 11px",
            background: "var(--bg-subtle)",
            border:
              "1px solid " +
              (searchFocus ? "var(--border-strong)" : "var(--border)"),
            borderRadius: "var(--r-md)",
          },
        },
        React.createElement(Icon, {
          name: "search",
          size: 15,
          style: { color: "var(--zinc-400)" },
        }),
        React.createElement("input", {
          placeholder: "Search clients, invoices…",
          onFocus: () => setSearchFocus(true),
          onBlur: () => setSearchFocus(false),
          style: {
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "var(--text)",
            width: "100%",
          },
        }),
      ),
    React.createElement(IconButton, {
      name: "bell",
      onClick: () => app.go("dashboard"),
      badge: pendingCount || undefined,
      title: pendingCount + " pending approvals",
    }),
    React.createElement(
      "button",
      {
        onClick: () => app.setMode("portal"),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 11px",
          fontSize: 12.5,
          fontWeight: 550,
          color: "var(--zinc-700)",
          background: "#fff",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--r-md)",
          cursor: "pointer",
          whiteSpace: "nowrap",
        },
        title: "Preview the client portal",
      },
      React.createElement(Icon, { name: "eye", size: 15 }),
      layout === "mobile" ? null : "Portal preview",
    ),
  );
}

/* ---------------- Mobile bottom nav ---------------- */
function MobileNav({ view, go, pendingCount }) {
  const items = NAV.filter((n) =>
    ["dashboard", "clients", "proposals", "invoices", "agents"].includes(n.id),
  );
  return React.createElement(
    "nav",
    {
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "var(--side-bg)",
        borderTop: "1px solid var(--side-border)",
        display: "flex",
        zIndex: 60,
        paddingBottom: "env(safe-area-inset-bottom)",
      },
    },
    items.map((n) => {
      const active =
        view === n.id || (view === "approval" && n.id === "dashboard");
      return React.createElement(
        "button",
        {
          key: n.id,
          onClick: () => go(n.id),
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            position: "relative",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: active ? "var(--side-active-text)" : "var(--side-text)",
          },
        },
        React.createElement(Icon, {
          name: n.icon,
          size: 20,
          strokeWidth: active ? 2 : 1.8,
        }),
        React.createElement(
          "span",
          { style: { fontSize: 10.5, fontWeight: active ? 600 : 500 } },
          n.label,
        ),
        n.id === "agents" && pendingCount
          ? React.createElement("span", {
              style: {
                position: "absolute",
                top: 8,
                right: "50%",
                marginRight: -16,
                width: 7,
                height: 7,
                borderRadius: 99,
                background: "var(--rose-500)",
              },
            })
          : null,
      );
    }),
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App),
);
