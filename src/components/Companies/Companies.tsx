import { useMemo, useState } from "react";
import {
  BankOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Popconfirm, Button, Drawer, Spin } from "antd";
import { Link } from "react-router-dom";
import CompanyFilter, {
  FilterState,
  initialFilterState,
} from "./CompanyFilter";
import { useCompanies } from "../../Contexts/companyContext";
import { useCompanyStore } from "../../stores/companyStores";
import { useAuth } from "../../Contexts/AuthContext";

const Companies = () => {
  const { companies: apiCompanies, isLoading } = useCompanies();
  const persistedCompanies = useCompanyStore((state) => state.companies);
  const updatedCompanies = useCompanyStore((state) => state.updatedCompanies);
  const deletedCompanyIds = useCompanyStore((state) => state.deletedCompanyIds);
  const deleteCompany = useCompanyStore((state) => state.deleteCompany);


  const mergedCompanies = useMemo(() => {
    const processedApiCompanies = (apiCompanies || [])
      .filter((company) => !deletedCompanyIds.includes(company.id))
      .map((company) => updatedCompanies[company.id] || company);
    const processedPersistedCompanies = persistedCompanies.filter(
      (company) => !deletedCompanyIds.includes(company.id)
    );
    return [...processedApiCompanies, ...processedPersistedCompanies];
  }, [apiCompanies, persistedCompanies, deletedCompanyIds, updatedCompanies]);

  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);
  const filteredCompanies = useMemo(() => {
    return mergedCompanies.filter(
      (company) =>
        company.marketCap >= filterState.minMarketCap &&
        company.marketCap <= filterState.maxMarketCap
    );
  }, [mergedCompanies, filterState]);

  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.role === "Admin";

 
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <>
      {" "}
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}
        tip="Logging in..."
        size="large"
      >
        <Row style={{ minHeight: "100vh", padding: "20px" }} gutter={[16, 16]}>
          {/* Top Row: Add Company and Filter Buttons */}
          <Col span={24}>
            <Row justify="space-between" align="middle">
              {isAdmin && (
                <Link to="/addcompany">
                  <Button type="primary">
                    <PlusCircleOutlined /> Add Company
                  </Button>
                </Link>
              )}
              <Button onClick={() => setFilterVisible(true)}>Filter</Button>
            </Row>
          </Col>

          {/* Companies Grid */}
          <Col span={24}>
            <Row justify="center" gutter={[16, 16]}>
              {filteredCompanies.map((company) => (
                <Col key={company.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    loading={isLoading}
                    hoverable
                    actions={[
                      <Link to={`/companies/${company.id}`} key="profile">
                        <BankOutlined style={{ fontSize: "18px" }} />
                      </Link>,
                      isAdmin && (
                        <Link to={`/editcompany/${company.id}`} key="edit">
                          <EditOutlined
                            style={{ fontSize: "18px", color: "blue" }}
                          />
                        </Link>
                      ),
                      <Popconfirm
                        key="delete"
                        title="Are you sure you want to delete this company?"
                        onConfirm={() => deleteCompany(company.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        {isAdmin && (
                          <DeleteOutlined
                            style={{ fontSize: "18px", color: "red" }}
                          />
                        )}
                      </Popconfirm>,
                    ]}
                    style={{
                      borderRadius: 10,
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Avatar
                      size={64}
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${company.id}`}
                      style={{ marginBottom: 10 }}
                    />
                    <Card.Meta
                      title={company.name}
                      description={
                        <span style={{ color: "#595959" }}>
                          {company.domain || "No domain available"}
                        </span>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

   
        <Drawer
          title="Filter Companies"
          placement="left"
          closable={true}
          onClose={() => setFilterVisible(false)}
          visible={filterVisible}
          width={320}
        >
          <CompanyFilter onFilterChange={setFilterState} />
        </Drawer>
      </Spin>{" "}
    </>
  );
};

export default Companies;
