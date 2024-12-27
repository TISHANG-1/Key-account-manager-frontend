import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { ROOT_URL } from "../../../utils";

const { Title } = Typography;

const performancePatternColumns = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "Order Count",
    dataIndex: "order_count",
    key: "month",
  },
  {
    title: "Total Value",
    dataIndex: "total_value",
    key: "month",
  },
];

const allPerformanceColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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
    title: "Order Count",
    dataIndex: "order_count",
    key: "order_count",
  },
  {
    title: "Order Value",
    dataIndex: "order_value",
    key: "order_value",
  },
  {
    title: "Last Order Date",
    dataIndex: "last_order_date",
    key: "last_order_date",
    render: (text) => new Date(text).toLocaleString(),
  },
];

const Performance = ({ leadId = undefined }) => {
  const [allPerformances, setAllPerformances] = useState([]);
  const [performancePatterns, setPerformancePatterns] = useState([]);

  const fetchAllPerformancesfetchAllPerformances = async () => {
    await axios
      .get(
        `${ROOT_URL}/performance${
          leadId ? `/restaurant_id/${leadId}` : `/all`
        }`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setAllPerformances(data);
        // toast.success("Performance fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchPerformancePatterns = async () => {
    await axios
      .get(`${ROOT_URL}/performance/ordering-pattern/${leadId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setPerformancePatterns(data);
        // toast.success("Performance Pattern fetched successfully", {
        //   toastId: "success1",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    if (leadId) fetchPerformancePatterns();
    fetchAllPerformancesfetchAllPerformances();
  }, [leadId]);

  return (
    <div>
      <Table
        dataSource={allPerformances}
        columns={allPerformanceColumns}
        rowKey="id"
        pagination={false}
      />
      {leadId ? (
        <>
          <Title level={3}>Ordering Pattern</Title>
          <Table
            style={{ marginTop: "30px" }}
            dataSource={performancePatterns}
            columns={performancePatternColumns}
            rowKey="id"
            pagination={false}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Performance;
