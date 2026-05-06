import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube
} from "@mui/icons-material";

export default function Footer() {
  const navigate = useNavigate();

  const shopLinks = {
  Laptops: "/category/laptops",
  Phones: "/category/phones",
  Tablets: "/category/tablets",
  Accessories: "/category/accessories",
  Deals: "/category/deals"
};

const supportLinks = {
  "Contact Us": "/support/contact",
  FAQ: "/support/faq",
  "Shipping Info": "/support/shipping",
  Returns: "/support/returns",
  Warranty: "/support/warranty"
};

const companyLinks = {
  "About Us": "/company/about",
  Careers: "/company/careers",
  "Privacy Policy": "/company/privacy",
  "Terms of Service": "/company/terms"
};

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "#fff",
        mt: 6,
        pt: 6,
        pb: 3,
        overflow: "hidden"
      }}
    >
      <Container sx={{px: 4, ml: 2}}>
        <Grid container spacing={4}>
          {/* Logo & Description */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              TechStore
            </Typography>
            {/* <Typography variant="h6" fontWeight="bold" gutterBottom>
              TechStore
            </Typography> */}
            <Typography variant="body2" sx={{ mb: 2, color: "#cbd5e1" }}>
              Your one-stop shop for the latest technology and gadgets.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ bgcolor: "#1e293b", color: "#fff", "&:hover": { bgcolor: "#334155", color: "#1877F2" } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ bgcolor: "#1e293b", color: "#fff", "&:hover": { bgcolor: "#334155", color: "#1DA1F2" } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ bgcolor: "#1e293b", color: "#fff", "&:hover": { bgcolor: "#334155", color: "#e1306c" } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ bgcolor: "#1e293b", color: "#fff", "&:hover": { bgcolor: "#334155", color: "#FF0000" } }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Shop */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Shop
            </Typography>
            {Object.entries(shopLinks).map(([label, path]) => (
              <Typography
                key={label}
                variant="body2"
                onClick={() => navigate(path)}
                sx={{
                  mb: 1,
                  color: "#cbd5e1",
                  cursor: "pointer",
                  "&:hover": { color: "#fff" }
                }}
              >
                {label}
              </Typography>
            ))}
            {/* {["Laptops", "Phones", "Tablets", "Accessories", "Deals"].map(
              (item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{ mb: 1, 
                    color: "#cbd5e1", 
                    cursor: "pointer",
                    "&:hover": {
                        color: "#fff"
                    } }}
                >
                  {item}
                </Typography>
              )
            )} */}
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            {Object.entries(supportLinks).map(([label, path]) => (
              <Typography
                key={label}
                variant="body2"
                onClick={() => navigate(path)}
                sx={{
                  mb: 1,
                  color: "#cbd5e1",
                  cursor: "pointer",
                  "&:hover": { color: "#fff" }
                }}
              >
                {label}
              </Typography>
            ))}
            {/* {[
              "Contact Us",
              "FAQ",
              "Shipping Info",
              "Returns",
              "Warranty"
            ].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{ mb: 1, 
                    color: "#cbd5e1", 
                    cursor: "pointer",
                    "&:hover": {
                        color: "#fff"
                    } }}
              >
                {item}
              </Typography>
            ))} */}
          </Grid>

          {/* Company */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            {Object.entries(companyLinks).map(([label, path]) => (
              <Typography
                key={label}
                variant="body2"
                onClick={() => navigate(path)}
                sx={{
                  mb: 1,
                  color: "#cbd5e1",
                  cursor: "pointer",
                  "&:hover": { color: "#fff" }
                }}
              >
                {label}
              </Typography>
            ))}
            {/* {[
              "About Us",
              "Careers",
              "Privacy Policy",
              "Terms of Service"
            ].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{ mb: 1, 
                    color: "#cbd5e1", 
                    cursor: "pointer",
                    "&:hover": {
                        color: "#fff"
                    } }}
              >
                {item}
              </Typography>
            ))} */}
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #1e293b",
            mt: 4,
            pt: 2,
            textAlign: "center"
          }}
        >
          <Typography variant="body2" color="#94a3b8" py={3}>
            © {new Date().getFullYear()} TechStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}