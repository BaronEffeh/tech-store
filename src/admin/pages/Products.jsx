import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductCard from "../components/products/ProductCard";
import ProductListTable from "../components/products/ProductListTable";
import ProductsHeader from "../components/products/ProductsHeader";
import AddProductModal from "../components/products/AddProductModal";


// Firebase product services
import {
  getProducts,
} from "../../firebase/products";



export default function ProductsPage() {

  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */

  // Products state from Firebase
  const [products, setProducts] =
    useState([]);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  // Modal state
  const [openAddModal, setOpenAddModal] =
    useState(false);

  // Filter states
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [stock, setStock] =
    useState("All");

  const [view, setView] =
    useState("grid");



  /* -------------------------------------------------------------------------- */
  /*                             FETCH PRODUCTS                                 */
  /* -------------------------------------------------------------------------- */

  const fetchProducts = async () => {

    try {

      setLoading(true);

      // Fetch products from Firestore
      const data =
        await getProducts();

      console.log(
        "FIREBASE PRODUCTS:",
        data
      );

      setProducts(data);

    } catch (error) {

      console.log(
        "FETCH PRODUCTS ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  };



  /* -------------------------------------------------------------------------- */
  /*                              INITIAL LOAD                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    fetchProducts();

  }, []);




  /* -------------------------------------------------------------------------- */
  /*                               ADD PRODUCT                                  */
  /* -------------------------------------------------------------------------- */

  // Product is already added to Firebase
  // This only updates local UI instantly
  const handleAddProduct = (
    newProduct
  ) => {

    setProducts((prev) => [
      newProduct,
      ...prev,
    ]);

    setOpenAddModal(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                              FILTER PRODUCTS                               */
  /* -------------------------------------------------------------------------- */

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) => {

          // Search filter
          const matchesSearch =

            product.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            product.sku
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          // Category filter
          const matchesCategory =
            category === "All" ||
            product.category?.name ===
              category;

          // Stock filter
          const matchesStock =

            stock === "All" ||

            product.status === stock;



          return (
            matchesSearch &&
            matchesCategory &&
            matchesStock
          );
        }
      );

    }, [
      products,
      search,
      category,
      stock,
    ]);

  /* -------------------------------------------------------------------------- */
  /*                                  LOADING                                   */
  /* -------------------------------------------------------------------------- */

  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "60vh",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={1}>

      {/* -------------------------------------------------------------------------- */}
      {/*                                   HEADER                                   */}
      {/* -------------------------------------------------------------------------- */}

      <ProductsHeader
        onAddProduct={() =>
          setOpenAddModal(true)
        }
      />

      {/* -------------------------------------------------------------------------- */}
      {/*                                  TOOLBAR                                   */}
      {/* -------------------------------------------------------------------------- */}

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

      {/* -------------------------------------------------------------------------- */}
      {/*                                   COUNT                                    */}
      {/* -------------------------------------------------------------------------- */}

      <Typography
        sx={{
          mt: 3,
          mb: 3,
        }}
        color="text.secondary"
      >

        Showing{" "}

        <strong>
          {filteredProducts.length}
        </strong>{" "}

        of{" "}

        <strong>
          {products.length}
        </strong>{" "}

        products

      </Typography>

      {/* -------------------------------------------------------------------------- */}
      {/*                                EMPTY STATE                                 */}
      {/* -------------------------------------------------------------------------- */}

      {!loading &&
        filteredProducts.length === 0 && (
        <Box
          sx={{
            py: 10,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={1}
          >
            No Products Found
          </Typography>

          <Typography
            color="text.secondary"
          >
            {category} products added in store will appear here.
          </Typography>
        </Box>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/*                                 GRID VIEW                                  */}
      {/* -------------------------------------------------------------------------- */}

      {view === "grid" &&
        filteredProducts.length > 0 && (
        <Grid container spacing={3}>
          {filteredProducts.map(
            (product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
              >
                <ProductCard
                  product={product}
                />
              </Grid>
            )
          )}
        </Grid>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/*                                 LIST VIEW                                  */}
      {/* -------------------------------------------------------------------------- */}

      {view === "list" &&
        filteredProducts.length > 0 && (
        <ProductListTable
          products={
            filteredProducts
          }
        />
      )}

      {/* -------------------------------------------------------------------------- */}
      {/*                              ADD PRODUCT MODAL                             */}
      {/* -------------------------------------------------------------------------- */}

      <AddProductModal
        open={openAddModal}
        onClose={() =>
          setOpenAddModal(false)
        }

        onAddProduct={
          handleAddProduct
        }
      />
    </Box>
  );
}
