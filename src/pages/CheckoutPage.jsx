import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { updateUserProfile } from "../firebase/auth";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import AppToast from "../admin/components/common/AppToast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, refreshUser } = useAuth();

  const [placingOrder, setPlacingOrder] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.displayName || "",
      email: user.email || "",
      address: user.address || "",
      city: user.city || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const shipping = delivery === "express" ? 5000 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);

      if (!user?.uid) {
        throw new Error("Please sign in first.");
      }

      // Update customer profile
      await updateUserProfile(user.uid, {
        displayName: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
      });

      if (refreshUser) {
        await refreshUser();
      }

      // Create order
      await addDoc(collection(db, "orders"), {
        userId: user.uid,

        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },

        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: Number(item.price),
          image: item.image || "",
        })),

        deliveryMethod: delivery,
        paymentMethod: payment,
        paymentStatus:
          payment === "card"
            ? "Paid"
            : "Pending",

        subtotal,
        shipping,
        tax,
        total,

        status: "Pending",
        isNew: true,

        createdAt: serverTimestamp(),
      });

      clearCart();

      setToast({
        open: true,
        severity: "success",
        message: "Order placed successfully!",
      });
    } catch (error) {
      console.error(error);

      setToast({
        open: true,
        severity: "error",
        message:
          error.message || "Failed to place your order.",
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                Shipping Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                Delivery Method
              </Typography>

              <RadioGroup
                value={delivery}
                onChange={(e) =>
                  setDelivery(e.target.value)
                }
              >
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label="Standard Delivery (Free)"
                />

                <FormControlLabel
                  value="express"
                  control={<Radio />}
                  label="Express Delivery (₦5,000.00)"
                />
              </RadioGroup>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                Payment Method
              </Typography>

              <RadioGroup
                value={payment}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Debit / Credit Card"
                />

                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Transfer"
                />

                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </Paper>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 3,
                position: "sticky",
                top: 100,
              }}
            >
              <Typography fontWeight="bold" mb={2}>
                Order Summary
              </Typography>

              {cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} × {item.quantity}
                  </Typography>

                  <Typography variant="body2">
                    ₦
                    {formatPrice(
                      Number(item.price) * item.quantity
                    )}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography>Subtotal</Typography>

                <Typography>
                  ₦{formatPrice(subtotal)}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography>Shipping</Typography>

                <Typography>
                  {shipping === 0
                    ? "Free"
                    : `₦${formatPrice(shipping)}`}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography>Tax</Typography>

                <Typography>
                  ₦{formatPrice(tax)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography fontWeight="bold">
                  Total
                </Typography>

                <Typography
                  fontWeight="bold"
                  color="primary"
                >
                  ₦{formatPrice(total)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                disabled={
                  placingOrder || cart.length === 0
                }
                onClick={handlePlaceOrder}
              >
                {placingOrder ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Place Order"
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <AppToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </>
  );
}
