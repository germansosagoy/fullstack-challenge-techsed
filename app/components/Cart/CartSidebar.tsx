import { useCart } from "@/app/context/cart/CartContext";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatPrice } from "@/app/lib/formatPrice";
import QuantitySelector from "../ui/quantity-selector";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function CartSidebar({isOpen, onClose}: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart} = useCart();
  
  if (!isOpen) return null;
  
  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // const totalAmount = cart.items.reduce((total, item) => {
  //   const unitValue = item.product.unitValue || 1; 
  
  //   const itemQuantity = item.product.salesUnit === 'group'
  //     ? item.quantity * unitValue // si el producto'group', usa la cantidad convertida a unidades
  //     : item.quantity; // para otros casos de productos
    
  //   return total + item.product.price * itemQuantity;
  // }, 0);
  
  
  return (
    <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
    )}
    <div
      className={`fixed top-0 right-0 h-screen w-full sm:w-[480px] overflow-auto border-l border-gray-400 bg-white shadow-xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out px-4 py-10 sm:rounded-l-md z-50`}
    >
      {/* header carrito */}
      <button className="mb-4 flex items-center text-[#407EFF] hover:text-[#407EFF]/80 space-x-4" onClick={onClose}>
        <ArrowLeft size={20} strokeWidth={1.5} />
        <span>Continuar comprando</span>
      </button>
      {/* contenido del carrito */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 border-t">
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between border-b py-4">
            {/* producto en el carrito */}
            <div className="flex items-center space-x-4">
              <Image
                src={item.product?.image ?? ""}
                priority
                width={80}
                height={80}
                alt={item.product.title}
                className="object-contain rounded-lg"
              />
              <div className="flex flex-col space-y-4">
                <h3 className="font-medium text-base line-clamp-3">
                  {item.product?.title || "Producto desconocido"}
                </h3>
                <QuantitySelector
                  product={item.product}
                  value={item.quantity} // cantidad actual del producto en el carrito
                  onQuantityChange={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
                  context="cart"
                />
              </div>
            </div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 text-sm px-2 py-1 border rounded hover:text-red-700 hover:border-red-700">
                Quitar
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">El carrito está vacío.</p>
        )}
      </div>
      {/* footer con el monto total */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-6 border-t">
        <div className="flex flex-row justify-between py-2">
          <span className="text-xl font-bold leading-6">Subtotal:</span>
          <span className="text-xl font-bold">{formatPrice(totalAmount)}</span>
        </div>
        <button
          disabled={cart.items.length === 0}
          className={`block w-full h-12 mt-2 text-center px-4 py-2 rounded-full ${
            cart.items.length === 0
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-[#254a96] text-white hover:bg-[#1d3e7d]"
          }`}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  </>
);
}
