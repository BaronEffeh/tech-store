import { Paper, Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function AnalyticsStatCard({
  title,
  value,
  change,
  subtitle,
  icon,
  color,
  negative = false
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        height: "100%"
      }}
    >
      {/* TOP */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3
        }}
      >
        {/* ICON */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}
        >
          {icon}
        </Box>

        {/* CHANGE */}
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: negative ? "#ef4444" : "#16a34a"
          }}
        >
          {negative ? <TrendingDownIcon /> : <TrendingUpIcon />} {/*"↘" : "↗"}*/} {change}
        </Typography>
      </Box>

      {/* TITLE */}
      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          mb: 1
        }}
      >
        {title}
      </Typography>

      {/* VALUE */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          color: "#111827",
          mb: 1.5
        }}
      >
        {value}
      </Typography>

      {/* SUBTITLE */}
      <Typography
        variant="body2"
        sx={{ color: "#64748b" }}
      >
        {subtitle}
      </Typography>
    </Paper>
  );
}