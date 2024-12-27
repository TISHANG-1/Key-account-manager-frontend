import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;
const contactRoles = ["Employee", "Manager", "Owner"];

const ContactForm = ({ onSubmit, initialValues = {}, mode = "create" }) => {
  const [form] = Form.useForm();

  // Populate initial values when editing
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        name="contact_number"
        label="Contact Number"
        rules={[{ required: true, message: "Please enter the contact number" }]}
      >
        <Input placeholder="Enter contact number" />
      </Form.Item>
      <Form.Item name="role" label="Role">
        <Select>
          {contactRoles.map((role, index) => (
            <Option key={index} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {mode === "create" ? "Add Contact" : "Update Contact"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
