import { useCart } from "@/app/context/cart/CartContext";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatPrice } from "@/app/lib/formatPrice";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function CartSidebar({isOpen, onClose}: CartSidebarProps) {
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity); // multiplicar el precio por la cantidad del producto
  }, 0);

  return (
      <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}/>
       )}
      <div
        className={`fixed top-0 right-0 h-screen w-[440px] overflow-auto border-1 border-gray-400 rounded-xl bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out px-4 py-10 md:rounded-md z-50`}
      >
        {/* header del carrito */}
        <button
          className="mb-4 flex items-center text-[#407EFF] hover:text-[#407EFF]/80 space-x-4"
          onClick={onClose}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
          <span>Continuar comprando</span>
        </button>
        {/* listado de productos  */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-190px)] border-t">
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b py-4"
              >
                {/* sección del carrito con imagen, título y QuantitySelector */}
                <div className="flex items-center justify-center space-x-4">
                  {/* imagen del producto */}
                  <Image src={item.product?.image ?? ''} priority width={80} height={80} alt={item.product.title} className="object-contain rounded-lg" />
                  <div>
                    <h3 className="font-medium text-base">
                      {item.product?.title || "Producto desconocido"}
                    </h3>
                    {/* <span className="text-gray-600 text-sm">
                      {`Cantidad: ${item.quantity}`}
                    </span> */}
                  </div>
                </div>
                {/* botón 'quitar' para eliminar el producto del carrito */}
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 text-sm px-2 py-1 bg-transparent border hover:text-red-700 hover:border-red-700">
                  Quitar
                </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">El carrito está vacío.</p>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-6 border-t">
              <div className="flex flex-row justify-between py-2">
              {/* monto total del carrito */}
                <span className="text-xl font-bold leading-6">Subtotal:</span>
                <span className="text-xl font-bold">{formatPrice(totalAmount)}</span>
              </div>
              <button disabled={cart.items.length === 0} // desactivamos el botón si el carrito está vacío
              className={`block w-full h-12 mt-2 text-center px-4 py-2 rounded-full ${
                  cart.items.length === 0
                    ? "bg-slate-400 rounded-full text-white shadow-md focus:outline-none false"
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