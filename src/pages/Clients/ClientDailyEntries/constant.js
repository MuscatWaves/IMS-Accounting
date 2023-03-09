export const predashoptions = (params, access, hub) => [
  {
    id: 1,
    title: "Attendance Report",
    path: `/accounting/client/entries/attendanceReport/${params.id}/${params.name}`,
    disabled: !access.attendance,
  },
  {
    id: 2,
    title: "Bank Statement",
    path: `/accounting/client/entries/bs/${params.id}/${params.name}`,
    disabled: !access.bankStatement,
  },
  {
    id: 3,
    title: "Closing Stock with Values",
    path: `/accounting/client/entries/closingStock/${params.id}/${params.name}`,
    disabled: !access.closingStockwithvalues,
  },
  {
    id: 5,
    title: "Excel Cash & Bank Statements",
    path: `/accounting/client/entries/cashBankStatement/${params.id}/${params.name}`,
    disabled: !access.excelCashBankPayments,
  },
  {
    id: 6,
    title: "GRV Report",
    path: `/accounting/client/entries/grvReport/${params.id}/${params.name}`,
    disabled: !access.grv,
  },
  {
    id: 7,
    title: "Inventory Stock In Out Ledger",
    path: `/accounting/client/entries/inventoryStockLedger/${params.id}/${params.name}`,
    disabled: !access.inventoryStockInOutLedger,
  },
  {
    id: 8,
    title: "Item Expiry",
    path: `/accounting/client/entries/itemExpiry/${params.id}/${params.name}`,
    disabled: !access.itemExpiry,
  },
  {
    id: 9,
    title: "Merchant Summary",
    path: `/accounting/client/entries/merchantSummary/${params.id}/${params.name}`,
    disabled: !access.merchantSummary,
  },
  {
    id: 10,
    title: "Monthly Discount",
    path: `/accounting/client/entries/monthlyDiscount/${params.id}/${params.name}`,
    disabled: !access.monthlyDiscount,
  },
  {
    id: 11,
    title: "Monthly Offers",
    path: `/accounting/client/entries/monthlyOffers/${params.id}/${params.name}`,
    disabled: !access.monthlyOffers,
  },
  {
    id: 12,
    title: "Ooredoo & Omantel Sales & Payment Balance",
    path: `/accounting/client/entries/ooPayment/${params.id}/${params.name}`,
    disabled: !access.ooredooOmantelSalesPaymentBalance,
  },
  {
    id: 13,
    title: "Outstanding Statement Supplier",
    path: `/accounting/client/entries/outstandingStatement/${params.id}/${params.name}`,
    disabled: !access.outstandingStatementSupplier,
  },
  {
    id: 14,
    title: "Payment Voucher Scan",
    path: `/accounting/client/entries/paymentVoucherScan/${params.id}/${params.name}`,
    disabled: !access.paymentVoucherScan,
  },
  {
    id: 15,
    title: "Product Costing for Manufacturing",
    path: `/accounting/client/entries/pcm/${params.id}/${params.name}`,
    disabled: !access.productCostSheetForManufacturing,
  },
  {
    id: 16,
    title: "Product Costing for Services",
    path: `/accounting/client/entries/pcs/${params.id}/${params.name}`,
    disabled: !access.productCostSheetForServices,
  },
  {
    id: 17,
    title: "Purchases",
    path: `/accounting/client/dailentries/purchases/${params.id}/${params.name}`,
    disabled: !hub?.purchase.filter((entry) => entry.value).length > 0,
  },
  {
    id: 18,
    title: "Sales",
    path: `/accounting/client/dailentries/sales/${params.id}/${params.name}`,
    disabled: !hub?.sales.filter((entry) => entry.value).length > 0,
  },
];
