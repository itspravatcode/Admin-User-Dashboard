
import { Button, Form, Input, InputNumber } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useCompanyStore } from '../../stores/companyStores';
import { Company } from '../Types/Company';
import { useNavigate } from 'react-router';

type FormData = Omit<Company, 'id'>;

const AddCompanyForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      zip: '',
      country: '',
      employeeCount: 0,
      industry: '',
      marketCap: 0,
      domain: '',
      logo: '',
      ceoName: '',
    },
  });


  const addCompany = useCompanyStore((state) => state.addCompany);

  const onSubmit = (data: FormData) => {

    addCompany(data);
    navigate(`/companies`);

    reset();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Name" required>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter company name" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Address" required>
        <Controller
          name="address"
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter address" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="ZIP" required>
        <Controller
          name="zip"
          control={control}
          rules={{ required: 'ZIP is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter ZIP code" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Country" required>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter country" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Employee Count" required>
      <Controller
  name="employeeCount"
  control={control}
  rules={{ required: "Employee count is required" }}
  render={({ field, fieldState: { error } }) => (
    <InputNumber {...field} placeholder="Employee Count" status={error ? "error" : ""} />
  )}
/>

      </Form.Item>

      <Form.Item label="Industry" required>
        <Controller
          name="industry"
          control={control}
          rules={{ required: 'Industry is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter industry" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Market Cap" required>
      <Controller
  name="marketCap"
  control={control}
  rules={{ required: "Market cap is required" }} // remove valueAsNumber here
  render={({ field, fieldState: { error } }) => (
    <InputNumber
      {...field}
      placeholder="Market Cap"
      status={error ? "error" : ""}
    />
  )}
/>

      </Form.Item>

      <Form.Item label="Domain" required>
        <Controller
          name="domain"
          control={control}
          rules={{ required: 'Domain is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter domain" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Logo URL" required>
        <Controller
          name="logo"
          control={control}
          rules={{ required: 'Logo URL is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter logo URL" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="CEO Name" required>
        <Controller
          name="ceoName"
          control={control}
          rules={{ required: 'CEO Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              placeholder="Enter CEO name" 
              status={error ? 'error' : undefined}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Company
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCompanyForm;
