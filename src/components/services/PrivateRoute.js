// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import AuthService from "./auth.service";

function PrivateRoute({ children, roles = [] }) {
  const user = AuthService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default PrivateRoute;
