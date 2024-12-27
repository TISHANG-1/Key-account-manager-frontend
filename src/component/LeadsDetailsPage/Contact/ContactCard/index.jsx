import React, { useState } from "react";
import { CardContainer, Title, Info } from "./styles";
import { Button, Modal } from "antd";
import ContactForm from "./helper";

const ContactCard = ({
  contactDetails = {},
  handleDeleteContact,
  handleUpdateContact,
}) => {
  const [isEditVisible, setIsEditVisible] = useState(false);

  const handleUpdate = (updatedDetails) => {
    handleUpdateContact(contactDetails.id, updatedDetails);
    setIsEditVisible(false); // Close the modal
  };

  return (
    <CardContainer>
      <Title>{contactDetails.name}</Title>
      <Info>
        <strong>Contact ID:</strong> {contactDetails.id}
      </Info>
      <Info>
        <strong>Restaurant ID:</strong> {contactDetails.restaurant_id}
      </Info>
      <Info>
        <strong>Email:</strong> {contactDetails.email}
      </Info>
      <Info>
        <strong>Contact Number:</strong> {contactDetails.contact_number}
      </Info>
      <Info>
        <strong>Role:</strong>{" "}
        {contactDetails.role ? contactDetails.role : "Not Assigned"}
      </Info>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" onClick={() => setIsEditVisible(true)}>
          Update
        </Button>
        <Button
          danger
          onClick={() => handleDeleteContact(contactDetails.id)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
      </div>

      {/* Update Modal */}
      <Modal
        title="Update Contact"
        visible={isEditVisible}
        onCancel={() => setIsEditVisible(false)}
        footer={null}
      >
        <ContactForm
          onSubmit={handleUpdate}
          initialValues={contactDetails}
          mode="update"
        />
      </Modal>
    </CardContainer>
  );
};

export default ContactCard;
