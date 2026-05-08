import {
  Paper,
  Box,
  Typography,
  Avatar
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const products = [
  {
    id: 1,
    name: 'MacBook Pro M3 16"',
    category: 'Laptops',
    revenue: '$362,355',
    units: '145 units',
    growth: '12%',
    positive: true
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    category: 'Phones',
    revenue: '$263,780',
    units: '220 units',
    growth: '8%',
    positive: true
  },
  {
    id: 3,
    name: 'Dell XPS 15',
    category: 'Laptops',
    revenue: '$186,102',
    units: '98 units',
    growth: '3%',
    positive: false
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    revenue: '$155,844',
    units: '156 units',
    growth: '15%',
    positive: true
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24',
    category: 'Phones',
    revenue: '$149,973',
    units: '187 units',
    growth: '5%',
    positive: true
  }
];

export default function TopProducts() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        p: 3
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Top Products
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Best performing items this month
        </Typography>
      </Box>

      {/* PRODUCTS */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 3,
              bgcolor: '#f8fafc',
              transition: '0.3s',
              '&:hover': {
                bgcolor: '#f1f5f9'
              }
            }}
          >
            {/* LEFT */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#020617',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
              >
                {product.id}
              </Avatar>

              <Box>
                <Typography fontWeight={600}>{product.name}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
              </Box>
            </Box>

            {/* RIGHT */}
            <Box sx={{ textAlign: 'right' }}>
              <Typography fontWeight={600}>{product.revenue}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: 'flex-end',
                  mt: 0.5
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {product.units}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: product.positive ? '#16a34a' : '#dc2626',
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  {product.positive ? (
                    <TrendingUpIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 18 }} />
                  )}

                  {product.growth}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}