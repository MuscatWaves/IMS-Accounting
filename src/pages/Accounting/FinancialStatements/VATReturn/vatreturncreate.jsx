import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import { removeUnderScore } from "../../../../utilities";

const VatReturnFormCreate = ({
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
    data.append("salesOfGoods", values.salesOfGoods);
    data.append("vatOnSales", values.vatOnSales);
    data.append("nilRatedSales", values.nilRatedSales);
    data.append("purchaseOfGoods", values.purchaseOfGoods);
    data.append("vatOnPurchases", values.vatOnPurchases);
    data.append("NilRatedPurchase", values.NilRatedPurchase);
    data.append("NetPayable", values.NetPayable);
    !editData && data.append("file", values.file.file);
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      maxBodyLength: Infinity,
      url: editData ? "/api/fsvrtc" : "/api/fsvrtc/create",
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
      title={editData ? "Update VAT Return" : "Create VAT Return"}
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
            salesOfGoods: editData?.salesOfGoods || "",
            vatOnSales: editData?.vatOnSales || "",
            nilRatedSales: editData?.nilRatedSales || "",
            purchaseOfGoods: editData?.purchaseOfGoods || "",
            vatOnPurchases: editData?.vatOnPurchases || "",
            NilRatedPurchase: editData?.NilRatedPurchase || "",
            NetPayable: editData?.NetPayable || "",
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
            name="salesOfGoods"
            label={"Total Sales of Goods on 5%"}
            rules={[
              {
                required: true,
                message: "No Total Sales of Goods on 5% provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Sales of Goods on 5%"} />
          </Form.Item>
          <Form.Item
            name="vatOnSales"
            label={"Total Total VAT on sales"}
            rules={[
              {
                required: true,
                message: "No Total VAT on sales provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total VAT on sales"} />
          </Form.Item>
          <Form.Item
            name="nilRatedSales"
            label={"Total Nil rated Sales"}
            rules={[
              {
                required: true,
                message: "No Total Nil rated Sales provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Nil rated Sales"} />
          </Form.Item>
          <Form.Item
            name="purchaseOfGoods"
            label={"Total Purchase of Goods on 5%"}
            rules={[
              {
                required: true,
                message: "No Total Purchase of Goods on 5% provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Purchase of Goods on 5%"} />
          </Form.Item>
          <Form.Item
            name="vatOnPurchases"
            label={"Total VAT on Purchases"}
            rules={[
              {
                required: true,
                message: "No Total VAT on Purchases provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total VAT on Purchases"} />
          </Form.Item>
          <Form.Item
            name="NilRatedPurchase"
            label={"Total Nil rated purchase"}
            rules={[
              {
                required: true,
                message: "No Total Nil rated purchase provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total Nil rated purchase"} />
          </Form.Item>
          <Form.Item
            name="NetPayable"
            label={"Total net Payable"}
            rules={[
              {
                required: true,
                message: "No Total net Payable provided",
              },
            ]}
          >
            <Input placeholder={"Enter Total net Payable"} />
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
              {editData ? "Update VAT Return" : "Create VAT Return"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default VatReturnFormCreate;
