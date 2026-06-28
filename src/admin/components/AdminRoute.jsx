import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not signed in → remember requested page
  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location }}
      />
    );
  }

  // Signed in but not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}






// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminRoute({ children }) {
//   const { user, loading, isAdmin } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/auth" replace />;
//   }

//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }