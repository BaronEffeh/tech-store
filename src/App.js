import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
// import { Navbar } from "./components/global/Navbar";
// import Footer from "./components/global/Footer";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import ProductPage from "./components/home/ProductPage";
// import SearchResultsPage from "./pages/SearchResultsPage";

import ContactPage from "./pages/support/ContactPage";
import FAQPage from "./pages/support/FAQPage";
import ShippingPage from "./pages/support/ShippingPage";
import ReturnsPage from "./pages/support/ReturnsPage";
import WarrantyPage from "./pages/support/WarrantyPage";

import AboutPage from "./pages/company/AboutPage";
import CareersPage from "./pages/company/CareersPage";
import PrivacyPage from "./pages/company/PrivacyPage";
import TermsPage from "./pages/company/TermsPage";

import PublicLayout from "./components/layout/PublicLayout";
import AdminRoutes from "./admin/routes/AdminRoutes";
import AdminRoute from "./admin/components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Navbar /> */}
            
              {/* ================= PUBLIC ROUTES ================= */}
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  {/* <Route path="/search" element={<SearchResultsPage />} /> */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/account" element={<AccountPage />} />

                  {/* SUPPORT */}
                  <Route path="/support/contact" element={<ContactPage />} />
                  <Route path="/support/faq" element={<FAQPage />} />
                  <Route path="/support/shipping" element={<ShippingPage />} />
                  <Route path="/support/returns" element={<ReturnsPage />} />
                  <Route path="/support/warranty" element={<WarrantyPage />} />

                  {/* COMPANY */}
                  <Route path="/company/about" element={<AboutPage />} />
                  <Route path="/company/careers" element={<CareersPage />} />
                  <Route path="/company/privacy" element={<PrivacyPage />} />
                  <Route path="/company/terms" element={<TermsPage />} />

                </Route>
            
                {/* ================= ADMIN ROUTES ================= */}
                {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminRoutes />
                    </AdminRoute>
                  }
                />

              </Routes>
            
            {/* <Footer /> */}

            {/* ADMIN */}
          </ThemeProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
