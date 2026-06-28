import React, { useState } from 'react';
import { useEffect } from "react";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';

import {
  Add,
  Close,
  CloudUploadOutlined,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import { 
  getCategories 
} from '../../../firebase/categories';

// Supabase services
import { 
  uploadProductImage,
  // deleteProductImage,
} from '../../../services/uploadImage';


const initialProductState = {
  name: '',
  sku: '',
  category: '',
  description: '',
  price: '',
  comparePrice: '',
  stockQuantity: 0,
  lowStockThreshold: 10,
  weight: '',
  length: '',
  width: '',
  height: '',
  publish: true,
  trackInventory: true,
  featured: false,
};

const ProductFormModal = ({
  open,
  onClose,
  mode = "add",
  productData = null,
  onSubmit,
}) => {

  useEffect(() => {
    const fetchCategories =
      async () => {
        const data =
          await getCategories();
        setCategories(data);
      };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && productData) {
      setProduct({
        ...productData,

        category: productData.category
          ? JSON.stringify(productData.category)
          : "",

        weight:
          productData.shipping?.weight || "",

        length:
          productData.shipping?.dimensions?.length || "",

        width:
          productData.shipping?.dimensions?.width || "",

        height:
          productData.shipping?.dimensions?.height || "",
      });

      setTags(productData.tags || []);
      // setImagePreview(productData.image || "");
      setExistingImages(productData.images || []);
      setImagePreviews(productData.images || []);
      setImageFiles([]);
    } else {
      resetForm();
    }
  }, [mode, productData]);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [categories, setCategories] =
    useState([]);

  // Product form state
  const [product, setProduct] =
    useState(initialProductState);

  // Image preview state
  const [imagePreviews, setImagePreviews] = useState([]);
  // Actual image file
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Product tags
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  // Loading state during Firebase operations
  const [loading, setLoading] =
    useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                INPUT CHANGE                                */
  /* -------------------------------------------------------------------------- */

  /* --------- Toast Helper Function ---------- */
  const showToast = (
    message,
    severity = 'success'
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const handleChange =
    (field) => (e) => {

      const value =
        e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.value;

      setProduct((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  /* -------------------------------------------------------------------------- */
  /*                              IMAGE UPLOAD                                  */
  /* -------------------------------------------------------------------------- */

  const handleImageUpload = (e) => {

    const files = Array.from(e.target.files);

    if (!files.length) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    const validFiles = [];

    const previews = [];

    for (const file of files) {

      if (!allowedTypes.includes(file.type)) {
        showToast(
          `${file.name} is not a supported image`,
          "error"
        );
        continue;
      }

      /* --------------------------- FILE SIZE VALIDATION --------------------------- */

      if (file.size > 5 * 1024 * 1024) {
        showToast(
          `${file.name} exceeds 5MB`,
          "error"
        );
        continue;
      }

      validFiles.push(file);

      previews.push(URL.createObjectURL(file));
    }

    setImageFiles(prev => [...prev, ...validFiles]);

    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (index) => {

    if (index < existingImages.length) {

      setExistingImages(prev =>
        prev.filter((_, i) => i !== index)
      );

      setImagePreviews(prev =>
        prev.filter((_, i) => i !== index)
      );

      return;
    }

    const newIndex = index - existingImages.length;

    setImageFiles(prev =>
      prev.filter((_, i) => i !== newIndex)
    );

    setImagePreviews(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                  TAGS                                      */
  /* -------------------------------------------------------------------------- */

  const handleAddTag = () => {
    const trimmedTag = tag.trim();

    if (
      trimmedTag &&
      !tags.includes(trimmedTag)
    ) {
      setTags((prev) => [
        ...prev,
        trimmedTag,
      ]);

      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) =>
      prev.filter(
        (item) => item !== tagToRemove
      )
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                               RESET FORM                                   */
  /* -------------------------------------------------------------------------- */

  const resetForm = () => {

    setProduct(initialProductState);

    setTags([]);

    setTag('');

    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
  };

  /* -------------------------------------------------------------------------- */
  /*                               SUBMIT PRODUCT                               */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      /* ----------------------------- VALIDATIONS ----------------------------- */

      if (!product.name.trim()) {
        setLoading(false);
        showToast('Product name is required', 'warning');
        return;
      }

      if (!product.sku.trim()) {
        setLoading(false);
        showToast('SKU is required', 'warning');
        return;
      }

      if (!product.price) {
        setLoading(false);
        showToast('Price is required', 'warning');
        return;
      }

      const selectedCategory =
        product.category
          ? JSON.parse(product.category)
          : null;

      /* ----------------------------- IMAGE UPLOAD ---------------------------- */
      
      const uploadedImages = [];

      try {

        for (const file of imageFiles) {

          const url =
            await uploadProductImage(file);

          if (url) {

            uploadedImages.push(url);

          } else {

            throw new Error("Upload failed");

          }
        }

      } catch (error) {

        showToast(
          "Failed to upload one or more images",
          "error"
        );

        setLoading(false);

        return;
      }

      /* ----------------------------- PRODUCT DATA ---------------------------- */

      const payload = {
        ...(mode === "edit" && {
          id: productData?.id,
        }),

        name: product.name,
        sku: product.sku,
        category: selectedCategory,
        description: product.description,
        price: Number(product.price),
        comparePrice: Number(product.comparePrice || 0),
        stockQuantity: Number(product.stockQuantity),
        lowStockThreshold: Number(product.lowStockThreshold),

        shipping: {
          weight: Number(product.weight || 0),
          dimensions: {
            length: Number(product.length || 0),
            width: Number(product.width || 0),
            height: Number(product.height || 0),
          },
        },

        tags,
        // image: imageUrl,
        images: [
          ...existingImages,
          ...uploadedImages,
        ],

        image:
          existingImages[0] ||
          uploadedImages[0] ||
          "",
        featured: product.featured,
        publish: product.publish,
        trackInventory: product.trackInventory,

        status:
          Number(product.stockQuantity) > 0
            ? "In Stock"
            : "Out of Stock",
      };

      /* ---------------------------- CALL PARENT HANDLER ---------------------------- */


      if (typeof onSubmit === "function") {
        const result = await onSubmit(payload);

        console.log("SUBMIT RESULT:", result);
      }


      /* ----------------------------- SUCCESS ----------------------------- */

      showToast(
        mode === 'edit'
          ? 'Product updated successfully'
          : 'Product added successfully',
        'success'
      );

      /* ----------------------------- RESET + CLOSE ----------------------------- */

      resetForm();
      onClose();

    } catch (error) {
      // console.log('SUBMIT ERROR:', error);

      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
          height: "95vh",
        },
      }}
    >
      {/* ================= HEADER ================= */}

      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {mode === "edit"
                ? "Edit Product"
                : "Add New Product"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {mode === "edit"
                ? "Update product information"
                : "Add a new product"}
            </Typography>
          </Box>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* ================= BODY ================= */}

      <DialogContent dividers>

        {/* ---------------- BASIC INFO ---------------- */}

        <SectionTitle title="Basic Information" />

        <Stack spacing={3}>

          <Box>
            <InputLabel
              title="Product Name"
              required
            />

            <TextField
              fullWidth
              value={product.name}
              onChange={handleChange("name")}
            />
          </Box>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <InputLabel
                title="SKU"
                required
              />

              <TextField
                fullWidth
                value={product.sku}
                onChange={handleChange("sku")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel
                title="Category"
                required
              />

              <FormControl fullWidth>
                <Select
                  value={product.category}
                  onChange={handleChange("category")}
                >
                  <MenuItem value="">
                    Select Category
                  </MenuItem>

                  {categories.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={JSON.stringify({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                      })}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          <Box>
            <InputLabel title="Description" />

            <TextField
              multiline
              rows={5}
              fullWidth
              value={product.description}
              onChange={handleChange("description")}
            />
          </Box>

        </Stack>

        <SectionDivider />

        {/* ---------------- PRICING ---------------- */}

        <SectionTitle title="Pricing" />

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <InputLabel
              title="Price"
              required
            />

            <TextField
              fullWidth
              value={product.price}
              onChange={handleChange("price")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₦
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel title="Compare Price" />

            <TextField
              fullWidth
              value={product.comparePrice}
              onChange={handleChange("comparePrice")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₦
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

        </Grid>

        <SectionDivider />

        {/* ---------------- INVENTORY ---------------- */}

        <SectionTitle title="Inventory" />

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <InputLabel
              title="Stock Quantity"
              required
            />

            <TextField
              type="number"
              fullWidth
              value={product.stockQuantity}
              onChange={handleChange(
                "stockQuantity"
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel
              title="Low Stock Threshold"
            />

            <TextField
              type="number"
              fullWidth
              value={product.lowStockThreshold}
              onChange={handleChange(
                "lowStockThreshold"
              )}
            />
          </Grid>

        </Grid>

        <SectionDivider />

        {/* =======================================================
                      PRODUCT IMAGES (NEW)
        ======================================================== */}

        <SectionTitle title="Product Images" />

        <input
          hidden
          multiple
          accept="image/*"
          type="file"
          id="product-upload"
          onChange={handleImageUpload}
        />

        <label htmlFor="product-upload">

          <Box
            sx={{
              border: "2px dashed #d5d5d5",
              borderRadius: 2,
              py: 4,
              textAlign: "center",
              cursor: "pointer",
              mb: 3,
            }}
          >
            <CloudUploadOutlined
              sx={{
                fontSize: 45,
                color: "#888",
              }}
            />

            <Typography mt={1}>
              Click to upload product images
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              JPG, PNG, WEBP (Multiple images supported)
            </Typography>

          </Box>

        </label>

        {imagePreviews.length > 0 && (

          <Grid container spacing={2}>

            {imagePreviews.map((image, index) => (

              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={index}
              >

                <Box
                  sx={{
                    position: "relative",
                  }}
                >

                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />

                  <IconButton
                    size="small"
                    onClick={() =>
                      removeImage(index)
                    }
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: "#fff",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                </Box>

              </Grid>

            ))}

          </Grid>

        )}

        <SectionDivider />

        {/* ---------- LEAVE THE REST OF YOUR JSX EXACTLY THE SAME ---------- */}

        {/* Product Tags */}
        <SectionTitle title="Product Tags" />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Add a tag..."
            value={tag}
            onChange={(e) =>
              setTag(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={handleAddTag}
            sx={{
              minWidth: 44,
              width: 44,
              height: 44,
              borderRadius: '10px',
              bgcolor: '#050816',
            }}
          >
            <Add />
          </Button>
        </Stack>

        {tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            mt={2}
          >

            {tags.map((item) => (

              <Box
                key={item}
                onClick={() =>
                  handleRemoveTag(item)
                }
                sx={{
                  px: 1.5,
                  py: 0.8,
                  bgcolor: '#F3F4F6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>
        )}

        <SectionDivider />

        {/* Shipping Information */}
        <SectionTitle title="Shipping Information" />
        <Stack spacing={3}>
          <Box>
            <InputLabel title="Weight (kg)" />

            <TextField
              fullWidth
              type="number"
              placeholder="0.00"
              value={product.weight}
              onChange={handleChange('weight')}
            />
          </Box>

          <Box>
            <InputLabel title="Dimensions (cm)" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Length"
                  value={product.length}
                  onChange={handleChange(
                    'length'
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Width"
                  value={product.width}
                  onChange={handleChange(
                    'width'
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Height"
                  value={product.height}
                  onChange={handleChange(
                    'height'
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <SectionDivider />

        {/* Product Status */}
        <SectionTitle title="Product Status" />
        <Stack spacing={2} mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={product.publish}
                onChange={handleChange(
                  'publish'
                )}
              />
            }
            label="Publish product"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={
                  product.trackInventory
                }
                onChange={handleChange(
                  'trackInventory'
                )}
              />
            }
            label="Track inventory"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={product.featured}
                onChange={handleChange(
                  'featured'
                )}
              />
            }
            label="Featured product"
          />
        </Stack>
      </DialogContent>

      {/* ================= FOOTER ================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          p: 3,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} />
          ) : mode === "edit" ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>

    </Dialog>
  );  
};

export default ProductFormModal;


/* -------------------------------- Components -------------------------------- */

/* -------------------------------- Components -------------------------------- */

const SectionTitle = ({ title }) => (
  <Typography
    sx={{
      fontSize: "18px",
      fontWeight: 700,
      color: "#111827",
      mb: 2,
      mt: 1,
    }}
  >
    {title}
  </Typography>
);

const InputLabel = ({
  title,
  required = false,
}) => (
  <Typography
    sx={{
      fontSize: "14px",
      fontWeight: 600,
      color: "#111827",
      mb: 1,
    }}
  >
    {title}

    {required && (
      <Box
        component="span"
        sx={{
          color: "#EF4444",
          ml: 0.5,
        }}
      >
        *
      </Box>
    )}
  </Typography>
);

const SectionDivider = () => (
  <Divider
    sx={{
      my: 4,
      borderColor: "#E5E7EB",
    }}
  />
);
