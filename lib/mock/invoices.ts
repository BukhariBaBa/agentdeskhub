export type MockInvoiceItem = {
  desc: string;
  qty: number;
  rate: number;
};

export type MockInvoice = {
  id: string;
  num: string;
  client: string;
  clientId: string;
  amount: number;
  due: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  paid?: string;
  overdueDays?: number;
  items: MockInvoiceItem[];
  tax: number;
};

const INV_ITEMS: MockInvoiceItem[] = [
  { desc: "Brand identity system", qty: 1, rate: 4000 },
  { desc: "Website design (6 pages)", qty: 1, rate: 1750 },
  { desc: "Launch kit & templates", qty: 1, rate: 500 },
];

export const MOCK_INVOICES: MockInvoice[] = [
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
