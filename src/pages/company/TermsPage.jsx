import { Container, Typography } from "@mui/material";

export default function TermsPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Terms of Service
      </Typography>

      <Typography>
        By using our platform, you agree to our terms and conditions.
      </Typography>
    </Container>
  );
}