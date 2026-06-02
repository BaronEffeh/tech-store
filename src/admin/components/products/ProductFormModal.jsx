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

// Firebase services
// import {
//   createProduct,
// } from '../../../firebase/products';

import { 
  getCategories 
} from '../../../firebase/categories';

// Supabase services
import { 
  uploadProductImage,
  deleteProductImage,
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
// const ProductFormModal = ({
//   open,
//   onClose,
//   onAddProduct,
// }) => {

// console.log("PRODUCT FORM PROPS", {
//   mode,
//   onSubmit,
//   open,
// });
//   console.log("PRODUCT FORM PROPS", {
//   mode,
//   onSubmit,
// });

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
      setImagePreview(productData.image || "");
    } else {
      resetForm();
    }
  }, [mode, productData]);

  // useEffect(() => {
  //   if (mode === "edit" && productData) {
  //     setProduct({
  //       ...productData,

  //       // category: JSON.stringify(
  //       //   productData.category || ""
  //       // ),
  //       category: productData.category
  //         ? JSON.stringify(productData.category)
  //         : "",

  //       weight:
  //         productData.shipping?.weight || "",

  //       length:
  //         productData.shipping?.dimensions
  //           ?.length || "",

  //       width:
  //         productData.shipping?.dimensions
  //           ?.width || "",

  //       height:
  //         productData.shipping?.dimensions
  //           ?.height || "",
  //     });

  //     setTags(productData.tags || []);

  //     setImagePreview(
  //       productData.image || ""
  //     );
  //   }
  // }, [mode, productData]);

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
  const [imagePreview, setImagePreview] =
    useState('');

  // Actual image file
  const [imageFile, setImageFile] =
    useState(null);

  // Product tags
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  // Loading state during Firebase operations
  const [loading, setLoading] =
    useState(false);
  
  // const selectedCategory =
  //   JSON.parse(product.category);

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

    const file = e.target.files[0];

    if (!file) return;

    /* ------------------------- FILE TYPE VALIDATION ------------------------- */

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    if (!allowedTypes.includes(file.type)) {

      showToast(
        'Only JPG, PNG, WEBP or GIF images are allowed',
        'error'
      );
      // alert(
      //   'Only JPG, PNG, WEBP or GIF images are allowed'
      // );

      return;
    }

    /* --------------------------- FILE SIZE VALIDATION --------------------------- */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      showToast(
        'Image size must be less than 5MB',
        'error'
      );
      // alert(
      //   'Image size must be less than 5MB'
      // );

      return;
    }

    /* ----------------------------- SAVE IMAGE ----------------------------- */

    setImageFile(file);

    /* ----------------------------- PREVIEW ----------------------------- */

    const imageUrl =
      URL.createObjectURL(file);

    setImagePreview(imageUrl);
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

  //  let imageUrl =
  //     productData?.image || '';

  /* -------------------------------------------------------------------------- */
  /*                               RESET FORM                                   */
  /* -------------------------------------------------------------------------- */

  const resetForm = () => {

    setProduct(initialProductState);

    setTags([]);

    setTag('');

    setImagePreview('');

    setImageFile(null);
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

      let imageUrl = '';

      if (imageFile) {
        try {

          const oldImage =
            productData?.image;

          imageUrl =
            await uploadProductImage(
              imageFile
            );

          if (!imageUrl) {
            throw new Error(
              'Image upload failed'
            );
          }

          // Delete old image only after successful upload
          if (
            mode === "edit" &&
            oldImage &&
            oldImage !== imageUrl
          ) {
            await deleteProductImage(
              oldImage
            );
          }

        } catch (uploadError) {

          console.log(
            'IMAGE UPLOAD ERROR:',
            uploadError
          );

          showToast(
            'Failed to upload image',
            'error'
          );

          setLoading(false);

          return;
        }
      } else {
        imageUrl = imagePreview || '';
      }

      /* ----------------------------- PRODUCT DATA ---------------------------- */

      // const productData = {
      // const payload = {
      //   // id: productData?.id,
      //   name: product.name,
      //   sku: product.sku,
      //   category: selectedCategory,
      //   description: product.description,
      //   price: Number(product.price),
      //   comparePrice: Number(product.comparePrice || 0),
      //   stockQuantity: Number(product.stockQuantity),
      //   lowStockThreshold: Number(product.lowStockThreshold),

      //   shipping: {
      //     weight: Number(product.weight || 0),
      //     dimensions: {
      //       length: Number(product.length || 0),
      //       width: Number(product.width || 0),
      //       height: Number(product.height || 0),
      //     },
      //   },

      //   tags,
      //   image: imageUrl,
      //   featured: product.featured,
      //   publish: product.publish,
      //   trackInventory: product.trackInventory,

      //   status:
      //     Number(product.stockQuantity) > 0
      //       ? 'In Stock'
      //       : 'Out of Stock',
      // };

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
        image: imageUrl,
        featured: product.featured,
        publish: product.publish,
        trackInventory: product.trackInventory,

        status:
          Number(product.stockQuantity) > 0
            ? "In Stock"
            : "Out of Stock",
      };

      /* ---------------------------- CALL PARENT HANDLER ---------------------------- */

      // await onSubmit(productData);

      // await onSubmit({
      //   id: payload?.id,
      //   ...productData,
      // });

      // await onSubmit(payload);

      console.log("SUBMIT PAYLOAD:", payload);

      if (typeof onSubmit === "function") {
        const result = await onSubmit(payload);

        console.log("SUBMIT RESULT:", result);
      }






      console.log("ONSUBMIT:", onSubmit);
console.log("MODE:", mode);






      // if (typeof onSubmit === "function") {
      //   await onSubmit(payload);
      // }

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
      console.log('SUBMIT ERROR:', error);

      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };



  console.log(
  "PRODUCT FORM PROPS",
  {
    mode,
    onSubmit
  }
);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '10px',
          height: '95vh',
        },
      }}
    >

      {/* -------------------------------------------------------------------------- */}
      {/*                                   HEADER                                   */}
      {/* -------------------------------------------------------------------------- */}

      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: '#111827',
              }}
            >
              {/* Add New Product */}
              {
                mode === "edit"
                  ? "Edit Product"
                  : "Add New Product"
              }
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: '#6B7280',
              }}
            >
              {/* Add a new product to your inventory */}
              {
                mode === "edit"
                  ? "Update product information"
                  : "Add a new product to your inventory"
              }
            </Typography>
          </Box>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* -------------------------------------------------------------------------- */}
      {/*                                    BODY                                    */}
      {/* -------------------------------------------------------------------------- */}

      <DialogContent
        dividers
        sx={{
          px: 3,
          py: 3,
          bgcolor: '#fff',
        }}
      >

        {/* Basic Information */}
        <SectionTitle title="Basic Information" />
        <Stack spacing={3}>
          <Box>
            <InputLabel
              title="Product Name"
              required
            />

            <TextField
              fullWidth
              placeholder="e.g., MacBook Pro M3 16-inch"
              value={product.name}
              onChange={handleChange('name')}
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
                placeholder="e.g., LAP-001"
                value={product.sku}
                onChange={handleChange('sku')}
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
                  onChange={handleChange('category')}
                  displayEmpty
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
              fullWidth
              multiline
              rows={5}
              placeholder="Enter product description..."
              value={product.description}
              onChange={handleChange(
                'description'
              )}
            />
          </Box>
        </Stack>

        <SectionDivider />

        {/* Pricing */}
        <SectionTitle title="Pricing" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel
              title="Price"
              required
            />

            <TextField
              fullWidth
              placeholder="0.00"
              value={product.price}
              onChange={handleChange('price')}
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
            <InputLabel
              title="Compare at Price"
            />

            <TextField
              fullWidth
              placeholder="0.00"
              helperText="Original price for discount display"
              value={product.comparePrice}
              onChange={handleChange(
                'comparePrice'
              )}
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

        {/* Inventory */}
        <SectionTitle title="Inventory" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel
              title="Stock Quantity"
              required
            />

            <TextField
              fullWidth
              type="number"
              value={product.stockQuantity}
              onChange={handleChange(
                'stockQuantity'
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel
              title="Low Stock Threshold"
            />

            <TextField
              fullWidth
              type="number"
              helperText="Alert when stock falls below this number"
              value={
                product.lowStockThreshold
              }
              onChange={handleChange(
                'lowStockThreshold'
              )}
            />
          </Grid>
        </Grid>

        <SectionDivider />

        {/* Product Images */}
        <SectionTitle title="Product Images" />
        <Box
          sx={{
            border: '1px dashed #D1D5DB',
            borderRadius: '10px',
            py: 6,
            px: 3,
            textAlign: 'center',
            mt: 2,
          }}
        >

          <input
            type="file"
            accept="image/*"
            id="product-image-upload"
            hidden
            onChange={handleImageUpload}
          />

          <label htmlFor="product-image-upload">
            <Box sx={{ cursor: 'pointer' }}>
              {imagePreview ? (
                <Box>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      width: 180,
                      height: 180,
                      objectFit: 'cover',
                      borderRadius: '12px',
                      mx: 'auto',
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                    }}
                  >
                    Click to change image
                  </Typography>
                </Box>
              ) : (
                <>
                  <CloudUploadOutlined
                    sx={{
                      fontSize: 42,
                      color: '#6B7280',
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#111827',
                      mb: 1,
                    }}
                  >
                    Click to upload product image
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#9CA3AF',
                    }}
                  >
                    PNG, JPG or GIF (max 5MB)
                  </Typography>

                  {imageFile && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: '#059669',
                        fontWeight: 500,
                      }}
                    >
                      {imageFile.name}
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </label>
        </Box>

        <SectionDivider />

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

      {/* -------------------------------------------------------------------------- */}
      {/*                                   FOOTER                                   */}
      {/* -------------------------------------------------------------------------- */}

      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          bgcolor: '#fff',
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            borderRadius: '10px',
            bgcolor: '#050816',
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#111827',
            },
          }}
        >

          {loading ? (
            <CircularProgress
              size={22}
              sx={{ color: '#fff' }}
            />
          ) : (
            // 'Add Product'
            mode === "edit"
              ? "Update Product"
              : "Add Product"
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ProductFormModal;


/* -------------------------------- Components -------------------------------- */

const SectionTitle = ({ title }) => (
  <Typography
    sx={{
      fontSize: '18px',
      fontWeight: 700,
      color: '#111827',
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
      fontSize: '14px',
      fontWeight: 600,
      color: '#111827',
      mb: 1,
    }}
  >
    {title}

    {required && (
      <Box
        component="span"
        sx={{
          color: '#EF4444',
          ml: 0.4,
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
      borderColor: '#E5E7EB',
    }}
  />
);
