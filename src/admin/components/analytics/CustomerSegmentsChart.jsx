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
  { name: "New", value: 35 },
  { name: "Returning", value: 45 },
  { name: "VIP", value: 20 }
];

const colors = [
  "#111827",
  "#4b5563",
  "#9ca3af"
];

export default function CustomerSegmentsChart() {
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
        Customer Segments
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#64748b", mb: 3 }}
      >
        Customer distribution by type
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
        {/* DONUT */}
        <Box sx={{ width: 260, height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
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

        {/* DETAILS */}
        <Box sx={{ flex: 1, minWidth: 180 }}>
          <Box sx={{ mb: 3 }}>
            <Typography fontWeight="bold">
              New Customers
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b" }}
            >
              35% of total
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography fontWeight="bold">
              Returning Customers
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b" }}
            >
              45% of total
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight="bold">
              VIP Customers
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b" }}
            >
              20% of total
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}