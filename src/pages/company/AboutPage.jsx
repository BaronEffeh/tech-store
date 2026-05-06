import { Container, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        About TechStore
      </Typography>

      <Typography>
        TechStore is your trusted destination for premium gadgets, electronics,
        and accessories at unbeatable prices.
      </Typography>
    </Container>
  );
}