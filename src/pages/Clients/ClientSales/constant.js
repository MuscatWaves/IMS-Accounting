export const predashoptions = (params) => [
  {
    id: 7,
    title: "Sales Report",
    path: `/accounting/entries/salesReport/${params.id}/${params.name}`,
  },
  {
    id: 8,
    title: "Sales Quantitative Summary",
    path: `/accounting/entries/salesQSummary/${params.id}/${params.name}`,
  },
  {
    id: 15,
    title: "Sales to Other Branch",
    path: `/accounting/entries/salesToOtherBranch/${params.id}/${params.name}`,
  },
];
