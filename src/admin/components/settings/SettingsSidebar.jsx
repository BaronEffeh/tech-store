import {
  Button,
  Paper,
  Stack,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const TABS = [
  {
    key: "profile",
    label: "Profile",
    icon: <PersonOutlineIcon fontSize="small" />,
  },
  {
    key: "business",
    label: "Business Info",
    icon: <BusinessOutlinedIcon fontSize="small" />,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: <NotificationsNoneIcon fontSize="small" />,
  },
  {
    key: "security",
    label: "Security",
    icon: <LockOutlinedIcon fontSize="small" />,
  },
  {
    key: "appearance",
    label: "Appearance",
    icon: <PaletteOutlinedIcon fontSize="small" />,
  },
  {
    key: "integrations",
    label: "Integrations",
    icon: <BoltOutlinedIcon fontSize="small" />,
  },
  {
    key: "billing",
    label: "Billing",
    icon: <CreditCardOutlinedIcon fontSize="small" />,
  },
];

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        borderRadius: 2,
        borderColor: "#e5e7eb",
        bgcolor: "#fff",
      }}
    >
      <Stack spacing={0.5}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;

          return (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              startIcon={tab.icon}
              disableElevation
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: 500,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                color: active ? "#fff" : "#374151",
                bgcolor: active
                  ? "#111827"
                  : "transparent",
                "&:hover": {
                  bgcolor: active
                    ? "#111827"
                    : "#f3f4f6",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Stack>
    </Paper>
  );
}