export const predashoptions = (params) => [
  {
    id: 7,
    title: "Sales Report",
    path: `/accounting/client/entries/salesReport/${params.id}/${params.name}`,
  },
  {
    id: 8,
    title: "Sales Quantitative Summary",
    path: `/accounting/client/entries/salesQSummary/${params.id}/${params.name}`,
  },
  {
    id: 15,
    title: "Sales to Other Branch",
    path: `/accounting/client/entries/salesToOtherBranch/${params.id}/${params.name}`,
  },
];
