import React from "react";
import { Product } from "@/app/types/product-types";
import Image from "next/image";
import { formatPrice } from "@/app/lib/formatPrice";
import { ShoppingCart } from "lucide-react";
import { calculateDiscount } from "@/app/lib/calculateDiscount";
import Link from "next/link";
import { useCart } from "@/app/context/cart/CartContext";

interface ProductCardHomeProps {
  product: Product;
}

const ProductCardHome: React.FC<ProductCardHomeProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  // obtiene la cantidad actual del producto en el carrito
  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;


   const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuantity === 0) {
      addToCart(product, 1); // solamente agregar si el producto no está en el carrito
    }
  };

  return (
    <div className="flex flex-col justify-between w-full sm:max-w-sm md:max-w-md lg:max-w-xs mx-auto border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
    <Link href={`/product/${product.id}`} passHref>
      <div className="flex flex-col justify-between">
        {/* Imagen del producto */}
        {product.image && (
          <Image
            src={product.image}
            alt={product?.title || "product image"}
            width={300}
            height={300}
            priority
            className="w-full h-36 sm:h-44 md:h-48 object-contain object-center mb-4 cursor-pointer transition-transform duration-200 hover:scale-105"
          />
        )}

        {/* info del producto */}
        <div className="px-2 sm:px-4 mb-2 py-2">
          <span className="text-lg sm:text-xl font-bold text-gray-800">
            {formatPrice(product.price)}
          </span>
          {product.listingPrice && (
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-md line-through text-gray-400">
                {formatPrice(product.listingPrice)}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-1.5 py-1 rounded-lg">
                {calculateDiscount(product.price, product.listingPrice)}% OFF
              </span>
            </div>
          )}
          <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-2 mt-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">
            {product.description}
          </p>
        </div>
      </div>
    </Link>

    {/* botones de agregar/eliminar producto */}
    <div className="flex justify-center py-2">
      {currentQuantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="w-full py-2 flex items-center justify-center rounded-full border-2 border-[#254a96] text-sm sm:text-md font-semibold text-[#264b97] transition-all hover:bg-[#264b97] hover:text-white"
        >
          Agregar
          <ShoppingCart className="ml-2" size={20} />
        </button>
      ) : (
        <button
          onClick={() => removeFromCart(product.id)}
          className="w-full py-2 flex items-center justify-center rounded-full border-2 border-[#254a96] text-sm sm:text-md font-semibold text-[#264b97] transition-all hover:bg-red-600 hover:border-red-600 hover:text-white"
        >
          Eliminar del carrito
        </button>
      )}
    </div>
  </div>
);
};

export default ProductCardHome;
