import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

import { Paper, Box, Typography } from "@mui/material";

const data = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 68000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 68000 },
  { month: "Sep", revenue: 81000 },
  { month: "Oct", revenue: 87000 },
  { month: "Nov", revenue: 94000 },
  { month: "Dec", revenue: 100000 }
];

export default function RevenueTrendChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        height: 420
      }}
    >
      <Typography fontWeight="bold" mb={0.5}>
        Revenue Trend
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#64748b", mb: 3 }}
      >
        Monthly revenue performance
      </Typography>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#94a3b8"
              fill="#d1d5db"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}