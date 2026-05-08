import { Grid, Box, Divider } from "@mui/material";
import StatCard from "../components/dashboard/StatCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RevenueChart from "../components/dashboard/RevenueChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import QuickActions from "../components/dashboard/QuickActions";
import TopProducts from "../components/dashboard/TopProducts";

import {
  AttachMoney,
  ShoppingCart,
  Inventory,
  People
} from "@mui/icons-material";

export default function Dashboard() {
  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ px: 1, pt: 1 }}>
        <DashboardHeader />
      </Box>

      {/* FULL WIDTH DIVIDER */}
      <Divider />

      {/* CONTENT */}
      <Box sx={{ p: 1, pt: 3 }}>
        {/* STAT CARDS */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Total Revenue"
              value="$892,450"
              change="12.5%"
              icon={<AttachMoney />}
              color="#22c55e"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              title="Total Orders"
              value="6,840"
              change="8.2%"
              icon={<ShoppingCart />}
              color="#3b82f6"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              title="Products"
              value="1,245"
              change="3.1%"
              icon={<Inventory />}
              color="#a855f7"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              title="Customers"
              value="4,892"
              change="5.7%"
              icon={<People />}
              color="#f97316"
            />
          </Grid>
        </Grid>

        {/* CHARTS */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RevenueChart />
          </Grid>

          <Grid item xs={12} md={6}>
            <CategoryChart />
          </Grid>
        </Grid>

        {/* RECENT ORDERS + QUICK ACTIONS */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={8}>
              <RecentOrders />
          </Grid>

          <Grid item xs={12} md={4}>
              <QuickActions />
          </Grid>
        </Grid>

        {/* TOP PRODUCTS */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12}>
            <TopProducts />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}






// import { Grid, Box, Divider } from "@mui/material";
// import StatCard from "../components/dashboard/StatCard";
// import DashboardHeader from "../components/dashboard/DashboardHeader";
// import RevenueChart from "../components/dashboard/RevenueChart";
// import CategoryChart from "../components/dashboard/CategoryChart";

// import {
//   AttachMoney,
//   ShoppingCart,
//   Inventory,
//   People
// } from "@mui/icons-material";

// export default function Dashboard() {
//   return (
//     <Box sx={{ p: 1 }}>
//       {/* HEADER */}
//       <DashboardHeader />

//       <Divider sx={{ mb: 3 }} />

//       {/* STAT CARDS */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} md={3}>
//           <StatCard
//             title="Total Revenue"
//             value="$892,450"
//             change="12.5%"
//             icon={<AttachMoney />}
//             color="#22c55e"
//           />
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <StatCard
//             title="Total Orders"
//             value="6,840"
//             change="8.2%"
//             icon={<ShoppingCart />}
//             color="#3b82f6"
//           />
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <StatCard
//             title="Products"
//             value="1,245"
//             change="3.1%"
//             icon={<Inventory />}
//             color="#a855f7"
//           />
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <StatCard
//             title="Customers"
//             value="4,892"
//             change="5.7%"
//             icon={<People />}
//             color="#f97316"
//           />
//         </Grid>
//       </Grid>

//       {/* CHARTS */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={7}>
//           <RevenueChart />
//         </Grid>

//         <Grid item xs={12} md={5}>
//           <CategoryChart />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }