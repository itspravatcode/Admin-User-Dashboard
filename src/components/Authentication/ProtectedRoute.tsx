import { PropsWithChildren } from "react";
import { User } from "../Types/User";
import { useAuth } from "../../Contexts/AuthContext";
import Unauthorized from "./Unautorized";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User['role'][];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();

if(currentUser === undefined) {
    return <div>Loading...</div>
}
console.log("currentUser:", currentUser);

if(currentUser === null || (allowedRoles && !allowedRoles.includes(currentUser.role))) {
    return <div><Unauthorized/></div>
}


  return children;
}
