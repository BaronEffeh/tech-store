import { Box, Typography } from "@mui/material";

export default function SettingsHeader() {
  return (
    <Box mb={2}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Settings
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#6b7280",
          mt: 0.5,
        }}
      >
        Manage your account and preferences
      </Typography>
    </Box>
  );
}