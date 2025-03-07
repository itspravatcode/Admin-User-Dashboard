import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../Contexts/AuthContext";
import { Form, Input, Select, Button, Spin } from "antd";
import { LoginFormInputs } from "../Types/Auth";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const roleMapping = {
  Admin: 0,
  Manager: 1,
  User: 2,
  Moderator: 3,
  Support: 4,
};

const Login = () => {
  const { handleLogin, setUserRole, isLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, password, role }: LoginFormInputs) => {
    const selectedRoleIndex = roleMapping[role];
    setUserRole(selectedRoleIndex);
    handleLogin(username, password, selectedRoleIndex);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined spin />}
        tip="Logging in..."
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Username"
            validateStatus={errors.username ? "error" : ""}
            help={errors.username && "Username is required"}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password && "Password is required"}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Role"
            validateStatus={errors.role ? "error" : ""}
            help={errors.role && "Role selection is required"}
          >
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field}>
                  {Object.keys(roleMapping).map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
