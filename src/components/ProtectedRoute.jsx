import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" state={{ from: "/checkout" }} replace />;
    // return <Navigate to="/auth" replace />;
  }

  return children;
}