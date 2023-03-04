import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const VatReportFormCreate = ({
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
    data.append("month", values.month);
    data.append("purchaseMonthly", values.purchaseMonthly);
    data.append("inputVATMonthly", values.inputVATMonthly);
    data.append("NetPurchase", values.NetPurchase);
    data.append("salesMonthly", values.salesMonthly);
    data.append("outputVATMonthly", values.outputVATMonthly);
    data.append("discountMonthly", values.discountMonthly);
    data.append("netSalesMonthly", values.netSalesMonthly);
    data.append("netPayable", values.netPayable);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/fsvrc" : "/api/fsvrc/create",
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
      title={editData ? "Update VAT Report" : "Create VAT Report"}
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
            month: editData?.month || "",
            purchaseMonthly: editData?.purchaseMonthly || "",
            inputVATMonthly: editData?.inputVATMonthly || "",
            NetPurchase: editData?.NetPurchase || "",
            salesMonthly: editData?.salesMonthly || "",
            outputVATMonthly: editData?.outputVATMonthly || "",
            discountMonthly: editData?.discountMonthly || "",
            netSalesMonthly: editData?.netSalesMonthly || "",
            netPayable: editData?.netPayable || "",
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
            name="month"
            label={"Month"}
            rules={[
              {
                required: true,
                message: "No Month provided",
              },
            ]}
          >
            <Input placeholder={"Enter Month"} />
          </Form.Item>
          <Form.Item
            name="purchaseMonthly"
            label={"Total Purchase Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Purchase Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Purchase Monthly"} />
          </Form.Item>
          <Form.Item
            name="inputVATMonthly"
            label={"Total Input VAT Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Input VAT Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Input VAT Monthly"} />
          </Form.Item>
          <Form.Item
            name="NetPurchase"
            label={"Total Net Purchase"}
            rules={[
              {
                required: true,
                message: "No Total Net Purchase provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Net Purchase"} />
          </Form.Item>
          <Form.Item
            name="salesMonthly"
            label={"Total Sales Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Sales Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Sales Monthly"} />
          </Form.Item>
          <Form.Item
            name="outputVATMonthly"
            label={"Total Output VAT Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Output VAT Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Output VAT Monthly"} />
          </Form.Item>
          <Form.Item
            name="discountMonthly"
            label={"Total Discount Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Discount Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Discount Monthly"} />
          </Form.Item>
          <Form.Item
            name="netSalesMonthly"
            label={"Total Net Sales Monthly"}
            rules={[
              {
                required: true,
                message: "No Total Net Sales Monthly provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Net Sales Monthly"} />
          </Form.Item>
          <Form.Item
            name="netPayable"
            label={"Net Payable"}
            rules={[
              {
                required: true,
                message: "No Net Payable provided",
              },
            ]}
          >
            <Input placeholder={"Enter Net Payable"} />
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
              {editData ? "Update VAT Report" : "Create VAT Report"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default VatReportFormCreate;
