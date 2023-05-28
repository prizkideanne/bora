import { Navigate, Outlet } from "react-router";

const PrivateWrapper = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
