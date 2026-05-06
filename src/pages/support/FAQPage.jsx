import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQPage() {
  const faqs = [
    { q: "How long is delivery?", a: "3–7 business days." },
    { q: "Do you offer warranty?", a: "Yes, up to 2 years." },
    { q: "Can I return items?", a: "Within 30 days." }
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        FAQ
      </Typography>

      {faqs.map((faq, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}