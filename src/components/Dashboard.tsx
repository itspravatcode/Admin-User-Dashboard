import { useEffect, useMemo } from "react";
import { Card, Row, Col, Typography } from "antd";
import { Column, Bar } from "@ant-design/plots";
import { fetchBlogs } from "../ApiCalls/fetchBlogs";
import { fetchCompanies } from "../ApiCalls/fetchCompanies";
import { fetchRoles } from "../ApiCalls/fetchRoles";
import { fetchUsers } from "../ApiCalls/fetchUsers";
import { useDashboardStore } from "../stores/dashboardStore";
import { useCompanyStore } from "../stores/companyStores";
import { useUserStore } from "../stores/userStore";

const { Title } = Typography;

const Dashboard = ({ darkMode }) => {

  const {
    roles,
    companies: apiCompanies,
    posts,
    users: apiUsers,
    setRoles,
    setCompanies,
    setPosts,
    setUsers,
  } = useDashboardStore();

  useEffect(() => {
    fetchRoles().then(setRoles);
    fetchCompanies().then(setCompanies);
    fetchBlogs().then(setPosts);
    fetchUsers().then(setUsers);
  }, [setRoles, setCompanies, setPosts, setUsers]);

 
  const {
    companies: persistedCompanies,
    updatedCompanies,
    deletedCompanyIds,
  } = useCompanyStore();

  const mergedCompanies = useMemo(() => {
    const processedApiCompanies = (apiCompanies || [])
      .filter((company) => !deletedCompanyIds.includes(company.id))
      .map((company) => updatedCompanies[company.id] || company);
    const processedPersistedCompanies = persistedCompanies.filter(
      (company) => !deletedCompanyIds.includes(company.id)
    );
    return [...processedApiCompanies, ...processedPersistedCompanies];
  }, [apiCompanies, persistedCompanies, updatedCompanies, deletedCompanyIds]);

 
  const {
    users: persistedUsers,
    updatedUsers,
    deletedUserIds,
  } = useUserStore();

  const mergedUsers = useMemo(() => {
    const processedApiUsers = (apiUsers || [])
      .filter((user) => !deletedUserIds.includes(user.id))
      .map((user) => updatedUsers[user.id] || user);
    const processedPersistedUsers = persistedUsers.filter(
      (user) => !deletedUserIds.includes(user.id)
    );
    return [...processedApiUsers, ...processedPersistedUsers];
  }, [apiUsers, persistedUsers, updatedUsers, deletedUserIds]);


  const totalRoles = roles.length;
  const totalPosts = posts.length;
  const totalComments = posts.reduce(
    (acc, post) => acc + (post.comment_count || 0),
    0
  );
  const totalUsers = mergedUsers.length;
  const totalCompanies = mergedCompanies.length;


  const companyMarketCapData = mergedCompanies.map((company) => ({
    name: company.name,
    marketCap: company.marketCap,
  }));

  const companyEmployeeData = mergedCompanies.map((company) => ({
    company: company.name,
    employees: company.employeeCount,
  }));


  const chartTheme = darkMode
    ? "dark"
    : {
        background: { fill: "#fff" },
        axis: {
          label: { fill: "#000" },
          title: { fill: "#000" },
        },
        legend: { text: { fill: "#000" } },
      };

  const barConfig = {
    data: companyEmployeeData,
    xField: "employees",
    yField: "company",
    seriesField: "company",
    colorField: "company",
    legend: { position: "bottom" },
    tooltip: {
      formatter: (datum) => ({
        name: datum.company,
        value: datum.employees,
      }),
    },
    height: 400,
    theme: chartTheme,
  };

 
  const containerStyle = {
    padding: 20,
    backgroundColor: darkMode ? "#141414" : "#fff",
    color: darkMode ? "#fff" : "#000",
    minHeight: "100vh",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#141414" : "#fff",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div style={containerStyle}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Total Roles" style={cardStyle}>
            <Title level={2}>{totalRoles}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Posts" style={cardStyle}>
            <Title level={2}>{totalPosts}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Comments" style={cardStyle}>
            <Title level={2}>{totalComments}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Users" style={cardStyle}>
            <Title level={2}>{totalUsers}</Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={6}>
          <Card title="Total Companies" style={cardStyle}>
            <Title level={2}>{totalCompanies}</Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Company Market Capitalization" style={cardStyle}>
            <Column
              key={`column-${darkMode}`}
              data={companyMarketCapData}
              xField="name"
              yField="marketCap"
              height={400}
              theme={chartTheme}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Employees per Company" style={cardStyle}>
            <Bar key={`bar-${darkMode}`} {...barConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
