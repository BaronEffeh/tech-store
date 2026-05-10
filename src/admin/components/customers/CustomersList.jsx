import { useState } from "react";

import {
  Paper,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
  Collapse,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function CustomersList({ customers }) {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {customers.map((customer) => {
          const isExpanded = expanded === customer.id;

          return (
            <Paper
              key={customer.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}
            >
              {/* TOP ROW */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  cursor: "pointer"
                }}
                onClick={() => handleExpand(customer.id)}
              >
                {/* LEFT */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      fontSize: "1.5rem",
                      bgcolor: "#f1f5f9"
                    }}
                  >
                    {customer.avatar}
                  </Avatar>

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5
                      }}
                    >
                      <Typography fontWeight="bold">
                        {customer.name}
                      </Typography>

                      {/* STATUS */}
                      {customer.status === "VIP" && (
                        <>
                          <Chip
                            label="VIP"
                            size="small"
                            sx={{
                              bgcolor: "#f3e8ff",
                              color: "#9333ea",
                              fontWeight: 500
                            }}
                          />

                          <WorkspacePremiumIcon
                            sx={{
                              fontSize: 18,
                              color: "#9333ea"
                            }}
                          />
                        </>
                      )}

                      {customer.status === "Active" && (
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            bgcolor: "#dcfce7",
                            color: "#15803d",
                            fontWeight: 500
                          }}
                        />
                      )}

                      {customer.status === "Inactive" && (
                        <Chip
                          label="Inactive"
                          size="small"
                          sx={{
                            bgcolor: "#fee2e2",
                            color: "#dc2626",
                            fontWeight: 500
                          }}
                        />
                      )}

                      {/* {customer.status === "VIP" ? (
                        <>
                          <Chip
                            label="VIP"
                            size="small"
                            sx={{
                              bgcolor: "#f3e8ff",
                              color: "#9333ea"
                            }}
                          />

                          <WorkspacePremiumIcon
                            sx={{
                              fontSize: 18,
                              color: "#9333ea"
                            }}
                          />
                        </>
                      ) : (
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            bgcolor: "#dcfce7",
                            color: "#15803d"
                          }}
                        />
                      )} */}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5
                        }}
                      >
                        <MailOutlineIcon
                          sx={{
                            fontSize: 14,
                            color: "#6b7280"
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b" }}
                        >
                          {customer.email}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5
                        }}
                      >
                        <PhoneIcon
                          sx={{
                            fontSize: 14,
                            color: "#6b7280"
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b" }}
                        >
                          {customer.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* RIGHT */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <Box textAlign="center">
                    <Typography
                      variant="caption"
                      sx={{ color: "#64748b" }}
                    >
                      Orders
                    </Typography>

                    <Typography fontWeight="bold">
                      {customer.orders}
                    </Typography>
                  </Box>

                  <Box textAlign="center">
                    <Typography
                      variant="caption"
                      sx={{ color: "#64748b" }}
                    >
                      Total Spent
                    </Typography>

                    <Typography fontWeight="bold">
                      {customer.spent}
                    </Typography>
                  </Box>

                  <IconButton>
                    {isExpanded ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>

              {/* EXPANDED SECTION */}
              <Collapse in={isExpanded}>
                <Divider />

                <Box sx={{ p: 3 }}>
                  {/* INFO GRID */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr 1fr"
                      },
                      gap: 4,
                      mb: 4
                    }}
                  >
                    {/* CONTACT INFO */}
                    <Box>
                      <Typography fontWeight="bold" mb={2}>
                        Contact Information
                      </Typography>

                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <MailOutlineIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                          <Typography variant="body2">
                            {customer.email}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                          <Typography variant="body2">
                            {customer.phone}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LocationOnOutlinedIcon
                            sx={{ fontSize: 18, color: "#6b7280" }}
                          />

                          <Typography variant="body2">
                            {customer.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* ACCOUNT DETAILS */}
                    <Box>
                      <Typography fontWeight="bold" mb={2}>
                        Account Details
                      </Typography>

                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarMonthOutlinedIcon
                            sx={{ fontSize: 18, color: "#6b7280" }}
                          />

                          <Typography variant="body2">
                            Joined: {customer.joined}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Inventory2OutlinedIcon
                            sx={{ fontSize: 18, color: "#6b7280" }}
                          />

                          <Typography variant="body2">
                            Last Order: {customer.lastOrder}
                          </Typography>
                        </Box>

                        <Typography variant="body2">
                          Customer ID: {customer.customerId}
                        </Typography>
                      </Box>
                    </Box>

                    {/* PURCHASE SUMMARY */}
                    <Box>
                      <Typography fontWeight="bold" mb={2}>
                        Purchase Summary
                      </Typography>

                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Total Orders:
                          </Typography>

                          <Typography variant="body2">
                            {customer.orders}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Total Spent:
                          </Typography>

                          <Typography variant="body2">
                            {customer.spent}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Avg Order:
                          </Typography>

                          <Typography variant="body2">
                            {customer.avgOrder}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* RECENT ORDERS */}
                  <Typography fontWeight="bold" mb={2}>
                    Recent Orders
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 3,
                      overflow: "hidden",
                      mb: 4
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          <TableCell>ORDER ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>ITEMS</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>STATUS</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {customer.recentOrders.map((order, index) => (
                          <TableRow key={index}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>

                            <TableCell>
                              <Chip
                                label={order.status}
                                size="small"
                                sx={{
                                  bgcolor: "#dcfce7",
                                  color: "#15803d"
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>

                  {/* ACTIONS */}
                  <Typography fontWeight="bold" mb={2}>
                    Actions
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap"
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<EmailOutlinedIcon />}
                      sx={{
                        bgcolor: "#020617",
                        borderRadius: 3,
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#111827",
                          boxShadow: "none"
                        }
                      }}
                    >
                      Send Email
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<EditOutlinedIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        borderColor: "#d1d5db",
                        color: "#111827"
                      }}
                    >
                      Edit Profile
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<VisibilityOutlinedIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        borderColor: "#d1d5db",
                        color: "#111827"
                      }}
                    >
                      View All Orders
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutlineIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none"
                      }}
                    >
                      Delete Customer
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}






// import {
//   Paper,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton
// } from "@mui/material";

// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import PhoneIcon from "@mui/icons-material/Phone";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// const customers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@email.com",
//     phone: "+1 (555) 123-4567",
//     orders: 24,
//     spent: "$12,850",
//     status: "VIP",
//     avatar: "🧑"
//   },

//   {
//     id: 2,
//     name: "Sarah Wilson",
//     email: "sarah.w@email.com",
//     phone: "+1 (555) 234-5678",
//     orders: 18,
//     spent: "$8,920",
//     status: "Active",
//     avatar: "👩"
//   },

//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike.j@email.com",
//     phone: "+1 (555) 345-6789",
//     orders: 32,
//     spent: "$18,500",
//     status: "VIP",
//     avatar: "🧔"
//   },

//   {
//     id: 4,
//     name: "Emma Brown",
//     email: "emma.b@email.com",
//     phone: "+1 (555) 456-7890",
//     orders: 15,
//     spent: "$6,750",
//     status: "Active",
//     avatar: "👩‍💻"
//   }
// ];

// export default function CustomersList() {
//   return (
//     <Box>
//       <Typography
//         variant="body1"
//         sx={{
//           color: "#64748b",
//           mb: 3
//         }}
//       >
//         Showing 10 of 10 customers
//       </Typography>

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {customers.map((customer) => (
//           <Paper
//             key={customer.id}
//             elevation={0}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               border: "1px solid #e5e7eb",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 2
//             }}
//           >
//             {/* LEFT */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2
//               }}
//             >
//               <Avatar
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   fontSize: "1.5rem",
//                   bgcolor: "#f1f5f9"
//                 }}
//               >
//                 {customer.avatar}
//               </Avatar>

//               <Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     mb: 0.5
//                   }}
//                 >
//                   <Typography fontWeight="bold">
//                     {customer.name}
//                   </Typography>

//                   {customer.status === "VIP" ? (
//                     <>
//                       <Chip
//                         label="VIP"
//                         size="small"
//                         sx={{
//                           bgcolor: "#f3e8ff",
//                           color: "#9333ea"
//                         }}
//                       />

//                       <WorkspacePremiumIcon
//                         sx={{
//                           fontSize: 18,
//                           color: "#9333ea"
//                         }}
//                       />
//                     </>
//                   ) : (
//                     <Chip
//                       label="Active"
//                       size="small"
//                       sx={{
//                         bgcolor: "#dcfce7",
//                         color: "#15803d"
//                       }}
//                     />
//                   )}
//                 </Box>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     flexWrap: "wrap"
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0.5
//                     }}
//                   >
//                     <MailOutlineIcon
//                       sx={{
//                         fontSize: 14,
//                         color: "#6b7280"
//                       }}
//                     />

//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#64748b" }}
//                     >
//                       {customer.email}
//                     </Typography>
//                   </Box>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0.5
//                     }}
//                   >
//                     <PhoneIcon
//                       sx={{
//                         fontSize: 14,
//                         color: "#6b7280"
//                       }}
//                     />

//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#64748b" }}
//                     >
//                       {customer.phone}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>

//             {/* RIGHT */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4
//               }}
//             >
//               <Box textAlign="center">
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "#64748b" }}
//                 >
//                   Orders
//                 </Typography>

//                 <Typography fontWeight="bold">
//                   {customer.orders}
//                 </Typography>
//               </Box>

//               <Box textAlign="center">
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "#64748b" }}
//                 >
//                   Total Spent
//                 </Typography>

//                 <Typography fontWeight="bold">
//                   {customer.spent}
//                 </Typography>
//               </Box>

//               <IconButton>
//                 <KeyboardArrowDownIcon />
//               </IconButton>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   );
// }