"use client"
import React from "react";
import ProductCardHome from "../../ProductCard/ProductCardHome";
import { Product } from "@/app/types/product-types";

interface ProductListHomeProps {
  products: Product[];
}

export default function ProductListHome({ products }: ProductListHomeProps) {

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
    <h2 className="font-bold text-2xl lg:mb-5 mb-5">
      Productos Destacados ({products.length})
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {/* renderizar los productos con el componente ProductCardHome */}
      {products.map((product) => (
        <ProductCardHome key={product.id} product={product} />
      ))}
    </div>
  </section>
  );
}