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
} from "@mui/material";
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

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
        console.error("Order listener error:", error);
        setOrders([]);
        setLoadingOrders(false);
      }
    );

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const data = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));

    //   setOrders(data);
    //   setLoadingOrders(false);
    // });

    return () => unsubscribe();
  }, [user?.uid]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const initials =
    user.displayName?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* ================= PROFILE ================= */}
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 80, height: 80 }}>
            {initials}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {user.displayName || user.role} - {user.role || "Customer"}
          </Typography>

          <Typography color="text.secondary">
            {user.email}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= ACTIONS ================= */}
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

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= ORDERS ================= */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
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
                  >
                    <Typography fontWeight="bold">
                      Order #{order.id.slice(0, 6)}
                    </Typography>

                    <Chip
                      label={order.status || "Pending"}
                      color={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Cancelled"
                          ? "error"
                          : "warning"
                      }
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" mt={1}>
                    Total: ₦
                    {Number(order.total || 0).toLocaleString()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Items: {order.items?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

