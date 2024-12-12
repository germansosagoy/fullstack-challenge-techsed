import React from "react";
import ProductDetails from "@/app/components/Product/ProductDetails/ProductDetails";
import { productsData } from "@/app/data/products/products-data";

interface Params {
  params: { id: string };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params; // extraer el ID correcto de params

  // buscar el producto con el ID proporcionado
  const product = productsData.find((p) => p.id === id);

  if (!product) return <p className="text-center mt-20">Producto no encontrado</p>;

  // devolvemos el producto encontrado para ser renderizado en la vista
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-10 py-6 bg-[#f1f1f1]">
      <ProductDetails product={product} />
    </div>
  );
}
