import { React, /* useState*/ } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// import AddProductModal from "./ProductFormModal";

// export default function ProductsHeader() {
//   const [openModal, setOpenModal] = useState(false);
export default function ProductsHeader({
  onAddProduct
}) {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2
        }}
      >
        {/* LEFT */}
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#111827" }}
          >
            Products
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              mt: 0.5
            }}
          >
            Manage your product inventory
          </Typography>
        </Box>

        {/* RIGHT */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddProduct}
          // onClick={() => setOpenModal(true)}
          sx={{
            bgcolor: "#020617",
            color: "#fff",
            px: 3,
            py: 1.3,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#111827",
              boxShadow: "none"
            }
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* MODAL */}
      {/* <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      /> */}
    </>
  );
}
