import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flex: 1, p: 3, minHeight: "100vh", ml: "250px", width: "calc(100% - 250px)" }}>
        {children}
      </Box>
    </Box>
  );
}