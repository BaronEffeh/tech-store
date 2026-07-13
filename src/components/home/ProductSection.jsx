import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Chip,
  // Rating
} from "@mui/material";
import { TextField, MenuItem, Skeleton } from "@mui/material";
import { useCart } from "../../context/CartContext";
import ProductPlaceholder from "../../assets/No_Image_Placeholder.svg.webp";
// import ProductDetails from "./ProductDetails";

function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const placeholder = ProductPlaceholder;

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: 180,
          sm: 200,
          md: 180,
          lg: 170,
        },
        position: "relative",
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
        />
      )}

      <Box
        component="img"
        src={error ? placeholder : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        sx={{
          display: loaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px 10px 0 0",
        }}
      />
    </Box>
  );
}

export function ProductSection({ products, initialCategory = "All Products" }) {

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    "All Products",
    ...new Set(
      products
        .map((product) => product.category?.name)
        .filter(Boolean)
    ),
  ];

  // const categories = [
  //   "All Products",
  //   "Laptops",
  //   "Phones",
  //   "Tablets",
  //   "Accessories",
  //   "Wearables"
  // ];

  const filteredProducts = products
  // Category filter
  .filter((product) =>
    selectedCategory === "All Products"
      ? true
      : product.category?.name === selectedCategory
  )

  // Search filter
  .filter((product) => {
    const queryWords = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "");

    const specsString = product.specs
      ? Object.values(product.specs).join(" ").toLowerCase()
      : "";
    
    const searchableText = `
      ${product.name || ""}
      ${product.category?.name || ""}
      ${product.category?.slug || ""}
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
      : product.category?.name === selectedCategory;
  })

  // 3. Sorting
  .sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0;
  });


  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
        },
      }}
    >
      {/* Categories */}
      <Container sx={{ py: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              sx={{ borderRadius: 2 }}
              onClick={() => setSelectedCategory(cat)}
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
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {filteredProducts.length === 0 ? (
            <Typography textAlign="center" mt={5}>
              No products found in this category.
            </Typography>
          ) : (
          filteredProducts.map((product) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={2}
              key={product.id}
            >
              <Paper
                sx={{
                  // p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6
                  }
                }}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    position: "relative",
                    mb: 2
                  }}
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                  />
                  {/* <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      // height: 230,
                      height: {
                        xs: 180,
                        sm: 200,
                        md: 180,
                        lg: 170,
                      },
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  /> */}

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
                <Box
                  sx={{
                    p: 1.5,
                    pt: 0,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: 24,
                    }}
                  >
                    {product.name}
                  </Typography>

                {/* Rating */}
                {/* <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                </Box> */}

                {/* Price */}
                <Box sx={{ mt: "auto", mb: 2 }}>
                  <Typography color="primary" fontWeight="bold">
                    ₦{Number(product.price || 0).toLocaleString()}
                    {/* &#x20A6;{product.price} */}
                  </Typography>
                  {product.comparePrice && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through" }}
                      color="text.secondary"
                    >
                      ₦{Number(product.comparePrice).toLocaleString()}
                    </Typography>
                  )}
                </Box>

                {/* Button */}
                <Button
                  fullWidth
                  variant="contained"
                  disabled={product.status === "Out of Stock"}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  {product.status === "Out of Stock"
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>

                </Box>
              </Paper>
            </Grid>
          ))
        )}
        </Grid>
      </Container>

      {/* <ProductDetails
        open={open}
        onClose={() => setOpen(false)}
        product={selectedProduct}
        onAdd={addToCart}
      /> */}
    </Box>
  );
}
