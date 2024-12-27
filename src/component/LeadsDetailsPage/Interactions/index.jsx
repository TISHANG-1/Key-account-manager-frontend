import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { ROOT_URL } from "../../../utils";
import dayjs from "dayjs";

const { Option } = Select;
const interactionTypes = ["Follow-Up", "Potential", "Demo", "Deal-Achieved"];

const InteractionPage = ({ leadId }) => {
  const [interactions, setInteractions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const [form] = Form.useForm(); // Reference to the form

  const fetchAllInteractions = async () => {
    try {
      const { data } = await axios.get(`${ROOT_URL}/interactions/${leadId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setInteractions(data);
      toast.success("Interactions fetched successfully", {
        toastId: "success1",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddInteraction = () => {
    setCurrentInteraction(null);
    form.resetFields(); // Reset form fields when adding a new interaction
    setModalVisible(true);
  };

  const handleEditInteraction = (interaction) => {
    setCurrentInteraction(interaction);
    form.setFieldsValue({
      ...interaction,
      date: dayjs(interaction.date), // Convert date to dayjs object
    });
    setModalVisible(true);
  };

  const handleDeleteInteraction = async (id) => {
    try {
      await axios.delete(`${ROOT_URL}/interactions/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Interaction Deleted successfully", {
        toastId: "success1",
      });
      fetchAllInteractions();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentInteraction) {
        // Update interaction
        await axios.put(
          `${ROOT_URL}/interactions/${currentInteraction?.id}`,
          { interactionDetails: { ...values, restaurant_id: leadId } },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        toast.success("Interaction Updated successfully", {
          toastId: "success1",
        });
      } else {
        // Add new interaction
        await axios.post(
          `${ROOT_URL}/interactions/create`,
          { interactionDetails: { ...values, restaurant_id: leadId } },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        toast.success("Interaction created successfully", {
          toastId: "success1",
        });
      }
      fetchAllInteractions();
      form.resetFields(); // Reset form fields after submission
      setModalVisible(false); // Close modal
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllInteractions();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Contact ID",
      dataIndex: "contact_id",
      key: "contact_id",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Order Value",
      dataIndex: "order_value",
      key: "order_value",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleEditInteraction(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteInteraction(record.id)}
            style={{ margin: "5px 2px" }}
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px 10px" }}>
      <Button
        onClick={handleAddInteraction}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add New Interaction
      </Button>
      <Table columns={columns} dataSource={interactions} rowKey="id" />

      <Modal
        title={currentInteraction ? "Edit Interaction" : "Add New Interaction"}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form} // Attach form reference
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Contact ID"
            name="contact_id"
            rules={[
              { required: true, message: "Please input the contact ID!" },
            ]}
            normalize={(value) => value?.trim()} // Automatically trims input
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Interaction Type"
            name="type"
            rules={[
              { required: true, message: "Please input the interaction type!" },
            ]}
          >
            <Select>
              {interactionTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {currentInteraction ? (
            <Form.Item
              label="Order Value"
              name="order_value"
              rules={[
                { required: true, message: "Please input the order value!" },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          ) : (
            <></>
          )}

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please input the date!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentInteraction ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InteractionPage;
