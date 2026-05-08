import { Outlet } from "react-router-dom";
import { Navbar } from "../global/Navbar";
import Footer from "../global/Footer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}