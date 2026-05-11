import {
  Paper,
  Typography
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { time: "00:00", orders: 15 },
  { time: "03:00", orders: 10 },
  { time: "06:00", orders: 18 },
  { time: "09:00", orders: 50 },
  { time: "12:00", orders: 80 },
  { time: "15:00", orders: 65 },
  { time: "18:00", orders: 95 },
  { time: "21:00", orders: 60 }
];

export default function OrdersTimeChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        height: 320
      }}
    >
      <Typography fontWeight="bold" mb={0.5}>
        Orders by Time of Day
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          mb: 3
        }}
      >
        Peak shopping hours
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="orders"
            stroke="#9ca3af"
            fill="#d1d5db"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}