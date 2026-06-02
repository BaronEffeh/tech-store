import React, {
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Stack,
  TextField,
//   Typography,
  CircularProgress,
} from "@mui/material";

import { updateProduct }
  from "../../../firebase/products";

import { toast }
  from "react-toastify";

export default function EditProductModal({
  open,
  onClose,
  product,
  onUpdated,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      sku: "",
      price: "",
      description: "",
    });

useEffect(() => {
if (product) {
    setFormData({
    name:
        product.name || "",

    sku:
        product.sku || "",

    price:
        product.price || "",

    description:
        product.description || "",
    });
}
}, [product]);

const handleChange =
  (field) => (e) => {

    setFormData((prev) => ({
      ...prev,

      [field]:
        e.target.value,
    }));
};

const handleSave = async () => {
  try {

    setLoading(true);

    const success =
      await updateProduct(
        product.id,
        {
          ...product,

          ...formData,

          price:
            Number(
              formData.price
            ),
        }
      );

    if (!success) {

      toast.error(
        "Failed to update product"
      );

      return;
    }

    toast.success(
      "Product updated successfully"
    );

    onUpdated({
      ...product,
      ...formData,
      price:
        Number(formData.price),
    });

    onClose();

  } catch (error) {

    console.log(error);

    toast.error(
      "Update failed"
    );

  } finally {

    setLoading(false);
  }
};


return (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>
      Edit Product
    </DialogTitle>

    <DialogContent>

      <Stack spacing={2} mt={1}>

        <TextField
          label="Product Name"
          value={formData.name}
          onChange={handleChange(
            "name"
          )}
        />

        <TextField
          label="SKU"
          value={formData.sku}
          onChange={handleChange(
            "sku"
          )}
        />

        <TextField
          label="Price"
          value={formData.price}
          onChange={handleChange(
            "price"
          )}
        />

        <TextField
          multiline
          rows={4}
          label="Description"
          value={
            formData.description
          }
          onChange={handleChange(
            "description"
          )}
        />

        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? (
                <CircularProgress
                  size={20}
                />
              )
              : "Save Changes"}
          </Button>

        </Box>

      </Stack>

    </DialogContent>
  </Dialog>
);
};