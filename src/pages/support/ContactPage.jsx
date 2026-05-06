import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper
} from "@mui/material";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Message sent:", form);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Contact Us
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" name="name" onChange={handleChange} />
          <TextField label="Email" name="email" onChange={handleChange} />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}