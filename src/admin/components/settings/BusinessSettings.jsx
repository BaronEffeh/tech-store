import { useState } from "react";

import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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

export default function BusinessSettings() {
  const [form, setForm] = useState({
    businessName: "TechHub Electronics",
    industry: "Electronics & Technology",
    businessSize: "1-10 employees",
    address: "123 Tech Street, FCT - Abuja",
    taxId: "XX-XXXXXXX",
    website: "https://techhub.com",
  });

  const update = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

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
          color: "#111827",
        }}
      >
        Business Information
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 4,
        }}
      >
        Update your company details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Business Name
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={form.businessName}
            onChange={update("businessName")}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Industry
          </Typography>

          <TextField
            select
            fullWidth
            size="small"
            value={form.industry}
            onChange={update("industry")}
            sx={fieldSx}
          >
            <MenuItem value="Electronics & Technology">
              Electronics & Technology
            </MenuItem>

            <MenuItem value="Fashion">
              Fashion
            </MenuItem>

            <MenuItem value="Healthcare">
              Healthcare
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Business Size
          </Typography>

          <TextField
            select
            fullWidth
            size="small"
            value={form.businessSize}
            onChange={update("businessSize")}
            sx={fieldSx}
          >
            <MenuItem value="1-10 employees">
              1-10 employees
            </MenuItem>

            <MenuItem value="11-50 employees">
              11-50 employees
            </MenuItem>

            <MenuItem value="51-200 employees">
              51-200 employees
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Business Address
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={form.address}
            onChange={update("address")}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Tax ID / EIN
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={form.taxId}
            onChange={update("taxId")}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Website
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={form.website}
            onChange={update("website")}
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
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          sx={{
            textTransform: "none",
            bgcolor: "#030521",
            "&:hover": {
              bgcolor: "#000",
            },
          }}
        >
          Save Changes
        </Button>
      </Stack>
    </Paper>
  );
}