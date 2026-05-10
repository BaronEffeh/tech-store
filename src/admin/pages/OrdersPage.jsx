import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";

import OrdersHeader from "../components/orders/OrdersHeader";
import OrderStats from "../components/orders/OrderStats";
import OrderFilters from "../components/orders/OrderFilters";
import OrderList from "../components/orders/OrderList";

import { mockOrders } from "../data/mockOrders";

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    query: "",
    status: "All",
    payment: "All",
  });

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const searchText = filters.query.toLowerCase();

      const matchesQuery =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.email.toLowerCase().includes(searchText);

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
  }, [filters]);

  return (
    <Box>
      <OrdersHeader />

      <OrderStats orders={filteredOrders} />

      <OrderFilters
        filters={filters}
        setFilters={setFilters}
      />

      <OrderList orders={filteredOrders} />
    </Box>
  );
}





// import React from "react";
// import { Box } from "@mui/material";
// import OrdersHeader from "../components/orders/OrdersHeader";
// import OrderStats from "../components/orders/OrderStats";
// import OrderFilters from "../components/orders/OrderFilters";
// import OrderList from "../components/orders/OrderList";

// export default function OrdersPage() {
//     return (
//         <Box>
//             <OrdersHeader />

//             <OrderStats />

//             <OrderFilters />

//             <OrderList />
//         </Box>
//     )
// }