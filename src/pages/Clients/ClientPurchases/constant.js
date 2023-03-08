export const predashoptions = (params, access) => [
  {
    id: 5,
    title: "Purchase Invoice Scan",
    path: `/accounting/client/entries/purchaseInvoiceScan/${params.id}/${params.name}`,
    disabled: !access.purchaseInvoiceScan,
  },
  {
    id: 2,
    title: "Purchase Report",
    path: `/accounting/client/entries/purchaseReport/${params.id}/${params.name}`,
    disabled: !access.purchase,
  },
  {
    id: 3,
    title: "Purchase Return Report",
    path: `/accounting/client/entries/purchaseReturnReport/${params.id}/${params.name}`,
    disabled: !access.purchaseReturn,
  },
  {
    id: 4,
    title: "Purchase From Other Branches",
    path: `/accounting/client/entries/purchaseFromOtherBranchesReport/${params.id}/${params.name}`,
    disabled: !access.purchaseFromOtherBranches,
  },
];
