import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip
} from "recharts";

import { Paper, Box, Typography } from "@mui/material";

const data = [
  { month: "Jan", orders: 120, customers: 90 },
  { month: "Feb", orders: 180, customers: 130 },
  { month: "Mar", orders: 240, customers: 190 },
  { month: "Apr", orders: 320, customers: 260 },
  { month: "May", orders: 390, customers: 330 },
  { month: "Jun", orders: 460, customers: 410 },
  { month: "Jul", orders: 510, customers: 450 },
  { month: "Aug", orders: 560, customers: 500 },
  { month: "Sep", orders: 610, customers: 550 },
  { month: "Oct", orders: 690, customers: 620 },
  { month: "Nov", orders: 740, customers: 690 },
  { month: "Dec", orders: 820, customers: 760 }
];

export default function OrdersCustomersChart() {
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
        Orders & Customers
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#64748b", mb: 3 }}
      >
        Monthly comparison
      </Typography>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#111827"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="customers"
              stroke="#9ca3af"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}