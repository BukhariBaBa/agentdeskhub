export type MockClient = {
  id: string;
  name: string;
  company: string;
  status: "Lead" | "Active" | "Past" | "Lost";
  source: string;
  platform: string;
  activity: string;
  email: string;
  fit?: number;
};

export const MOCK_CLIENTS: MockClient[] = [
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
