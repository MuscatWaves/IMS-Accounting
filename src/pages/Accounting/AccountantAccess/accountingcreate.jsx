import React, { useState } from "react";
import { Button, Form, Drawer, Input, message, Switch } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import Password from "antd/es/input/Password";

const AccountantAccessForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filter,
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
      isActive: values?.isActive,
      isHead: values?.isHead,
      ...(!editData && { password: values?.password }),
      name: values?.name,
      ...(!editData && { email: values?.email }),
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: editData ? "/api/client" : "/api/client/create",
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
      title={editData ? "Update Client" : "Create Client"}
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
            name: editData?.name || "",
            email: editData?.email || "",
            password: editData?.password,
            isHead: editData?.isHead || false,
            isActive: editData?.isActive || false,
          }}
        >
          <Form.Item
            name="name"
            label={"Name"}
            rules={[
              {
                required: true,
                message: "No Username provided",
              },
            ]}
          >
            <Input placeholder={"Enter name of the user"} />
          </Form.Item>
          {!editData && (
            <Form.Item
              name="email"
              label={"Email"}
              rules={[
                {
                  required: true,
                  message: "No Email provided",
                },
              ]}
            >
              <Input placeholder={"Enter email of the user"} />
            </Form.Item>
          )}
          {!editData && (
            <Form.Item
              name="password"
              label={"Password"}
              rules={[
                {
                  required: true,
                  message: "No Password provided",
                },
              ]}
            >
              <Password placeholder={"Enter password for the user"} />
            </Form.Item>
          )}
          <Form.Item
            name={"isActive"}
            label={"Account Status"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={"isHead"}
            label={"Owner Account"}
            valuePropName={"checked"}
          >
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
              {editData ? "Update Client" : "Create Client"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default AccountantAccessForm;
