import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


export default function OrdersHeader() {

  return (
    <>
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
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#111827" }}
          >
            Orders
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              mt: 0.5
            }}
          >
            Manage and track customer orders
          </Typography>
        </Box>

        {/* RIGHT */}
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          sx={{
            color: "#111827",
            px: 3,
            py: 1.3,
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#f5f5f5",
              border: "1px solid #e5e7eb",
              boxShadow: "none"
            }
          }}
        >
          Export Orders
        </Button>
      </Box>
    </>
  );
}
