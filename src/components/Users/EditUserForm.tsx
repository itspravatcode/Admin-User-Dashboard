import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useUsers } from "../../Contexts/userContext";
import { useUserStore } from "../../stores/userStore";
import { User } from "../Types/User";

const { Title } = Typography;

type FormData = Omit<User, "id">;

const EditUserForm = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  console.log(userID);
  const id = Number(userID);

  const { users: apiUsers, isLoading } = useUsers();

  const persistedUsers = useUserStore((state) => state.users);
  const updatedUsers = useUserStore((state) => state.updatedUsers);
  const deletedUserIds = useUserStore((state) => state.deletedUserIds);
  const updateUser = useUserStore((state) => state.updateUser);


  const mergedUsers = useMemo(() => {
    const processedApiUsers = (apiUsers || [])

      .filter((u) => !deletedUserIds.includes(Number(u.id)))
      .map((u) => updatedUsers[u.id] || u);
    const processedPersistedUsers = persistedUsers.filter(
      (u) => !deletedUserIds.includes(u.id)
    );
    return [...processedApiUsers, ...processedPersistedUsers];
  }, [apiUsers, persistedUsers, updatedUsers, deletedUserIds]);


  if (isLoading) return <Spin tip="Loading..." />;


  console.log("Merged Users:", mergedUsers);
  console.log("Looking for user with ID:", id);


  const user = mergedUsers.find((u) => Number(u.id) === id);

  if (!user) return <Title level={4}>User Not Found</Title>;

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      company: user.company,
      address: user.address,
      zip: user.zip,
      state: user.state,
      country: user.country,
      phone: user.phone,
      photo: user.photo || "",
    },
  });

  const onSubmit = (data: FormData) => {
    updateUser(id, data);
    reset(data);
    navigate(`/users/${id}`);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      style={{ maxWidth: 600, margin: "auto" }}
    >
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
            <Input {...field} placeholder="Zip" status={error ? "error" : ""} />
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
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
