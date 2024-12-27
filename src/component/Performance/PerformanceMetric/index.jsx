import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../../utils";
import { toast } from "react-toastify";

const { Title } = Typography;

// Table Columns
const topAndUnderColumns = [
  {
    title: "Restaurant Name",
    dataIndex: "restaurant_name",
    key: "restaurant_name",
  },
  {
    title: "Order Value",
    dataIndex: "order_value",
    key: "order_value",
  },
  {
    title: "Order Count",
    dataIndex: "order_count",
    key: "order_count",
  },
  {
    title: "Last Order Date",
    dataIndex: "last_order_date",
    key: "last_order_date",
    render: (text) => new Date(text).toLocaleString(),
  },
];

const PerformanceMetrics = () => {
  const [topPerformingLeads, setTopPerformingLeads] = useState([]);
  const [underPerformingLeads, setUnderPerformingLeads] = useState([]);

  const fetchTopPerformanceLeadsMetrics = async () => {
    await axios
      .get(`${ROOT_URL}/performance/under-me/top-performing-accounts`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setTopPerformingLeads(data);
        // toast.success("top leads fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchUnderPerformanceLeadsMetrics = async () => {
    await axios
      .get(`${ROOT_URL}/performance/under-me/under-performing-accounts`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setUnderPerformingLeads(data);
        // toast.success("Under performing leads fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    fetchTopPerformanceLeadsMetrics();
    fetchUnderPerformanceLeadsMetrics();
  }, []);

  return (
    <div>
      <Title level={5}>Top Performing Leads</Title>
      <Table
        dataSource={topPerformingLeads}
        columns={topAndUnderColumns}
        rowKey="restaurant_id"
        pagination={false}
      />
      <Title level={5}>Under-Performing Leads</Title>
      <Table
        dataSource={underPerformingLeads}
        columns={topAndUnderColumns}
        rowKey="restaurant_id"
        pagination={false}
      />
    </div>
  );
};

export default PerformanceMetrics;
