import {
  Paper,
  Box,
  InputBase,
  Select,
  MenuItem
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function CustomerFilters({
  search,
  setSearch,
  status,
  setStatus
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        mb: 3
      }}
    >
      {/* SEARCH */}
      <Box
        sx={{
          flex: 1,
          minWidth: 250,
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "1px solid #d1d5db",
          borderRadius: 2,
          px: 2,
          py: 1
        }}
      >
        <SearchIcon sx={{ color: "#6b7280" }} />

        <InputBase
          fullWidth
          placeholder="Search by name, email, phone, or customer ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* FILTER */}
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        size="small"
        sx={{
          minWidth: 160,
          borderRadius: 2
        }}
      >
        <MenuItem value="All">Status: All</MenuItem>
        <MenuItem value="VIP">VIP</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
    </Paper>
  );
}