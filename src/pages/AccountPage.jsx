import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  TextField,
  Alert,
  Grid,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { updateUserProfile } from "../firebase/auth";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    bio: "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
        setLoadingOrders(false);
      },
      (error) => {
        console.error(error);
        setOrders([]);
        setLoadingOrders(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      bio: user.bio || "",
    });
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const updateField = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setSuccess("");

      await updateUserProfile(user.uid, {
        firstName: form.firstName,
        lastName: form.lastName,
        displayName: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        address: form.address,
        city: form.city,
        bio: form.bio,
      });

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const initials =
    (
      (form.firstName?.charAt(0) || "") +
      (form.lastName?.charAt(0) || "")
    ).toUpperCase() || "U";

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* Profile */}
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={user.photoURL || ""}
            sx={{ width: 80, height: 80 }}
          >
            {!user.photoURL && initials}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {user.displayName || "Guest User"} - {user.role || "Customer"}
          </Typography>

          <Typography color="text.secondary">
            {user.email}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Editable Profile */}
        {!editing ? (
          <>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Typography>
                <strong>First Name:</strong> {form.firstName || "-"}
              </Typography>

              <Typography>
                <strong>Last Name:</strong> {form.lastName || "-"}
              </Typography>

              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong> {form.phone || "-"}
              </Typography>

              <Typography>
                <strong>Address:</strong> {form.address || "-"}
              </Typography>

              <Typography>
                <strong>City:</strong> {form.city || "-"}
              </Typography>

              <Typography>
                <strong>Bio:</strong> {form.bio || "-"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>

              <Button
              color="error"
              variant="outlined"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Stack>

          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={form.firstName}
                  onChange={updateField("firstName")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={form.lastName}
                  onChange={updateField("lastName")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={form.phone}
                  onChange={updateField("phone")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  value={form.address}
                  onChange={updateField("address")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="City"
                  fullWidth
                  value={form.city}
                  onChange={updateField("city")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.bio}
                  onChange={updateField("bio")}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                disabled={saving}
                onClick={async () => {
                  await handleSaveProfile();
                  setEditing(false);
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                variant="outlined"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </Stack>
          </>
        )}

        <Divider sx={{ my: 4 }} />

        {/* Quick Actions */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button onClick={() => navigate("/cart")}>
            View Cart
          </Button>

          <Button onClick={() => navigate("/checkout")}>
            Checkout
          </Button>

          <Button disabled>
            Wishlist (Coming Soon)
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Orders */}
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Order History
        </Typography>

        {loadingOrders ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : orders.length === 0 ? (
          <Typography color="text.secondary">
            You have no orders yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {orders.map((order) => (
              <Card key={order.id} variant="outlined">
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Typography fontWeight="bold">
                      Order #{order.id.slice(0, 6)}
                    </Typography>

                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="body2">
                          Order Status:
                        </Typography>

                        <Chip
                          size="small"
                          label={
                            order.status || "Pending"
                          }
                          color={
                            order.status === "Delivered"
                              ? "success"
                              : order.status === "Cancelled"
                              ? "error"
                              : "warning"
                          }
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Typography variant="body2">
                          Payment:
                        </Typography>

                        <Chip
                          size="small"
                          label={
                            order.paymentStatus ||
                            "Pending"
                          }
                          color={
                            order.paymentStatus ===
                            "Paid"
                              ? "success"
                              : "warning"
                          }
                        />
                      </Stack>
                    </Box>
                  </Box>

                  <Typography mt={2}>
                    Total: ₦
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Items:{" "}
                    {order.items?.length || 0}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Order Timeline
                  </Typography>

                  {order.statusHistory?.length ? (
                    <Timeline
                      sx={{
                        p: 0,
                        m: 0,
                      }}
                    >
                      {order.statusHistory.map((item, index) => (
                        <TimelineItem key={index}>
                          <TimelineOppositeContent
                            sx={{
                              flex: 0.28,
                              fontSize: 12,
                              color: "text.secondary",
                            }}
                          >
                            {item.timestamp?.toDate
                              ? item.timestamp
                                  .toDate()
                                  .toLocaleDateString()
                              : ""}
                          </TimelineOppositeContent>

                          <TimelineSeparator>
                            <TimelineDot
                              color={
                                item.status === "Delivered"
                                  ? "success"
                                  : item.status === "Cancelled"
                                  ? "error"
                                  : item.status === "Shipped"
                                  ? "primary"
                                  : "warning"
                              }
                            />

                            {index !==
                              order.statusHistory.length - 1 && (
                              <TimelineConnector />
                            )}
                          </TimelineSeparator>

                          <TimelineContent>

                            <Typography fontWeight={600}>
                              {item.status}
                            </Typography>

                            {item.status === "Shipped" &&
                              item.shipping && (
                                <Box sx={{ mt: 1 }}>

                                  {item.shipping.courier && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      🚚 Courier:{" "}
                                      {item.shipping.courier}
                                    </Typography>
                                  )}

                                  {item.shipping.trackingNumber && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      📦 Tracking:
                                      {" "}
                                      {
                                        item.shipping
                                          .trackingNumber
                                      }
                                    </Typography>
                                  )}

                                  {item.shipping
                                    .estimatedDelivery && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      📅 Estimated Delivery:
                                      {" "}
                                      {
                                        item.shipping
                                          .estimatedDelivery
                                      }
                                    </Typography>
                                  )}

                                </Box>
                              )}

                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      No timeline available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}








// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Divider,
//   Paper,
//   Stack,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import { useNavigate, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";
// import { db } from "../firebase/config";

// export default function AccountPage() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);

//   useEffect(() => {
//     if (!user?.uid) return;

//     const q = query(
//       collection(db, "orders"),
//       where("userId", "==", user.uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setOrders(data);
//         setLoadingOrders(false);
//       },
//       (error) => {
//         console.error("Order listener error:", error);
//         setOrders([]);
//         setLoadingOrders(false);
//       }
//     );

//     // const unsubscribe = onSnapshot(q, (snapshot) => {
//     //   const data = snapshot.docs.map((doc) => ({
//     //     id: doc.id,
//     //     ...doc.data(),
//     //   }));

//     //   setOrders(data);
//     //   setLoadingOrders(false);
//     // });

//     return () => unsubscribe();
//   }, [user?.uid]);

//   if (!user) {
//     return <Navigate to="/auth" replace />;
//   }

//   const initials =
//     user.displayName?.charAt(0)?.toUpperCase() ||
//     user.email?.charAt(0)?.toUpperCase() ||
//     "U";

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <Paper sx={{ p: 4, borderRadius: 3 }}>
//         {/* ================= PROFILE ================= */}
//         <Stack spacing={2} alignItems="center">
//           <Avatar sx={{ width: 80, height: 80 }}>
//             {initials}
//           </Avatar>

//           <Typography variant="h5" fontWeight="bold">
//             {user.displayName || user.role} - {user.role || "Customer"}
//           </Typography>

//           <Typography color="text.secondary">
//             {user.email}
//           </Typography>
//         </Stack>

//         <Divider sx={{ my: 3 }} />

//         {/* ================= ACTIONS ================= */}
//         <Stack direction="row" spacing={2} flexWrap="wrap">
//           <Button onClick={() => navigate("/cart")}>
//             View Cart
//           </Button>

//           <Button onClick={() => navigate("/checkout")}>
//             Checkout
//           </Button>

//           <Button disabled>
//             Wishlist (Coming Soon)
//           </Button>

//           <Button
//             color="error"
//             variant="contained"
//             onClick={() => {
//               logout();
//               navigate("/");
//             }}
//           >
//             Logout
//           </Button>
//         </Stack>

//         <Divider sx={{ my: 3 }} />

//         {/* ================= ORDERS ================= */}
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Order History
//         </Typography>

//         {loadingOrders ? (
//           <Box textAlign="center" py={4}>
//             <CircularProgress />
//           </Box>
//         ) : orders.length === 0 ? (
//           <Typography color="text.secondary">
//             You have no orders yet.
//           </Typography>
//         ) : (
//           <Stack spacing={2}>
//             {orders.map((order) => (
//               <Card key={order.id} variant="outlined">
//                 <CardContent>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                   >
//                     <Typography fontWeight="bold">
//                       Order #{order.id.slice(0, 6)}
//                     </Typography>

//                     <Box>                                          
//                       <Box
//                         sx={{
//                           display: "flex",
//                           mb: 1                        
//                         }}
//                       >
//                         <Typography>
//                           Order Satus:
//                         </Typography> 
//                         <Chip
//                           label={order.status || "Pending"}
//                           color={
//                             order.status === "Delivered"
//                               ? "success"
//                               : order.status === "Cancelled"
//                               ? "error"
//                               : "warning"
//                           }
//                           size="small"
//                         />
//                       </Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                         }}>
//                         <Typography>Payment Status</Typography>
//                         <Chip 
//                           label={order.paymentStatus || "Pending"}
//                           color={
//                             order.status === "Paid"
//                             ? "success"
//                             : "warning"
//                           }
//                           size="small"
//                         />
//                       </Box>
//                     </Box>
//                     {/* </Typography> */}
//                   </Box>

//                   <Typography variant="body2" mt={1}>
//                     Total: ₦
//                     {Number(order.total || 0).toLocaleString()}
//                   </Typography>

//                   <Typography variant="body2" color="text.secondary">
//                     Items: {order.items?.length || 0}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </Stack>
//         )}
//       </Paper>
//     </Container>
//   );
// }

