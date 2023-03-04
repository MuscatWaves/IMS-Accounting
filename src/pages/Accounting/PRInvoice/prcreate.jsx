import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../utilities";

const PRFormCreate = ({
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
    data.append("clientName", values.clientName);
    data.append("invoiceNumber", values.invoiceNumber);
    data.append("POWONumber", values.POWONumber);
    data.append("invoiceAmount", values.invoiceAmount);
    data.append("amountReceived", values.amountReceived);
    data.append("pendingBalance", values.pendingBalance);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/prict" : "/api/prict/create",
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
      title={
        editData
          ? "Update Payments Received Invoice"
          : "Create Payments Received Invoice"
      }
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
            clientName: removeUnderScore(params.name) || "",
            invoiceNumber: editData?.invoiceNumber || "",
            POWONumber: editData?.POWONumber || "",
            invoiceAmount: editData?.invoiceAmount || "",
            amountReceived: editData?.amountReceived || "",
            pendingBalance: editData?.pendingBalance || "",
            file: editData?.file || null,
          }}
        >
          <Form.Item
            className={"hidden"}
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
            name="clientName"
            label={"Client Name"}
            rules={[
              {
                required: true,
                message: "No Client Name provided",
              },
            ]}
          >
            <Input placeholder={"Enter Client Name"} disabled />
          </Form.Item>
          <Form.Item
            name="invoiceNumber"
            label={"Invoice number"}
            rules={[
              {
                required: true,
                message: "No Invoice number provided",
              },
            ]}
          >
            <Input placeholder={"Enter Invoice number"} />
          </Form.Item>
          <Form.Item
            name="POWONumber"
            label={"PO/WO number"}
            rules={[
              {
                required: true,
                message: "No PO/WO number provided",
              },
            ]}
          >
            <Input placeholder={"Enter PO/WO number"} />
          </Form.Item>
          <Form.Item
            name="invoiceAmount"
            label={"Total Invoice Amount"}
            rules={[
              {
                required: true,
                message: "No Total Invoice Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Invoice Amount"} />
          </Form.Item>
          <Form.Item
            name="amountReceived"
            label={"Total Amount Received"}
            rules={[
              {
                required: true,
                message: "No Total Amount Received provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount Received"} />
          </Form.Item>
          <Form.Item
            name="pendingBalance"
            label={"Total Pending balance"}
            rules={[
              {
                required: true,
                message: "No Total Pending balance provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Pending balance"} />
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
              {editData
                ? "Update Payments Received Invoice"
                : "Create Payments Received Invoice"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default PRFormCreate;
