import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Divider,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, addToCart, decreaseQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + tax + shipping;

  return (
    <Container sx={{ p: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Shopping Cart ({cart.length})
        </Typography>

        {cart.length > 0 && (
          <Button color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </Box>

      {/* Empty State */}
      {cart.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Typography variant="h6">Your cart is empty</Typography>
          <Button href="/" variant="contained" sx={{ mt: 2 }}>
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* LEFT: ITEMS */}
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center"
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  sx={{ width: 100, height: 100, borderRadius: 2 }}
                />

                {/* Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight="bold">
                    {item.name}
                  </Typography>

                  <Typography color="primary" fontWeight="bold">
                    ₦{item.price}
                  </Typography>

                  {/* Quantity Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1
                    }}
                  >
                    <Button
                      onClick={() => decreaseQty(item.id)}
                      variant="outlined"
                    >
                      −
                    </Button>

                    <Typography>{item.quantity}</Typography>

                    <Button
                      onClick={() => addToCart(item)}
                      variant="outlined"
                    >
                      +
                    </Button>
                  </Box>
                </Box>

                {/* Subtotal */}
                <Box textAlign="right">
                  <Typography fontWeight="bold">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Grid>

          {/* RIGHT: SUMMARY */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 100
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal</Typography>
                <Typography>₦{subtotal.toFixed(2)}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Shipping</Typography>
                <Typography>
                  {shipping === 0 ? "Free" : `₦${shipping}`}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Tax</Typography>
                <Typography>₦{tax.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold" color="primary">
                  ₦{total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={cart.length === 0}
                onClick={() => {
                  if (!user) {
                    navigate("/auth");
                  } else {
                    navigate("/checkout");
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              {/* <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={cart.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button> */}

              {/* <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </Button> */}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}






// import React from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   IconButton
// } from "@mui/material";
// import { useCart } from "../context/CartContext";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function CartPage() {
//   const { cart, addToCart, removeFromCart, decreaseQty } = useCart();

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Shopping Cart
//       </Typography>

//       {cart.length === 0 ? (
//         <Typography>Your cart is empty.</Typography>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <Grid
//               container
//               spacing={2}
//               key={item.id}
//               sx={{
//                 mb: 2,
//                 p: 2,
//                 border: "1px solid #eee",
//                 borderRadius: 2
//               }}
//             >
//               {/* Image */}
//               <Grid item xs={3}>
//                 <Box
//                   component="img"
//                   src={item.image}
//                   sx={{ width: "100%", borderRadius: 2 }}
//                 />
//               </Grid>

//               {/* Info */}
//               <Grid item xs={6}>
//                 <Typography fontWeight="bold">{item.name}</Typography>
//                 <Typography color="text.secondary">
//                   ₦{item.price}
//                 </Typography>

//                 {/* Quantity */}
//                 <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                   <Button onClick={() => decreaseQty(item.id)}>-</Button>
//                   <Typography>{item.quantity}</Typography>
//                   <Button onClick={() => addToCart(item)}>+</Button>
//                 </Box>
//               </Grid>

//               {/* Actions */}
//               <Grid item xs={3}>
//                 <IconButton onClick={() => removeFromCart(item.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           ))}

//           {/* Total */}
//           <Box sx={{ mt: 3, textAlign: "right" }}>
//             <Typography variant="h6">
//               Total: ₦{totalPrice.toFixed(2)}
//             </Typography>

//             <Button variant="contained" sx={{ mt: 2 }}>
//               Checkout
//             </Button>
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// }
