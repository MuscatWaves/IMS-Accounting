export const predashoptions = (params, access) => [
  {
    id: 1,
    title: "Balance Sheet",
    path: `/accounting/fs/balancesheet/${params.id}/${params.name}`,
    disabled: !access.balanceSheetColumns,
  },
  {
    id: 2,
    title: "Income Statement",
    path: `/accounting/fs/incomestatement/${params.id}/${params.name}`,
    disabled: !access.incomeStatementsColumns,
  },
  {
    id: 3,
    title: "VAT Report",
    path: `/accounting/fs/vatreport/${params.id}/${params.name}`,
    disabled: !access.vatReportColumns,
  },
  {
    id: 4,
    title: "VAT Return",
    path: `/accounting/fs/vatreturn/${params.id}/${params.name}`,
    disabled: !access.vatReturnColumns,
  },
  {
    id: 5,
    title: "Tax Report",
    path: `/accounting/fs/taxreport/${params.id}/${params.name}`,
    disabled: !access.taxReportColumns,
  },
  {
    id: 6,
    title: "VAT Return Tracker",
    path: `/accounting/fs/vatreturntracker/${params.id}/${params.name}`,
    disabled: !access.vatReturnTracker,
  },
];
