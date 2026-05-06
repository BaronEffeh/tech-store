import { Container, Typography } from "@mui/material";

export default function PrivacyPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Privacy Policy
      </Typography>

      <Typography>
        We respect your privacy and protect your personal data.
      </Typography>
    </Container>
  );
}