import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const BankStatementFormCreate = ({
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
    data.append("openingBalance", values.openingBalance);
    data.append("debited", values.debited);
    data.append("credited", values.credited);
    data.append("net", values.net);
    data.append("closingBalance", values.closingBalance);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/bsm" : "/api/bsm/create",
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
      title={editData ? "Update Bank Statement" : "Create Bank Statement"}
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
            openingBalance: editData?.openingBalance || "",
            debited: editData?.debited || "",
            credited: editData?.credited || "",
            net: editData?.net || "",
            closingBalance: editData?.closingBalance || "",
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
            name="openingBalance"
            label={"Opening balance of bank"}
            rules={[
              {
                required: true,
                message: "No Opening balance of bank provided",
              },
            ]}
          >
            <Input placeholder={"Enter Opening balance of bank"} />
          </Form.Item>
          <Form.Item
            name="debited"
            label={"Total Amount of Debited"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Debited provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Debited"} />
          </Form.Item>
          <Form.Item
            name="credited"
            label={"Total Amount of Credited"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Credited provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Credited"} />
          </Form.Item>
          <Form.Item
            name="net"
            label={"Total Amount of Net balance"}
            rules={[
              {
                required: true,
                message: "No Total Amount of Net balance provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount of Net balance"} />
          </Form.Item>
          <Form.Item
            name="closingBalance"
            label={"Closing balance of bank"}
            rules={[
              {
                required: true,
                message: "No Closing balance of bank provided",
              },
            ]}
          >
            <Input placeholder={"Enter Closing balance of bank"} />
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
              {editData ? "Update Bank Statement" : "Create Bank Statement"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default BankStatementFormCreate;
