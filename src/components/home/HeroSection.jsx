import React from "react";
import { Box, Container, Grid, Typography, Button, Paper } from "@mui/material";
import HeroImage from "../../assets/products/heroImage.png";

export function HeroSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #465cd6, #8431c9)",
        color: "white",
        py: 8,
        overflow: "hidden",
        height: "auto"
      }}
    >
      <Container sx={{m: 2}}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Latest Tech at Unbeatable Prices
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Discover the newest laptops, phones, tablets, and accessories.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" sx={{bgcolor: "white", color: "blue", p: 1, px: 2}}>
                Shop Now
              </Button>
              <Button variant="outlined" sx={{ color: "white", borderColor: "white", p: 1, px: 2 }}>
                View Deals
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{px: 4, width: 400}}>
            <Paper component="img" src={HeroImage} sx={{ height: 350, borderRadius: 4 }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}