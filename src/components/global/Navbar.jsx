import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Badge
} from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          TechStore
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button 
            onClick={() => {
              navigate("/category/laptops"); 
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            Laptops
          </Button>

          <Button 
            onClick={() => {
              navigate("/category/phones");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            Phones
          </Button>

          <Button 
            onClick={() => {
              navigate("/category/tablets");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            Tablets
          </Button>

          <Button 
            onClick={() => {
              navigate("/category/accessories");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            Accessories
          </Button>

          <Button 
            onClick={() => {
              navigate("/category/deals");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            Deals
          </Button>
          {/* <Button>Laptops</Button>
          <Button>Phones</Button>
          <Button>Tablets</Button>
          <Button>Accessories</Button>
          <Button>Deals</Button> */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#fffefe",
              px: 2,
              borderRadius: 2
            }}
          >
            <Search color="disabled" />
            <InputBase placeholder="Search products..." />
          </Box>

          <IconButton>
            <AccountCircle />
          </IconButton>

          {/* CART BADGE */}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
