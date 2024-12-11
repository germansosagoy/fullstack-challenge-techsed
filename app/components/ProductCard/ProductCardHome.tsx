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

  // Obtener la cantidad actual del producto en el carrito
  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;


   const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuantity === 0) {
      addToCart(product, 1); // solamente agregar si el producto no está en el carrito
    }
  };

  return (
    <div className="max-w-xs mx-auto flex flex-col justify-between h-full w-full cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow p-2 py-3 bg-white">
    {/* Envolver solo la parte que debería ser clickeable para la navegación */}
    <Link href={`/product/${product.id}`} passHref>
      <div className="flex flex-col justify-between">
        {product.image && (
          <Image
            src={product.image}
            alt={product?.title || 'product image'}
            width={180}
            height={180}
            priority
            className="w-full h-48 mb-4 object-contain cursor-pointer object-center transition-transform duration-200 hover:scale-105"
          />
        )}
        <div className="px-4 mb-2 py-2">
          <span className="text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
          {product.listingPrice && (
            <div className="flex items-center space-x-2">
              <span className="text-md line-through text-gray-400">
                {formatPrice(product.listingPrice)}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-1.5 py-1 rounded-lg">
                {calculateDiscount(product.price, product.listingPrice)}% OFF
              </span>
            </div>
          )}
          <h3 className="text-sm font-semibold text-gray-800 mb-2 mt-2 line-clamp-2">{product.title}</h3>
          <p className="text-gray-500 text-sm line-clamp-1">{product.description}</p>
        </div>
      </div>
    </Link>
      <div className="flex justify-center py-2">
         {currentQuantity === 0 ? (
            <button onClick={handleAddToCart} className="w-full py-2 flex items-center justify-center rounded-full border-2 border-[#254a96] text-sm font-semibold text-[#264b97] transition-all hover:bg-[#264b97] hover:text-white md:px-4 md:py-2"
            >
              Agregar
              <ShoppingCart className="ml-2" size={20} />
            </button>
          ) : (
            <button onClick={() => removeFromCart(product.id)} className="w-full py-2 flex items-center justify-center rounded-full border-2 border-[#254a96] text-sm font-semibold text-[#264b97] transition-all hover:bg-red-600 hover:border-red-600 hover:text-white md:px-4 md:py-2">
              Eliminar del carrito
            </button>
          )}
    </div>
  </div>
  );
};

export default ProductCardHome;
