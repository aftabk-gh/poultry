import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@src/components/hoc/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated == null) {
    return <p>Loading...</p>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
