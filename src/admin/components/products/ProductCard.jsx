// ProductCard.jsx
import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";


/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

// Fallback icon when product image doesn't exist
const getIcon = (category) => {

  switch (category) {

    case "Laptops":
      return (
        <LaptopMacIcon
          sx={{ fontSize: 50 }}
        />
      );

    case "Phones":
      return (
        <PhoneIphoneIcon
          sx={{ fontSize: 50 }}
        />
      );

    case "Tablets":
      return (
        <TabletMacIcon
          sx={{ fontSize: 50 }}
        />
      );

    default:
      return (
        <HeadphonesIcon
          sx={{ fontSize: 50 }}
        />
      );
  }
};



// Format price nicely
const formatPrice = (price) => {

  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
    }
  ).format(price || 0);
};



// Status chip colors
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



export default function ProductCard({
  product,
  onView,
  onEdit,
}) {

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        overflow: "hidden",

        transition: "0.3s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.06)",
        },
      }}
    >

      {/* -------------------------------------------------------------------------- */}
      {/*                                 IMAGE AREA                                 */}
      {/* -------------------------------------------------------------------------- */}

      <Box
        sx={{
          height: 220,
          bgcolor: "#F8FAFC",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          overflow: "hidden",
          position: "relative",
        }}
      >

        {/* Product Image */}
        {product.image ? (

          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

        ) : (

          // Fallback category icon
          <Box
            sx={{
              color: "#94A3B8",
            }}
          >
            {getIcon(product.category)}
          </Box>

        )}



        {/* Featured Badge */}
        {product.featured && (

          <Chip
            label="Featured"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,

              bgcolor: "#1a2538",
              color: "#fff",

              fontWeight: 600,
            }}
          />

        )}

      </Box>



      {/* -------------------------------------------------------------------------- */}
      {/*                                   CONTENT                                  */}
      {/* -------------------------------------------------------------------------- */}

      <Box sx={{ p: 2.5 }}>

        {/* Product Name */}
        <Typography
          fontWeight={700}
          fontSize="16px"
          mb={0.5}
          noWrap
        >
          {product.name}
        </Typography>



        {/* Category */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {product.category?.name}
          {/* {product.category} */}
        </Typography>



        {/* Pricing */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={1}
        >

          <Typography
            fontWeight={700}
            fontSize="18px"
          >
            {formatPrice(product.price)}
          </Typography>



          {product.comparePrice > 0 && (

            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "#9CA3AF",
              }}
            >
              {formatPrice(
                product.comparePrice
              )}
            </Typography>

          )}

        </Stack>



        {/* Inventory */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Stock
          </Typography>

          <Typography
            fontWeight={600}
            variant="body2"
          >
            {product.stockQuantity || 0}
          </Typography>

        </Box>



        {/* SKU */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >

          <Typography
            color="text.secondary"
            variant="body2"
          >
            SKU
          </Typography>

          <Typography
            fontWeight={600}
            variant="body2"
          >
            {product.sku || "N/A"}
          </Typography>

        </Box>



        {/* Status */}
        <Chip
          label={product.status}
          size="small"
          sx={{
            mb: 2,
            fontWeight: 600,

            ...getStatusStyles(
              product.status
            ),
          }}
        />



        <Divider sx={{ mb: 2 }} />



        {/* -------------------------------------------------------------------------- */}
        {/*                                   ACTIONS                                  */}
        {/* -------------------------------------------------------------------------- */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <VisibilityOutlinedIcon />
            }
            onClick={() =>
              onView?.(product)
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            View
          </Button>



          <Button
            fullWidth
            variant="contained"
            startIcon={
              <EditOutlinedIcon />
            }
            onClick={() =>
              onEdit?.(product)
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",

              bgcolor: "#111827",

              "&:hover": {
                bgcolor: "#1F2937",
              },
            }}
          >
            Edit
          </Button>

        </Box>

      </Box>

    </Paper>
  );
}






// import {
//   Paper,
//   Box,
//   Typography,
//   Chip,
//   Button,
//   Divider
// } from "@mui/material";

// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import LaptopMacIcon from "@mui/icons-material/LaptopMac";
// import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
// import TabletMacIcon from "@mui/icons-material/TabletMac";
// import HeadphonesIcon from "@mui/icons-material/Headphones";

// const getIcon = (category) => {
//   switch (category) {
//     case "Laptops":
//       return <LaptopMacIcon sx={{ fontSize: 50 }} />;

//     case "Phones":
//       return <PhoneIphoneIcon sx={{ fontSize: 50 }} />;

//     case "Tablets":
//       return <TabletMacIcon sx={{ fontSize: 50 }} />;

//     default:
//       return <HeadphonesIcon sx={{ fontSize: 50 }} />;
//   }
// };

// export default function ProductCard({ product }) {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: 3,
//         border: "1px solid #e5e7eb",
//         overflow: "hidden",
//         transition: "0.3s",
//         '&:hover': {
//           transform: 'translateY(-4px)',
//           boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
//         }
//       }}
//     >
//       {/* IMAGE AREA */}
//       <Box
//         sx={{
//           height: 190,
//           bgcolor: '#f1f5f9',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         {getIcon(product.category)}
//       </Box>

//       {/* CONTENT */}
//       <Box sx={{ p: 2 }}>
//         <Typography fontWeight={700} mb={0.5}>
//           {product.name}
//         </Typography>

//         <Typography variant="body2" color="text.secondary" mb={2}>
//           {product.category}
//         </Typography>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography color="text.secondary">Price:</Typography>
//           <Typography fontWeight={700}>{product.price}</Typography>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography color="text.secondary">Stock:</Typography>
//           <Typography fontWeight={600}>{product.stock}</Typography>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography color="text.secondary">Sales:</Typography>
//           <Typography fontWeight={600}>{product.sales}</Typography>
//         </Box>

//         <Chip
//           label={product.status}
//           size="small"
//           sx={{
//             mb: 2,
//             bgcolor:
//               product.status === 'In Stock'
//                 ? '#dcfce7'
//                 : '#ffedd5',
//             color:
//               product.status === 'In Stock'
//                 ? '#16a34a'
//                 : '#ea580c'
//           }}
//         />

//         <Divider sx={{ mb: 2 }} />

//         {/* ACTIONS */}
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<VisibilityOutlinedIcon />}
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none'
//             }}
//           >
//             View
//           </Button>

//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<EditOutlinedIcon />}
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none'
//             }}
//           >
//             Edit
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// }