import Products from "@/app/features/product/views/Products";
import NewProduct from "@/components/molecules/Products/NewProduct";
import ProductList from "@/components/molecules/Products/ProductList";
import React from "react";

export default function index() {
  return (
    <div className="w-full p-3">
      <Products />
    </div>
  );
}
