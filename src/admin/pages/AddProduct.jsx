import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: ""
  });

  const handleSubmit = () => {
    console.log(product);
    // Later → send to backend / context
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Add Product
      </Typography>

      <TextField
        label="Product Name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
      />

      <TextField
        label="Price"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) =>
          setProduct({ ...product, price: e.target.value })
        }
      />

      <TextField
        label="Category"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) =>
          setProduct({ ...product, category: e.target.value })
        }
      />

      <Button variant="contained" onClick={handleSubmit}>
        Save Product
      </Button>
    </Box>
  );
}