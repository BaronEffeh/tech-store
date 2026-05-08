import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from "@mui/material";

const orders = [
  {
    id: "#ORD-2024-1245",
    customer: "John Doe",
    product: "MacBook Pro M3",
    amount: "$2,499",
    status: "Completed",
    date: "2026-05-05"
  },
  {
    id: "#ORD-2024-1244",
    customer: "Sarah Wilson",
    product: "iPhone 15 Pro",
    amount: "$1,199",
    status: "Processing",
    date: "2026-05-05"
  },
  {
    id: "#ORD-2024-1243",
    customer: "Mike Johnson",
    product: "Dell XPS 15",
    amount: "$1,899",
    status: "Completed",
    date: "2026-05-04"
  },
  {
    id: "#ORD-2024-1242",
    customer: "Emma Brown",
    product: "iPad Air",
    amount: "$599",
    status: "Shipped",
    date: "2026-05-04"
  },
  {
    id: "#ORD-2024-1241",
    customer: "David Lee",
    product: "Logitech MX Master",
    amount: "$99",
    status: "Completed",
    date: "2026-05-03"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return {
        bgcolor: "#dcfce7",
        color: "#16a34a"
      };

    case "Processing":
      return {
        bgcolor: "#dbeafe",
        color: "#2563eb"
      };

    case "Shipped":
      return {
        bgcolor: "#f3e8ff",
        color: "#9333ea"
      };

    default:
      return {
        bgcolor: "#f1f5f9",
        color: "#475569"
      };
  }
};

export default function RecentOrders() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Recent Orders
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Latest customer transactions
          </Typography>
        </Box>

        <Button
          variant="text"
          sx={{
            textTransform: "none",
            fontWeight: 600
          }}
        >
          View All
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer sx={{ overflowX: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 700 }}>ORDER ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>CUSTOMER</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>PRODUCT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>DATE</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  "&:last-child td": {
                    borderBottom: 0
                  }
                }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount}</TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      ...getStatusColor(order.status)
                    }}
                  />
                </TableCell>

                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}