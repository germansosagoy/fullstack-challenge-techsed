import ProductListHome from "./components/Product/ProductListHome/ProductListHome";
import { productsData } from "./data/products/products-data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 sm:px-12 md:px-24 py-6 sm:py-12 bg-[#f1f1f1]">
      {/* Contenedor lista de productos */}
      <ProductListHome products={productsData} />
    </main>
  );
}
