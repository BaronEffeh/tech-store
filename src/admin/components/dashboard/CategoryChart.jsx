import {
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Laptops", sales: 45000, units: 1500 },
  { name: "Phones", sales: 40000, units: 5000 },
  { name: "Tablets", sales: 25000, units: 1000 },
  { name: "Accessories", sales: 18000, units: 2000 },
  { name: "Others", sales: 12000, units: 1800 }
];

export default function CategoryChart() {
  return (
    <Card sx={{ borderRadius: 3, width: "100%" }}>
      <CardContent>
        <Typography fontWeight="bold">Sales by Category</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Product category performance
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="sales" fill="#000" />
            <Bar dataKey="units" fill="#7684b3" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}