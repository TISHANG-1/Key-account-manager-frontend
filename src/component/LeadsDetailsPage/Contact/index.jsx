import React, { useEffect, useState } from "react";
import axios from "axios";
import { ROOT_URL } from "../../../utils";
import { toast } from "react-toastify";
import ContactCard from "./ContactCard";
import { Modal, Button, Form, Input, Select } from "antd";
import ContactForm from "./ContactCard/helper";

const { Option } = Select;
const contactRoles = ["Employee", "Manager", "Owner"];
const Contact = ({ leadId }) => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchAllContacts = async () => {
    await axios
      .get(`${ROOT_URL}/contacts/${leadId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        setContacts(data);
        // toast.success("Interactions fetched successfully");
      })
      .catch((err) => {
        toast.error("Error fetching interactions");
      });
  };

  const handleDeleteContact = async (id) => {
    await axios
      .delete(`${ROOT_URL}/contacts/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        toast.warning("Contact Deleted successfully", {
          toastId: "success1",
        });
        fetchAllContacts();
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err) => {
        toast.error("Error deleting contact");
      });
  };

  const handleUpdateContact = async (id, values) => {
    await axios
      .put(
        `${ROOT_URL}/contacts/${id}`,
        {
          contactDetails: {
            id,
            ...values,
          },
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then(() => {
        toast.warning("Contact Updated successfully", {
          toastId: "success1",
        });
        fetchAllContacts();
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err) => {
        toast.error("Error Updating contact");
      });
  };

  const handleAddContact = async (values) => {
    await axios
      .post(
        `${ROOT_URL}/contacts/create`,
        { contactDetails: { ...values, restaurant_id: leadId } },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then(() => {
        toast.success("Contact added successfully", {
          toastId: "success1",
        });
        fetchAllContacts();
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err) => {
        toast.error("Error adding contact");
      });
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);
  return (
    <div>
      <Button
        type="primary"
        style={{ marginLeft: "10px" }}
        onClick={() => setIsModalVisible(true)}
      >
        Add Contact
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "10px",
          gap: "10px",
        }}
      >
        <Modal
          title="Add Contact"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <ContactForm onSubmit={handleAddContact} />
        </Modal>

        {contacts.length === 0 ? (
          <p>No contacts available</p>
        ) : (
          contacts.map((contactDetails, index) => (
            <ContactCard
              key={index}
              contactDetails={contactDetails}
              handleDeleteContact={handleDeleteContact}
              handleUpdateContact={handleUpdateContact}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Contact;
