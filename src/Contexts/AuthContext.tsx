import { createContext, PropsWithChildren, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Auth } from "../components/Types/Auth";
import { User } from "../components/Types/User";
import { fetchRoles } from "../ApiCalls/fetchRoles";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<Auth | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

type LoginCredentials = {
  username: string;
  password: string;
  roleIndex: number;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<number>(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation<
    AxiosResponse<any, any>,
    any,
    LoginCredentials,
    unknown
  >({
    mutationFn: async ({ username, password }: LoginCredentials) => {
      return await axios.post(
        "https://json-placeholder.mock.beeceptor.com/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess: async (response, variables) => {
      const { roleIndex } = variables;
      const { data } = response;
      const { success, token, user, error } = data;
      if (success) {
        const roles = await queryClient.fetchQuery({
          queryKey: ["roles"],
          queryFn: fetchRoles,
        });

        const userWithRole = {
          ...user,
          role: roles.length > 0 ? roles[roleIndex]?.name : undefined,
        };

        setAuthToken(token);
        setCurrentUser(userWithRole);
        console.log(data);
      } else {
        Modal.error({
          title: "Login Failed",
          content:
            error && error.code === "invalid_credentials"
              ? error.message
              : "Login failed",
        });
        setAuthToken(null);
        setCurrentUser(null);
      }
    },
    onError: (err: any) => {
      console.error("Login error:", err);
      if (err.response && err.response.status === 401) {
        const errorMsg =
          err.response.data?.error?.message || "Unauthorized access.";
        Modal.error({
          title: "Unauthorized",
          content: errorMsg,
        });
        navigate("/login-error", { state: { message: errorMsg } });
      } else {
        const errorMsg = "An error occurred during login.";
        Modal.error({
          title: "Login Failed",
          content: errorMsg,
        });
        navigate("/login-error", { state: { message: errorMsg } });
      }
      setAuthToken(null);
      setCurrentUser(null);
    },
  });

const { mutate, status } = loginMutation;
const isLoading = status === "pending";


  const handleLogin = (
    username: string,
    password: string,
    roleIndex: number
  ) => {
    setUserRole(roleIndex);
    mutate({ username, password, roleIndex });
  };

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
        userRole,
        setUserRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
