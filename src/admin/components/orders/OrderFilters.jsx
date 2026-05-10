import React from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const PAYMENT_OPTIONS = [
  "All",
  "Paid",
  "Pending",
  "Failed",
];

export default function OrderFilters({
  filters = {
    query: "",
    status: "All",
    payment: "All",
  },
  setFilters = () => {},
}) {
  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectSx = {
    minWidth: 160,
    bgcolor: "#fff",
    borderRadius: 2,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e5e7eb",
    },
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        p: 1.5,
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by order ID, customer name, or email..."
          value={filters.query}
          onChange={(e) =>
            updateFilters("query", e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#9ca3af",
                    fontSize: 20,
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              bgcolor: "#f9fafb",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
            },
          }}
        />

        <Select
          size="small"
          value={filters.status}
          onChange={(e) =>
            updateFilters("status", e.target.value)
          }
          sx={selectSx}
          renderValue={(val) => `Status: ${val}`}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          value={filters.payment}
          onChange={(e) =>
            updateFilters("payment", e.target.value)
          }
          sx={selectSx}
          renderValue={(val) => `Payment: ${val}`}
        >
          {PAYMENT_OPTIONS.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}
