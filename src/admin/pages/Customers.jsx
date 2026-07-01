import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import CustomersHeader from "../components/customers/CustomersHeader";
import CustomerStatCard from "../components/customers/CustomerStatCard";
import CustomerFilters from "../components/customers/CustomerFilters";
import CustomersList from "../components/customers/CustomersList";

import { getCustomers } from "../../firebase/customers";

import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  // if (loading) {
  //   return <Typography>Loading customers...</Typography>;
  // }

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

  const searchTerm = search.toLowerCase();

    const filteredCustomers = customers.filter((customer) => {
      const matchesSearch = [
        customer.displayName,
        customer.email,
        customer.phone,
        customer.uid,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        );

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
      {loading ? (
        <Box
          sx={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading customers...</Typography>
        </Box>
      ) : (
        <>
      <CustomersList customers={filteredCustomers} />
        </>
      )}
    </Box>
  );
}
