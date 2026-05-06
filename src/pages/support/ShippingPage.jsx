import { Container, Typography } from "@mui/material";

export default function ShippingPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Shipping Information
      </Typography>

      <Typography>
        We offer standard and express delivery. Delivery time is 3–7 business
        days depending on your location.
      </Typography>
    </Container>
  );
}