import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { PageContainer, FormContainer, Heading } from "./styles.jsx";
import { useAuth } from "../../context/auth.jsx";
import axios from "axios";
import { ROOT_URL } from "../../utils.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginSignUp = () => {
  const { login, onLoginPage } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    await axios
      .post(`${ROOT_URL}/users/${onLoginPage ? "sign-in" : "sign-up"}`, {
        userDetails: { ...values },
      })
      .then(({ data }) => {
        localStorage.setItem("token", `Bearer ${data?.token}`);
        localStorage.setItem("role", `${data?.role}`);
        login();
        toast.success("login successful", {
          toastId: "success1",
        });
        navigate("/home");
      })
      .catch(() => {
        console.log("Error While Submitting form");
        toast.error("login failed please try again");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Heading>{onLoginPage ? "Log In" : "Sign Up"}</Heading>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 400,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginSignUp;
