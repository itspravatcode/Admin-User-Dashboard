import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo} from "react";
import { fetchCompanies } from "../ApiCalls/fetchCompanies";
import { Company,CompaniesContextType } from "../components/Types/Company";

const CompaniesContext = createContext<CompaniesContextType | null>(null);

export const CompaniesProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: companies,
    error,
    isLoading,
  } = useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

 


  const value = useMemo(
    () => ({ companies, error, isLoading}),
    [companies, isLoading]
  );
  return (
    <CompaniesContext.Provider
      value={value}
    >
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (context === null) {
    throw new Error("useCompanies must be used within a CompaniesProvider");
  }
  return context;
};
