import React, { useState } from "react";
import { Button, Form, Drawer, Input, message, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import TextArea from "antd/es/input/TextArea";

const AccountingClientInformationForm = ({
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
    var data = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      clientId: values?.clientId || null,
      address: values?.address || "",
      postalCode: values?.postalCode || "",
      poBox: values?.poBox || "",
      landline: values?.landline || "",
      mobile: values?.mobile || "",
      CommercialRegistrationNumber: values?.CommercialRegistrationNumber || "",
      VATIN: values?.VATIN || "",
      Tax: values?.Tax || "",
      OCCI: values?.OCCI || "",
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: editData ? "/api/clientinfo" : "/api/clientinfo/create",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
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
      title={editData ? "Update Client Info" : "Create Client Info"}
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
            address: editData?.address || "",
            postalCode: editData?.postalCode || "",
            poBox: editData?.poBox || "",
            landline: editData?.landline || "",
            mobile: editData?.mobile || "",
            CommercialRegistrationNumber:
              editData?.CommercialRegistrationNumber || "",
            VATIN: editData?.VATIN || "",
            Tax: editData?.Tax || "",
            OCCI: editData?.OCCI || "",
          }}
        >
          <Form.Item
            name="clientId"
            className="grid-2-column"
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
              placeholder={"Enter name of the user"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
            />
          </Form.Item>
          <Form.Item
            name="CommercialRegistrationNumber"
            label={"CR Number"}
            rules={[
              {
                required: true,
                message: "No CR Number provided",
              },
            ]}
          >
            <Input placeholder={"Enter CR no"} />
          </Form.Item>
          <Form.Item name="mobile" label={"Mobile no"}>
            <Input placeholder={"Enter mobile number"} />
          </Form.Item>
          <Form.Item name="postalCode" label={"Postal Code"}>
            <Input placeholder={"Enter mobile number"} />
          </Form.Item>
          <Form.Item name="poBox" label={"PO Box no"}>
            <Input placeholder={"Enter mobile number"} />
          </Form.Item>
          <Form.Item name="landline" label={"Landline"}>
            <Input placeholder={"Enter landline number"} />
          </Form.Item>
          <Form.Item name="VATIN" label={"VATIN"}>
            <Input placeholder={"Enter landline number"} />
          </Form.Item>
          <Form.Item name="Tax" label={"Tax no"}>
            <Input placeholder={"Enter landline number"} />
          </Form.Item>
          <Form.Item name="OCCI" label={"OCCI"}>
            <Input placeholder={"Enter landline number"} />
          </Form.Item>
          <Form.Item className="grid-2-column" name="address" label={"Address"}>
            <TextArea placeholder={"Enter Address"} />
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
              {editData ? "Update Client Info" : "Create Client Info"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default AccountingClientInformationForm;
