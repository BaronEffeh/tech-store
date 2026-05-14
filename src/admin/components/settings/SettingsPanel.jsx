import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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

const INITIAL_FORM = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@techhub.com",
  phone: "+1 (555) 123-4567",
  bio: "E-commerce administrator managing TechHub's operations and sales.",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#f3f4f6",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "#d1d5db" },
    "&.Mui-focused fieldset": { borderColor: "#111827" },
  },
};

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState(INITIAL_FORM);

  const update = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const initials = `${form.firstName[0] ?? ""}${
    form.lastName[0] ?? ""
  }`.toUpperCase();

  return (
    <Box>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
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
                    bgcolor: active ? "#111827" : "transparent",
                    "&:hover": {
                      bgcolor: active ? "#111827" : "#f3f4f6",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            borderColor: "#e5e7eb",
            bgcolor: "#fff",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827" }}
            >
              Profile Information
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#6b7280", mb: 3 }}
            >
              Update your personal details
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", mb: 3 }}
            >
              <Avatar
                sx={{
                  bgcolor: "#111827",
                  color: "#fff",
                  width: 64,
                  height: 64,
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>

              <Stack spacing={0.5}>
                <Button
                  variant="contained"
                  startIcon={<FileUploadOutlinedIcon />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#000" },
                    boxShadow: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  Change Photo
                </Button>

                <Typography
                  variant="caption"
                  sx={{ color: "#6b7280" }}
                >
                  JPG, PNG or GIF. Max size 2MB.
                </Typography>
              </Stack>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.75,
                  }}
                >
                  First Name
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  value={form.firstName}
                  onChange={update("firstName")}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.75,
                  }}
                >
                  Last Name
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  value={form.lastName}
                  onChange={update("lastName")}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.75,
                  }}
                >
                  Email Address
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  value={form.email}
                  onChange={update("email")}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.75,
                  }}
                >
                  Phone Number
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  value={form.phone}
                  onChange={update("phone")}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.75,
                  }}
                >
                  Bio
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.bio}
                  onChange={update("bio")}
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#111827",
                  borderColor: "#e5e7eb",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    bgcolor: "#f9fafb",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "#111827",
                  "&:hover": { bgcolor: "#000" },
                  boxShadow: "none",
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </Box>
  );
}