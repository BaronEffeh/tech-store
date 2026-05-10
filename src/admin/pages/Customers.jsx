import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import CustomersHeader from "../components/customers/CustomersHeader";
import CustomerStatCard from "../components/customers/CustomerStatCard";
import CustomerFilters from "../components/customers/CustomerFilters";
import CustomersList from "../components/customers/CustomersList";

import customers from "../data/customers";

import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  /* =========================
     DYNAMIC STATISTICS
  ========================= */

  const totalCustomers = customers.length;

  const vipCustomers = customers.filter(
    (customer) => customer.status === "VIP"
  ).length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalRevenue = customers.reduce(
    (acc, customer) => acc + customer.totalSpent,
    0
  );

  const totalOrders = customers.reduce(
    (acc, customer) => acc + customer.orders,
    0
  );

  const avgOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  /* =========================
     SEARCH + FILTER LOGIC
  ========================= */

  const filteredCustomers = customers.filter((customer) => {
    // SEARCH
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(search.toLowerCase());

    // STATUS FILTER
    const matchesStatus =
      status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* HEADER */}
      <CustomersHeader />

      {/* STATS */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={2.4}>
          <CustomerStatCard
            title="Total Customers"
            value={totalCustomers}
            icon={<GroupsIcon fontSize="small" />}
            color="#64748b"
          />
        </Grid>

        <Grid item xs={12} md={2.4}>
          <CustomerStatCard
            title="VIP Members"
            value={vipCustomers}
            icon={<WorkspacePremiumIcon fontSize="small" />}
            color="#9333ea"
          />
        </Grid>

        <Grid item xs={12} md={2.4}>
          <CustomerStatCard
            title="Active"
            value={activeCustomers}
            icon={<TrendingUpIcon fontSize="small" />}
            color="#16a34a"
          />
        </Grid>

        <Grid item xs={12} md={2.4}>
          <CustomerStatCard
            title="Total Revenue"
            value={`$${(totalRevenue / 1000).toFixed(1)}k`}
            icon={<AttachMoneyIcon fontSize="small" />}
            color="#64748b"
          />
        </Grid>

        <Grid item xs={12} md={2.4}>
          <CustomerStatCard
            title="Avg Order Value"
            value={`$${avgOrderValue.toFixed(0)}`}
            icon={<AttachMoneyIcon fontSize="small" />}
            color="#64748b"
          />
        </Grid>
      </Grid>

      {/* FILTERS */}
      <CustomerFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* RESULTS COUNT */}
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#64748b"
        }}
      >
        Showing {filteredCustomers.length} of {customers.length} customers
      </Typography>

      {/* LIST */}
      <CustomersList customers={filteredCustomers} />
    </Box>
  );
}






// import { useState } from "react";
// import { Box, Grid } from "@mui/material";

// import CustomersHeader from "../components/customers/CustomersHeader";
// import CustomerStatCard from "../components/customers/CustomerStatCard";
// import CustomerFilters from "../components/customers/CustomerFilters";
// import CustomersList from "../components/customers/CustomersList";

// import customers from "../data/customers";

// import GroupsIcon from "@mui/icons-material/Groups";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// export default function Customers() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   /* =========================
//      DYNAMIC STATISTICS
//   ========================= */

//   // Total customers
//   const totalCustomers = customers.length;

//   // VIP customers
//   const vipCustomers = customers.filter(
//     (customer) => customer.status === "VIP"
//   ).length;

//   // Active customers
//   const activeCustomers = customers.filter(
//     (customer) => customer.status === "Active"
//   ).length;

//   // Total revenue
//   const totalRevenue = customers.reduce(
//     (acc, customer) => acc + customer.totalSpent,
//     0
//   );

//   // Total orders
//   const totalOrders = customers.reduce(
//     (acc, customer) => acc + customer.orders,
//     0
//   );

//   // Average order value
//   const avgOrderValue =
//     totalOrders > 0 ? totalRevenue / totalOrders : 0;

//   return (
//     <Box>
//       {/* HEADER */}
//       <CustomersHeader />

//       {/* STATS */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Total Customers"
//             value={totalCustomers}
//             icon={<GroupsIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="VIP Members"
//             value={vipCustomers}
//             icon={<WorkspacePremiumIcon fontSize="small" />}
//             color="#9333ea"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Active"
//             value={activeCustomers}
//             icon={<TrendingUpIcon fontSize="small" />}
//             color="#16a34a"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Total Revenue"
//             value={`$${(totalRevenue / 1000).toFixed(1)}k`}
//             icon={<AttachMoneyIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Avg Order Value"
//             value={`$${avgOrderValue.toFixed(0)}`}
//             icon={<AttachMoneyIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>
//       </Grid>

//       {/* FILTERS */}
//       <CustomerFilters
//         search={search}
//         setSearch={setSearch}
//         status={status}
//         setStatus={setStatus}
//       />

//       {/* LIST */}
//       <CustomersList customers={customers} />
//     </Box>
//   );
// }





// import { useState } from "react";
// import { Box, Grid } from "@mui/material";

// import CustomersHeader from "../components/customers/CustomersHeader";
// import CustomerStatCard from "../components/customers/CustomerStatCard";
// import CustomerFilters from "../components/customers/CustomerFilters";
// import CustomersList from "../components/customers/CustomersList";

// import customers from "../data/customers";

// import GroupsIcon from "@mui/icons-material/Groups";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// export default function Customers() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* HEADER */}
//       <CustomersHeader />

//       {/* STATS */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Total Customers"
//             value="10"
//             icon={<GroupsIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="VIP Members"
//             value="4"
//             icon={<WorkspacePremiumIcon fontSize="small" />}
//             color="#9333ea"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Active"
//             value="5"
//             icon={<TrendingUpIcon fontSize="small" />}
//             color="#16a34a"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Total Revenue"
//             value="$97.9k"
//             icon={<AttachMoneyIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>

//         <Grid item xs={12} md={2.4}>
//           <CustomerStatCard
//             title="Avg Order Value"
//             value="$512"
//             icon={<AttachMoneyIcon fontSize="small" />}
//             color="#64748b"
//           />
//         </Grid>
//       </Grid>

//       {/* FILTERS */}
//       <CustomerFilters
//         search={search}
//         setSearch={setSearch}
//         status={status}
//         setStatus={setStatus}
//       />

//       {/* LIST */}
//       <CustomersList customers={customers} />
//     </Box>
//   );
// }