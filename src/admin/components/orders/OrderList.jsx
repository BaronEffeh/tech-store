import React, { useMemo, useState } from "react";
import {
  Box,
  Badge,
  Button,
  Chip,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";

// import { mockOrders } from "../../data/mockOrders";

/* ---------------- STATUS + PAYMENT STYLES ---------------- */

const STATUS_STYLES = {
  Pending: { bg: "#fef3c7", fg: "#b45309", icon: <AccessTimeIcon sx={{ fontSize: 14 }} /> },
  Processing: { bg: "#dbeafe", fg: "#1d4ed8", icon: <Inventory2Icon sx={{ fontSize: 14 }} /> },
  Shipped: { bg: "#ede9fe", fg: "#6d28d9", icon: <LocalShippingIcon sx={{ fontSize: 14 }} /> },
  Delivered: { bg: "#dcfce7", fg: "#15803d", icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
  Cancelled: { bg: "#fee2e2", fg: "#b91c1c", icon: <CancelIcon sx={{ fontSize: 14 }} /> },
};

const PAYMENT_STYLES = {
  Paid: { bg: "#dcfce7", fg: "#15803d" },
  Pending: { bg: "#fef3c7", fg: "#b45309" },
  Failed: { bg: "#fee2e2", fg: "#b91c1c" },
};

/* ---------------- ORDER ROW ---------------- */

// function OrderRow({ order }) {
function OrderRow({
    order,
    onUpdateStatus,
    onCancelOrder,
    onViewInvoice,
    onContactCustomer,
}) {
  const [open, setOpen] = useState(false);

  // const [open, setOpen] = useState(
  //   order.id === selectedOrderId
  // );

  const normalizedStatus =
    order.status
      ? order.status.charAt(0).toUpperCase() +
        order.status.slice(1).toLowerCase()
      : "Pending";

  const normalizedPayment =
    order.paymentStatus
      ? order.paymentStatus.charAt(0).toUpperCase() +
        order.paymentStatus.slice(1).toLowerCase()
      : "Pending";

  const status = STATUS_STYLES[normalizedStatus];
  const payment = PAYMENT_STYLES[normalizedPayment] || PAYMENT_STYLES.Pending;

  return (
    <Box
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2, cursor: "pointer", alignItems: "center" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: "center", flexWrap: "wrap" }}>
            {/* <Typography sx={{ fontWeight: 600 }}>#{order.id}</Typography> */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Badge
                color="success"
                variant="dot"
                invisible={!order.isNew}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  #{order.id}
                </Typography>
              </Badge>

              {order.isNew && (
                <Chip
                  label="NEW"
                  color="success"
                  size="small"
                  sx={{
                    fontWeight: 700,
                  }}
                />
              )}
            </Stack>

            <Chip
              size="small"
              icon={<Box sx={{ color: status.fg }}>{status.icon}</Box>}
              label={order.status}
              sx={{
                bgcolor: status.bg,
                color: status.fg,
                fontWeight: 600,
              }}
            />

            <Chip
              size="small"
              label={order.paymentStatus || "Pending"}
              sx={{
                bgcolor: payment.bg,
                color: payment.fg,
                fontWeight: 600,
              }}
            />
          </Stack>

          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            {order.customer?.name} • {order.customer?.email} •{" "}
            {order.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleDateString()
              : "-"}
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: 700 }}>
          {/* ${order.total.toLocaleString()} */}
          ₦{Number(order.total || 0).toLocaleString()}
        </Typography>

        <IconButton
          sx={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Stack>

      <Collapse in={open}>
        <Box sx={{ px: 3, pb: 3, pt: 2, bgcolor: "#fafafa" }}>
          <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
            Order Items
          </Typography>

          <TableContainer 
            sx={{ 
                bgcolor: "#fff", 
                border: "1px solid #e5e7eb", 
                borderRadius: 1.5 
            }}
            >
            <Table size="small">
              <TableHead>
                <TableRow sx={{bgcolor: "#f3f4f6"}}>
                  <TableCell
                    sx={{
                        fontWeight: 600,
                        color: "#6b7280",
                        fontSize: 12,
                        letterSpacing: 0.5,
                        }}
                    >
                        Product
                    </TableCell>
                  <TableCell 
                    sx={{
                        fontWeight: 600,
                        color: "#6b7280",
                        fontSize: 12,
                        letterSpacing: 0.5,
                        }}
                    >
                        Qty
                    </TableCell>
                  <TableCell 
                    sx={{
                        fontWeight: 600,
                        color: "#6b7280",
                        fontSize: 12,
                        letterSpacing: 0.5,
                        }}
                    >
                        Price
                    </TableCell>
                  <TableCell 
                    sx={{
                        fontWeight: 600,
                        color: "#6b7280",
                        fontSize: 12,
                        letterSpacing: 0.5,
                        }}
                    >
                        Subtotal
                    </TableCell>
                </TableRow>
              </TableHead>

              {order.items?.length ? (
                <TableBody>
                  {order.items?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      {/* <TableCell>${item.price}</TableCell>
                      <TableCell>${item.price * item.quantity}</TableCell> */}
                      <TableCell>
                        ₦{Number(item.price || 0).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        ₦{(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No orders found
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <Stack direction={{ xs: "column", md: "row" }}
                  spacing={4}
                  sx={{
                    alignItems: "flex-start",                    
                    }}
                  >
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1, mt: 3, }}>Shipping Address</Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              {order.customer?.address}
              {/* {order.shippingAddress} */}
            </Typography>
          </Box>
             <Box sx={{ flex: 1 }}>
               <Typography
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 1,
                  mt: 3,
                }}
              >
                Actions
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() =>
                    onUpdateStatus(order)
                  }
                  sx={{
                    bgcolor: "#0a0a0a",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#1f1f1f",
                    },
                  }}
                >
                  Update Status
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    onViewInvoice(order)
                    // handleViewInvoice(order)
                  }
                  sx={{
                    borderColor: "#e5e7eb",
                    color: "#111827",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#d1d5db",
                      bgcolor: "#f9fafb",
                    },
                  }}
                >
                  View Invoice
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    onContactCustomer(order)
                  }
                  sx={{
                    borderColor: "#e5e7eb",
                    color: "#111827",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#d1d5db",
                      bgcolor: "#f9fafb",
                    },
                  }}
                >
                  Contact Customer
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    onCancelOrder(order)
                  }
                  sx={{
                    borderColor: "#fecaca",
                    color: "#dc2626",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#fca5a5",
                      bgcolor: "#fef2f2",
                    },
                  }}
                >
                  Cancel Order
                </Button>
              </Stack>
            </Box>
            </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

/* ---------------- MAIN LIST ---------------- */

// export default function OrderList({ orders = mockOrders }) {
// export default function OrderList({ orders = [] }) {
export default function OrderList({
  orders = [],
  totalOrders = 0,
  onUpdateStatus,
  onCancelOrder,
  onViewInvoice,
  onContactCustomer,
}) {
  const [sortBy, setSortBy] = useState("all");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  /* ---------------- SORTING ---------------- */
  const sortedOrders = useMemo(() => {
    const data = [...orders];

    switch (sortBy) {    
      case "newest":
        return data.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );

      case "oldest":
        return data.sort(
          (a, b) =>
            (a.createdAt?.seconds || 0) -
            (b.createdAt?.seconds || 0)
        );

      case "highest":
        return data.sort((a, b) => b.total - a.total);

      case "lowest":
        return data.sort((a, b) => a.total - b.total);

      case "all":
      default:
        return data;
    }
  }, [orders, sortBy]);

  /* ---------------- PAGINATION ---------------- */

  const paginatedOrders = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page]);

  return (
    <Box>
      {/* HEADER CONTROLS */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {/* <Typography variant="body2" sx={{ color: "#6b7280" }}>
          Showing {orders.length} orders
        </Typography> */}

        <Typography
          variant="body2"
          sx={{ color: "#6b7280" }}
        >
          Showing{" "}
          <strong>{orders.length}</strong>
          {" "}of{" "}
          <strong>{totalOrders}</strong>
          {" "}orders
        </Typography>

        <Box>
            Sort by:
        <Select
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
                ml: 1,
                minWidth: 180,
                bgcolor: "#fff",
            }}
            >
            <MenuItem value="all">
                All Orders
            </MenuItem>

            <MenuItem value="newest">
                Newest First
            </MenuItem>

            <MenuItem value="oldest">
                Oldest First
            </MenuItem>

            <MenuItem value="highest">
                Highest Price
            </MenuItem>

            <MenuItem value="lowest">
                Lowest Price
            </MenuItem>
        </Select>
        </Box>
      </Stack>

      {/* LIST */}
      <Stack spacing={1.5}>
        {paginatedOrders.map((order) => (
          // <OrderRow key={order.id} order={order} />
          <OrderRow
            key={order.id}
            order={order}
            onUpdateStatus={onUpdateStatus}
            onCancelOrder={onCancelOrder}
            onViewInvoice={onViewInvoice}
            onContactCustomer={onContactCustomer}
        />
        ))}
      </Stack>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}

