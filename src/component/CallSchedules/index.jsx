import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Popconfirm,
  message,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { ROOT_URL } from "../../utils";

const { Option } = Select;

const CallScheduleComponent = ({ leadId = "" }) => {
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [callSchedules, setCallSchedules] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form] = Form.useForm();
  const [filterToday, setFilterToday] = useState(false);

  const fetchUsers = async () => {
    await axios
      .get(`${ROOT_URL}/users/list`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchAllLeads = async () => {
    await axios
      .get(`${ROOT_URL}/leads`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setLeads(data);
        // toast.success("leads fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchAllCallSchedules = async () => {
    await axios
      .get(
        `${ROOT_URL}/call-schedules/${
          leadId.length ? `restaurant_id/${leadId}` : "all"
        }`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setCallSchedules(data);
        // toast.success("call schedules fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchFilteredCallSchedules = async () => {
    await axios
      .get(
        `${ROOT_URL}/call-schedules/my/${
          leadId.length ? `call_with_lead_today/${leadId}` : "calls-today"
        }`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setCallSchedules(data);
        // toast.success("call schedules fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const showModal = () => {
    setEditRecord(null);
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditRecord(record);
    form.setFieldsValue({
      restaurant_id: record.restaurant_id,
      call_frequency: record.call_frequency,
      last_called_date: moment(record.last_called_date),
      next_call_date: moment(record.next_call_date),
      kam_id: record.kam_id,
    });
    setIsModalVisible(true);
  };

  const handleMarkCallAttended = async (values) => {
    console.log(values);
    await axios
      .put(
        `${ROOT_URL}/call-schedules/mark-attended/${values.id}`,
        { callDetails: { ...values } },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then(() => {
        toast.success("Schedule Marked Successfully", {
          toastId: "success1",
        });
        fetchAllCallSchedules();
      })
      .catch(() => {
        toast.error("Error while Marking the Schedule");
      });
  };

  // Handle the submission of the form
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const scheduleData = {
          ...values,
          last_called_date: values.last_called_date
            ? values.last_called_date.format()
            : null,
          next_call_date: values.next_call_date
            ? values.next_call_date.format()
            : null,
        };

        if (editRecord) {
          // Handle updating an existing schedule
          await axios
            .put(
              `${ROOT_URL}/call-schedules/update/${editRecord?.id}`,
              {
                callDetails: { id: editRecord.id, ...scheduleData },
              },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            )
            .then(() => {
              toast.success("Call Schedule Updated successfully", {
                toastId: "success1",
              });
            })
            .catch((err) => {
              toast.error(err.message);
            });
        } else {
          values =
            leadId.length > 0 ? { ...values, restaurant_id: leadId } : values;
          await axios
            .post(
              `${ROOT_URL}/call-schedules/create`,

              { callDetails: { ...values } },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            )
            .then(() => {
              toast.success("Call Schedule created successfully", {
                toastId: "success1",
              });
            })
            .catch((err) => {
              toast.error(err);
            });
        }
        fetchAllCallSchedules();
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Form validation error:", error);
        toast.error("Please fill in all required fields.");
      });
  };

  // Handle closing the modal without any changes
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle the delete action
  const handleDelete = async (id) => {
    await axios
      .delete(`${ROOT_URL}/call-schedules/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Schedule Deleted Successfully", {
          toastId: "success1",
        });
        fetchAllCallSchedules();
      })
      .catch(() => {
        toast.error("Error while deleting the Schedule");
      });
  };

  const handleFilterTodaysCall = async () => {
    if (filterToday) {
      await fetchAllCallSchedules();
    } else {
      await fetchFilteredCallSchedules();
    }
    setFilterToday(!filterToday);
  };

  // Define columns for the Ant Design table
  let columns = [
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Restaurant ID",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
    },
    {
      title: "Call Frequency",
      dataIndex: "call_frequency",
      key: "call_frequency",
    },
    {
      title: "Last Called Date",
      dataIndex: "last_called_date",
      key: "last_called_date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Next Call Date",
      dataIndex: "next_call_date",
      key: "next_call_date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "KAM ID",
      dataIndex: "kam_id",
      key: "kam_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            style={{ background: "green", color: "white", margin: "2px" }}
            onClick={() => handleMarkCallAttended(record)}
          >
            Mark Attended
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this call schedule?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ margin: "5px 0px" }} danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
    fetchAllCallSchedules();
    fetchAllLeads();
  }, []);

  return (
    <div style={{ margin: "40px 20px" }}>
      <Button type="primary" onClick={showModal}>
        Add New Call Schedule
      </Button>
      <Button style={{ marginLeft: "10px" }} onClick={handleFilterTodaysCall}>
        {filterToday ? "Show All Calls" : "Show Today's Calls"}
      </Button>
      <Table
        columns={columns}
        dataSource={callSchedules} // Apply the filtered schedules
        rowKey="id"
        style={{ marginTop: 20 }}
      />

      <Modal
        title={editRecord ? "Edit Call Schedule" : "Add New Call Schedule"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editRecord ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="callScheduleForm"
          initialValues={{
            call_frequency: "Weekly",
          }}
        >
          {!leadId.length ? (
            <Form.Item
              name="restaurant_id"
              label="Restaurant ID"
              rules={[
                { required: true, message: "Please input the restaurant ID!" },
              ]}
            >
              <Select>
                {leads.map((lead) => (
                  <Option value={lead.id} key={lead.id}>
                    {" "}
                    {lead.name}{" "}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <></>
          )}

          <Form.Item
            name="call_frequency"
            label="Call Frequency"
            rules={[
              { required: true, message: "Please select the call frequency!" },
            ]}
          >
            <Select>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
              <Option value="Yearly">Yearly</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="last_called_date"
            label="Last Called Date"
            rules={[
              {
                required: false,
                message: "Please select the last called date!",
              },
            ]}
          >
            <DatePicker disabled={true} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            name="next_call_date"
            label="Next Call Date"
            rules={[
              { required: true, message: "Please select the next call date!" },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            name="kam_id"
            label="KAM"
            rules={[{ required: true, message: "Please input the KAM ID!" }]}
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

export default CallScheduleComponent;
