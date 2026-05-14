import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
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

const THEME_COLORS = [
  { key: "black", value: "#111827" },
  { key: "blue", value: "#3b82f6" },
  { key: "purple", value: "#8b5cf6" },
  { key: "green", value: "#10b981" },
  { key: "orange", value: "#f59e0b" },
  { key: "red", value: "#ef4444" },
];

export default function AppearanceSettings() {
  const [darkMode, setDarkMode] =
    useState(false);

  const [themeColor, setThemeColor] =
    useState("black");

  const [language, setLanguage] =
    useState("en-US");

  const [timezone, setTimezone] =
    useState("PT");

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Appearance
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
          }}
        >
          Customize the look and feel
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          borderColor: "#e5e7eb",
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <PaletteOutlinedIcon
          sx={{ color: "#6b7280" }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Dark Mode
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
            }}
          >
            Switch to dark theme
          </Typography>
        </Box>

        <Switch
          checked={darkMode}
          onChange={(e) =>
            setDarkMode(e.target.checked)
          }
        />
      </Paper>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "#111827",
          mb: 1.5,
        }}
      >
        Theme Color
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {THEME_COLORS.map((c) => {
          const active =
            themeColor === c.key;

          return (
            <Box
              key={c.key}
              onClick={() =>
                setThemeColor(c.key)
              }
              sx={{
                width: 44,
                height: 44,
                borderRadius: 1.5,
                bgcolor: c.value,
                cursor: "pointer",
                outline: active
                  ? `2px solid ${c.value}`
                  : "2px solid transparent",
                outlineOffset: 2,
              }}
            />
          );
        })}
      </Stack>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "#111827",
          mb: 0.75,
        }}
      >
        Language
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        sx={{
          ...fieldSx,
          mb: 2,
        }}
      >
        <MenuItem value="en-US">
          English (US)
        </MenuItem>

        <MenuItem value="en-GB">
          English (UK)
        </MenuItem>

        <MenuItem value="es">
          Spanish
        </MenuItem>

        <MenuItem value="fr">
          French
        </MenuItem>
      </TextField>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "#111827",
          mb: 0.75,
        }}
      >
        Timezone
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        value={timezone}
        onChange={(e) =>
          setTimezone(e.target.value)
        }
        sx={fieldSx}
      >
        <MenuItem value="PT">
          Pacific Time (PT)
        </MenuItem>

        <MenuItem value="MT">
          Mountain Time (MT)
        </MenuItem>

        <MenuItem value="CT">
          Central Time (CT)
        </MenuItem>

        <MenuItem value="ET">
          Eastern Time (ET)
        </MenuItem>
      </TextField>

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
            bgcolor: "#111827",
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