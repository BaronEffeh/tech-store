// ProductListTable.jsx

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";



/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

// Format currency
const formatPrice = (price) => {

  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
    }
  ).format(price || 0);
};



// Status colors
const getStatusStyles = (status) => {

  switch (status) {

    case "In Stock":
      return {
        bgcolor: "#DCFCE7",
        color: "#16A34A",
      };

    case "Low Stock":
      return {
        bgcolor: "#FEF3C7",
        color: "#D97706",
      };

    default:
      return {
        bgcolor: "#FEE2E2",
        color: "#DC2626",
      };
  }
};



export default function ProductListTable({
  products,
  onView,
  onEdit,
  onDelete,
}) {

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >

      <Table>

        {/* -------------------------------------------------------------------------- */}
        {/*                                   HEADER                                   */}
        {/* -------------------------------------------------------------------------- */}

        <TableHead>

          <TableRow
            sx={{
              bgcolor: "#F8FAFC",
            }}
          >

            <TableCell>
              PRODUCT
            </TableCell>

            <TableCell>
              SKU
            </TableCell>

            <TableCell>
              CATEGORY
            </TableCell>

            <TableCell>
              PRICE
            </TableCell>

            <TableCell>
              STOCK
            </TableCell>

            <TableCell>
              STATUS
            </TableCell>

            <TableCell align="right">
              ACTIONS
            </TableCell>

          </TableRow>

        </TableHead>



        {/* -------------------------------------------------------------------------- */}
        {/*                                    BODY                                    */}
        {/* -------------------------------------------------------------------------- */}

        <TableBody>

          {products?.map((product) => (

            <TableRow
              key={product.id}
              hover
            >

              {/* -------------------------------------------------------------------------- */}
              {/*                                   PRODUCT                                  */}
              {/* -------------------------------------------------------------------------- */}

              <TableCell>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >

                  {/* Product Image */}
                  <Box
                    component="img"
                    src={
                      product.image ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    sx={{
                      width: 52,
                      height: 52,

                      borderRadius: 2,

                      objectFit: "cover",

                      bgcolor: "#F3F4F6",

                      border:
                        "1px solid #E5E7EB",
                    }}
                  />



                  {/* Product Details */}
                  <Box>

                    <Typography
                      fontWeight={600}
                    >
                      {product.name}
                    </Typography>



                    {/* Optional Description */}
                    {product.description && (

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                          maxWidth: 220,
                        }}
                      >
                        {
                          product.description
                        }
                      </Typography>

                    )}

                  </Box>

                </Box>

              </TableCell>



              {/* SKU */}
              <TableCell>
                {product.sku || "N/A"}
              </TableCell>



              {/* CATEGORY */}
              <TableCell>
                {product.category?.name}
              </TableCell>



              {/* PRICE */}
              <TableCell>

                <Box>

                  <Typography
                    fontWeight={700}
                  >
                    {formatPrice(
                      product.price
                    )}
                  </Typography>



                  {/* Compare Price */}
                  {product.comparePrice >
                    0 && (

                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration:
                          "line-through",

                        color: "#9CA3AF",
                      }}
                    >
                      {formatPrice(
                        product.comparePrice
                      )}
                    </Typography>

                  )}

                </Box>

              </TableCell>



              {/* STOCK */}
              <TableCell>

                <Typography
                  fontWeight={600}
                >
                  {
                    product.stockQuantity
                  }{" "}
                  units
                </Typography>

              </TableCell>



              {/* STATUS */}
              <TableCell>

                <Chip
                  label={product.status}
                  size="small"
                  sx={{
                    fontWeight: 600,

                    ...getStatusStyles(
                      product.status
                    ),
                  }}
                />

              </TableCell>



              {/* ACTIONS */}
              <TableCell align="right">

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  gap={1}
                >

                  {/* View */}
                  <Tooltip title="View Product">

                    <IconButton
                      size="small"
                      onClick={() =>
                        onView?.(product)
                      }
                    >
                      <VisibilityOutlinedIcon
                        fontSize="small"
                      />
                    </IconButton>

                  </Tooltip>



                  {/* Edit */}
                  <Tooltip title="Edit Product">

                    <IconButton
                      size="small"
                      onClick={() =>
                        onEdit?.(product)
                      }
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                      />
                    </IconButton>

                  </Tooltip>



                  {/* Delete */}
                  <Tooltip title="Delete Product">

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        onDelete?.(
                          product.id
                        )
                      }
                    >
                      <DeleteOutlineOutlinedIcon
                        fontSize="small"
                      />
                    </IconButton>

                  </Tooltip>

                </Box>

              </TableCell>

            </TableRow>

          ))}



          {/* Empty State */}
          {products?.length === 0 && (

            <TableRow>

              <TableCell
                colSpan={7}
                align="center"
                sx={{
                  py: 8,
                }}
              >

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    color: "#111827",
                  }}
                >
                  No Products Found
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                  }}
                >
                  Products added from Firebase
                  will appear here.
                </Typography>

              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

    </TableContainer>
  );
}






// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Box,
//   Chip,
//   IconButton
// } from "@mui/material";

// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// export default function ProductListTable({ products }) {
//   return (
//     <TableContainer
//       component={Paper}
//       elevation={0}
//       sx={{
//         borderRadius: 3,
//         border: "1px solid #e5e7eb"
//       }}
//     >
//       <Table>
//         <TableHead>
//           <TableRow
//             sx={{
//               bgcolor: "#f8fafc"
//             }}
//           >
//             <TableCell>PRODUCT</TableCell>
//             <TableCell>SKU</TableCell>
//             <TableCell>CATEGORY</TableCell>
//             <TableCell>PRICE</TableCell>
//             <TableCell>STOCK</TableCell>
//             <TableCell>SALES</TableCell>
//             <TableCell>STATUS</TableCell>
//             <TableCell>ACTIONS</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {products.map((product) => (
//             <TableRow key={product.id} hover>
//               {/* PRODUCT */}
//               <TableCell>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Box
//                     component="img"
//                     src={product.image}
//                     alt={product.name}
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 2,
//                       objectFit: "cover",
//                       bgcolor: "#f3f4f6"
//                     }}
//                   />

//                   <Typography fontWeight={500}>
//                     {product.name}
//                   </Typography>
//                 </Box>
//               </TableCell>

//               {/* SKU */}
//               <TableCell>{product.sku}</TableCell>

//               {/* CATEGORY */}
//               <TableCell>{product.category}</TableCell>

//               {/* PRICE */}
//               <TableCell>${product.price}</TableCell>

//               {/* STOCK */}
//               <TableCell>{product.stock} units</TableCell>

//               {/* SALES */}
//               <TableCell>{product.sales}</TableCell>

//               {/* STATUS */}
//               <TableCell>
//                 <Chip
//                   label={product.status}
//                   size="small"
//                   sx={{
//                     bgcolor:
//                       product.status === "In Stock"
//                         ? "#dcfce7"
//                         : product.status === "Low Stock"
//                         ? "#ffedd5"
//                         : "#fee2e2",

//                     color:
//                       product.status === "In Stock"
//                         ? "#16a34a"
//                         : product.status === "Low Stock"
//                         ? "#ea580c"
//                         : "#dc2626"
//                   }}
//                 />
//               </TableCell>

//               {/* ACTIONS */}
//               <TableCell>
//                 <Box display="flex" gap={1}>
//                   <IconButton size="small">
//                     <VisibilityOutlinedIcon fontSize="small" />
//                   </IconButton>

//                   <IconButton size="small">
//                     <EditOutlinedIcon fontSize="small" />
//                   </IconButton>

//                   <IconButton size="small" color="error">
//                     <DeleteOutlineOutlinedIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }