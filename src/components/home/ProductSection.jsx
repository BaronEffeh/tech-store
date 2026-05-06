import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Chip,
  Rating
} from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
import { useCart } from "../../context/CartContext";
import ProductDetails from "./ProductDetails";

export function ProductSection({ products, initialCategory = "All Products" }) {

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // const [selectedCategory, setSelectedCategory] = useState("All Products");
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    "All Products",
    "Laptops",
    "Phones",
    "Tablets",
    "Accessories",
    "Wearables"
  ];

  const filteredProducts = products
  // 1. Category filter
  .filter((product) =>
    selectedCategory === "All Products"
      ? true
      : product.category === selectedCategory
  )

  // 2. Search filter
  .filter((product) => {
    const queryWords = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "");

    const specsString = product.specs
      ? Object.values(product.specs).join(" ").toLowerCase()
      : "";

    const searchableText = `
      ${product.name}
      ${product.category}
      ${product.tag || ""}
      ${specsString}
    `.toLowerCase();

    let matchCount = 0;

    queryWords.forEach((word) => {
      if (searchableText.includes(word)) matchCount++;
    });

    return matchCount >= Math.ceil(queryWords.length / 2); // at least half match
  })

  .filter((product) => {
    if (selectedCategory === "Deals") {
      return product.discount; // only products with discount
    }

    return selectedCategory === "All Products"
      ? true
      : product.category === selectedCategory;
  })

  // 3. Sorting
  .sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0;
  });


  return (
    <Box sx={{px: 4}}>
      {/* Categories */}
      <Container sx={{ py: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              sx={{ borderRadius: 2 }}
              onClick={() => setSelectedCategory(cat)}
              // onClick={() => {
              //   setSelectedCategory(cat);
              //   window.scrollTo({ top: 0, behavior: "smooth" });
              // }}
            >
              {cat}
            </Button>
          ))}
        </Box>
      </Container>

      {/* Header */}
      <Container sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            {selectedCategory}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {filteredProducts.length} products
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap"
        }}
      >
        {/* Search */}
        <TextField
          label="Search products..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        {/* Sort */}
        <TextField
          select
          label="Sort By"
          size="small"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="priceLow">Price: Low → High</MenuItem>
          <MenuItem value="priceHigh">Price: High → Low</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </TextField>
      </Box>

      {/* Products Grid */}
      <Container>
        <Grid container spacing={3}>
          {filteredProducts.length === 0 ? (
            <Typography textAlign="center" mt={5}>
              No products found in this category.
            </Typography>
          ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Paper
                sx={{
                  // p: 2,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6
                  }
                }}
                onClick={() => {
                  setSelectedProduct(product);
                  setOpen(true);
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    position: "relative",
                    mb: 2
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 230,
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />

                  {product.tag && (
                    <Chip
                      label={product.tag}
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 8, left: 8 }}
                    />
                  )}

                  {product.discount && (
                    <Chip
                      label={product.discount}
                      color="success"
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    />
                  )}
                </Box>

                {/* Name */}
                <Box sx={{p: 2, pt: 0}}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1 }}
                    color="text.secondary"
                  >
                    ({product.reviews})
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 2 }}>
                  <Typography color="primary" fontWeight="bold">
                    &#x20A6;{product.price}
                  </Typography>
                  {product.oldPrice && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through" }}
                      color="text.secondary"
                    >
                      &#x20A6;{product.oldPrice}
                    </Typography>
                  )}
                </Box>

                {/* Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
        </Grid>
      </Container>

      <ProductDetails
        open={open}
        onClose={() => setOpen(false)}
        product={selectedProduct}
        onAdd={addToCart}
      />
    </Box>
  );
}
