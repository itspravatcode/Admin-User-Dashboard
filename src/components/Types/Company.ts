export type Company = {
  id: number;
  name: string;
  address: string;
  zip: string;
  country: string;
  employeeCount: number;
  industry: string;
  marketCap: number;
  domain: string;
  logo: string;
  ceoName: string;
};


  export interface CompaniesContextType {
    companies?: Company[];
    error: unknown;
    isLoading: boolean;
  }
