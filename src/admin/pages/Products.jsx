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
import ProductFormModal from "../components/products/ProductFormModal";
import ViewProductModal from "../components/products/ViewProductModal";
import { deleteProductImage } from "../../services/uploadImage";
import ConfirmDialog from "../components/common/ConfirmDialog";
import AppToast from "../components/common/AppToast";
// import EditProductModal from "../components/products/EditProductModal";


// Firebase product services
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
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

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [openViewModal, setOpenViewModal] =
    useState(false);
  
  const [
    openEditModal,
    setOpenEditModal,
  ] = useState(false);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [productToDelete, setProductToDelete] =
    useState(null);
  
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });



  /* -------------------------------------------------------------------------- */
  /*                             FETCH PRODUCTS                                 */
  /* -------------------------------------------------------------------------- */

  const fetchProducts = async () => {

    try {

      setLoading(true);

      // Fetch products from Firestore
      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

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


  /* Toast Helper ---*/
  const showToast = (
    message,
    severity = "success"
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               ADD PRODUCT                                  */
  /* -------------------------------------------------------------------------- */

  const handleViewProduct = (
    product
  ) => {
    setSelectedProduct(product);
    setOpenViewModal(true);
  };

  const handleEditProduct =
    (product) => {
    setSelectedProduct(
      product
    );
    setOpenEditModal(true);
  };

  const handleCreateProduct = async (productData) => {
    try {
      const response = await createProduct(productData);

      setProducts((prev) => [
        {
          id: response.id,
          ...productData,
        },
        ...prev,
      ]);

      showToast(
        "Product created successfully",
        "success"
      );
    } catch (error) {
      showToast(
        "Failed to create product",
        "error"
      );
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await updateProduct(productData.id, productData);

      setProducts((prev) =>
        prev.map((item) =>
          item.id === productData.id
            ? productData
            : item
        )
      );

      showToast(
        "Product updated successfully",
        "success"
      );
    } catch (error) {
      showToast(
        "Failed to update product",
        "error"
      );
    }
  };

  const handleDeleteClick = (product) => {
  setProductToDelete(product);
  setConfirmOpen(true);
};


const confirmDeleteProduct =
  async () => {
    if (!productToDelete) return;

    // Delete image first
    if (productToDelete.image) {
      await deleteProductImage(
        productToDelete.image
      );
    }

    try {
      const success =
        await deleteProduct(
          productToDelete.id
        );

      if (success) {
        setProducts((prev) =>
          prev.filter(
            (item) =>
              item.id !==
              productToDelete.id
          )
        );

        showToast(
          "Product deleted successfully",
          "success"
        );
      }
    } catch (error) {
      showToast(
        "Failed to delete product",
        "error"
      );
    } finally {
      setConfirmOpen(false);
      setProductToDelete(null);
    }
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
      

      {/* PRODUCT CONTENT */}

      {loading ? (
        <Box
          sx={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading products...</Typography>
        </Box>
      ) : (
        <>
          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
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

              <Typography color="text.secondary">
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
                  onView={() =>
                    handleViewProduct(product)
                  }
                  onDelete={() =>
  handleDeleteClick(product)
}
                  // onDelete={() =>
                  //   handleDeleteProduct(product)
                  // }
                  onEdit={() =>
                    handleEditProduct(product)
                  }
                />
                {/* <ProductCard
                  product={product}
                /> */}
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
            products={filteredProducts}
            onView={handleViewProduct}
            onDelete={
  handleDeleteClick
}
            // onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        )}
        </>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/*                              ADD PRODUCT MODAL                             */}
      {/* -------------------------------------------------------------------------- */}

      <ProductFormModal
        mode="add"
        open={openAddModal}
        onClose={() =>
          setOpenAddModal(false)
        }
        onSubmit={handleCreateProduct}
      />

      <ViewProductModal
        open={openViewModal}
        onClose={() =>
          setOpenViewModal(false)
        }
        product={selectedProduct}
      />

      <ProductFormModal
        mode="edit"
        open={openEditModal}
        onClose={() =>
          setOpenEditModal(false)
        }
        productData={
          selectedProduct
        }
        onSubmit={
          handleUpdateProduct
        }
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"?`}
        onClose={() => {
          setConfirmOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={
          confirmDeleteProduct
        }
      />

      <AppToast
  open={toast.open}
  severity={toast.severity}
  message={toast.message}
  onClose={() =>
    setToast((prev) => ({
      ...prev,
      open: false,
    }))
  }
/>
    </Box>
  );
}
