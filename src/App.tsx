import { Col, Row } from "antd";

import { Route, Routes } from "react-router";
import Users from "./components/Users/Users";
import SideBar from "./SideBar";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/Users/UserDetails";
import Companies from "./components/Companies/Companies";
import CompanyDetails from "./components/Companies/CompanyDetails";
import Login from "./components/Authentication/Login";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import CommentDetails from "./components/Blogs/CommentDetails";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import { useAuth } from "./Contexts/AuthContext";
import Logged from "./components/Authentication/Logged";
import AddCompanyForm from "./components/Companies/AddCompanyForm";
import EditCompanyForm from "./components/Companies/EditCompanyForm";
import EditUserForm from "./components/Users/EditUserForm";
import AddUserForm from "./components/Users/AddUserForm";
import "antd/dist/reset.css";
import LoginErrorPage from "./components/Authentication/LoginErrorPage";

function App() {
  const { authToken } = useAuth();
  return (
    <>
      <Row>
        <Col span={8}>
          <SideBar />
        </Col>
        <Col span={12}>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["Manager", "Admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:userID"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <UserDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute allowedRoles={["Manager", "Admin", "User"]}>
                  <Companies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies/:companyID"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <CompanyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={!authToken ? <Login /> : <Logged />}
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/blogs/:blogID"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Manager",
                    "Admin",
                    "User",
                    "Moderator",
                    "Support",
                  ]}
                >
                  <BlogDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/comments/:commentID" element={<CommentDetails />} />
            <Route
              path="/addcompany"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                  <AddCompanyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adduser"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                  <AddUserForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editcompany/:companyID"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <EditCompanyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edituser/:userID"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <EditUserForm />
                </ProtectedRoute>
              }
            />

            <Route path="/login-error" element={<LoginErrorPage />} />
            <Route path="*" element={<>No route</>} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}

export default App;
