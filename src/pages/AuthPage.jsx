import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AppToast from "../admin/components/common/AppToast";

export default function AuthPage() {
  const { login, register, resetPassword } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const redirectPath = location.state?.from || "/checkout";
  const redirectPath =
    location.state?.from?.pathname ||
    location.state?.from ||
    "/";

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isSignUp) {
        if (form.password !== form.confirmPassword) {
          showToast("Passwords do not match", "error");
          return;
        }

        await register({
          displayName: form.displayName,
          email: form.email,
          password: form.password,
        });

        // await register({
        //   displayName: form.displayName,
        //   email: form.email,
        //   password: form.password,
        // });

        showToast("Account created successfully!");
      } else {
        await login(form.email, form.password);
        showToast("Login successful!");
      }

      navigate(redirectPath);
    } catch (error) {
      showToast(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      showToast("Enter your email first", "warning");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(form.email);
      showToast("Password reset email sent!");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          {isSignUp ? "Create Account" : "Sign In"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          {isSignUp
            ? "Create an account to continue shopping."
            : "Sign in to continue to checkout."}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {isSignUp && (
            <TextField
              label="Full Name"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            />
          )}

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            fullWidth
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isSignUp && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword((p) => !p)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Forgot password */}
          {!isSignUp && (
            <Button
              onClick={handleForgotPassword}
              disabled={loading}
              size="small"
              sx={{ alignSelf: "flex-end" }}
            >
              Forgot Password?
            </Button>
          )}

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : null
            }
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </Button>

          {/* Toggle */}
          <Button
            variant="text"
            disabled={loading}
            onClick={() => {
              setIsSignUp((p) => !p);
              setForm({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Create one"}
          </Button>
        </Box>
      </Paper>

      {/* TOAST */}
      <AppToast
        open={toast.open}
        onClose={() => setToast((p) => ({ ...p, open: false }))}
        severity={toast.severity}
        message={toast.message}
      />
    </Container>
  );
}


