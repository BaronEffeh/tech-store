import { Container, Typography } from "@mui/material";

export default function CareersPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Careers
      </Typography>

      <Typography>
        Join our growing team! We’re always looking for talented individuals.
      </Typography>
    </Container>
  );
}