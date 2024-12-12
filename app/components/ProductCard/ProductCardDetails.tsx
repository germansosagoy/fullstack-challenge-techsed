"use client";
import React from "react";
import { Product } from "@/app/types/product-types";
// import { calculateDiscount } from "@/app/lib/calculateDiscount";
import { formatPrice } from "@/app/lib/formatPrice";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cart/CartContext";
import Image from "next/image";
import QuantitySelector from "../ui/quantity-selector";
import BackButton from "../ui/back-button";

interface ProductCardDetailsProps {
  product: Product;
}

const ProductCardDetails: React.FC<ProductCardDetailsProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  // Obtener la cantidad actual del producto en el carrito
  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Función para manejar el cambio de cantidad
  const handleQuantityChange = (quantity: number) => {
    if (quantity === 0) {
      removeFromCart(product.id); // Si la cantidad es 0, eliminamos el producto
    } else {
      addToCart(product, quantity); // Si no, agregamos o actualizamos el producto
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 py-2 sm:py-14 sm:px-5 rounded-lg shadow w-full max-w-4xl mx-auto">
    <div className="absolute top-40 z-10 hidden lg:block">
      <BackButton label="Volver" />
    </div>
    <div className="relative w-full sm:w-1/2 flex-shrink-0 mb-6 sm:mb-0">
      {product.image && (
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          priority
          className="object-contain object-cover rounded-lg h-80 w-full sm:w-auto sm:h-auto"
        />
      )}
    </div>

    {/* detalles del producto */}
    <div className="flex-grow w-full sm:w-1/2">
      <div className="py-4">
        <p className="text-xs text-gray-500">SKU: {product.id}</p>
        <h2 className="text-xl font-semibold text-gray-900 leading-8 mb-2">{product.title}</h2>

        {product?.stock && (
          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 h-4 w-4" />
              <p className="text-sm">Stock disponible</p>
            </span>
          </div>
        )}
      </div>
      <span className="text-xl font-bold text-gray-800 mb-2">{formatPrice(product.price)}</span>
      
      {/* Selector de cantidad */}
      <div className="my-6">
        <QuantitySelector product={product} value={currentQuantity} onQuantityChange={handleQuantityChange} />
      </div>
      <p className="text-gray-400 line-clamp-1 mb-4">{product.description}</p>

      {/* Botones de acción */}
      <div className="flex flex-col mt-10 space-y-4">
        <button className="bg-[#264b97] text-white px-5 py-3 rounded-full border-[#254a96] text-md font-semibold text-[#264b97] hover:bg-black transition duration-200">
          Comprar ahora
        </button>
        {currentQuantity === 0 ? (
          <button
            onClick={() => addToCart(product, 1)}
            className="flex justify-center items-center bg-white text-[#264b97] px-5 py-3 border-2 border-[#254a96] rounded-full text-md font-semibold transition-all hover:bg-black hover:text-white"
          >
            Agregar
            <ShoppingCart className="ml-2" size={20} />
          </button>
        ) : (
          <button
            onClick={() => removeFromCart(product.id)}
            className="flex justify-center items-center bg-white text-[#264b97] px-5 py-3 border-2 border-[#254a96] rounded-full text-md font-semibold transition-all hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Eliminar del carrito
          </button>
        )}
      </div>
    </div>
  </div>
  );
};

export default ProductCardDetails;
