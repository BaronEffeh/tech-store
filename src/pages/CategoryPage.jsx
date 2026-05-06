import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../components/data/products";
import { ProductSection } from "../components/home/ProductSection";

export default function CategoryPage() {
  const { category } = useParams();

  // Capitalize first letter (optional polish)
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <ProductSection
      products={products}
      initialCategory={formattedCategory}
    />
  );
}