import { useNavigate } from "react-router-dom";
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";
import { Badge } from "@mui/material";

import useNewOrdersCount from "../../../firebase/hooks/useNewOrdersCount";

export default function DashboardHeader() {
  const newOrders = useNewOrdersCount();
  const navigate = useNavigate();

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 3
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back, Admin! Here's what's happening today.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            p: 0.8,
            px: 2,
            border: "1px solid #d6d5d5",
            borderRadius: 2,
          }}
        >
          <Search />
          <InputBase placeholder="Search..." />
        </Box>

        <IconButton
            onClick={() =>
              navigate("/admin/notifications")
            }
          >
          <Badge
              badgeContent={newOrders}
              color="error"
              max={99}
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Box>
    </Box>
    </>
  );
}
