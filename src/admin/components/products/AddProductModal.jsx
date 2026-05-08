import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
} from '@mui/material';

import {
  Add,
  Close,
  CloudUploadOutlined,
} from '@mui/icons-material';

const categories = [
  'Laptops',
  'Phones',
  'Accessories',
  'Gaming',
  'Audio',
];

const AddProductModal = ({ open, onClose }) => {
  const [category, setCategory] = useState('Laptops');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
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
          borderRadius: '10px',
          height: '95vh',
        },
      }}
    >
      {/* Header */}
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
              Add New Product
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: '#6B7280',
              }}
            >
              Add a new product to your inventory
            </Typography>
          </Box>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Body */}
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
          <InputLabel title="Product Name" required />

          <TextField
            fullWidth
            placeholder="e.g., MacBook Pro M3 16-inch"
            size="medium"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputLabel title="SKU" required />

              <TextField
                fullWidth
                placeholder="e.g., LAP-001"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel title="Category" required />

              <FormControl fullWidth>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
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
            />
          </Box>
        </Stack>

        <SectionDivider />

        {/* Pricing */}
        <SectionTitle title="Pricing" />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel title="Price" required />

            <TextField
              fullWidth
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel title="Compare at Price" />

            <TextField
              fullWidth
              placeholder="0.00"
              helperText="Original price for discount display"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
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
            <InputLabel title="Stock Quantity" required />

            <TextField
              fullWidth
              type="number"
              defaultValue={0}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel title="Low Stock Threshold" />

            <TextField
              fullWidth
              type="number"
              defaultValue={10}
              helperText="Alert when stock falls below this number"
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
            Drag and drop images here, or click to browse
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#9CA3AF',
            }}
          >
            PNG, JPG or GIF (max. 5MB each)
          </Typography>
        </Box>

        <SectionDivider />

        {/* Product Tags */}
        <SectionTitle title="Product Tags" />

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            placeholder="Add a tag..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
              '&:hover': {
                bgcolor: '#111827',
              },
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
                sx={{
                  px: 1.5,
                  py: 0.8,
                  bgcolor: '#F3F4F6',
                  borderRadius: '8px',
                  fontSize: '14px',
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
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Width"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Height"
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
            control={<Checkbox defaultChecked />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  Publish product
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                  }}
                >
                  Make this product visible to customers
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  Track inventory
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                  }}
                >
                  Monitor stock levels for this product
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  Featured product
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                  }}
                >
                  Show this product in featured sections
                </Typography>
              </Box>
            }
          />
        </Stack>
      </DialogContent>

      {/* Footer */}
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
          Add Product
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddProductModal;

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

const InputLabel = ({ title, required = false }) => (
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





// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Divider,
//   Chip
// } from "@mui/material";

// export default function AddProductModal({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     sku: "",
//     category: "",
//     description: "",
//     price: "",
//     comparePrice: "",
//     stock: "",
//     lowStock: "",
//     tags: "",
//     weight: "",
//     dimensions: "",
//     publish: true,
//     trackInventory: true,
//     featured: false
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("New Product:", formData);
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//     >
//       {/* HEADER */}
//       <DialogTitle
//         sx={{
//           fontWeight: "bold",
//           fontSize: "1.4rem",
//           borderBottom: "1px solid #e5e7eb"
//         }}
//       >
//         Add New Product
//       </DialogTitle>

//       <DialogContent sx={{ py: 3 }}>
//         {/* BASIC INFORMATION */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Basic Information
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Product Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   handleChange("name", e.target.value)
//                 }
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="SKU"
//                 value={formData.sku}
//                 onChange={(e) =>
//                   handleChange("sku", e.target.value)
//                 }
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Category"
//                 value={formData.category}
//                 onChange={(e) =>
//                   handleChange("category", e.target.value)
//                 }
//               >
//                 <MenuItem value="Laptops">Laptops</MenuItem>
//                 <MenuItem value="Phones">Phones</MenuItem>
//                 <MenuItem value="Tablets">Tablets</MenuItem>
//                 <MenuItem value="Accessories">Accessories</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 minRows={4}
//                 label="Description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   handleChange("description", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* PRICING */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Pricing
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Price"
//                 value={formData.price}
//                 onChange={(e) =>
//                   handleChange("price", e.target.value)
//                 }
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Compare at Price"
//                 value={formData.comparePrice}
//                 onChange={(e) =>
//                   handleChange("comparePrice", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* INVENTORY */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Inventory
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Stock Quantity"
//                 value={formData.stock}
//                 onChange={(e) =>
//                   handleChange("stock", e.target.value)
//                 }
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Low Stock Threshold"
//                 value={formData.lowStock}
//                 onChange={(e) =>
//                   handleChange("lowStock", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* PRODUCT IMAGES */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Product Images
//           </Typography>

//           <Button
//             variant="outlined"
//             component="label"
//             sx={{ borderRadius: 2 }}
//           >
//             Upload Images
//             <input type="file" hidden multiple />
//           </Button>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* PRODUCT TAGS */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Product Tags
//           </Typography>

//           <TextField
//             fullWidth
//             label="Tags"
//             placeholder="gaming, premium, apple"
//             value={formData.tags}
//             onChange={(e) =>
//               handleChange("tags", e.target.value)
//             }
//           />

//           <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
//             {formData.tags
//               .split(",")
//               .filter((tag) => tag.trim() !== "")
//               .map((tag, index) => (
//                 <Chip
//                   key={index}
//                   label={tag.trim()}
//                 />
//               ))}
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* SHIPPING */}
//         <Box mb={4}>
//           <Typography fontWeight="bold" mb={2}>
//             Shipping Information
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Weight (kg)"
//                 value={formData.weight}
//                 onChange={(e) =>
//                   handleChange("weight", e.target.value)
//                 }
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Dimensions (cm)"
//                 placeholder="20 x 10 x 5"
//                 value={formData.dimensions}
//                 onChange={(e) =>
//                   handleChange("dimensions", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* PRODUCT STATUS */}
//         <Box>
//           <Typography fontWeight="bold" mb={2}>
//             Product Status
//           </Typography>

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.publish}
//                 onChange={(e) =>
//                   handleChange("publish", e.target.checked)
//                 }
//               />
//             }
//             label="Publish product"
//           />

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.trackInventory}
//                 onChange={(e) =>
//                   handleChange(
//                     "trackInventory",
//                     e.target.checked
//                   )
//                 }
//               />
//             }
//             label="Track inventory"
//           />

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.featured}
//                 onChange={(e) =>
//                   handleChange("featured", e.target.checked)
//                 }
//               />
//             }
//             label="Featured product"
//           />
//         </Box>
//       </DialogContent>

//       {/* ACTIONS */}
//       <DialogActions
//         sx={{
//           px: 3,
//           py: 2,
//           borderTop: "1px solid #e5e7eb"
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={onClose}
//           sx={{
//             color: "#111827",
//             textTransform: "none",
//             border: "1px solid #020617"
//           }}
//         >
//           Cancel
//         </Button>

//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           sx={{
//             bgcolor: "#020617",
//             textTransform: "none",
//             borderRadius: 2,
//             px: 3,
//             "&:hover": {
//               bgcolor: "#111827"
//             }
//           }}
//         >
//           Add Product
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }