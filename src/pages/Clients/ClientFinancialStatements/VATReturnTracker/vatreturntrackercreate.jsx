import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const VatReturnTrackerFormCreate = ({
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
    data.append("monthQuarter", values.monthQuarter);
    data.append("vatLiability", values.vatLiability);
    data.append("interestAmount", values.interestAmount);
    data.append("vatNetPayable", values.vatNetPayable);
    data.append("taxPaid", values.taxPaid);
    data.append("additionalInterest", values.additionalInterest);
    data.append("penalty", values.penalty);
    data.append("netBalance", values.netBalance);
    data.append("status", values.status);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/fsvrt" : "/api/clientfsvrt/create",
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
        editData ? "Update VAT Return Tracker" : "Create VAT Return Tracker"
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
            financialYear: editData?.financialYear || "",
            monthQuarter: editData?.monthQuarter || null,
            vatLiability: editData?.vatLiability || "",
            interestAmount: editData?.interestAmount || "",
            vatNetPayable: editData?.vatNetPayable || "",
            taxPaid: editData?.taxPaid || "",
            additionalInterest: editData?.additionalInterest || "",
            penalty: editData?.penalty || "",
            netBalance: editData?.netBalance || "",
            status: editData?.status || null,
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
            name="financialYear"
            label={"Financial Year"}
            rules={[
              {
                required: true,
                message: "No Financial Year provided",
              },
            ]}
          >
            <Input placeholder={"Enter Financial Year"} />
          </Form.Item>
          <Form.Item
            name="monthQuarter"
            label={"Month/Quarter"}
            rules={[
              {
                required: true,
                message: "No Month/Quarter provided",
              },
            ]}
          >
            <Select
              placeholder={"Select Month/Quarter"}
              options={[
                { label: "Jan to Mar Q1", value: "Jan to Mar Q1" },
                { label: "Apr to Jun Q2", value: "April to Jun Q2" },
                { label: "July to Sep Q3", value: "July to Sep Q3" },
                { label: "Oct to Dec Q4", value: "Oct to Dec Q4" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="vatLiability"
            label={"Total VAT Liability"}
            rules={[
              {
                required: true,
                message: "No Total VAT Liability provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total VAT Liability"} />
          </Form.Item>
          <Form.Item
            name="interestAmount"
            label={"Total Interest Amount"}
            rules={[
              {
                required: true,
                message: "No Total Interest Amount provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Interest Amount"} />
          </Form.Item>
          <Form.Item
            name="vatNetPayable"
            label={"Total VAT Net Payable"}
            rules={[
              {
                required: true,
                message: "No Total VAT Net Payable provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total VAT Net Payable"} />
          </Form.Item>
          <Form.Item
            name="taxPaid"
            label={"Total Tax Paid"}
            rules={[
              {
                required: true,
                message: "No Total Tax Paid provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Tax Paid"} />
          </Form.Item>
          <Form.Item
            name="additionalInterest"
            label={"Total Additional Interest"}
            rules={[
              {
                required: true,
                message: "No Total Additional Interest provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Additional Interest"} />
          </Form.Item>
          <Form.Item
            name="penalty"
            label={"Total Penalty"}
            rules={[
              {
                required: true,
                message: "No Total Penalty provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Penalty"} />
          </Form.Item>
          <Form.Item
            name="netBalance"
            label={"Total Net Balance"}
            rules={[
              {
                required: true,
                message: "No Total Net Balance provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Net Balance"} />
          </Form.Item>
          <Form.Item
            name="status"
            label={"Status"}
            rules={[
              {
                required: true,
                message: "No Status provided",
              },
            ]}
          >
            <Select
              placeholder={"Select Status"}
              options={[
                { label: "Filled", value: "filled" },
                { label: "Not Filled", value: "not_filled" },
              ]}
            />
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
                ? "Update VAT Return Tracker"
                : "Create VAT Return Tracker"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default VatReturnTrackerFormCreate;
