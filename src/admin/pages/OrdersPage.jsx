import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
// import { getOrders } from "../../firebase/adminOrders";

import {
    // getOrders,
    subscribeToOrders,
    updateOrderStatus,
    cancelOrder,
    markOrderAsRead,
} from "../../firebase/orders";

import OrdersHeader from "../components/orders/OrdersHeader";
import OrderStats from "../components/orders/OrderStats";
import OrderFilters from "../components/orders/OrderFilters";
import OrderList from "../components/orders/OrderList";
import InvoiceModal from "../components/orders/InvoiceModal";
import OrderManagementDialog from "../components/orders/OrderManagementDialog";

// import { getOrders } from "../../firebase/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  // const [selectedOrder, setSelectedOrder] =
  //   useState(null);

  const [openInvoice, setOpenInvoice] =
    useState(false);

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
    setOpenInvoice(true);
  };

  // const [statusDialogOpen, setStatusDialogOpen] =
  //   useState(false);

  // const [newStatus, setNewStatus] =
  //   useState("");
  const [managementDialogOpen, setManagementDialogOpen] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [contactDialogOpen, setContactDialogOpen] =
    useState(false);

  const [contactOrder, setContactOrder] =
    useState(null);

  const [filters, setFilters] = useState({
    query: "",
    status: "All",
    payment: "All",
  });

  useEffect(() => {
    const unsubscribe =
      subscribeToOrders((data) => {
        setOrders(data);
        setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = filters.query.trim().toLowerCase();

      const matchesQuery =
        search === "" ||
        [
          order.id,
          order.customer?.name,
          order.customer?.email,
          order.customer?.phone,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(search)
          );

      const matchesStatus =
        filters.status === "All" ||
        order.status === filters.status;

      const matchesPayment =
        filters.payment === "All" ||
        order.paymentStatus === filters.payment;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [orders, filters]);

  const handleUpdateStatus = async (order) => {
  // const handleUpdateStatus = (order) => {
    await markOrderAsRead(order.id);
    setSelectedOrder(order);
    setManagementDialogOpen(true);
  };

  // const handleUpdateStatus = (
  //   order
  // ) => {
  //   setSelectedOrder(order);

  //   setNewStatus(order.status);

  //   setStatusDialogOpen(true);
  // };

  const handleSaveStatus = async (data) => {
    if (!selectedOrder) return;

    try {
        setSaving(true);
        const success =
            await updateOrderStatus(
                selectedOrder.id,
                data
            );

        if (success) {
            setManagementDialogOpen(false);
            setSelectedOrder(null);
        }
    } finally {
        setSaving(false);
    }
  };

  const handleContactCustomer = (order) => {
    setContactOrder(order);
    setContactDialogOpen(true);
  };

  const contactByEmail = () => {
    if (!contactOrder?.customer?.email) return;

    window.location.href =
      `mailto:${contactOrder.customer.email}`;
    setContactDialogOpen(false);
  };

  const contactByWhatsApp = () => {
    if (!contactOrder?.customer?.phone) return;

    const phone =
      contactOrder.customer.phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/${phone}`,
      "_blank"
    );
    setContactDialogOpen(false);
  };

  // const handleContactCustomer = (order) => {
  //   if (!order.customer?.email) return;

  //   window.location.href =
  //     `mailto:${order.customer.email}`;

  //     const phone =
  //       order.customer?.phone;

  //   if(phone){

  //   window.open(
  //   `https://wa.me/${phone}`
  //   );

  //   }
  // };

  const handleCancelOrder = async (
    order
  ) => {

    await cancelOrder(order.id);

  };

  return (
    <Box>
      <OrdersHeader />

      <OrderStats orders={filteredOrders} />

      <OrderFilters
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <Box
          sx={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading orders...</Typography>
        </Box>
      ) : (
        <>
        {/* <OrderList orders={filteredOrders} /> */}

        <OrderList
          orders={filteredOrders}
          totalOrders={orders.length}
          onUpdateStatus={handleUpdateStatus}
          onCancelOrder={handleCancelOrder}
          onViewInvoice={handleViewInvoice}
          onContactCustomer={handleContactCustomer}
      />
        </>
      )}

      <OrderManagementDialog
        open={managementDialogOpen}
        order={selectedOrder}
        loading={saving}
        onClose={() => {
          setManagementDialogOpen(false);
          setSelectedOrder(null);
        }}
        onSave={handleSaveStatus}
      />

      <InvoiceModal
        open={openInvoice}
        order={selectedOrder}
        onClose={() =>
            setOpenInvoice(false)
        }
      />

      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Contact Customer
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            How would you like to contact
            <strong>
              {" "}
              {contactOrder?.customer?.name || "this customer"}
            </strong>
            ?
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={contactByEmail}
              disabled={!contactOrder?.customer?.email}
            >
              Email Customer
            </Button>

            <Button
              variant="outlined"
              onClick={contactByWhatsApp}
              disabled={!contactOrder?.customer?.phone}
            >
              WhatsApp Customer
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setContactDialogOpen(false)
            }
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
