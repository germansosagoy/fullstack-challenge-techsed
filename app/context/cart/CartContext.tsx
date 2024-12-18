"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import { Cart, CartContextType } from "@/app/types/cart-types";
import { Product } from "@/app/types/product-types";
import { v4 as uuidv4 } from "uuid";

// creamos el contexto del carrito
const CartContext = createContext<CartContextType | undefined>(undefined);

// proveedor del carrito
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>(
    
    {
    id: "", 
    items: [],
    quantity: 0,
    createdAt: new Date(0),
  });
  
  useEffect(() => {
    // recuperamos el carrito desde localStorage solo en el cliente
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart({
        id: uuidv4(),
        items: [],
        quantity: 0,
        createdAt: new Date(),
      });
    }
  }, []);

  // guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.id) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  
  // Función para agregar un producto al carrito
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existItem = prevCart.items.find((item) => item.product.id === product.id);
      const maxQuantity = product.stock;
  
      if (existItem) {
        const updatedQuantity = existItem.quantity + quantity;
        if (updatedQuantity > maxQuantity) return prevCart; // no permitir más de la cantidad máxima
  
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: updatedQuantity } : item
          ),
        };
      }
  
      if (quantity > maxQuantity) quantity = maxQuantity;
  
      return {
        ...prevCart,
        items: [...prevCart.items, { product, quantity }],
      };
    });
  };
  

  // función para actualizar la cantidad de un producto existente en el carrito
  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      // Si la cantidad es 0, eliminar el producto
      if (quantity === 0) {
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.product.id !== productId),
        };
      }
  
      // Actualizar la cantidad si el producto existe
      const updatedItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
  
      return {
        ...prevCart,
        items: updatedItems,
      };
    });
  };
  

  // función para eliminar un producto del carrito
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => ({...prevCart, items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// hook para acceder al carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
