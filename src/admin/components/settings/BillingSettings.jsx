import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const BILLING_HISTORY = [
  {
    date: "May 6, 2026",
    description: "Professional Plan",
    amount: "$99.00",
    status: "Paid",
  },
  {
    date: "Apr 6, 2026",
    description: "Professional Plan",
    amount: "$99.00",
    status: "Paid",
  },
];

export default function BillingSettings() {
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
          Billing & Subscription
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
          }}
        >
          Manage your payment methods and
          plan
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          borderRadius: 2,
          borderColor: "#e5e7eb",
          bgcolor: "#f3f4f6",
          mb: 3,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Professional Plan
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                mb: 1.5,
              }}
            >
              $99/month
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                display: "block",
                mb: 1.5,
              }}
            >
              Next billing date: June 6,
              2026
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                color: "#111827",
                borderColor: "#e5e7eb",
                bgcolor: "#fff",
              }}
            >
              Change Plan
            </Button>
          </Box>

          <Chip
            label="Active"
            sx={{
              bgcolor: "#111827",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 1.5,
            }}
          />
        </Stack>
      </Paper>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 1.5,
        }}
      >
        Payment Methods
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          borderColor: "#e5e7eb",
          mb: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CreditCardOutlinedIcon
          sx={{ color: "#6b7280" }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Visa ending in 4242
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
            }}
          >
            Expires 12/2026
          </Typography>
        </Box>

        <Chip
          label="Default"
          size="small"
          sx={{
            bgcolor: "#d1fae5",
            color: "#065f46",
            fontWeight: 600,
            borderRadius: 1.5,
          }}
        />

        <Button
          sx={{
            textTransform: "none",
            color: "#ef4444",
          }}
        >
          Remove
        </Button>
      </Paper>

      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          color: "#111827",
          borderColor: "#e5e7eb",
          mb: 3,
        }}
      >
        Add Payment Method
      </Button>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 1.5,
        }}
      >
        Billing History
      </Typography>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderColor: "#e5e7eb",
          borderRadius: 2,
        }}
      >
        <Table size="small">
          <TableHead
            sx={{ bgcolor: "#f3f4f6" }}
          >
            <TableRow>
              {[
                "DATE",
                "DESCRIPTION",
                "AMOUNT",
                "STATUS",
                "INVOICE",
              ].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    fontWeight: 700,
                    color: "#6b7280",
                    fontSize: 12,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {BILLING_HISTORY.map(
              (row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {row.date}
                  </TableCell>

                  <TableCell>
                    {row.description}
                  </TableCell>

                  <TableCell>
                    {row.amount}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: "#d1fae5",
                        color: "#065f46",
                        fontWeight: 600,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      sx={{
                        textTransform:
                          "none",
                        color: "#111827",
                        p: 0,
                        minWidth: 0,
                      }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}