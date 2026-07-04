import {
//   Box,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";

export default function NotificationFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        sx={{
          minWidth: 180,
        }}
      >
        <MenuItem value="all">
          All
        </MenuItem>

        <MenuItem value="new">
          New
        </MenuItem>

        <MenuItem value="read">
          Read
        </MenuItem>
      </Select>
    </Stack>
  );
}