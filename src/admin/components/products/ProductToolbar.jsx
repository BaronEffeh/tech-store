import {
  Paper,
  Box,
  InputBase,
  Select,
  MenuItem,
  IconButton
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
  view,
  setView
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
        flexWrap: "wrap"
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
          placeholder="Search products by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* CATEGORY FILTER */}
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="small"
        sx={{ minWidth: 120, borderRadius: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Laptops">Laptops</MenuItem>
        <MenuItem value="Phones">Phones</MenuItem>
        <MenuItem value="Tablets">Tablets</MenuItem>
        <MenuItem value="Accessories">Accessories</MenuItem>
      </Select>

      {/* STOCK FILTER */}
      <Select
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        size="small"
        sx={{ minWidth: 120, borderRadius: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="In Stock">In Stock</MenuItem>
        <MenuItem value="Low Stock">Low Stock</MenuItem>
      </Select>

      {/* VIEW TOGGLE */}
      <Box
        sx={{
          display: "flex",
          bgcolor: "#f1f5f9",
          borderRadius: 2,
          p: 0.5
        }}
      >
        <IconButton
          onClick={() => setView("grid")}
          sx={{
            bgcolor: view === "grid" ? "#fff" : "transparent"
          }}
        >
          <GridViewIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => setView("list")}
          sx={{
            bgcolor: view === "list" ? "#fff" : "transparent"
          }}
        >
          <ViewListIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}