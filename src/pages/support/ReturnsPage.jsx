import { Container, Typography } from "@mui/material";

export default function ReturnsPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Returns Policy
      </Typography>

      <Typography>
        You can return items within 30 days of purchase. Items must be in
        original condition.
      </Typography>
    </Container>
  );
}