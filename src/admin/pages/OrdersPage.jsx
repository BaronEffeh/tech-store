import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getOrders } from "../../firebase/adminOrders";

import OrdersHeader from "../components/orders/OrdersHeader";
import OrderStats from "../components/orders/OrderStats";
import OrderFilters from "../components/orders/OrderFilters";
import OrderList from "../components/orders/OrderList";

// import { getOrders } from "../../firebase/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    query: "",
    status: "All",
    payment: "All",
  });

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = filters.query.toLowerCase();

      // const matchesQuery =
      //   (order.id || "").toLowerCase().includes(search) ||
      //   (order.customer?.name || "").toLowerCase().includes(search) ||
      //   (order.customer?.email || "").toLowerCase().includes(search);
      const matchesQuery = [
        order.id,
        order.customer?.name,
        order.customer?.email,
        order.customer?.phone,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(search)
        );

      const matchesStatus =
        filters.status === "All" ||
        order.status === filters.status;

      const matchesPayment =
        filters.payment === "All" ||
        order.payment === filters.payment;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [orders, filters]);

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
        <OrderList orders={filteredOrders} />
        </>
      )}      
    </Box>
  );
}
