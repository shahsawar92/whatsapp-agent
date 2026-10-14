/**
 * The demo store. In production this is a WooCommerce API behind the same
 * interface; here it is fixed data so anyone can try the agent safely.
 */

export type Customer = { id: string; name: string; phone: string; email: string };

export type Order = {
  number: string;
  customerPhone: string;
  status: "processing" | "shipped" | "delivered" | "on-hold" | "cancelled";
  items: { name: string; qty: number }[];
  total: string;
  placedOn: string;
  lastUpdate: string;
  courier?: string;
  tracking?: string;
  eta?: string;
  note?: string;
  // Private fields the agent must never see:
  shippingAddress: string;
  paymentMethod: string;
};

export const STORE = {
  name: "Kohsar Coffee Co.",
  faq: [
    "Shipping inside Pakistan takes 2 to 4 working days with TCS or Leopards.",
    "Shipping is free on orders over Rs 5,000; otherwise it costs Rs 250.",
    "Unopened bags can be returned within 7 days of delivery for a full refund.",
    "Beans are roasted every Monday and Thursday and shipped within 48 hours of roasting.",
    "Support hours for humans are 10am to 7pm PKT, Monday to Saturday.",
  ],
};

export const CUSTOMERS: Customer[] = [
  { id: "ayesha", name: "Ayesha Khan", phone: "+92 300 111 2233", email: "ayesha@example.com" },
  { id: "bilal", name: "Bilal Ahmed", phone: "+92 321 444 5566", email: "bilal@example.com" },
  { id: "sara", name: "Sara Malik", phone: "+92 333 555 7788", email: "sara@example.com" },
];

export const ORDERS: Order[] = [
  {
    number: "1042",
    customerPhone: "+92 300 111 2233",
    status: "shipped",
    items: [{ name: "Hunza Highlands Espresso, 500g", qty: 2 }],
    total: "Rs 6,400",
    placedOn: "2026-10-10",
    lastUpdate: "Picked up by TCS from Islamabad hub",
    courier: "TCS",
    tracking: "TCS-77310485",
    eta: "2026-10-16",
    shippingAddress: "House 12, Street 4, F-7/2, Islamabad",
    paymentMethod: "Visa ending 4421",
  },
  {
    number: "1043",
    customerPhone: "+92 300 111 2233",
    status: "processing",
    items: [{ name: "Swat Valley Filter Roast, 250g", qty: 1 }, { name: "Ceramic dripper", qty: 1 }],
    total: "Rs 4,150",
    placedOn: "2026-10-13",
    lastUpdate: "Waiting for Thursday's roast",
    note: "Ships after the roast on 2026-10-15",
    shippingAddress: "House 12, Street 4, F-7/2, Islamabad",
    paymentMethod: "Cash on delivery",
  },
  {
    number: "1051",
    customerPhone: "+92 321 444 5566",
    status: "delivered",
    items: [{ name: "Decaf Night Owl, 250g", qty: 3 }],
    total: "Rs 5,700",
    placedOn: "2026-10-03",
    lastUpdate: "Delivered and signed for by B. Ahmed",
    courier: "Leopards",
    tracking: "LP-55120934",
    shippingAddress: "Flat 3B, Gulberg Heights, Lahore",
    paymentMethod: "Mastercard ending 0098",
  },
  {
    number: "1057",
    customerPhone: "+92 333 555 7788",
    status: "on-hold",
    items: [{ name: "Subscription: 1kg monthly", qty: 1 }],
    total: "Rs 9,800",
    placedOn: "2026-10-12",
    lastUpdate: "Bank transfer not yet received",
    note: "Will ship as soon as payment is confirmed",
    shippingAddress: "22-C, Phase 6, DHA, Karachi",
    paymentMethod: "Bank transfer (pending)",
  },
  {
    number: "1060",
    customerPhone: "+92 321 444 5566",
    status: "cancelled",
    items: [{ name: "Gift box: three origins", qty: 1 }],
    total: "Rs 7,200",
    placedOn: "2026-10-11",
    lastUpdate: "Cancelled at customer's request, refund issued",
    note: "Refund of Rs 7,200 sent on 2026-10-12; banks take 3 to 5 working days",
    shippingAddress: "Flat 3B, Gulberg Heights, Lahore",
    paymentMethod: "Mastercard ending 0098",
  },
];
