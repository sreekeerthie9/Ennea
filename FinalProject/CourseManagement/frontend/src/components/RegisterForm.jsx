import { Button, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { NavLink, useSubmit } from "react-router-dom";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const LoginForm = styled(Form)`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  font: inherit;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function RegisterForm() {
  const submit = useSubmit();
  const [role, setRole] = useState("");
  const [form] = useForm();

  function onChange(e) {
    setRole(e.target.value);
  }

  function handleFinish() {
    form
      .validateFields()
      .then((values) => {
        values.role = role;
        form.resetFields();
        submit(values, { method: "post", action: "/auth?mode=signup" });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  }
  return (
    <LoginForm form={form} layout="vertical" method="post" onFinish={handleFinish}>
      <h1 style={{ fontWeight: "bold" }}>Create new Account</h1>

      <Form.Item>
        <Radio.Group onChange={onChange}>
          <Radio value="role_admin">Admin</Radio>
          <Radio value="role_student">User</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Firstname :"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Please enter your firstneme.",
          },
        ]}
      >
        <Input placeholder="Firstname" />
      </Form.Item>
      <Form.Item
        label="Lastname :"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Please enter your lastname.",
          },
        ]}
      >
        <Input placeholder="Lastname" />
      </Form.Item>

      <Form.Item
        label="Username :"
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your Username.",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Password :"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter the password",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="ant-button" block>
          Create new account
        </Button>
        Login here <NavLink to="?mode=login">log in</NavLink>
      </Form.Item>
    </LoginForm>
  );
}
