"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/product-types";
import { useCart } from "@/app/context/cart/CartContext";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  product: Product;
  value: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ product, onQuantityChange, value }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const unitValue = product.unitValue || 1; // Unidades por pallet
  const maxQuantity = product.salesUnit === "area" ? product.stock : product.stock * unitValue; // Límite de cantidad máxima (en unidades)
  
  // Obtener el producto del carrito
  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Estado para almacenar la cantidad (cajas, unidades, etc)
  const [quantity, setQuantity] = useState<number>(currentQuantity);

  // Sincronizar la cantidad con el carrito cuando los items cambien
  useEffect(() => {
    if (value === 0 && currentQuantity !== quantity) {
      // Si el valor es 0 y la cantidad del carrito es diferente de la cantidad local, sincronizamos
      setQuantity(currentQuantity);
    }
  }, [cart.items, currentQuantity, value, quantity]);

  

  // Función para actualizar la cantidad
  const updateQuantityHandler = (newQuantity: number) => {
    const adjustedQuantity = Math.min(newQuantity, maxQuantity); 
    setQuantity(adjustedQuantity); // actualiza el estado local de la cantidad
    onQuantityChange(adjustedQuantity); 
    if (adjustedQuantity === 0) {
      // si la cantidad es 0, eliminamos el producto del carrito
      removeFromCart(product.id);
    } else {
      // si la cantidad es mayor a 0, actualizamos la cantidad en el carrito
      updateQuantity(product.id, adjustedQuantity); 
    }
  };
  


  // Lógica de incremento y decremento según el tipo de producto (group, area, unit)
  const incrementActions = {
    group: () => Math.min(quantity + unitValue, maxQuantity), // Incrementar en unidades de pallet
    area: () => quantity + 1, // Incrementar en cajas para "area"
    unit: () => quantity + 1, // Incrementar en unidades para "unit"
  };

  const decrementActions = {
    group: () => Math.max(0, quantity - unitValue), // Decrementar en unidades de pallet
    area: () => Math.max(0, quantity - 1), // Decrementar en cajas para "area"
    unit: () => Math.max(0, quantity - 1), // Decrementar en unidades para "unit"
  };

  // Lógica para manejar incrementos y decrementos
  const handleIncrement = () => {
    const newQuantity = incrementActions[product.salesUnit]();
    updateQuantityHandler(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = decrementActions[product.salesUnit]();
    updateQuantityHandler(newQuantity);
  };

  // Para tipo "group" --> PALLETS
  const palletCount = quantity / unitValue;

  // Para tipo "area" --> SUPERFICIE m²
  const area = quantity * unitValue; // Calculamos la superficie total (m²) en función de la cantidad de cajas

  return (
    <div className="flex flex-col space-y-2">
      {/* Para cantidad de unidades tipo "group" */}
      {product.salesUnit === "group" && (
        <>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Cantidad de unidades:</label>
            <span className="border px-2 py-1 rounded bg-white">{quantity}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Cantidad de pallets:</label>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 0}
              className="border px-2 rounded hover:bg-gray-100 duration-200"
            >
              <Minus size={20} strokeWidth={1.5} />
            </button>
            <span className="w-10 text-center">{palletCount.toFixed(0)}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
              className="border px-2 rounded hover:bg-gray-100 duration-200"
            >
              <Plus size={20} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}

      {/* Para cantidad de superficie tipo "area" */}
      {product.salesUnit === "area" && (
        <>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Superficie:</label>
            <span className="border px-3 py-1 rounded bg-gray-100">{area.toFixed(2)}</span>
            <span className="text-sm text-gray-500">m²</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Cantidad de cajas:</label>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 0}
              className="border px-2 rounded hover:bg-gray-100 duration-200"
            >
              <Minus size={20} strokeWidth={1.5} />
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
              className="border px-2 rounded hover:bg-gray-100 duration-200"
            >
              <Plus size={20} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}

      {/* Para productos tipo "unit" */}
      {product.salesUnit === "unit" && (
        <div className="flex items-center space-x-2">
          <label className="text-sm font-semibold">Cantidad:</label>
          <button
            onClick={handleDecrement}
            disabled={quantity <= 0}
            className="border px-2 rounded hover:bg-gray-100 duration-200"
          >
            <Minus size={20} strokeWidth={1.5} />
          </button>
          <span className="w-5 text-center">{quantity}</span>
          <button
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
            className="border px-2 rounded hover:bg-gray-100 duration-200"
          >
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
