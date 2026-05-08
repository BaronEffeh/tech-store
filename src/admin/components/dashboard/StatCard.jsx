import { Card, Box, Typography } from "@mui/material";

export default function StatCard({
  title,
  value,
  change,
  icon,
  color = "#4caf50"
}) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box height={80}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>

          <Typography variant="caption" sx={{ color }}>
            ↑ {change} vs last month
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: color,
            color: "#fff",
            p: 1.5,
            borderRadius: 2
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
}