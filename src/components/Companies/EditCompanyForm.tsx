
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCompanies } from "../../Contexts/companyContext";
import { useCompanyStore } from "../../stores/companyStores";
import { Company } from "../Types/Company";

const { Title } = Typography;

type FormData = Omit<Company, "id">;

const EditCompanyForm = () => {
  const { companyID } = useParams();
  const navigate = useNavigate();
  const id = Number(companyID);

 
  const { companies: apiCompanies } = useCompanies();

  const persistedCompanies = useCompanyStore((state) => state.companies);
  const updatedCompanies = useCompanyStore((state) => state.updatedCompanies);
  const updateCompany = useCompanyStore((state) => state.updateCompany);


  const mergedCompanies = useMemo(() => {
    const processedApiCompanies = (apiCompanies || []).map(
      (company) => updatedCompanies[company.id] || company
    );
    return [...processedApiCompanies, ...persistedCompanies];
  }, [apiCompanies, persistedCompanies, updatedCompanies]);


  const company = mergedCompanies.find((c) => c.id === id);

  if (!company) return <Title level={4}>Company Not Found</Title>;


  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: company.name,
      address: company.address,
      zip: company.zip,
      country: company.country,
      employeeCount: company.employeeCount,
      industry: company.industry,
      marketCap: company.marketCap,
      domain: company.domain,
      logo: company.logo,
      ceoName: company.ceoName,
    },
  });

  const onSubmit = (data: FormData) => {
    updateCompany(id, data);
    reset(data);
    navigate(`/companies/${id}`); 
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: "auto" }}>
      <Form.Item label="Name">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Company Name" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="Address">
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Address" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="ZIP">
        <Controller
          name="zip"
          control={control}
          rules={{ required: "ZIP is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="ZIP" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="Country">
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Country" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="Employee Count">
      <Controller
  name="employeeCount"
  control={control}
  rules={{ required: "Employee count is required" }}
  render={({ field, fieldState: { error } }) => (
    <InputNumber {...field} placeholder="Employee Count" status={error ? "error" : ""} />
  )}
/>

      </Form.Item>
      <Form.Item label="Industry">
        <Controller
          name="industry"
          control={control}
          rules={{ required: "Industry is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Industry" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="Market Cap">
      <Controller
  name="marketCap"
  control={control}
  rules={{ required: "Market cap is required" }}
  render={({ field, fieldState: { error } }) => (
    <InputNumber {...field} placeholder="Market Cap" status={error ? "error" : ""} />
  )}
/>

      </Form.Item>
      <Form.Item label="Domain">
        <Controller
          name="domain"
          control={control}
          rules={{ required: "Domain is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Domain" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="Logo URL">
        <Controller
          name="logo"
          control={control}
          rules={{ required: "Logo URL is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Logo URL" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item label="CEO Name">
        <Controller
          name="ceoName"
          control={control}
          rules={{ required: "CEO Name is required" }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="CEO Name" status={error ? "error" : ""} />
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Company</Button>
      </Form.Item>
    </Form>
  );
};

export default EditCompanyForm;
