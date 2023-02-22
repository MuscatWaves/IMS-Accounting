import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";

const OutstandingStatementFormCreate = ({
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
    data.append("invoice", values.invoice);
    data.append("discount", values.discount);
    data.append("net", values.net);
    data.append("balance", values.balance);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/purchase" : "/api/purchase/create",
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
          ? "Update Outstanding Statement"
          : "Create Outstanding Statement"
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
            clientId: editData?.clientId || null,
            entryDate:
              (editData?.entryDate &&
                dayjs(editData?.entryDate).isValid() &&
                dayjs(editData?.entryDate)) ||
              "",
            invoice: editData?.invoice || "",
            discount: editData?.discount || "",
            net: editData?.net || "",
            balance: editData?.balance || "",
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
            name="invoice"
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
            name="discount"
            label={"Total Discount Amount"}
            rules={[
              {
                required: true,
                message: "No Total Discount Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Discount Amount"} />
          </Form.Item>
          <Form.Item
            name="net"
            label={"Total Payments of Net Amount"}
            rules={[
              {
                required: true,
                message: "No Total Payments of Net Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Payments of Net Amount"} />
          </Form.Item>
          <Form.Item
            name="balance"
            label={"Total Closing Balance"}
            rules={[
              {
                required: true,
                message: "No Total Closing Balance provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Closing Balance"} />
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
                ? "Update Outstanding Statement"
                : "Create Outstanding Statement"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default OutstandingStatementFormCreate;
