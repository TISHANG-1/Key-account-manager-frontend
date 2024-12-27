import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const { Header } = Layout;

const NavigationBar = () => {
  const navigate = useNavigate(); // to navigate to different routes

  const handleMenuClick = (e) => {
    // Navigate to the selected page
    navigate(`/${e.key}`);
  };

  return (
    <Header style={{ background: "aliceblue", padding: 0 }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["leads"]}
        style={{
          borderBottom: "0px",
          background: "aliceblue",
          margin: "50px 0px",
        }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="leads" icon={<FileSearchOutlined />}>
          Leads
        </Menu.Item>
        <Menu.Item key="call-schedules" icon={<CalendarOutlined />}>
          Call Schedules
        </Menu.Item>
        <Menu.Item key="performance" icon={<LineChartOutlined />}>
          Performance
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavigationBar;
