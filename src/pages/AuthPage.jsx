import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

    const location = useLocation();
    const redirectPath = location.state?.from || "/checkout";

navigate(redirectPath);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    // 🔥 Mock login
    login({ email: form.email });

    // Redirect to checkout after login
    navigate("/checkout");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" mb={3}>
          Sign In / Sign Up
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}