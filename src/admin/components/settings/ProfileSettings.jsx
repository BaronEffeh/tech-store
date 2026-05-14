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

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const INITIAL_FORM = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@techhub.com",
  phone: "+234 701 292 8822",
  bio: "E-commerce administrator managing TechHub's operations and sales.",
};

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

export default function ProfileSettings() {
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
          sx={{
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Profile Information
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            mb: 3,
          }}
        >
          Update your personal details
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            mb: 3,
          }}
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
                "&:hover": {
                  bgcolor: "#000",
                },
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
          sx={{
            justifyContent: "flex-end",
          }}
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
              "&:hover": {
                bgcolor: "#000",
              },
              boxShadow: "none",
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}