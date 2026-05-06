import React, { useState } from "react";
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
  Divider
} from "@mui/material";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: ""
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = delivery === "express" ? 5000 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Container sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={7}>
          {/* Shipping Info */}
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Delivery */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Delivery Method
            </Typography>

            <RadioGroup
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard Delivery (Free)"
              />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label="Express Delivery (₦5000)"
              />
            </RadioGroup>
          </Paper>

          {/* Payment */}
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Payment Method
            </Typography>

            <RadioGroup
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
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

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography fontWeight="bold" mb={2}>
              Order Summary
            </Typography>

            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">
                  {item.name} × {item.quantity}
                </Typography>
                <Typography variant="body2">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>₦{subtotal.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>
                {shipping === 0 ? "Free" : `₦${shipping}`}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Tax</Typography>
              <Typography>₦{tax.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold" color="primary">
                ₦{total.toFixed(2)}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" sx={{ mt: 3 }}>
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}