import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Rating,
  Grid,
  Tabs,
  Tab
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import LocalShipping from "@mui/icons-material/LocalShipping";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Replay from "@mui/icons-material/Replay";

export default function ProductDetails({ open, onClose, product, onAdd }) {
  const [qty, setQty] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [tab, setTab] = useState(0);
  const [reviews, setReviews] = useState(product?.reviewsData || []);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    setReviews(product?.reviewsData || []);
  }, [product]);

  if (!product) return null;
  
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;
  // const avgRating =
  //   product.reviewsData && product.reviewsData.length > 0
  //     ? product.reviewsData.reduce((acc, r) => acc + r.rating, 0) /
  //       product.reviewsData.length
  //     : 0;

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.comment || !newReview.rating) return;

    const review = {
      ...newReview,
      date: new Date().toLocaleDateString()
    };

    setReviews([review, ...reviews]);

    // Reset form
    setNewReview({
      name: "",
      rating: 0,
      comment: ""
    });
    setShowReviewForm(false);
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      breakdown[rounded]++;
    });

    return breakdown;
  };

  const breakdown = getRatingBreakdown();

  // fallback if no multiple images
  const images = product.images || [product.image];

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ p: 3 }}>
        {/* Close */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* LEFT SIDE - IMAGE GALLERY */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              {/* Main Image */}
              <Box
                component="img"
                src={images[currentImage]}
                sx={{ width: "100%", borderRadius: 2 }}
              />

              {/* Prev Button */}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  bgcolor: "white",
                  "&:hover": {bgcolor: "#e1e8ec"}
                }}
              >
                <ArrowBackIosNew fontSize="small" />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  bgcolor: "white",
                  "&:hover": {bgcolor: "#e1e8ec"}
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Box>

            {/* Thumbnails */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {images.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  onClick={() => setCurrentImage(index)}
                  sx={{
                    width: 95,
                    height: 95,
                    objectFit: "cover",
                    borderRadius: 2,
                    cursor: "pointer",
                    border:
                      currentImage === index
                        ? "2px solid blue"
                        : "1px solid #ddd"
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              {product.name}
            </Typography>

            <Rating value={product.rating} readOnly />

            <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
              ₦{Number(product.price || 0).toLocaleString()}
            </Typography>

            {product.comparePrice && (
              <Typography color="text.secondary" sx={{ textDecoration: "line-through" }}>
                ₦{Number(product.comparePrice).toLocaleString()}
              </Typography>
            )}

            {/* Stock */}
            <Typography
            bgcolor={product.status === "Out of Stock"
              ? "#FEE2E2"
              : "#d4f5e6"
            }
            color={product.status === "Out of Stock"
              ? "#DC2626"
              : ""
            }
              sx={{
                mt: 2,
                // bgcolor: "#d4f5e6",
                px: 2,
                py: 1,
                borderRadius: 2,
                display: "inline-block"
              }}
            >
              {product.status === "Out of Stock"
                ? "Out of Stock"
                : "In Stock"}
              {/* In Stock */}
            </Typography>

            {/* Quantity */}
            <Typography variant="h6" mt={2}>
              Quantity
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button onClick={() => setQty(qty - 1)} disabled={qty === 1}>
                -
              </Button>
              <Typography>{qty}</Typography>
              <Button onClick={() => setQty(qty + 1)}>+</Button>
            </Box>

            {/* Add to Cart */}
            <Button
              fullWidth
              variant="contained"
              disabled={product.status === "Out of Stock"}
              sx={{ mt: 3 }}
              onClick={(e) => {
                e.stopPropagation();
                onAdd({ ...product, quantity: qty })
              }}
            >
              {product.status === "Out of Stock"
                ? "Out of Stock"
                : "Add to Cart"}
              Add to Cart
            </Button>

            {/* FEATURES */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                p: 2,
                bgcolor: "#f5f5f5",
                borderRadius: 2
              }}
            >
              <Box textAlign="center">
                <LocalShipping />
                <Typography variant="body2">Free Shipping</Typography>
              </Box>

              <Box textAlign="center">
                <VerifiedUser />
                <Typography variant="body2">2 Year Warranty</Typography>
              </Box>

              <Box textAlign="center">
                <Replay />
                <Typography variant="body2">30-Day Returns</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* TABS */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label={`Reviews (${reviews.length})`} />
            {/* <Tab
              label={`Reviews (${product.reviewsData?.length || 0})`}
            /> */}
            {/* <Tab label={`Reviews (${product.reviews || 0})`} /> */}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tab === 0 && (
              <Typography>
                {product.description || "No description available for this product."}
              </Typography>
            )}

            {tab === 1 && (
                <Box sx={{ mt: 2 }}>
                    {product.specs ? (
                    Object.entries(product.specs).map(([label, value], index) => (
                        <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1.5,
                            borderBottom: "1px solid #eee"
                        }}
                        >
                        <Typography color="text.secondary">{label}</Typography>
                        <Typography fontWeight="medium">{value}</Typography>
                        </Box>
                    ))
                    ) : (
                    <Typography color="text.secondary">
                        No specifications available.
                    </Typography>
                    )}
                </Box>
            )}

            {tab === 2 && (
              <Box sx={{ mt: 2 }}>
                    {/* ⭐ Average Rating Summary */}
                {/* {product.reviewsData && product.reviewsData.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Customer Reviews
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating value={avgRating} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({reviews.length} reviews)
                      </Typography>
                    </Box>
                  </Box>
                )} */}

                {/* WRITE REVIEW BUTTON */}
                {!showReviewForm && (
                  <Button
                    variant="outlined"
                    sx={{ mb: 3 }}
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </Button>
                )}

                {/* REVIEW FORM (TOGGLED) */}
                {showReviewForm && (
                  <Box sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Write a Review
                    </Typography>

                    {/* Name */}
                    <input
                      placeholder="Your name"
                      value={newReview.name}
                      onChange={(e) =>
                        setNewReview({ ...newReview, name: e.target.value })
                      }
                      style={{ width: "100%", marginTop: 8, padding: 8 }}
                    />

                    {/* Rating */}
                    <Box sx={{ mt: 2 }}>
                      <Rating
                        value={newReview.rating}
                        onChange={(e, value) =>
                          setNewReview({ ...newReview, rating: value })
                        }
                      />
                    </Box>

                    {/* Comment */}
                    <textarea
                      placeholder="Write your review..."
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      style={{ width: "100%", marginTop: 8, padding: 8 }}
                    />

                    {/* Actions */}
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                      <Button variant="contained" onClick={handleSubmitReview}>
                        Submit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                )}

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6">Customer Reviews</Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={avgRating} precision={0.5} readOnly />
                    <Typography>({reviews.length})</Typography>
                  </Box>

                  {/* Distribution */}
                  <Box sx={{ mt: 2 }}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = breakdown[star];
                      const percent = reviews.length
                        ? (count / reviews.length) * 100
                        : 0;

                      return (
                        <Box
                          key={star}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1
                          }}
                        >
                          <Typography variant="body2">{star}★</Typography>

                          <Box
                            sx={{
                              flex: 1,
                              height: 8,
                              bgcolor: "#eee",
                              borderRadius: 1,
                              overflow: "hidden"
                            }}
                          >
                            <Box
                              sx={{
                                width: `${percent}%`,
                                height: "100%",
                                bgcolor: "#ffc107"
                              }}
                            />
                          </Box>

                          <Typography variant="body2">{count}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                {/* <Rating value={avgRating} precision={0.5} readOnly /> */}
                {product.reviewsData && product.reviewsData.length > 0 ? (
                  reviews.map((review, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#f9f9f9",
                        border: "1px solid #eee"
                      }}
                    >
                      {/* Name + Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1
                        }}
                      >
                        <Typography fontWeight="bold">{review.name}</Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>

                      {/* Comment */}
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {review.comment}
                      </Typography>

                      {/* Date */}
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No reviews yet.
                  </Typography>
                )}
                {/* <Button variant="outlined" sx={{ mb: 2 }}>
                  Write a Review
                </Button> */}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
