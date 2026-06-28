import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { name: "Products", icon: <InventoryIcon />, path: "/admin/products" },
    { name: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
    { name: "Customers", icon: <PeopleIcon />, path: "/admin/customers" },
    { name: "Analytics", icon: <BarChartIcon />, path: "/admin/analytics" },
    { name: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      {/* TOP */}
      <Box>
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            py: 4,
          }}
        >
          <Box
            sx={{
              bgcolor: "#0f172a",
              p: 1.5,
              borderRadius: 2,
              mr: 2,
            }}
          >
            <LaptopMacIcon sx={{ color: "#fff" }} />
          </Box>

          <Box>
            <Typography fontWeight="bold" fontSize={28}>
              TechHub
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Admin Panel
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* MENU */}
        <List sx={{ px: 2, py: 3 }}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.name}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  py: 1.3,
                  bgcolor: isActive ? "#e5e7eb" : "transparent",
                  "&:hover": {
                    bgcolor: "#e5e7eb",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#111827",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* BOTTOM */}
      <Box>
        <Divider />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2.5,
          }}
        >
          <Avatar
            src={user?.photoURL || ""}
            sx={{
              bgcolor: "#0f172a",
              width: 46,
              height: 46,
            }}
          >
            {!user?.photoURL && initials}
          </Avatar>

          <Box sx={{ overflow: "hidden" }}>
            <Typography
              fontWeight="bold"
              noWrap
            >
              {user?.displayName || "Guest User"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {user?.email || "Not signed in"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}






// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Divider
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import InventoryIcon from "@mui/icons-material/Inventory2";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LaptopMacIcon from "@mui/icons-material/LaptopMac";

// import { useNavigate, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menu = [
//     { name: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
//     { name: "Products", icon: <InventoryIcon />, path: "/admin/products" },
//     { name: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
//     { name: "Customers", icon: <PeopleIcon />, path: "/admin/customers" },
//     { name: "Analytics", icon: <BarChartIcon />, path: "/admin/analytics" },
//     { name: "Settings", icon: <SettingsIcon />, path: "/admin/settings" }
//   ];

//   return (
//     <Box
//       sx={{
//         width: 250,
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         bgcolor: "#f5f5f5",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         borderRight: "1px solid #e5e7eb",
//         overflow: "hidden"
//       }}
//     >
//       {/* TOP */}
//       <Box>
//         {/* LOGO */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             px: 3,
//             py: 4
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "#0f172a",
//               p: 1.5,
//               borderRadius: 2,
//               mr: 2
//             }}
//           >
//             <LaptopMacIcon sx={{ color: "#fff" }} />
//           </Box>

//           <Box>
//             <Typography fontWeight="bold" fontSize={28}>
//               TechHub
//             </Typography>

//             <Typography variant="body2" color="text.secondary">
//               Admin Panel
//             </Typography>
//           </Box>
//         </Box>

//         {/* DIVIDER */}
//         <Divider />

//         {/* MENU */}
//         <List sx={{ px: 2, py: 3 }}>
//           {menu.map((item) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <ListItemButton
//                 key={item.name}
//                 onClick={() => navigate(item.path)}
//                 sx={{
//                   borderRadius: 3,
//                   mb: 1,
//                   py: 1.3,
//                   bgcolor: isActive ? "#e5e7eb" : "transparent",
//                   "&:hover": {
//                     bgcolor: "#e5e7eb"
//                   }
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: "#111827",
//                     minWidth: 40
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>

//                 <ListItemText
//                   primary={item.name}
//                   primaryTypographyProps={{
//                     fontWeight: isActive ? "bold" : 500
//                   }}
//                 />
//               </ListItemButton>
//             );
//           })}
//         </List>
//       </Box>

//       {/* BOTTOM SECTION */}
//       <Box>
//         {/* DIVIDER */}
//         <Divider />

//         {/* USER */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             p: 2.5
//           }}
//         >
//           <Avatar
//             sx={{
//               bgcolor: "#0f172a",
//               width: 46,
//               height: 46
//             }}
//           >
//             AD
//           </Avatar>

//           <Box>
//             <Typography fontWeight="bold">
//               Admin User
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//             >
//               admin@techhub.com
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
