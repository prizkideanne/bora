import { Navigate, Outlet } from "react-router";

const PublicWrapper = () => {
  const token = localStorage.getItem("token");
  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicWrapper;
