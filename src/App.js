import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { Navbar } from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

import ContactPage from "./pages/support/ContactPage";
import FAQPage from "./pages/support/FAQPage";
import ShippingPage from "./pages/support/ShippingPage";
import ReturnsPage from "./pages/support/ReturnsPage";
import WarrantyPage from "./pages/support/WarrantyPage";

import AboutPage from "./pages/company/AboutPage";
import CareersPage from "./pages/company/CareersPage";
import PrivacyPage from "./pages/company/PrivacyPage";
import TermsPage from "./pages/company/TermsPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
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

                <Route path="/support/contact" element={<ContactPage />} />
                <Route path="/support/faq" element={<FAQPage />} />
                <Route path="/support/shipping" element={<ShippingPage />} />
                <Route path="/support/returns" element={<ReturnsPage />} />
                <Route path="/support/warranty" element={<WarrantyPage />} />

                <Route path="/company/about" element={<AboutPage />} />
                <Route path="/company/careers" element={<CareersPage />} />
                <Route path="/company/privacy" element={<PrivacyPage />} />
                <Route path="/company/terms" element={<TermsPage />} />
              </Routes>
            
            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
