import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Switch, Divider } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
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
    var FormData = require("form-data");
    var data = new FormData();
    editData && data.append("id", editData?.id);
    data.append("clientId", values?.clientId);
    data.append("grvReport", values.grvReport);
    data.append("purchaseReport", values.grvReport);
    data.append("purchaseReturnReport", values.purchaseReturnReport);
    data.append("purchaseFromOtherBranch", values.purchaseFromOtherBranch);
    data.append("purchaseInvoiceScan", values.purchaseInvoiceScan);
    data.append("attendance", values.attendance);
    data.append("salesReport", values.purchaseFromOtherBranch);
    data.append("salesQuantitativeSummary", values.purchaseFromOtherBranch);
    data.append("inventoryStockInOutLedger", values.inventoryStockInOutLedger);
    data.append("itemExpiry", values.itemExpiry);
    data.append("closingStockWithValues", values.closingStockWithValues);
    data.append("excelCashBankStatements", values.excelCashBankStatements);
    data.append("merchantSummary", values.merchantSummary);
    data.append(
      "outstandingStatementSupplier",
      values.outstandingStatementSupplier
    );
    data.append("salesToOtherStore", values.salesToOtherStore);
    data.append("paymentVoucherScan", values.paymentVoucherScan);
    data.append("oredooOman", values.oredooOman);
    data.append("bankStatement", values.bankStatement);
    data.append("creditSales", values.creditSales);
    data.append(
      "productCostSheetForManufacturing",
      values.productCostSheetForManufacturing
    );
    data.append(
      "productCostSheetForServices",
      values.productCostSheetForServices
    );
    data.append("monthlyDiscount", values.monthlyDiscount);
    data.append("monthlyOffers", values.monthlyOffers);
    data.append("balanceSheet", values.balanceSheet);
    data.append("incomeStatement", values.incomeStatement);
    data.append("vatReport", values.vatReport);
    data.append("vatReturn", values.vatReturn);
    data.append("taxReport", values.taxReport);
    data.append("invoiceDetails", values.invoiceDetails);
    data.append("vatReturnTracker", values.vatReturnTracker);
    data.append("prInvoice", values.prInvoice);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/grv" : "/api/grv/create",
      headers: {
        Authorization: token,
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
    { id: 1, label: "GRV Report", value: "grvReport" },
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
      value: "closingStockWithValues",
    },
    {
      id: 12,
      label: "Excel Cash & Bank Payments",
      value: "excelCashBankStatement",
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
      value: "oredooOmantel",
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
      value: "productCostSheetForManufacturing",
    },
    {
      id: 23,
      label: "Monthly Offers",
      value: "productCostSheetForManufacturing",
    },
  ];

  const purchase = [
    { id: 2, label: "Purchase Report", value: "purchaseReport" },
    { id: 3, label: "Purchase Return Report", value: "purchaseReturnReport" },
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
      value: "salesQuantitativeReport",
    },
    { id: 15, label: "Sales to other store", value: "salesToOtherStore" },
    { id: 19, label: "Credit Sales", value: "creditSales" },
  ];

  const financialStatements = [
    { id: 1, label: "Balance Sheet", value: "balanceSheet" },
    { id: 2, label: "Income Statements", value: "incomeStatements" },
    { id: 3, label: "VAT Report", value: "vatReport" },
    { id: 4, label: "VAT Return", value: "vatReturn" },
    { id: 5, label: "Tax Report", value: "taxReport" },
    { id: 6, label: "VAT Return Tracker", value: "vatReturnTracker" },
    { id: 7, label: "Invoice Details", value: "invoiceDetails" },
    {
      id: 8,
      label: "Payments Received Invoice",
      value: "paymentRecievedInvoice",
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
            entryDate:
              (editData?.entryDate &&
                dayjs(editData?.entryDate).isValid() &&
                dayjs(editData?.entryDate)) ||
              "",
            grv: editData?.grv || "",
            vat: editData?.vat || "",
            location: editData?.location || "",
            file: editData?.file || null,
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
