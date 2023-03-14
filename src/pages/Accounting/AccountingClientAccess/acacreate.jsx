import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Switch, Divider } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import "./aca.css";

const AcaFormCreate = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
  clientsList,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };

  const handleUpdateUser = async (values, status = editData?.status) => {
    var data = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      clientId: values?.clientId,
      attendance: values?.attendance,
      balanceSheetColumns: values?.balanceSheetColumns,
      bankStatement: values?.bankStatement,
      closingStockwithvalues: values?.closingStockwithvalues,
      creditSales: values?.creditSales,
      excelCashBankPayments: values?.excelCashBankPayments,
      grv: values?.grv,
      incomeStatementsColumns: values?.incomeStatementsColumns,
      inventoryStockInOutLedger: values?.inventoryStockInOutLedger,
      invoiceDetails: values?.invoiceDetails,
      itemExpiry: values?.itemExpiry,
      merchantSummary: values?.merchantSummary,
      monthlyDiscount: values?.monthlyDiscount,
      monthlyOffers: values?.monthlyOffers,
      ooredooOmantelSalesPaymentBalance:
        values?.ooredooOmantelSalesPaymentBalance,
      outstandingStatementSupplier: values?.outstandingStatementSupplier,
      paymentVoucherScan: values?.paymentVoucherScan,
      paymentsReceivedInvoice: values?.paymentsReceivedInvoice,
      productCostSheetForManufacturing:
        values?.productCostSheetForManufacturing,
      productCostSheetForServices: values?.productCostSheetForServices,
      purchase: values?.purchase,
      purchaseFromOtherBranches: values?.purchaseFromOtherBranches,
      purchaseInvoiceScan: values?.purchaseInvoiceScan,
      purchaseReturn: values?.purchaseReturn,
      salesQuantitativeSummary: values?.salesQuantitativeSummary,
      salesReport: values?.salesReport,
      salesToOtherStoreIfAny: values?.salesToOtherStoreIfAny,
      taxReportColumns: values?.taxReportColumns,
      vatReportColumns: values?.vatReportColumns,
      vatReturnColumns: values?.vatReturnColumns,
      vatReturnTracker: values?.vatReturnTracker,
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/clientaccess" : "/api/clientaccess/create",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        message.success(response.data.message);
        setLoading(false);
        onClose();
        getData(filterValues);
      })
      .catch(function (error) {
        message.error("Something Went Wrong!");
        setLoading(false);
      });
  };

  const entries = [
    { id: 1, label: "GRV Report", value: "grv" },
    { id: 6, label: "Attendance", value: "attendance" },
    {
      id: 9,
      label: "Inventory Stock in-out Ledger",
      value: "inventoryStockInOutLedger",
    },
    { id: 10, label: "Item Expiry", value: "itemExpiry" },
    {
      id: 11,
      label: "Closing Stock with values",
      value: "closingStockwithvalues",
    },
    {
      id: 12,
      label: "Excel Cash & Bank Payments",
      value: "excelCashBankPayments",
    },
    { id: 13, label: "Merchant Summary", value: "merchantSummary" },
    {
      id: 14,
      label: "Outstanding Statement Supplier",
      value: "outstandingStatementSupplier",
    },
    { id: 16, label: "Payment Voucher Scan", value: "paymentVoucherScan" },
    {
      id: 17,
      label: "Ooredoo & Omantel Sales & Payment Balance",
      value: "ooredooOmantelSalesPaymentBalance",
    },
    { id: 18, label: "Bank Statement", value: "bankStatement" },
    {
      id: 20,
      label: "Product cost sheet for Manufacturing",
      value: "productCostSheetForManufacturing",
    },
    {
      id: 21,
      label: "Product cost sheet for Services",
      value: "productCostSheetForServices",
    },
    {
      id: 22,
      label: "Monthly Discounts",
      value: "monthlyDiscount",
    },
    {
      id: 23,
      label: "Monthly Offers",
      value: "monthlyOffers",
    },
  ];

  const purchase = [
    { id: 2, label: "Purchase Report", value: "purchase" },
    { id: 3, label: "Purchase Return Report", value: "purchaseReturn" },
    {
      id: 4,
      label: "Purchase from Other Branches",
      value: "purchaseFromOtherBranches",
    },
    { id: 5, label: "Purchase Invoice Scan", value: "purchaseInvoiceScan" },
  ];

  const sales = [
    { id: 7, label: "Sales Report", value: "salesReport" },
    {
      id: 8,
      label: "Sales Quantitative Summary",
      value: "salesQuantitativeSummary",
    },
    { id: 15, label: "Sales to other store", value: "salesToOtherStoreIfAny" },
    { id: 19, label: "Credit Sales", value: "creditSales" },
  ];

  const financialStatements = [
    { id: 1, label: "Balance Sheet", value: "balanceSheetColumns" },
    { id: 2, label: "Income Statements", value: "incomeStatementsColumns" },
    { id: 3, label: "VAT Report", value: "vatReportColumns" },
    { id: 4, label: "VAT Return", value: "vatReturnColumns" },
    { id: 5, label: "Tax Report", value: "taxReportColumns" },
    { id: 6, label: "VAT Return Tracker", value: "vatReturnTracker" },
  ];

  const invoices = [
    { id: 7, label: "Invoice Details", value: "invoiceDetails" },
    {
      id: 8,
      label: "Payments Received Invoice",
      value: "paymentsReceivedInvoice",
    },
  ];

  return (
    <Drawer
      title={editData ? "Update Client Access" : "Create Client Access"}
      placement="right"
      size="large"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className={"client-access-card"}
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            clientId: editData?.clientId || null,
            attendance: editData?.attendance || false,
            balanceSheetColumns: editData?.balanceSheetColumns || false,
            bankStatement: editData?.bankStatement || false,
            closingStockwithvalues: editData?.closingStockwithvalues || false,
            creditSales: editData?.creditSales || false,
            excelCashBankPayments: editData?.excelCashBankPayments || false,
            grv: editData?.grv || false,
            incomeStatementsColumns: editData?.incomeStatementsColumns || false,
            inventoryStockInOutLedger:
              editData?.inventoryStockInOutLedger || false,
            invoiceDetails: editData?.invoiceDetails || false,
            itemExpiry: editData?.itemExpiry || false,
            merchantSummary: editData?.merchantSummary || false,
            monthlyDiscount: editData?.monthlyDiscount || false,
            monthlyOffers: editData?.monthlyOffers || false,
            ooredooOmantelSalesPaymentBalance:
              editData?.ooredooOmantelSalesPaymentBalance || false,
            outstandingStatementSupplier:
              editData?.outstandingStatementSupplier || false,
            paymentVoucherScan: editData?.paymentVoucherScan || false,
            paymentsReceivedInvoice: editData?.paymentsReceivedInvoice || false,
            productCostSheetForManufacturing:
              editData?.productCostSheetForManufacturing || false,
            productCostSheetForServices:
              editData?.productCostSheetForServices || false,
            purchase: editData?.purchase || false,
            purchaseFromOtherBranches:
              editData?.purchaseFromOtherBranches || false,
            purchaseInvoiceScan: editData?.purchaseInvoiceScan || false,
            purchaseReturn: editData?.purchaseReturn || false,
            salesQuantitativeSummary:
              editData?.salesQuantitativeSummary || false,
            salesReport: editData?.salesReport || false,
            salesToOtherStoreIfAny: editData?.salesToOtherStoreIfAny || false,
            taxReportColumns: editData?.taxReportColumns || false,
            vatReportColumns: editData?.vatReportColumns || false,
            vatReturnColumns: editData?.vatReturnColumns || false,
            vatReturnTracker: editData?.vatReturnTracker || false,
          }}
        >
          <Form.Item
            className={"grid-all-column"}
            name="clientId"
            label={"Client"}
            rules={[
              {
                required: true,
                message: "No Client provided",
              },
            ]}
          >
            <Select
              options={clientsList}
              placeholder={"Select the client"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
            />
          </Form.Item>
          <Divider
            orientation="left"
            orientationMargin="0"
            className="grid-all-column"
          >
            <div className="bolder text-black small-text">Daily Entries</div>
          </Divider>
          {entries.map((entry) => (
            <Form.Item
              key={entry.id}
              name={entry.value}
              label={entry.label}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          ))}
          <Divider
            orientation="left"
            orientationMargin="0"
            className="grid-all-column"
          >
            <div className="bolder text-black small-text">Purchases</div>
          </Divider>
          {purchase.map((entry) => (
            <Form.Item
              key={entry.id}
              name={entry.value}
              label={entry.label}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          ))}
          <Divider
            orientation="left"
            orientationMargin="0"
            className="grid-all-column"
          >
            <div className="bolder text-black small-text">Sales</div>
          </Divider>
          {sales.map((entry) => (
            <Form.Item
              key={entry.id}
              name={entry.value}
              label={entry.label}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          ))}
          <Divider
            orientation="left"
            orientationMargin="0"
            className="grid-all-column"
          >
            <div className="bolder text-black small-text">
              Financial Statements
            </div>
          </Divider>
          {financialStatements.map((entry) => (
            <Form.Item
              key={entry.id}
              name={entry.value}
              label={entry.label}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          ))}
          <Divider
            orientation="left"
            orientationMargin="0"
            className="grid-all-column"
          >
            <div className="bolder text-black small-text">Invoices</div>
          </Divider>
          {invoices.map((entry) => (
            <Form.Item
              key={entry.id}
              name={entry.value}
              label={entry.label}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          ))}
          <div className="flex-at-end medium-margin-top grid-all-column">
            <Button className="" type="text" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className=""
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {editData ? "Update Client Access" : "Create Client Access"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default AcaFormCreate;
