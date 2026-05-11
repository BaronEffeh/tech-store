import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import {
  Paper,
  Box,
  Typography
} from "@mui/material";

const data = [
  { name: "Laptops:", value: 41, revenue: "$362k", growth: "+12%" },
  { name: "Phones:", value: 30, revenue: "$264k", growth: "+8%" },
  { name: "Tablets:", value: 17, revenue: "$156k", growth: "+15%" },
  { name: "Accessories:", value: 11, revenue: "$99k", growth: "-3%" },
  { name: "Others:", value: 1, revenue: "$13k", growth: "+5%" }
];

const colors = [
  "#111827",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#d1d5db"
];

export default function RevenueCategoryChart() {
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
        Revenue by Category
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#64748b", mb: 3 }}
      >
        Product category distribution
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3
        }}
      >
        {/* CHART */}
        <Box sx={{ width: 280, height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={(entry) => `${entry.name} ${entry.value}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* LEGEND */}
        <Box sx={{ flex: 1, minWidth: 120 }}>
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5
              }}
            >
              <Typography variant="body2">
                {item.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1
                }}
              >
                <Typography variant="body2">
                  {item.revenue}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: item.growth.includes("-")
                      ? "#ef4444"
                      : "#16a34a"
                  }}
                >
                  {item.growth}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}