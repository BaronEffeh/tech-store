import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

export default function ViewProductModal({
  open,
  onClose,
  product,
}) {

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Product Details
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3}>

          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          <Typography variant="h5">
            {product.name}
          </Typography>

          <Typography>
            SKU: {product.sku}
          </Typography>

          <Typography>
            Category:
            {" "}
            {product.category?.name}
          </Typography>

          <Typography>
            ₦
            {product.price?.toLocaleString()}
          </Typography>

          <Typography>
            {product.description}
          </Typography>

        </Stack>
      </DialogContent>      
    </Dialog>
  );
}