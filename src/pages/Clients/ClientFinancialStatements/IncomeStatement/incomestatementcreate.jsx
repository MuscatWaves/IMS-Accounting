import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const IncomeStatementFormCreate = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
  params,
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
    data.append("dateMonth", values.dateMonth);
    data.append("totalSales", values.totalSales);
    data.append("totalPurchase", values.totalPurchase);
    data.append("totalExpense", values.totalExpense);
    data.append("netProfit", values.netProfit);
    data.append("netProfitPercentage", values.netProfitPercentage);
    data.append("totalAmountOfIncome", values.totalAmountOfIncome);
    data.append("totalAmountOfExpense", values.totalAmountOfExpense);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/fsisc" : "/api/clientfsisc/create",
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
      title={editData ? "Update Income Statement" : "Create Income Statement"}
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
            clientId: params?.id || null,
            entryDate:
              (editData?.entryDate &&
                dayjs(editData?.entryDate).isValid() &&
                dayjs(editData?.entryDate)) ||
              "",
            dateMonth: editData?.dateMonth || "",
            totalSales: editData?.totalSales || "",
            totalPurchase: editData?.totalPurchase || "",
            totalExpense: editData?.totalExpense || "",
            netProfit: editData?.netProfit || "",
            netProfitPercentage: editData?.netProfitPercentage || "",
            totalAmountOfIncome: editData?.totalAmountOfIncome || "",
            totalAmountOfExpense: editData?.totalAmountOfExpense || "",
            file: editData?.file || null,
          }}
        >
          <Form.Item
            className={!editData && "grid-2-column"}
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
              options={[
                { label: removeUnderScore(params.name), value: params.id },
              ]}
              placeholder={"Select the client"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
              disabled
            />
          </Form.Item>
          {editData && (
            <Form.Item
              name="entryDate"
              label={"Entry Date"}
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
            name="dateMonth"
            label={"Date/ Month"}
            rules={[
              {
                required: true,
                message: "No Date/ Month provided",
              },
            ]}
          >
            <Input placeholder={"Enter Date / Month"} />
          </Form.Item>
          <Form.Item
            name="totalSales"
            label={"Total Sales"}
            rules={[
              {
                required: true,
                message: "No Total Capital provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Capital"} />
          </Form.Item>
          <Form.Item
            name="totalPurchase"
            label={"Total Purchase"}
            rules={[
              {
                required: true,
                message: "No Total Purchase provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Purchase"} />
          </Form.Item>
          <Form.Item
            name="totalExpense"
            label={"Total Expense"}
            rules={[
              {
                required: true,
                message: "No Total Expense provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Expense"} />
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
          <Form.Item
            name="netProfitPercentage"
            label={"Net Profit Percentage"}
            rules={[
              {
                required: true,
                message: "No Net Profit Percentage provided",
              },
            ]}
          >
            <Input placeholder={"Enter Net Profit Percentage"} />
          </Form.Item>
          <Form.Item
            name="totalAmountOfIncome"
            label={"Total Amount of Income"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Income provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Income"} />
          </Form.Item>
          <Form.Item
            name="totalAmountOfExpense"
            label={"Total Amount of Expense"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Expense provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Expense"} />
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
              {editData ? "Update Income Statement" : "Create Income Statement"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default IncomeStatementFormCreate;
