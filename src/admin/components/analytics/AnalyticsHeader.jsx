import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function AnalyticsHeader({ period, setPeriod }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
        mb: 4,
        flexWrap: "wrap"
      }}
    >
      {/* LEFT */}
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#111827", mb: 1 }}
        >
          Analytics
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#64748b" }}
        >
          Comprehensive business insights and metrics
        </Typography>
      </Box>

      {/* RIGHT */}
      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={(e, value) => value && setPeriod(value)}
        sx={{
          bgcolor: "#e5e7eb",
          borderRadius: 4,
          p: 0.5,
          gap: 0.5,

          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: 3,
            px: 2.5,
            py: 1,
            fontWeight: 700,
            color: "#111827",
            textTransform: "none"
          },

          "& .Mui-selected": {
            bgcolor: "#fff !important",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }
        }}
      >
        <ToggleButton value="7D">7D</ToggleButton>
        <ToggleButton value="30D">30D</ToggleButton>
        <ToggleButton value="90D">90D</ToggleButton>
        <ToggleButton value="12M">12M</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}