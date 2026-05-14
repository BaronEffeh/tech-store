import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const INTEGRATIONS = [
  {
    key: "email",
    name: "Email Marketing",
    description: "Mailchimp integration",
    icon: (
      <EmailOutlinedIcon
        sx={{ color: "#fff" }}
      />
    ),
    iconBg: "#3b82f6",
    connected: false,
  },
  {
    key: "payment",
    name: "Payment Gateway",
    description: "Stripe • Connected",
    icon: (
      <CreditCardOutlinedIcon
        sx={{ color: "#fff" }}
      />
    ),
    iconBg: "#10b981",
    connected: true,
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Google Analytics",
    icon: (
      <BarChartOutlinedIcon
        sx={{ color: "#fff" }}
      />
    ),
    iconBg: "#8b5cf6",
    connected: false,
  },
  {
    key: "shipping",
    name: "Shipping",
    description: "ShipStation • Connected",
    icon: (
      <LocalShippingOutlinedIcon
        sx={{ color: "#fff" }}
      />
    ),
    iconBg: "#f59e0b",
    connected: true,
  },
];

export default function IntegrationsSettings() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Integrations
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
          }}
        >
          Connect with third-party services
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {INTEGRATIONS.map((it) => (
          <Paper
            key={it.key}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              borderColor: "#e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                bgcolor: it.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {it.icon}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {it.name}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                }}
              >
                {it.description}
              </Typography>
            </Box>

            {it.connected ? (
              <Chip
                label="Connected"
                sx={{
                  bgcolor: "#d1fae5",
                  color: "#065f46",
                  fontWeight: 600,
                  borderRadius: 1.5,
                }}
              />
            ) : (
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#111827",
                  borderColor: "#e5e7eb",
                }}
              >
                Connect
              </Button>
            )}
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}