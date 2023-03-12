import React, { useState } from "react";
import { Button, Form, Drawer, message, Switch, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";

const AccountantAccessForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filter,
  clientsList,
  accountantList,
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
      clientId: values?.clientId,
      accountantId: values?.accountantId,
      access: values?.access,
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: editData ? "/api/accountantaccess" : "/api/accountantaccess/create",
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
        getData(filter);
      })
      .catch(function (error) {
        message.error("Something Went Wrong!", "error");
        setLoading(false);
      });
  };

  return (
    <Drawer
      title={editData ? "Update Accountant Access" : "Create Accountant Access"}
      placement="right"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className="flex-gap-column"
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            clientId: editData?.clientId || null,
            accountantId: editData?.accountantId || null,
            access: editData?.access || false,
          }}
        >
          <Form.Item
            name="accountantId"
            label={"Accountant"}
            rules={[
              {
                required: true,
                message: "No Accountant provided",
              },
            ]}
          >
            <Select
              options={accountantList}
              placeholder={"Select the Accountant"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
            />
          </Form.Item>
          <Form.Item
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
          <Form.Item name={"access"} label={"Access"} valuePropName={"checked"}>
            <Switch />
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
              {editData
                ? "Update Accountant Access"
                : "Create Accountant Access"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default AccountantAccessForm;
