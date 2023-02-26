import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";

const ProductCostingManFormCreate = ({
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
    editData && data.append("entryDate", values?.entryDate);
    data.append("timeDatePeriod", values.timeDatePeriod);
    data.append("productName", values.productName);
    data.append("openingStock", values.openingStock);
    data.append("closingStock", values.closingStock);
    data.append("revenue", values.revenue);
    data.append("vat", values.vat);
    data.append("directExpenses", values.directExpenses);
    data.append("materialCost", values.materialCost);
    data.append("laborCost", values.laborCost);
    data.append("fixedExpenses", values.fixedExpenses);
    data.append("variableExpenses", values.variableExpenses);
    data.append("administrationCost", values.administrationCost);
    data.append("sellingCost", values.sellingCost);
    data.append("numberOfUnitsProduce", values.numberOfUnitsProduce);
    data.append("ratePerUnits", values.ratePerUnits);
    data.append("depreciation", values.depreciation);
    data.append("CostOfProduct", values.CostOfProduct);
    data.append("SalesOfProduct", values.SalesOfProduct);
    data.append("grossProfit", values.grossProfit);
    data.append("netProfit", values.netProfit);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/pcsfm" : "/api/pcsfm/create",
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

  return (
    <Drawer
      title={editData ? "Update Product Costing" : "Create Product Costing"}
      placement="right"
      size="large"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className={"grid-2"}
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
            openingStock: editData?.openingStock || "",
            closingStock: editData?.closingStock || "",
            revenue: editData?.revenue || "",
            vat: editData?.vat || "",
            productName: editData?.productName || "",
            timeDatePeriod: editData?.timeDatePeriod || "",
            directExpenses: editData?.directExpenses || "",
            materialCost: editData?.materialCost || "",
            laborCost: editData?.laborCost || "",
            fixedExpenses: editData?.fixedExpenses || "",
            variableExpenses: editData?.variableExpenses || "",
            administrationCost: editData?.administrationCost || "",
            sellingCost: editData?.sellingCost || "",
            numberOfUnitsProduce: editData?.numberOfUnitsProduce || "",
            ratePerUnits: editData?.ratePerUnits || "",
            depreciation: editData?.depreciation || "",
            CostOfProduct: editData?.CostOfProduct || "",
            SalesOfProduct: editData?.SalesOfProduct || "",
            grossProfit: editData?.grossProfit || "",
            netProfit: editData?.netProfit || "",
            file: editData?.file || null,
          }}
        >
          <Form.Item
            className={editData && "grid-2-column"}
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
          {editData && (
            <Form.Item
              name="entryDate"
              label={"Date"}
              rules={[
                {
                  required: true,
                  message: "No Date provided",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          )}
          <Form.Item
            name="productName"
            label={"Product Name"}
            rules={[
              {
                required: true,
                message: "No Product Name provided",
              },
            ]}
          >
            <Input placeholder={"Enter Product Name"} />
          </Form.Item>
          <Form.Item
            name="timeDatePeriod"
            label={"Time Period"}
            rules={[
              {
                required: true,
                message: "No Time Period provided",
              },
            ]}
          >
            <Input placeholder={"Enter Time Period"} />
          </Form.Item>
          <Form.Item
            name="openingStock"
            label={"Opening Stock"}
            rules={[
              {
                required: true,
                message: "No Opening Stock provided",
              },
            ]}
          >
            <Input placeholder={"Enter Opening Stock"} />
          </Form.Item>
          <Form.Item
            name="closingStock"
            label={"Closing Stock"}
            rules={[
              {
                required: true,
                message: "No Closing Stock provided",
              },
            ]}
          >
            <Input placeholder={"Enter Closing Stock"} />
          </Form.Item>
          <Form.Item
            name="revenue"
            label={"Total Revenue"}
            rules={[
              {
                required: true,
                message: "No Total Revenue provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Revenue"} />
          </Form.Item>
          <Form.Item
            name="vat"
            label={"Total VAT"}
            rules={[
              {
                required: true,
                message: "No Total VAT provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total VAT"} />
          </Form.Item>
          <Form.Item
            name="directExpenses"
            label={"Direct Expenses"}
            rules={[
              {
                required: true,
                message: "No Direct Expenses provided",
              },
            ]}
          >
            <Input placeholder={"Enter Direct Expenses"} />
          </Form.Item>
          <Form.Item
            name="materialCost"
            label={"Total Material Cost"}
            rules={[
              {
                required: true,
                message: "No Material Cost provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Material Cost"} />
          </Form.Item>
          <Form.Item
            name="laborCost"
            label={"Total Labor Cost"}
            rules={[
              {
                required: true,
                message: "No Labor Cost provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Labpr Cost"} />
          </Form.Item>
          <Form.Item
            name="fixedExpenses"
            label={"Total Fixed Expenses"}
            rules={[
              {
                required: true,
                message: "No Total Fixed Expenses provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Fixed Expenses Cost"} />
          </Form.Item>
          <Form.Item
            name="variableExpenses"
            label={"Total Variable Expenses"}
            rules={[
              {
                required: true,
                message: "No Total Variable Expenses provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Variable Expenses Cost"} />
          </Form.Item>
          <Form.Item
            name="administrationCost"
            label={"Total Administration Cost"}
            rules={[
              {
                required: true,
                message: "No Total Administration Cost provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Administration Cost"} />
          </Form.Item>
          <Form.Item
            name="sellingCost"
            label={"Total Selling cost"}
            rules={[
              {
                required: true,
                message: "No Total Selling cost provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Selling cost"} />
          </Form.Item>
          <Form.Item
            name="numberOfUnitsProduce"
            label={"Total Number of units produce"}
            rules={[
              {
                required: true,
                message: "No Total Number of units produce provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Number of units produce"} />
          </Form.Item>
          <Form.Item
            name="ratePerUnits"
            label={"Rate per units"}
            rules={[
              {
                required: true,
                message: "No Rate per units provided",
              },
            ]}
          >
            <Input placeholder={"Enter Rate per units"} />
          </Form.Item>
          <Form.Item
            name="depreciation"
            label={"Depreciation"}
            rules={[
              {
                required: true,
                message: "No Depreciation provided",
              },
            ]}
          >
            <Input placeholder={"Enter Depreciation"} />
          </Form.Item>
          <Form.Item
            name="CostOfProduct"
            label={"Total Cost of Product"}
            rules={[
              {
                required: true,
                message: "No Total Cost of Product provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Cost of Product"} />
          </Form.Item>
          <Form.Item
            name="SalesOfProduct"
            label={"Total sales of Product"}
            rules={[
              {
                required: true,
                message: "No Total sales of Product provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total sales of Product"} />
          </Form.Item>
          <Form.Item
            name="grossProfit"
            label={"Gross Profit"}
            rules={[
              {
                required: true,
                message: "No Gross Profit provided",
              },
            ]}
          >
            <Input placeholder={"Enter Gross Profit"} />
          </Form.Item>
          <Form.Item
            name="netProfit"
            label={"Net Profit"}
            rules={[
              {
                required: true,
                message: "No Net Profit provided",
              },
            ]}
          >
            <Input placeholder={"Enter Net Profit"} />
          </Form.Item>
          {!editData && (
            <Form.Item
              className="grid-2-column"
              name="file"
              label={"Attachment"}
              rules={[
                {
                  required: true,
                  message: "No File Type provided",
                },
              ]}
            >
              <Dragger
                listType="picture"
                accept={".jpeg,.png,.jpg,.pdf,.docx,.xslx"}
                maxCount={1}
                beforeUpload={(file) => {
                  return false;
                }}
                showUploadList={{ showRemoveIcon: false }}
              >
                <div className="flex-small-gap1-column medium-padding flex-align-center">
                  <UploadOutlined style={{ fontSize: "45px" }} />
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Supports only single upload. Avoid dragging multiple files.
                  </p>
                </div>
              </Dragger>
            </Form.Item>
          )}
          <div
            className="flex-at-end medium-margin-top"
            style={{ gridColumn: "1/3", gap: "1rem" }}
          >
            <Button className="" type="text" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className=""
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {editData ? "Update Product Costing" : "Create Product Costing"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default ProductCostingManFormCreate;
