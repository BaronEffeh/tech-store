import { useState } from "react";
import { Box, Grid } from "@mui/material";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsStatCard from "../components/analytics/AnalyticsStatCard";
import RevenueTrendChart from "../components/analytics/RevenueTrendChart";
import OrdersCustomersChart from "../components/analytics/OrdersCustomersChart";
import RevenueCategoryChart from "../components/analytics/RevenueCategoryChart";
import CustomerSegmentsChart from "../components/analytics/CustomerSegmentsChart";
import TopProductsRevenueChart from "../components/analytics/TopProductsRevenueChart";
import OrdersTimeChart from "../components/analytics/OrdersTimeChart";
import PerformanceRadarChart from "../components/analytics/PerformanceRadarChart";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export default function Analytics() {
  const [period, setPeriod] = useState("12M");

  return (
    <Box>
      {/* HEADER */}
      <AnalyticsHeader
        period={period}
        setPeriod={setPeriod}
      />

      {/* STATS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <AnalyticsStatCard
            title="Total Revenue"
            value="$892,450"
            change="12.5%"
            subtitle="+$98,520 from last period"
            icon={<AttachMoneyIcon />}
            color="#22c55e"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <AnalyticsStatCard
            title="Total Orders"
            value="6,840"
            change="8.2%"
            subtitle="+518 from last period"
            icon={<ShoppingCartIcon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <AnalyticsStatCard
            title="New Customers"
            value="1,892"
            change="5.7%"
            subtitle="+102 from last period"
            icon={<GroupOutlinedIcon />}
            color="#a855f7"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <AnalyticsStatCard
            title="Avg Order Value"
            value="$130.42"
            change="2.1%"
            subtitle="-$2.80 from last period"
            icon={<Inventory2OutlinedIcon />}
            color="#f97316"
            negative
          />
        </Grid>
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6}>
          <RevenueTrendChart />
        </Grid>

        <Grid item xs={12} lg={6}>
          <OrdersCustomersChart />
        </Grid>

        <Grid item xs={12} lg={6}>
          <RevenueCategoryChart />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomerSegmentsChart />
        </Grid>
      </Grid>

      {/* EXTRA ANALYTICS */}
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <TopProductsRevenueChart />
        </Grid>

        <Grid item xs={12} md={6}>
          <OrdersTimeChart />
        </Grid>

        <Grid item xs={12}>
          <PerformanceRadarChart />
        </Grid>
      </Grid>
    </Box>
  );
}