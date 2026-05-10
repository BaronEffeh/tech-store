import { Paper, Box, Typography } from "@mui/material";

export default function CustomerStatCard({
  title,
  value,
  icon,
  color
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        height: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1
        }}
      >
        <Box sx={{ color }}>
          {icon}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#64748b" }}
        >
          {title}
        </Typography>
      </Box>

      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
}