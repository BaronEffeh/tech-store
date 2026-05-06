import { Container, Typography } from "@mui/material";

export default function WarrantyPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Warranty
      </Typography>

      <Typography>
        All products come with a 1–2 year manufacturer warranty depending on
        the brand.
      </Typography>
    </Container>
  );
}