import ProductListHome from "./components/Product/ProductListHome/ProductListHome";
import { productsData } from "./data/products/products-data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f1f1f1]">
      {/* Contenedor lista de productos */}
      <ProductListHome products={productsData} /> 
    </main>
  );
}
