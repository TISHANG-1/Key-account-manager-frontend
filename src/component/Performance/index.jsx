import React from "react";
import { Table, Typography } from "antd";
import PerformanceMetrics from "./PerformanceMetric";
import Performance from "./Performance";

const { Title } = Typography;

const PerformanceMetricsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Performance Metrics</Title>
      <PerformanceMetrics />

      <Title level={3}>All Performances</Title>
      <Performance />
    </div>
  );
};

export default PerformanceMetricsPage;
