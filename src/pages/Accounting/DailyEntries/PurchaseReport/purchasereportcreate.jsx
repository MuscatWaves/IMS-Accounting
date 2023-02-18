import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";

const PurchaseReportFormCreate = ({
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
    data.append("clientId", values?.clientId);
    data.append("type", values.type);
    data.append("file", values.file.file);
    // var data = JSON.stringify({
    //   ...(editData && { id: Number(editData?.id) }),
    //   clientId: values?.clientId || null,
    //   type: values?.type || "",
    //   file: values.file.file || null,
    // });
    setLoading(true);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/clientattachment" : "/api/clientattachment/create",
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
      title={editData ? "Update Purchase Report" : "Create Purchase Report"}
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
            date:
              (editData?.date &&
                dayjs(editData?.date).isValid() &&
                dayjs(editData?.date)) ||
              "",
            total_amount: editData?.total_amount || "",
            total_vat_amount: editData?.total_vat_amount || "",
            location: editData?.location || "",
            file: editData?.file || null,
          }}
        >
          <Form.Item
            className="grid-2-column"
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
          <Form.Item
            name="date"
            label={"Date"}
            rules={[
              {
                required: true,
                message: "No Date provided",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
          <Form.Item
            name="total_amount"
            label={"Total Amount"}
            rules={[
              {
                required: true,
                message: "No Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Amount"} />
          </Form.Item>
          <Form.Item
            name="total_vat_amount"
            label={"Total VAT Amount"}
            rules={[
              {
                required: true,
                message: "No VAT Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter total VAT Amount"} />
          </Form.Item>
          <Form.Item
            name="location"
            label={"Location"}
            rules={[
              {
                required: true,
                message: "No location provided",
              },
            ]}
          >
            <Input placeholder={"Enter the location name"} />
          </Form.Item>
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
              {editData ? "Update Purchase Report" : "Create Purchase Report"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default PurchaseReportFormCreate;
