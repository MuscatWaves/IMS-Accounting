import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const ProductCostingServicesFormCreate = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
  params,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
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
    data.append("typeOfServices", values.typeOfServices);
    data.append("totalCostOfServices", values.totalCostOfServices);
    data.append("totalFixedExpenses", values.totalFixedExpenses);
    data.append("totalVariableExpenses", values.totalVariableExpenses);
    data.append("depreciation", values.depreciation);
    data.append("grossProfit", values.grossProfit);
    data.append("netProfit", values.netProfit);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/pcsfs" : "/api/pcsfs/create",
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
            clientId: params?.id || null,
            entryDate:
              (editData?.entryDate &&
                dayjs(editData?.entryDate).isValid() &&
                dayjs(editData?.entryDate)) ||
              "",
            timeDatePeriod: editData?.timeDatePeriod || "",
            typeOfServices: editData?.typeOfServices || "",
            totalCostOfServices: editData?.totalCostOfServices || "",
            totalFixedExpenses: editData?.totalFixedExpenses || "",
            totalVariableExpenses: editData?.totalVariableExpenses || "",
            depreciation: editData?.depreciation || "",
            grossProfit: editData?.grossProfit || "",
            netProfit: editData?.netProfit || "",
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
            name="typeOfServices"
            label={"Type of services"}
            rules={[
              {
                required: true,
                message: "No Type of services provided",
              },
            ]}
          >
            <Input placeholder={"Enter Type of services"} />
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
            className="grid-2-column"
            name="totalCostOfServices"
            label={"Total Cost of services"}
            rules={[
              {
                required: true,
                message: "No Total Cost of services provided",
              },
            ]}
          >
            <TextArea
              placeholder={"Enter Total Cost of services"}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="totalFixedExpenses"
            label={"Total Fixed Expenses"}
            rules={[
              {
                required: true,
                message: "No Total Fixed Expenses provided",
              },
            ]}
          >
            <TextArea
              placeholder={"Enter Total Fixed Expenses Cost"}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="totalVariableExpenses"
            label={"Total Variable Expenses"}
            rules={[
              {
                required: true,
                message: "No Total Variable Expenses provided",
              },
            ]}
          >
            <TextArea
              placeholder={"Enter Total Variable Expenses Cost"}
              autoSize={{ minRows: 3 }}
            />
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
            className="grid-2-column"
          >
            <TextArea
              placeholder={"Enter Depreciation"}
              autoSize={{ minRows: 3 }}
            />
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

export default ProductCostingServicesFormCreate;
