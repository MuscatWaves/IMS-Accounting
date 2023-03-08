export const predashoptions = (params, access) => [
  {
    id: 7,
    title: "Sales Report",
    path: `/accounting/client/entries/salesReport/${params.id}/${params.name}`,
    disabled: !access.salesReport,
  },
  {
    id: 8,
    title: "Sales Quantitative Summary",
    path: `/accounting/client/entries/salesQSummary/${params.id}/${params.name}`,
    disabled: !access.salesQuantitativeSummary,
  },
  {
    id: 15,
    title: "Sales to Other Branch",
    path: `/accounting/client/entries/salesToOtherBranch/${params.id}/${params.name}`,
    disabled: !access.salesToOtherStoreIfAny,
  },
];
