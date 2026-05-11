import {
  Paper,
  Typography
} from "@mui/material";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from "recharts";

const data = [
  { subject: "Revenue", value: 85 },
  { subject: "Orders", value: 72 },
  { subject: "Customers", value: 68 },
  { subject: "Products", value: 90 },
  { subject: "Conversion", value: 78 }
];

export default function PerformanceRadarChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        height: 420
      }}
    >
      <Typography fontWeight="bold" mb={0.5}>
        Overall Performance Score
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          mb: 3
        }}
      >
        Key performance indicators comparison
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <RadarChart data={data}>
          <PolarGrid />

          <PolarAngleAxis dataKey="subject" />

          <PolarRadiusAxis angle={30} domain={[0, 100]} />

          <Radar
            name="Performance"
            dataKey="value"
            stroke="#6b7280"
            fill="#6b7280"
            fillOpacity={0.6}
          />

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Paper>
  );
}