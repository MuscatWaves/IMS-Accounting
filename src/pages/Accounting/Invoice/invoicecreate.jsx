import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../utilities";

const InvoiceFormCreate = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
  params,
  client,
}) => {
  const { TextArea } = Input;
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
    data.append("clientName", removeUnderScore(params.name));
    data.append("clientAddress", client.ci_address);
    data.append("VATNumber", client.ci_VATIN);
    data.append("TaxNumber", client.ci_Tax);
    data.append("invoiceType", values.invoiceType);
    data.append("invoiceNumber", values.invoiceNumber);
    data.append("netPayable", values.netPayable);
    data.append("summary", values.summary);
    data.append("POWONumbers", values.POWONumbers);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/incdt" : "/api/incdt/create",
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
      title={editData ? "Update Tax Report" : "Create Tax Report"}
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
            invoiceType: editData?.invoiceType || null,
            invoiceNumber: editData?.invoiceNumber || "",
            netPayable: editData?.netPayable || "",
            POWONumbers: editData?.POWONumbers || "",
            summary: editData?.summary || "",
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
            name="invoiceType"
            label={"Invoice Type"}
            rules={[
              {
                required: true,
                message: "No Invoice Type provided",
              },
            ]}
          >
            <Select
              placeholder={"Select Invoice Type"}
              options={[
                { label: "Accounting Services", value: "Accounting Services" },
                { label: "Man Power Services", value: "Man Power Services" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="invoiceNumber"
            label={"Invoice Number"}
            rules={[
              {
                required: true,
                message: "No Invoice Number provided",
              },
            ]}
          >
            <Input placeholder={"Enter Invoice Number"} />
          </Form.Item>
          <Form.Item
            name="netPayable"
            label={"Total Amount of Invoice"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Invoice provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Invoice"} />
          </Form.Item>
          <Form.Item
            name="POWONumbers"
            label={"PO/WO numbers"}
            rules={[
              {
                required: true,
                message: "No PO/WO numbers provided",
              },
            ]}
          >
            <Input placeholder={"Enter PO/WO numbers"} />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="summary"
            label={"Summary"}
            rules={[
              {
                required: true,
                message: "No Summary provided",
              },
            ]}
          >
            <TextArea placeholder={"Enter Summary"} />
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
              {editData ? "Update Tax Report" : "Create Tax Report"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default InvoiceFormCreate;
