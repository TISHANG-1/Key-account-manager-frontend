import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, notification } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const LeadsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    await axios
      .get(`${ROOT_URL}/users/list`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setUsers(data);
        // toast.success("users fetched successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  const fetchAllLeads = async () => {
    axios
      .get(`${ROOT_URL}/leads`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setLeads(data);
        // toast.success("leads fetched successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  const showModal = (lead = null) => {
    setCurrentLead(lead);
    form.resetFields();
    if (lead) {
      form.setFieldsValue(lead);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (currentLead) {
          await axios
            .put(
              `${ROOT_URL}/leads/${currentLead?.id}`,
              {
                leadDetails: { ...values },
              },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            )
            .then(() => {
              toast.success("lead Updated successfully", {
                toastId: "success1",
              });
              fetchAllLeads();
            })
            .catch((err) => {
              toast.error(err.message);
            });
        } else {
          // Add new lead
          await axios
            .post(
              `${ROOT_URL}/leads/create`,

              { leadDetails: { ...values } },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            )
            .then(() => {
              toast.success("lead created successfully", {
                toastId: "success1",
              });
              fetchAllLeads();
            })
            .catch((err) => {
              toast.error(err);
            });
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${ROOT_URL}/leads/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Lead Deleted Successfully", {
          toastId: "success1",
        });
        fetchAllLeads();
      })
      .catch(() => {
        toast.error("Error while deleting the lead");
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Lead Status",
      dataIndex: "lead_status",
      key: "lead_status",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => showModal(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            onClick={() =>
              navigate("/leads-details", {
                state: { leadId: record.id, leadName: record.name },
              })
            }
            type="primary"
            style={{ marginRight: 8 }}
          >
            Details
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllLeads();
    fetchUsers();
  }, []);

  return (
    <div style={{ margin: "40px 20px" }}>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add New Lead
      </Button>
      <Table columns={columns} dataSource={leads} rowKey="id" />
      <Modal
        title={currentLead ? "Update Lead" : "Add New Lead"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {currentLead ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="leadForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_number"
            label="Contact Number"
            rules={[
              { required: true, message: "Please input the contact number!" },
            ]}
          >
            <Input />
          </Form.Item>
          {currentLead ? (
            <Form.Item
              name="lead_status"
              label="Lead Status"
              rules={[{ message: "Please select the lead status!" }]}
            >
              <Select>
                <Option value="New">New</Option>
                <Option value="Contacted">Contacted</Option>
                <Option value="Qualified">Qualified</Option>
                <Option value="Converted">Converted</Option>
                <Option value="Lost">Lost</Option>
              </Select>
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="assigned_to"
            label="Assigned To"
            rules={[
              { required: false, message: "Please input the assigned person!" },
            ]}
          >
            <Select>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeadsPage;
