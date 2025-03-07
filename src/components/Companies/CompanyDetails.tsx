
import { useParams } from "react-router";
import { Descriptions, Image, Card, Typography } from "antd";
import type { DescriptionsProps } from "antd";
import { useCompanies } from "../../Contexts/companyContext";
import { useCompanyStore } from "../../stores/companyStores";
import { useMemo } from "react";

const { Title } = Typography;

const CompanyDetails = () => {
  const { companyID } = useParams();
  const { companies: apiCompanies,isLoading } = useCompanies();
  const persistedCompanies = useCompanyStore((state) => state.companies);
  const updatedCompanies = useCompanyStore((state) => state.updatedCompanies);
  const deletedCompanyIds = useCompanyStore((state) => state.deletedCompanyIds);


  const mergedCompanies = useMemo(() => {
    const processedApiCompanies = (apiCompanies || [])
      .filter((company) => !deletedCompanyIds.includes(company.id))
      .map((company) => updatedCompanies[company.id] || company);
    const processedPersistedCompanies = persistedCompanies.filter(
      (company) => !deletedCompanyIds.includes(company.id)
    );
    return [...processedApiCompanies, ...processedPersistedCompanies];
  }, [apiCompanies, persistedCompanies, updatedCompanies, deletedCompanyIds]);

  const ID = Number(companyID);
  const company = mergedCompanies.find((c) => c.id === ID);

  if (!company) return <Title level={4}>Company Not Found</Title>;

  const items: DescriptionsProps["items"] = [
    {
      key: "logo",
      label: "Company Logo",
      children: company.logo ? (
        <Image
          width={100}
          src={`https://api.dicebear.com/9.x/identicon/svg?seed=${company.id}`}
          alt="Company Logo"
        />
      ) : (
        "No logo available"
      ),
    },
    { key: "id", label: "Company ID", children: company.id },
    { key: "name", label: "Name", children: company.name || "N/A" },
    { key: "address", label: "Address", children: company.address || "N/A" },
    { key: "zip", label: "Zip Code", children: company.zip || "N/A" },
    { key: "country", label: "Country", children: company.country || "N/A" },
    {
      key: "employeeCount",
      label: "Employee Count",
      children: company.employeeCount || "N/A",
    },
    { key: "marketCap", label: "Market Cap", children: company.marketCap || "N/A" },
    { key: "domain", label: "Domain", children: company.domain || "N/A" },
    { key: "ceoName", label: "CEO Name", children: company.ceoName || "N/A" },
  ];

  return (
    <Card
      title="Company Info"
      loading={isLoading}
      bordered={false}
      style={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <Descriptions layout="vertical" items={items} />
    </Card>
  );
};

export default CompanyDetails;
