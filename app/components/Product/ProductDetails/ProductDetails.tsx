import React from "react";
import { Product } from "@/app/types/product-types";
import ProductCardDetails from "../../ProductCard/ProductCardDetails";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="mx-auto px-4 sm:px-8 py-6 w-full">
    <div className="flex justify-center py-4 w-full">
      <ProductCardDetails key={product.id} product={product} />
    </div>
  </section>
  );
}