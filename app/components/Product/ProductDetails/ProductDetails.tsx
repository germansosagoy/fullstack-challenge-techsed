import React from "react";
import { Product } from "@/app/types/product-types";
import ProductCardDetails from "../../ProductCard/ProductCardDetails";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="max-w-6xl mx-auto rounded-xl px-8 md:px-8 py-6">
      <div className="flex justify-center py-4 p-2">
        <ProductCardDetails key={product.id} product={product} />
      </div>
    </section>
  );
}