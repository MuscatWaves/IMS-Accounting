export const predashoptions = (params) => [
  {
    id: 1,
    title: "Balance Sheet",
    path: `/accounting/client/fs/balancesheet/${params.id}/${params.name}`,
  },
  {
    id: 2,
    title: "Income Statement",
    path: `/accounting/client/fs/incomestatement/${params.id}/${params.name}`,
  },
  {
    id: 3,
    title: "VAT Report",
    path: `/accounting/client/fs/vatreport/${params.id}/${params.name}`,
  },
  {
    id: 4,
    title: "VAT Return",
    path: `/accounting/client/fs/vatreturn/${params.id}/${params.name}`,
  },
  {
    id: 5,
    title: "Tax Report",
    path: `/accounting/client/fs/taxreport/${params.id}/${params.name}`,
  },
  {
    id: 6,
    title: "VAT Return Tracker",
    path: `/accounting/client/fs/vatreturntracker/${params.id}/${params.name}`,
  },
];
