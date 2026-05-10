import React, { useMemo, useState } from "react";
import {
  Box,
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

import { mockOrders } from "../../data/mockOrders";

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

function OrderRow({ order }) {
  const [open, setOpen] = useState(false);

  const status = STATUS_STYLES[order.status];
  const payment = PAYMENT_STYLES[order.payment];

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
            <Typography sx={{ fontWeight: 600 }}>#{order.id}</Typography>

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
              label={order.payment}
              sx={{
                bgcolor: payment.bg,
                color: payment.fg,
                fontWeight: 600,
              }}
            />
          </Stack>

          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            {order.customer} • {order.email} • {order.date}
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: 700 }}>
          ${order.total.toLocaleString()}
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

              <TableBody>
                {order.items?.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
              {order.shippingAddress}
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

export default function OrderList({ orders = mockOrders }) {
  const [sortBy, setSortBy] = useState("all");
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  /* ---------------- SORTING ---------------- */
const sortedOrders = useMemo(() => {
  const data = [...orders];

  switch (sortBy) {
    case "newest":
      return data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

    case "oldest":
      return data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
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
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          Showing {orders.length} orders
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
          <OrderRow key={order.id} order={order} />
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






// import React, { useMemo, useState } from "react";
// import {
//   Stack,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   Pagination,
//   FormControl,
// } from "@mui/material";

// import OrderRow from "./OrderRow"; // assume extracted or keep inline
// import { mockOrders } from "../../data/mockOrders";

// export default function OrderList({ orders = mockOrders }) {
//   const [sortBy, setSortBy] = useState("newest");
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 3;

//   // 1. SORTING
//   const sortedOrders = useMemo(() => {
//     const data = [...orders];

//     switch (sortBy) {
//       case "newest":
//         return data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );

//       case "oldest":
//         return data.sort(
//           (a, b) => new Date(a.date) - new Date(b.date)
//         );

//       case "highest":
//         return data.sort((a, b) => b.total - a.total);

//       case "lowest":
//         return data.sort((a, b) => a.total - b.total);

//       default:
//         return data;
//     }
//   }, [orders, sortBy]);

//   // 2. PAGINATION
//   const paginatedOrders = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return sortedOrders.slice(start, end);
//   }, [sortedOrders, page]);

//   const totalPages = Math.ceil(
//     sortedOrders.length / rowsPerPage
//   );

//   return (
//     <Stack spacing={2}>
//       {/* HEADER CONTROLS */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Typography variant="body2" sx={{ color: "#6b7280" }}>
//           Showing {paginatedOrders.length} of{" "}
//           {orders.length} orders
//         </Typography>

//         {/* SORT SELECT */}
//         <FormControl size="small">
//           <Select
//             value={sortBy}
//             onChange={(e) => {
//               setSortBy(e.target.value);
//               setPage(1); // reset page on sort change
//             }}
//             sx={{
//               minWidth: 180,
//               bgcolor: "#fff",
//               borderRadius: 2,
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#e5e7eb",
//               },
//             }}
//           >
//             <MenuItem value="newest">Newest</MenuItem>
//             <MenuItem value="oldest">Oldest</MenuItem>
//             <MenuItem value="highest">
//               Highest Price
//             </MenuItem>
//             <MenuItem value="lowest">
//               Lowest Price
//             </MenuItem>
//           </Select>
//         </FormControl>
//       </Stack>

//       {/* ORDER LIST */}
//       {paginatedOrders.map((order) => (
//         <OrderRow key={order.id} order={order} />
//       ))}

//       {/* PAGINATION */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={(_, value) => setPage(value)}
//           color="primary"
//         />
//       </Box>
//     </Stack>
//   );
// }






// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Chip,
//   Collapse,
//   IconButton,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CancelIcon from "@mui/icons-material/Cancel";

// import { mockOrders } from "../../data/mockOrders";

// const STATUS_STYLES = {
//   Pending: {
//     bg: "#fef3c7",
//     fg: "#b45309",
//     icon: <AccessTimeIcon sx={{ fontSize: 14 }} />,
//   },
//   Processing: {
//     bg: "#dbeafe",
//     fg: "#1d4ed8",
//     icon: <Inventory2Icon sx={{ fontSize: 14 }} />,
//   },
//   Shipped: {
//     bg: "#ede9fe",
//     fg: "#6d28d9",
//     icon: <LocalShippingIcon sx={{ fontSize: 14 }} />,
//   },
//   Delivered: {
//     bg: "#dcfce7",
//     fg: "#15803d",
//     icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
//   },
//   Cancelled: {
//     bg: "#fee2e2",
//     fg: "#b91c1c",
//     icon: <CancelIcon sx={{ fontSize: 14 }} />,
//   },
// };

// const PAYMENT_STYLES = {
//   Paid: {
//     bg: "#dcfce7",
//     fg: "#15803d",
//   },
//   Pending: {
//     bg: "#fef3c7",
//     fg: "#b45309",
//   },
//   Failed: {
//     bg: "#fee2e2",
//     fg: "#b91c1c",
//   },
// };

// function OrderRow({ order }) {
//   const [open, setOpen] = useState(false);

//   const status = STATUS_STYLES[order.status];
//   const payment = PAYMENT_STYLES[order.payment];

//   return (
//     <Box
//       sx={{
//         border: "1px solid #e5e7eb",
//         borderRadius: 2,
//         bgcolor: "#fff",
//         overflow: "hidden",
//       }}
//     >
//       <Stack
//         direction="row"
//         spacing={2}
//         sx={{
//           p: 2,
//           cursor: "pointer",
//           alignItems: "center",
//         }}
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Stack
//             direction="row"
//             spacing={1}
//             sx={{
//               mb: 0.5,
//               flexWrap: "wrap",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontWeight: 600,
//                 color: "#111827",
//               }}
//             >
//               #{order.id}
//             </Typography>

//             <Chip
//               size="small"
//               icon={
//                 <Box
//                   sx={{
//                     display: "flex",
//                     color: status.fg,
//                     ml: "4px !important",
//                   }}
//                 >
//                   {status.icon}
//                 </Box>
//               }
//               label={order.status}
//               sx={{
//                 bgcolor: status.bg,
//                 color: status.fg,
//                 fontWeight: 600,
//                 height: 22,
//                 "& .MuiChip-label": {
//                   px: 1,
//                 },
//               }}
//             />

//             <Chip
//               size="small"
//               label={order.payment}
//               sx={{
//                 bgcolor: payment.bg,
//                 color: payment.fg,
//                 fontWeight: 600,
//                 height: 22,
//                 "& .MuiChip-label": {
//                   px: 1,
//                 },
//               }}
//             />
//           </Stack>

//           <Typography
//             variant="body2"
//             sx={{
//               color: "#6b7280",
//             }}
//           >
//             {order.customer}
//             <Box component="span" sx={{ mx: 0.75 }}>
//               •
//             </Box>
//             {order.email}
//             <Box component="span" sx={{ mx: 0.75 }}>
//               •
//             </Box>
//             {order.date}
//           </Typography>
//         </Box>

//         <Box sx={{ textAlign: "right" }}>
//           <Typography
//             variant="caption"
//             sx={{
//               color: "#6b7280",
//             }}
//           >
//             Total
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 700,
//               color: "#111827",
//             }}
//           >
//             ${order.total.toLocaleString()}
//           </Typography>
//         </Box>

//         <IconButton
//           size="small"
//           sx={{
//             transform: open ? "rotate(180deg)" : "none",
//             transition: "0.2s",
//           }}
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </Stack>

//       <Collapse in={open}>
//         <Box
//           sx={{
//             px: 3,
//             pb: 3,
//             pt: 2.5,
//             borderTop: "1px solid #f3f4f6",
//             bgcolor: "#fafafa",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#111827",
//               mb: 1.5,
//             }}
//           >
//             Order Items
//           </Typography>

//           <TableContainer
//             sx={{
//               border: "1px solid #e5e7eb",
//               borderRadius: 1.5,
//               bgcolor: "#fff",
//               mb: 3,
//             }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     bgcolor: "#f3f4f6",
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       fontWeight: 600,
//                       color: "#6b7280",
//                       fontSize: 12,
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     PRODUCT
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       fontWeight: 600,
//                       color: "#6b7280",
//                       fontSize: 12,
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     QUANTITY
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       fontWeight: 600,
//                       color: "#6b7280",
//                       fontSize: 12,
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     PRICE
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       fontWeight: 600,
//                       color: "#6b7280",
//                       fontSize: 12,
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     SUBTOTAL
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {/* {(order.items || DEFAULT_ITEMS).map((item, index) => ( */}
//                 {order.items.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ color: "#111827" }}>
//                       {item.product}
//                     </TableCell>

//                     <TableCell sx={{ color: "#111827" }}>
//                       {item.quantity}
//                     </TableCell>

//                     <TableCell sx={{ color: "#111827" }}>
//                       ${item.price.toLocaleString()}
//                     </TableCell>

//                     <TableCell sx={{ color: "#111827" }}>
//                       ${(item.price * item.quantity).toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Stack
//             direction={{ xs: "column", md: "row" }}
//             spacing={4}
//             sx={{
//               alignItems: "flex-start",
//             }}
//           >
//             <Box sx={{ flex: 1 }}>
//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   color: "#111827",
//                   mb: 1,
//                 }}
//               >
//                 Shipping Address
//               </Typography>

//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#6b7280",
//                 }}
//               >
//                 {order.shippingAddress}
//               </Typography>
//             </Box>

//             <Box sx={{ flex: 1 }}>
//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   color: "#111827",
//                   mb: 1,
//                 }}
//               >
//                 Actions
//               </Typography>

//               <Stack
//                 direction="row"
//                 spacing={1}
//                 sx={{
//                   flexWrap: "wrap",
//                   gap: 1,
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   disableElevation
//                   sx={{
//                     bgcolor: "#0a0a0a",
//                     color: "#fff",
//                     textTransform: "none",
//                     "&:hover": {
//                       bgcolor: "#1f1f1f",
//                     },
//                   }}
//                 >
//                   Update Status
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#e5e7eb",
//                     color: "#111827",
//                     textTransform: "none",
//                     "&:hover": {
//                       borderColor: "#d1d5db",
//                       bgcolor: "#f9fafb",
//                     },
//                   }}
//                 >
//                   View Invoice
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#e5e7eb",
//                     color: "#111827",
//                     textTransform: "none",
//                     "&:hover": {
//                       borderColor: "#d1d5db",
//                       bgcolor: "#f9fafb",
//                     },
//                   }}
//                 >
//                   Contact Customer
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#fecaca",
//                     color: "#dc2626",
//                     textTransform: "none",
//                     "&:hover": {
//                       borderColor: "#fca5a5",
//                       bgcolor: "#fef2f2",
//                     },
//                   }}
//                 >
//                   Cancel Order
//                 </Button>
//               </Stack>
//             </Box>
//           </Stack>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// }

// export default function OrderList({ orders = mockOrders }) {
//   return (
//     <Stack spacing={1.5}>
//       <Typography
//         variant="body2"
//         sx={{
//           color: "#6b7280",
//         }}
//       >
//         Showing {orders.length} of {orders.length} orders
//       </Typography>

//       {orders.map((order) => (
//         <OrderRow key={order.id} order={order} />
//       ))}
//     </Stack>
//   );
// }
