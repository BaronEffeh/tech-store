import {
  Paper,
  Box,
  Typography,
  Grid,
  Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadIcon from "@mui/icons-material/Upload";
import NotificationsIcon from "@mui/icons-material/Notifications";

const actions = [
  {
    title: "Add Product",
    icon: <AddIcon />,
    color: "#3b82f6"
  },
  {
    title: "New Order",
    icon: <DescriptionIcon />,
    color: "#22c55e"
  },
  {
    title: "Import Data",
    icon: <UploadIcon />,
    color: "#a855f7"
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    color: "#f97316"
  }
];

export default function QuickActions() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        p: 3
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={6} key={action.title}>
            <Button
              fullWidth
              sx={{
                height: 120,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                color: "#111827",
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#fff",
                transition: "0.3s",
                '&:hover': {
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-3px)'
                }
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: action.color,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {action.icon}
              </Box>

              {action.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}