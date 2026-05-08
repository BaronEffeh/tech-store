import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductCard from "../components/products/ProductCard";
import ProductListTable from "../components/products/ProductListTable";
import ProductsHeader from "../components/products/ProductsHeader";

import products from "../data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [view, setView] = useState("grid");

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesStock =
      stock === "All" || product.status === stock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <Box p={1}>
        {/* HEADER */}
        <ProductsHeader />

      {/* TOOLBAR */}
      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        stock={stock}
        setStock={setStock}
        view={view}
        setView={setView}
      />

      {/* COUNT */}
      <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
        Showing {filteredProducts.length} of {products.length} products
      </Typography>

      {/* GRID VIEW */}
      {view === "grid" && (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <ProductListTable products={filteredProducts} />
      )}
    </Box>
  );
}





// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid
// } from "@mui/material";

// import ProductToolbar from "../components/products/ProductToolbar";
// import ProductCard from "../components/products/ProductCard";

// const productsData = [
//   {
//     id: 1,
//     name: 'MacBook Pro M3 16"',
//     category: 'Laptops',
//     price: '$2,499',
//     stock: '45 units',
//     sales: '145 sold',
//     status: 'In Stock'
//   },
//   {
//     id: 2,
//     name: 'iPhone 15 Pro Max',
//     category: 'Phones',
//     price: '$1,199',
//     stock: '12 units',
//     sales: '220 sold',
//     status: 'Low Stock'
//   },
//   {
//     id: 3,
//     name: 'Dell XPS 15',
//     category: 'Laptops',
//     price: '$1,899',
//     stock: '32 units',
//     sales: '98 sold',
//     status: 'In Stock'
//   },
//   {
//     id: 4,
//     name: 'iPad Pro 12.9"',
//     category: 'Tablets',
//     price: '$999',
//     stock: '56 units',
//     sales: '156 sold',
//     status: 'In Stock'
//   }
// ];

// export default function ProductsPage() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [stock, setStock] = useState("All");
//   const [view, setView] = useState("grid");

//   const filteredProducts = productsData.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesCategory =
//       category === "All" || product.category === category;

//     const matchesStock =
//       stock === "All" || product.status === stock;

//     return matchesSearch && matchesCategory && matchesStock;
//   });

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* HEADER */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight="bold">
//           Products
//         </Typography>

//         <Typography color="text.secondary">
//           Manage and monitor product inventory
//         </Typography>
//       </Box>

//       {/* TOOLBAR */}
//       <ProductToolbar
//         search={search}
//         setSearch={setSearch}
//         category={category}
//         setCategory={setCategory}
//         stock={stock}
//         setStock={setStock}
//         view={view}
//         setView={setView}
//       />

//       {/* COUNT */}
//       <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
//         Showing {filteredProducts.length} of {productsData.length} products
//       </Typography>

//       {/* PRODUCTS GRID */}
//       <Grid container spacing={3}>
//         {filteredProducts.map((product) => (
//           <Grid item xs={12} sm={6} md={3} key={product.id}>
//             <ProductCard product={product} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }






// import { Box, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           mb: 2
//         }}
//       >
//         <Typography variant="h5">Products</Typography>

//         <Button
//           variant="contained"
//           onClick={() => navigate("/admin/add-product")}
//         >
//           Add Product
//         </Button>
//       </Box>

//       {/* Later: Table of products */}
//     </Box>
//   );
// }