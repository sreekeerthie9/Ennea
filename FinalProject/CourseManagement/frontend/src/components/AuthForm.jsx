import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ConfigStyles from "./ConfigStyles";
import {
  NavLink,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useForm } from "antd/es/form/Form";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
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

export default function AuthForm() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const [form] = useForm();

  async function handleFinish() {

    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        submit(values, { method: "post", action: "/auth?mode=login" });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
        
  }

  return (
    <ConfigStyles>
      <Wrapper>
        {!isLogin && <RegisterForm />}
        {isLogin && (
          <LoginForm
            form={form}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleFinish}
          >
            <h1 style={{ fontWeight: "bold" }}>Log in</h1>

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
              <Button
                type="primary"
                htmlType="submit"
                className="ant-button"
                block
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..":"Log in"}
              </Button>
              Don't have an account? <NavLink to="?mode=signup">signup</NavLink>
            </Form.Item>
          </LoginForm>
        )}
      </Wrapper>
    </ConfigStyles>
  );
}
