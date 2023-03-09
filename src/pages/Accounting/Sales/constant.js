export const predashoptions = (params, access) => [
  {
    id: 7,
    title: "Sales Report",
    path: `/accounting/entries/salesReport/${params.id}/${params.name}`,
    disabled: !access.salesReport,
  },
  {
    id: 8,
    title: "Sales Quantitative Summary",
    path: `/accounting/entries/salesQSummary/${params.id}/${params.name}`,
    disabled: !access.salesQuantitativeSummary,
  },
  {
    id: 15,
    title: "Sales to Other Branch",
    path: `/accounting/entries/salesToOtherBranch/${params.id}/${params.name}`,
    disabled: !access.salesToOtherStoreIfAny,
  },
  {
    id: 4,
    title: "Credit Sales",
    path: `/accounting/entries/creditSales/${params.id}/${params.name}`,
    disabled: !access.creditSales,
  },
];
