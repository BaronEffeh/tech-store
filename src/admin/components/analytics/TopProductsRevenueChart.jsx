import {
  Paper,
  Typography
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { name: "MacBook Pro M3", revenue: 370000 },
  { name: "iPhone 15 Pro", revenue: 265000 },
  { name: "Dell XPS 15", revenue: 185000 },
  { name: "iPad Pro", revenue: 155000 },
  { name: "Samsung S24", revenue: 149000 },
  { name: "AirPods Pro", revenue: 98000 }
];

export default function TopProductsRevenueChart() {
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
        Top Products by Revenue
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          mb: 3
        }}
      >
        Best performing products
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 0,
            right: 20,
            left: 20,
            bottom: 0
          }}
        >
          <XAxis type="number" />

          <YAxis
            dataKey="name"
            type="category"
            width={90}
          />

          <Tooltip />

          <Bar
            dataKey="revenue"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}