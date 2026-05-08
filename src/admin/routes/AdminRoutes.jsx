import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
// import Orders from "../pages/Orders";
// import Reviews from "../pages/Reviews";
import AdminLayout from "../components/AdminLayout";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        {/* <Route path="/orders" element={<Orders />} />
        <Route path="/reviews" element={<Reviews />} /> */}
      </Routes>
    </AdminLayout>
  );
}