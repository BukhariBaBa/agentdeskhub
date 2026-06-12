export type MockProposal = {
  id: string;
  title: string;
  client: string;
  clientId: string;
  amount: number;
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
  sent: string;
};

export const MOCK_PROPOSALS: MockProposal[] = [
  {
    id: "p1",
    title: "Brand Identity & Website",
    client: "Lumen Coffee Co.",
    clientId: "c1",
    amount: 12500,
    status: "Accepted",
    sent: "May 15",
  },
  {
    id: "p2",
    title: "Mobile App UI Refresh",
    client: "Northwind Apps",
    clientId: "c2",
    amount: 18000,
    status: "Sent",
    sent: "May 28",
  },
  {
    id: "p3",
    title: "Rebrand & Design System",
    client: "Harbor Wellness",
    clientId: "c3",
    amount: 14200,
    status: "Accepted",
    sent: "Apr 30",
  },
  {
    id: "p4",
    title: "E-commerce Redesign",
    client: "Sage & Stone",
    clientId: "c4",
    amount: 9800,
    status: "Draft",
    sent: "—",
  },
];
