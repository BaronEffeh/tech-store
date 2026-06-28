import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CircularProgress, Box } from "@mui/material";
import ProductDetails from "./ProductDetails";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const snap = await getDoc(doc(db, "products", id));

        if (snap.exists()) {
          setProduct({
            id: snap.id,
            ...snap.data(),
          });
        }
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={5}>
        Product not found.
      </Box>
    );
  }

  return (
    <ProductDetails
      product={product}
      onAdd={addToCart}
    />
  );
}