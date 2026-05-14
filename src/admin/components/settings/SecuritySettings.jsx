import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#f3f4f6",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#111827",
    },
  },
};

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] =
    useState(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
        }}
      >
        Security Settings
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
        }}
      >
        Manage your account security
      </Typography>

      <Box
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          p: 2,
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <SecurityOutlinedIcon />

            <Box>
              <Typography fontWeight={600}>
                Two-Factor Authentication
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#6b7280" }}
              >
                Add an extra layer of security
              </Typography>
            </Box>
          </Stack>

          <Switch
            checked={twoFactor}
            onChange={(e) =>
              setTwoFactor(e.target.checked)
            }
          />
        </Stack>
      </Box>

      <Box
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          p: 2,
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <KeyOutlinedIcon />

          <Box>
            <Typography fontWeight={600}>
              Change Password
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#6b7280" }}
            >
              Update your account password
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            size="small"
            sx={fieldSx}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            size="small"
            sx={fieldSx}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            size="small"
            sx={fieldSx}
          />

          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textTransform: "none",
              bgcolor: "#030521",
            }}
          >
            Update Password
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <DevicesOutlinedIcon />

          <Box>
            <Typography fontWeight={600}>
              Active Sessions
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#6b7280" }}
            >
              Manage your logged-in devices
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1.5}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#f9fafb",
              borderRadius: 1.5,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={600}>
                  MacBook Pro - Chrome
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280" }}
                >
                  FCT - Abuja, CA • Active now
                </Typography>
              </Box>

              <Button color="error">
                Revoke
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: "#f9fafb",
              borderRadius: 1.5,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={600}>
                  iPhone 15 - Safari
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280" }}
                >
                  Uyo, Akwa Ibom State, CA • 2 hours ago
                </Typography>
              </Box>

              <Button color="error">
                Revoke
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}