export type User = {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  address: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
  photo: string;
  success: boolean;
  message: string;
  token: string;
  role:string;
};

export interface UsersContextType {
  users?: User[];
  error: unknown;
  isLoading: boolean;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
}
