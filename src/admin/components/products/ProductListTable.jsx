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
  IconButton
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function ProductListTable({ products }) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb"
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#f8fafc"
            }}
          >
            <TableCell>PRODUCT</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>STOCK</TableCell>
            <TableCell>SALES</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              {/* PRODUCT */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      objectFit: "cover",
                      bgcolor: "#f3f4f6"
                    }}
                  />

                  <Typography fontWeight={500}>
                    {product.name}
                  </Typography>
                </Box>
              </TableCell>

              {/* SKU */}
              <TableCell>{product.sku}</TableCell>

              {/* CATEGORY */}
              <TableCell>{product.category}</TableCell>

              {/* PRICE */}
              <TableCell>${product.price}</TableCell>

              {/* STOCK */}
              <TableCell>{product.stock} units</TableCell>

              {/* SALES */}
              <TableCell>{product.sales}</TableCell>

              {/* STATUS */}
              <TableCell>
                <Chip
                  label={product.status}
                  size="small"
                  sx={{
                    bgcolor:
                      product.status === "In Stock"
                        ? "#dcfce7"
                        : product.status === "Low Stock"
                        ? "#ffedd5"
                        : "#fee2e2",

                    color:
                      product.status === "In Stock"
                        ? "#16a34a"
                        : product.status === "Low Stock"
                        ? "#ea580c"
                        : "#dc2626"
                  }}
                />
              </TableCell>

              {/* ACTIONS */}
              <TableCell>
                <Box display="flex" gap={1}>
                  <IconButton size="small">
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton size="small" color="error">
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}