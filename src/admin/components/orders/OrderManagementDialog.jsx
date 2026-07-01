import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const PAYMENT_OPTIONS = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
];

const getStatusIcon = (status) => {

  switch (status) {

      case "Pending":
          return <AccessTimeIcon />;

      case "Processing":
          return <Inventory2Icon />;

      case "Shipped":
          return <LocalShippingIcon />;

      case "Delivered":
          return <CheckCircleIcon />;

      case "Cancelled":
          return <CancelIcon />;

      default:
          return <AccessTimeIcon />;
  }

};

const getStatusColor = (status) => {

  switch (status) {

      case "Pending":
          return "warning";

      case "Processing":
          return "info";

      case "Shipped":
          return "secondary";

      case "Delivered":
          return "success";

      case "Cancelled":
          return "error";

      default:
          return "grey";

  }

};

export default function OrderManagementDialog({
  open,
  order,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState({
    status: "Pending",
    paymentStatus: "Pending",
    courier: "",
    trackingNumber: "",
    estimatedDelivery: "",
    adminNotes: "",
    notifyCustomer: true,
  });

  useEffect(() => {
    if (!order) return;

    setForm({
      status: order.status || "Pending",
      paymentStatus:
        order.paymentStatus || "Pending",

      courier:
        order.shipping?.courier || "",

      trackingNumber:
        order.shipping?.trackingNumber || "",

      estimatedDelivery:
        order.shipping?.estimatedDelivery || "",

      adminNotes:
        order.adminNotes || "",

      notifyCustomer: true,
    });
  }, [order]);

  const handleChange =
    (field) => (event) => {

      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = () => {

    onSave({
      ...form,
    });
  };

  if (!order) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        Order Management
      </DialogTitle>

      <DialogContent dividers>

        {/* CUSTOMER */}

        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Customer Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer"
              value={order.customer?.name || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={order.customer?.email || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shipping Address"
              multiline
              rows={2}
              value={order.customer?.address || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* ORDER */}

        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Order Status
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Typography
                variant="body2"
                sx={{ mb: 1 }}
              >
                Order Status
              </Typography>

              <Select
                value={form.status}
                onChange={handleChange("status")}
              >
                {STATUS_OPTIONS.map(status => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Typography
                variant="body2"
                sx={{ mb: 1 }}
              >
                Payment Status
              </Typography>

              <Select
                value={form.paymentStatus}
                onChange={handleChange("paymentStatus")}
              >
                {PAYMENT_OPTIONS.map(status => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* SHIPPING */}

        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Shipping Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Courier"
              value={form.courier}
              onChange={handleChange(
                "courier"
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tracking Number"
              value={form.trackingNumber}
              onChange={handleChange(
                "trackingNumber"
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Estimated Delivery"
              InputLabelProps={{
                shrink: true,
              }}
              value={form.estimatedDelivery}
              onChange={handleChange(
                "estimatedDelivery"
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* NOTES */}

        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Internal Notes
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Visible only to administrators"
          value={form.adminNotes}
          onChange={handleChange(
            "adminNotes"
          )}
        />

        <Stack
          sx={{
            mt: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  form.notifyCustomer
                }
                onChange={handleChange(
                  "notifyCustomer"
                )}
              />
            }
            label="Notify customer about this update"
          />
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
            }}
          >
            Order Timeline
          </Typography>

          {order?.statusHistory?.length ? (
            <Timeline
              position="right"
              sx={{
                p: 0,
                m: 0,
              }}
            >
              {order.statusHistory.map(
                (item, index) => (
                  <TimelineItem
                    key={index}
                  >
                    <TimelineOppositeContent
                      sx={{
                        flex: 0.35,
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >

                      {item.timestamp?.toDate
                        ? item.timestamp
                              .toDate()
                              .toLocaleString()
                        : "-"}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          getStatusColor(
                            item.status
                          )
                        }
                      >
                        {
                          getStatusIcon(
                              item.status
                          )
                        }
                      </TimelineDot>

                      {index <
                        order.statusHistory.length -
                            1 && (
                        <TimelineConnector />
                      )}

                    </TimelineSeparator>

                    <TimelineContent>
                      <Typography
                        sx={{
                            fontWeight: 600,
                        }}
                      >
                        {item.status}
                      </Typography>

                      {item.shipping && (
                        <Box sx={{ mt: 1, ml: 2 }}>
                          <Typography variant="body2">
                            <strong>Courier:</strong> {item.shipping.courier}
                          </Typography>

                          <Typography variant="body2">
                            <strong>Tracking No:</strong> {item.shipping.trackingNumber}
                          </Typography>

                          <Typography variant="body2">
                            <strong>Estimated Delivery:</strong>{" "}
                            {item.shipping.estimatedDelivery}
                          </Typography>
                        </Box>
                      )}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Payment:
                        {" "}
                        {
                            item.paymentStatus
                        }
                      </Typography>
                      
                      <Typography
                          variant="body2"
                          color="text.secondary"
                      >
                          By:
                          {" "}
                          {
                              item.changedBy
                          }
                      </Typography>

                      {item.notes && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            {
                                item.notes
                            }
                        </Typography>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                )
              )}
            </Timeline>
          ) : (
            <Typography
              color="text.secondary"
            >
              No status history available.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
              <CircularProgress
                size={20}
                sx={{ color: "#fff" }}
              />
          ) : (
              "Save Changes"
          )}
        </Button>

        {/* <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button> */}

      </DialogActions>
    </Dialog>
  );
}
