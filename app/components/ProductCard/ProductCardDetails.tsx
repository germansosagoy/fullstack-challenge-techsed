"use client";
import React, { useState } from "react";
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

  const [selectedQuantity, setSelectedQuantity] = useState<number>(currentQuantity);

  // actualizar la cantidad seleccionada 
  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  // agregar o actualizar un producto en el carrito
  const handleAddToCart = () => {
    if (selectedQuantity > 0) {
      addToCart(product, selectedQuantity);
    }
  };

   // eliminar un producto del carrito
   const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setSelectedQuantity(0); 
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
      {/* selector de cantidad */}
        <div className="my-6">
         <QuantitySelector
          product={product}
          value={selectedQuantity}
          onQuantityChange={handleQuantityChange}
          data-testid={`quantity-${product.salesUnit}-input`}
          />
        </div>
      <p className="text-gray-400 line-clamp-1 mb-4">{product.description}</p>

      {/* botones */}
      <div className="flex flex-col mt-2">
        <div className="flex flex-col mt-10 space-y-4">
          <button onClick={currentQuantity === 0 ? handleAddToCart : handleRemoveFromCart} className={`flex justify-center items-center bg-white text-[#264b97] px-5 py-3 border-2 border-[#254a96] rounded-full text-md font-semibold transition-all ${
              currentQuantity === 0
                ? "hover:bg-black hover:text-white"
                : "hover:bg-red-600 hover:border-red-600 hover:text-white"
            }`}
          >
            {currentQuantity === 0 ? (
              <>
                Agregar
                <ShoppingCart className="ml-2" size={20} />
              </>
            ) : (
              "Eliminar producto"
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductCardDetails;
