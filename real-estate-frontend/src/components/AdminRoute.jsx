import { Navigate } from "react-router-dom";

const readUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = readUser();

  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
