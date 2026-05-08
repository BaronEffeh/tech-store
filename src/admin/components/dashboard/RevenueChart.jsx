import {
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", sales: 40000 },
  { name: "Feb", sales: 50000 },
  { name: "Mar", sales: 48000 },
  { name: "Apr", sales: 60000 },
  { name: "May", sales: 55000 },
  { name: "Jun", sales: 68000 },
  { name: "Jul", sales: 72000 },
  { name: "Aug", sales: 68000 },
  { name: "Sep", sales: 80000 },
  { name: "Oct", sales: 85000 },
  { name: "Nov", sales: 92000 },
  { name: "Dec", sales: 100000 }
];

export default function RevenueChart() {
  return (
    <Card sx={{ borderRadius: 3, width: "100%" }}>
      <CardContent>
        <Typography fontWeight="bold">Revenue Overview</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Monthly sales and order trends
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              fill="#cdd2e9"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}