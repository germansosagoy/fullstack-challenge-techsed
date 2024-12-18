import { useState, useEffect } from "react";
import { Product } from "@/app/types/product-types";
import { useCart } from "@/app/context/cart/CartContext";

interface useQuantityHandlerProps {
  product: Product;
  value: number;
  onQuantityChange: (quantity: number) => void;
  context?: "cart" | "productDetails";
}

export const useQuantityHandler = ({ product, value, onQuantityChange, context }: useQuantityHandlerProps) => {
  const unitValue = product.unitValue || 1; 
  const maxQuantity = product.salesUnit === "area" ? product.stock : Math.floor(product.stock * unitValue / unitValue) * unitValue;

  const { cart, updateQuantity } = useCart();
  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState<number>(currentQuantity);
  const [areaInput, setAreaInput] = useState<string>("");
  const [groupInput, setGroupInput] = useState<string>((currentQuantity / unitValue).toString());
  const [unitsInput, setUnitsInput] = useState<string>(currentQuantity.toString());

 useEffect(() => {
  if (value === 0 && currentQuantity !== quantity) {
    setQuantity(currentQuantity);
    setUnitsInput(currentQuantity.toString());
    setGroupInput((currentQuantity / unitValue).toString());
  }
}, [value, currentQuantity, quantity, unitValue]);

  
const updateQuantityHandler = (newQuantity: number) => {
  const adjustedQuantity = Math.min(newQuantity, maxQuantity);
  setQuantity(adjustedQuantity);
  setUnitsInput(adjustedQuantity.toString());
  
  // redondear el valor hacia abajo para evitar decimales en PALLETS
  const adjustedPallets = Math.floor(adjustedQuantity / unitValue);
  setGroupInput(adjustedPallets.toString());

  // SI el producto es de tipo 'group', la cantidad en el carrito debe ser en PALLETS
  const finalQuantity = product.salesUnit === "group"
    ? adjustedPallets 
    : adjustedQuantity;

  // NO eliminamos el producto si la cantidad es 0 para tipo "group"
  if (finalQuantity > 0) {
    onQuantityChange(finalQuantity);
    updateQuantity(product.id, finalQuantity); 
  }
};


  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArea = e.target.value; 
    setAreaInput(inputArea); 

    const numericArea = parseFloat(inputArea) || 0;
    const unitsRequired = Math.min(Math.ceil(numericArea / unitValue), maxQuantity); 

    updateQuantityHandler(unitsRequired); 
  };

  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPallets = parseInt(e.target.value, 10) || 0;
  
    // convertir los PALLETS a unidades antes de actualizar
    const adjustedPallets = Math.min(inputPallets, product.stock);
    const adjustedUnits = adjustedPallets * unitValue; // conversión de pallets a unidades
  
    setGroupInput(adjustedPallets.toString());
    setUnitsInput(adjustedUnits.toString());
  
    updateQuantityHandler(adjustedUnits); 
  };
  
  
  
  const handleUnitsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUnits = parseInt(e.target.value, 10) || 0;
  
    // limitar las unidades al stock máx. disponible en unidades
    const adjustedUnits = Math.min(inputUnits, product.stock * unitValue);
  
    // caclular los PALLETS redondeando el valor hacia abajo
    const adjustedPallets = Math.floor(adjustedUnits / unitValue);
  
    setUnitsInput(adjustedUnits.toString());
    setGroupInput(adjustedPallets.toString());
  
    updateQuantityHandler(adjustedUnits);
  };
  
  
  const handleIncrement = () => {
    let newQuantity = quantity;
    if (context === "cart") {
      newQuantity = Math.min(quantity + 1, maxQuantity);
    } else {
      newQuantity = product.salesUnit === "group"
        ? Math.min(quantity + unitValue, maxQuantity)
        : Math.min(quantity + 1, maxQuantity);
    }
    updateQuantityHandler(newQuantity);
  };

  const handleDecrement = () => {
    let newQuantity = quantity;
    if (context === "cart") {
      newQuantity = Math.max(1, quantity - 1);
    } else {
      newQuantity = product.salesUnit === "group"
        ? Math.max(1, quantity - unitValue)
        : Math.max(1, quantity - 1);
    }
    updateQuantityHandler(newQuantity);
  };

  return {
    quantity,
    areaInput,
    groupInput,
    unitsInput,
    handleAreaInputChange,
    handleGroupInputChange,
    handleUnitsInputChange,
    handleIncrement,
    handleDecrement,
  };
};