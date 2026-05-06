import React from "react";
import { Box } from "@mui/material";
import { HeroSection } from "../components/home/HeroSection";
import { ProductSection } from "../components/home/ProductSection";
import { products } from "../components/data/products";

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <ProductSection products={products} />
    </Box>
  );
}








// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   InputBase,
//   Badge,
//   Container,
//   Grid,
//   Paper
// } from "@mui/material";
// import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";

// export default function HomePage() {
//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="sticky" color="default" elevation={1}>
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           {/* Logo */}
//           <Typography variant="h6" fontWeight="bold">
//             TechStore
//           </Typography>

//           {/* Nav Links */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
//             <Button>Laptops</Button>
//             <Button>Phones</Button>
//             <Button>Tablets</Button>
//             <Button>Accessories</Button>
//             <Button>Deals</Button>
//           </Box>

//           {/* Search + Icons */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 bgcolor: "#fffefe",
//                 px: 2,
//                 borderRadius: 2
//               }}
//             >
//               <Search color="disabled"/>
//               <InputBase placeholder="Search products..." />
//             </Box>

//             <IconButton>
//               <AccountCircle />
//             </IconButton>

//             <IconButton>
//               <Badge badgeContent={2} color="primary">
//                 <ShoppingCart />
//               </Badge>
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(to right, #3f51b5, #9c27b0)",
//           color: "white",
//           py: 8
//         }}
//       >
//         <Container>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Latest Tech at Unbeatable Prices
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3 }}>
//                 Discover the newest laptops, phones, tablets, and accessories.
//               </Typography>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Button variant="contained" color="secondary">
//                   Shop Now
//                 </Button>
//                 <Button variant="outlined" sx={{ color: "white", borderColor: "white" }}>
//                   View Deals
//                 </Button>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper sx={{ height: 250, borderRadius: 4 }} />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Categories */}
//       <Container sx={{ py: 4 }}>
//         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//           {[
//             "All Products",
//             "Laptops",
//             "Phones",
//             "Tablets",
//             "Accessories",
//             "Wearables"
//           ].map((cat) => (
//             <Button key={cat} variant="outlined">
//               {cat}
//             </Button>
//           ))}
//         </Box>
//       </Container>

//       {/* Placeholder Product Section */}
//       <Container>
//         <Grid container spacing={3}>
//           {[1, 2, 3, 4].map((item) => (
//             <Grid item xs={12} sm={6} md={3} key={item}>
//               <Paper sx={{ p: 2, height: 200 }}>
//                 <Typography>Product {item}</Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
