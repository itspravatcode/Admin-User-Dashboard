import { Button, Form, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/User";

const { Title } = Typography;

type FormData = Omit<User, "id">;

const AddUserForm = () => {
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      company: "",
      address: "",
      zip: "",
      state: "",
      country: "",
      phone: "",
      photo: "",
    },
  });

  const onSubmit = (data: FormData) => {
    addUser(data);
    reset();

    navigate("/users");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Title level={4}>Add New User</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Name">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Name"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Username">
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Username"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Email"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Company">
          <Controller
            name="company"
            control={control}
            rules={{ required: "Company is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Company"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Address"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Zip">
          <Controller
            name="zip"
            control={control}
            rules={{ required: "Zip is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Zip"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="State">
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="State"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Country">
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Country"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Phone"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Photo URL">
          <Controller
            name="photo"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Photo URL"
                status={error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUserForm;
