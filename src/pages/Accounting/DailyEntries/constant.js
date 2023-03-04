export const predashoptions = (params) => [
  {
    id: 1,
    title: "Attendance Report",
    path: `/accounting/entries/attendanceReport/${params.id}/${params.name}`,
  },
  {
    id: 2,
    title: "Bank Statement",
    path: `/accounting/entries/bs/${params.id}/${params.name}`,
  },
  {
    id: 3,
    title: "Closing Stock with Values",
    path: `/accounting/entries/closingStock/${params.id}/${params.name}`,
  },
  {
    id: 4,
    title: "Credit Sales",
    path: `/accounting/entries/creditSales/${params.id}/${params.name}`,
  },
  {
    id: 5,
    title: "Excel Cash & Bank Statements",
    path: `/accounting/entries/cashBankStatement/${params.id}/${params.name}`,
  },
  {
    id: 6,
    title: "GRV Report",
    path: `/accounting/entries/grvReport/${params.id}/${params.name}`,
  },
  {
    id: 7,
    title: "Inventory Stock In Out Ledger",
    path: `/accounting/entries/inventoryStockLedger/${params.id}/${params.name}`,
  },
  {
    id: 8,
    title: "Item Expiry",
    path: `/accounting/entries/itemExpiry/${params.id}/${params.name}`,
  },
  {
    id: 9,
    title: "Merchant Summary",
    path: `/accounting/entries/merchantSummary/${params.id}/${params.name}`,
  },
  {
    id: 10,
    title: "Monthly Discount",
    path: `/accounting/entries/monthlyDiscount/${params.id}/${params.name}`,
  },
  {
    id: 11,
    title: "Monthly Offers",
    path: `/accounting/entries/monthlyOffers/${params.id}/${params.name}`,
  },
  {
    id: 12,
    title: "Ooredoo & Omantel Sales & Payment Balance",
    path: `/accounting/entries/ooPayment/${params.id}/${params.name}`,
  },
  {
    id: 13,
    title: "Outstanding Statement Supplier",
    path: `/accounting/entries/outstandingStatement/${params.id}/${params.name}`,
  },
  {
    id: 14,
    title: "Payment Voucher Scan",
    path: `/accounting/entries/paymentVoucherScan/${params.id}/${params.name}`,
  },
  {
    id: 15,
    title: "Product Costing for Manufacturing",
    path: `/accounting/entries/pcm/${params.id}/${params.name}`,
  },
  {
    id: 16,
    title: "Product Costing for Services",
    path: `/accounting/entries/pcs/${params.id}/${params.name}`,
  },
  {
    id: 17,
    title: "Purchases",
    path: `/accounting/dailentries/purchases/${params.id}/${params.name}`,
  },
  {
    id: 18,
    title: "Sales",
    path: `/accounting/dailentries/sales/${params.id}/${params.name}`,
  },
];
