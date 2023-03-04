import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const BalanceSheetFormCreate = ({
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
    data.append("financialYear", values.financialYear);
    data.append("totalCapital", values.totalCapital);
    data.append("totalFixedAssets", values.totalFixedAssets);
    data.append("totalOfLiabilities", values.totalOfLiabilities);
    data.append("totalOfAssets", values.totalOfAssets);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/fsbsc" : "/api/fsbsc/create",
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
      title={editData ? "Update Balance Sheet" : "Create Balance Sheet"}
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
            financialYear: editData?.financialYear || "",
            totalCapital: editData?.totalCapital || "",
            totalFixedAssets: editData?.totalFixedAssets || "",
            totalOfLiabilities: editData?.totalOfLiabilities || "",
            totalOfAssets: editData?.totalOfAssets || "",
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
            name="financialYear"
            label={"Financial year"}
            rules={[
              {
                required: true,
                message: "No Financial year provided",
              },
            ]}
          >
            <Input placeholder={"Enter Financial year"} />
          </Form.Item>
          <Form.Item
            name="totalCapital"
            label={"Total Capital"}
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
            name="totalFixedAssets"
            label={"Total Fixed Assets"}
            rules={[
              {
                required: true,
                message: "No Total Fixed Assets provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Fixed Assets"} />
          </Form.Item>
          <Form.Item
            name="totalOfLiabilities"
            label={"Total of Liabilities"}
            rules={[
              {
                required: true,
                message: "No Total of Liabilities provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total of Liabilities"} />
          </Form.Item>
          <Form.Item
            name="totalOfAssets"
            label={"Total of Assets"}
            rules={[
              {
                required: true,
                message: "No Total of Assets provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total of Assets"} />
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
              {editData ? "Update Balance Sheet" : "Create Balance Sheet"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default BalanceSheetFormCreate;
