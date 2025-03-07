import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { fetchUsers } from "../ApiCalls/fetchUsers";
import { User,UsersContextType } from "../components/Types/User";



const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [showUserDetails, setShowUserDetails] = useState(false);

  const value = useMemo(
    () => ({ users, error, isLoading, showUserDetails, setShowUserDetails }),
    [users, isLoading, showUserDetails]
  );
  
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === null) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
