import React from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import InteractionPage from "./Interactions";
import Contact from "./Contact";
import CallScheduleComponent from "../CallSchedules";
import Performance from "../Performance/Performance";
const LeadDetailsPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const contactData = [
    {
      id: "26215111-6d66-4e3c-b91b-c5e200454d21",
      created_at: "2024-12-25T19:41:20.786Z",
      name: "Satya",
      role: "Employee",
      email: "conct@gmail.com",
      contact_number: "989343355",
      restaurant_id: "d7002cb0-24e4-492f-8e71-f5194d6f270b",
      updated_at: null,
    },
  ];

  const interactionData = [
    {
      id: "54505b72-688b-4508-8a8a-5037c4c9bee3",
      restaurant_id: "d7002cb0-24e4-492f-8e71-f5194d6f270b",
      contact_id: "e4103a44-2bd8-43ef-b2fb-236b01c0860b",
      type: "Follow-Up",
      details: null,
      order_value: 500,
      date: "2024-12-25",
    },
  ];

  const callScheduleData = [
    {
      id: "954bede3-1156-4438-9741-620849463b85",
      restaurant_id: "03062a21-98e4-411c-affe-b9e5e090e922",
      call_frequency: "Weekly",
      next_call_date: "2024-07-25",
      kam_id: null,
    },
  ];

  const performanceData = [
    {
      id: "d165fdc6-dfe0-45e2-9c1d-c4583b5ac563",
      created_at: "2024-12-25T13:37:23.134Z",
      restaurant_id: "d7002cb0-24e4-492f-8e71-f5194d6f270b",
      order_count: "1",
      order_value: "1090",
      last_order_date: "2024-12-25T18:30:00.000Z",
    },
  ];

  // Columns for each table
  const contactColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Restaurant ID",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
  ];

  const interactionColumns = [
    { title: "Contact Id", dataIndex: "contact_id", key: "contact_id" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "Order Value", dataIndex: "order_value", key: "order_value" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const callScheduleColumns = [
    {
      title: "Call Frequency",
      dataIndex: "call_frequency",
      key: "call_frequency",
    },
    {
      title: "Next Call Date",
      dataIndex: "next_call_date",
      key: "next_call_date",
    },
    {
      title: "Restaurant ID",
      dataIndex: "restaurant_id",
      key: "restaurant_id",
    },
    { title: "KAM ID", dataIndex: "kam_id", key: "kam_id" },
  ];

  const performanceColumns = [
    { title: "Order Count", dataIndex: "order_count", key: "order_count" },
    { title: "Order Value", dataIndex: "order_value", key: "order_value" },
    {
      title: "Last Order Date",
      dataIndex: "last_order_date",
      key: "last_order_date",
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
  ];

  return (
    <div style={{ margin: "20px 20px" }}>
      <h1>Lead Details : {state.leadName}</h1>

      <section style={{ marginBottom: "32px" }}>
        <h2>Contacts</h2>
        <Contact leadId={state.leadId} />
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Interaction</h2>
        <InteractionPage leadId={state?.leadId} />
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2>Call Schedules</h2>
        <CallScheduleComponent leadId={state?.leadId} />
      </section>

      <section>
        <h2>Performance</h2>
        <Performance leadId={state.leadId} />
      </section>
    </div>
  );
};

export default LeadDetailsPage;
