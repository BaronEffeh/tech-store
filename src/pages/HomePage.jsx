import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { HeroSection } from "../components/home/HeroSection";
import { ProductSection } from "../components/home/ProductSection";
// import { products } from "../components/data/products";
import useProducts from "../firebase/hooks/useProducts";

export default function HomePage() {
    const { products, loading } = useProducts();

    // if (loading) {
    //   return <div>Loading products...</div>;
    // }
  return (
    <Box>
      <HeroSection />

      {loading ? (
        <Box
          sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
            width: "100%",
          }}
        >
          <CircularProgress size={48} />
          <Typography fontStyle="italic">
            Loading products...
          </Typography>
        </Box>
      ) : (
        <ProductSection products={products} />
      )}

    </Box>
  );
}

