import { Box, Typography, Button } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function CustomersHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        flexWrap: "wrap",
        gap: 2
      }}
    >
      {/* LEFT */}
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Customers
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            mt: 0.5
          }}
        >
          Manage your customer relationships
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 2.5,
            py: 1,
            borderColor: "#d1d5db",
            color: "#111827"
          }}
        >
          Export
        </Button>

        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          sx={{
            bgcolor: "#020617",
            borderRadius: 3,
            textTransform: "none",
            px: 2.5,
            py: 1,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#111827",
              boxShadow: "none"
            }
          }}
        >
          Add Customer
        </Button>
      </Box>
    </Box>
  );
}