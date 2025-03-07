import { User } from '../Types/User'


export interface Auth {
  authToken: string | null;
  currentUser: User | null;
  handleLogin: (username: string, password: string, roleIndex: number) => void;
  handleLogout: () => void;
  userRole: number;
  setUserRole: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}


  

export type LoginFormInputs = {
    username: string;
    password: string;
  };
