import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

const InvoiceModal = ({
  open,
  onClose,
  order,
}) => {

  if (!order) return null;

  const formatDate = (date) => {

    if (!date) return "-";

    if (date.toDate) {
      return date.toDate().toLocaleString();
    }

    return new Date(date).toLocaleString();
  };

  const subtotal =
    order.items?.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
        Number(item.quantity || 0),
      0
    ) || 0;

  const shipping =
    Number(order.shipping || 0);

  const tax =
    Number(order.tax || 0);

  const total =
    subtotal + shipping + tax;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography variant="h6">
            Invoice
          </Typography>

          <Chip
            label={order.status}
            color="primary"
          />

        </Stack>

      </DialogTitle>

      <DialogContent>

        {/* Store */}

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Tech Store
        </Typography>

        <Typography
          color="text.secondary"
        >
          Order ID: #{order.id}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Customer */}

        <Grid
          container
          spacing={3}
        >

          <Grid item xs={12} md={6}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              Customer
            </Typography>

            <Typography>
              {order.customer?.name}
            </Typography>

            <Typography>
              {order.customer?.email}
            </Typography>

            <Typography>
              {order.customer?.phone}
            </Typography>

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography
              fontWeight={600}
              mb={1}
            >
              Shipping Address
            </Typography>

            <Typography>
              {order.customer?.address}
            </Typography>

          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Dates */}

        <Grid
          container
          spacing={3}
        >

          <Grid item xs={6}>

            <Typography
              fontWeight={600}
            >
              Order Date
            </Typography>

            <Typography>
              {formatDate(order.createdAt)}
            </Typography>

          </Grid>

          <Grid item xs={6}>

            <Typography
              fontWeight={600}
            >
              Payment Status
            </Typography>

            <Typography>
              {order.paymentStatus}
            </Typography>

          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Items */}

        <Typography
          fontWeight={600}
          mb={2}
        >
          Order Items
        </Typography>

        <Stack spacing={2}>

          {order.items?.map((item, index) => (

            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom:
                  "1px solid #eee",
                pb: 1,
              }}
            >

              <Box>

                <Typography
                  fontWeight={600}
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Qty:
                  {" "}
                  {item.quantity}
                </Typography>

              </Box>

              <Typography>
                ₦
                {(
                  Number(item.price || 0) *
                  Number(item.quantity || 0)
                ).toLocaleString()}
              </Typography>

            </Box>

          ))}

        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Totals */}

        <Box
          sx={{
            ml: "auto",
            maxWidth: 320,
          }}
        >

          <Stack spacing={1}>

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <Typography>
                Subtotal
              </Typography>

              <Typography>
                ₦
                {subtotal.toLocaleString()}
              </Typography>

            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <Typography>
                Shipping
              </Typography>

              <Typography>
                ₦
                {shipping.toLocaleString()}
              </Typography>

            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <Typography>
                Tax
              </Typography>

              <Typography>
                ₦
                {tax.toLocaleString()}
              </Typography>

            </Stack>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <Typography
                fontWeight={700}
              >
                Total
              </Typography>

              <Typography
                fontWeight={700}
              >
                ₦
                {total.toLocaleString()}
              </Typography>

            </Stack>

          </Stack>

        </Box>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={() =>
            window.print()
          }
        >
          Print
        </Button>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default InvoiceModal;