import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/config";
import ProductCard from "../admin/components/products/ProductCard";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.brand,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [products, query]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Search Results
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        {query
          ? `Results for "${searchParams.get("q")}"`
          : "Showing all products"}
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Typography color="text.secondary">
          No products found matching your search.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}