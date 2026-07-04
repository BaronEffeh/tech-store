import {
  Box,
  Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function NotificationEmpty() {
  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
      }}
    >
      <NotificationsNoneIcon
        sx={{
          fontSize: 80,
          color: "#9ca3af",
          mb: 2,
        }}
      />

      <Typography
        variant="h6"
        fontWeight="bold"
      >
        No notifications
      </Typography>

      <Typography color="text.secondary">
        You're all caught up.
      </Typography>
    </Box>
  );
}