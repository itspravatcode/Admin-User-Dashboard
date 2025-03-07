import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { authToken, handleLogout } =
    useAuth();

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    { key: "2", icon: <UserOutlined />, label: <Link to="/users">User</Link> },
    {
      key: "3",
      icon: <MenuFoldOutlined />,
      label: <Link to="/companies">Companies</Link>,
    },
  
    { key: "4", icon: <EditOutlined />, label: <Link to="/blogs">Blogs</Link> },
    authToken
      ? {
          key: "5",
          icon: <LogoutOutlined />,
          label: <Link to={""} onClick={handleLogout}>Logout</Link>,
        }
      : {
          key: "6",
          icon: <LoginOutlined />,
          label: <Link to="/login">Login</Link>,
        },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
}
