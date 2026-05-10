import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { mockOrders } from "../../data/mockOrders";

export default function OrderStats({ orders = mockOrders }) {
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "#111827",
    },
    {
      label: "Pending",
      value: orders.filter((order) => order.status === "Pending").length,
      color: "#d97706",
    },
    {
      label: "Processing",
      value: orders.filter((order) => order.status === "Processing").length,
      color: "#2563eb",
    },
    {
      label: "Shipped",
      value: orders.filter((order) => order.status === "Shipped").length,
      color: "#7c3aed",
    },
    {
      label: "Delivered",
      value: orders.filter((order) => order.status === "Delivered").length,
      color: "#16a34a",
    },
    {
      label: "Cancelled",
      value: orders.filter((order) => order.status === "Cancelled").length,
      color: "#dc2626",
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ width: "100%", flexWrap: "wrap" }}
    >
      {stats.map((stat) => (
        <Card
          key={stat.label}
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: 160,
            borderRadius: 2,
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <CardContent
            sx={{
              p: 2,
              "&:last-child": {
                pb: 2,
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontWeight: 500,
                mb: 1,
              }}
            >
              {stat.label}
            </Typography>

            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
                color: stat.color || "#111827",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}






// import React from "react";
// import { Card, CardContent, Stack, Typography } from "@mui/material";

// const DEFAULT_STATS = [
//   { label: "Total Orders", value: 8, color: "#111827" },
//   { label: "Pending", value: 1, color: "#d97706" },
//   { label: "Processing", value: 2, color: "#2563eb" },
//   { label: "Shipped", value: 2, color: "#7c3aed" },
//   { label: "Delivered", value: 2, color: "#16a34a" },
// ];

// export default function OrderStats({ stats = DEFAULT_STATS }) {
//   return (
//     <Stack
//       direction={{ xs: "column", sm: "row" }}
//       spacing={2}
//       sx={{ width: "100%" }}
//     >
//       {stats.map((s) => (
//         <Card
//           key={s.label}
//           variant="outlined"
//           sx={{
//             flex: 1,
//             borderRadius: 2,
//             borderColor: "#e5e7eb",
//             boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
//           }}
//         >
//           <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: "#6b7280",
//                 fontWeight: 500,
//                 mb: 1,
//               }}
//             >
//               {s.label}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 28,
//                 fontWeight: 700,
//                 color: s.color || "#111827",
//                 lineHeight: 1,
//               }}
//             >
//               {s.value}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </Stack>
//   );
// }
