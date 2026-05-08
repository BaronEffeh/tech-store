import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  Divider
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const getIcon = (category) => {
  switch (category) {
    case "Laptops":
      return <LaptopMacIcon sx={{ fontSize: 50 }} />;

    case "Phones":
      return <PhoneIphoneIcon sx={{ fontSize: 50 }} />;

    case "Tablets":
      return <TabletMacIcon sx={{ fontSize: 50 }} />;

    default:
      return <HeadphonesIcon sx={{ fontSize: 50 }} />;
  }
};

export default function ProductCard({ product }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        transition: "0.3s",
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }
      }}
    >
      {/* IMAGE AREA */}
      <Box
        sx={{
          height: 190,
          bgcolor: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {getIcon(product.category)}
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700} mb={0.5}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.category}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary">Price:</Typography>
          <Typography fontWeight={700}>{product.price}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary">Stock:</Typography>
          <Typography fontWeight={600}>{product.stock}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="text.secondary">Sales:</Typography>
          <Typography fontWeight={600}>{product.sales}</Typography>
        </Box>

        <Chip
          label={product.status}
          size="small"
          sx={{
            mb: 2,
            bgcolor:
              product.status === 'In Stock'
                ? '#dcfce7'
                : '#ffedd5',
            color:
              product.status === 'In Stock'
                ? '#16a34a'
                : '#ea580c'
          }}
        />

        <Divider sx={{ mb: 2 }} />

        {/* ACTIONS */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<VisibilityOutlinedIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            View
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}