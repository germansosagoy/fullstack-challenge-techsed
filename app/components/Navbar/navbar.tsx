"use client";
import React, { useState } from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/cart/CartContext';
import CartSidebar from '../Cart/CartSidebar';

export default function Navbar() {
    const [isCartSidebarOpen, setIsCartSidebarOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const {cart} = useCart();

    // muestra +"1" si hay productos en el carrito, independientemente de las cantidades del mismo
    const totalItems = cart.items.length;

    return (
      <div className="border-b border-gray-200 shadow-md">
      <nav className="flex items-center justify-between p-4 mx-auto max-w-7xl flex-wrap">
      <Link href="/" className="text-lg sm:text-xl font-semibold" data-testid="navbar-logo">
        Tech
        <span className="font-bold">-</span>
        <span className="text-[#254a96] font-bold">Sed</span>
      </Link>

        {/* menú de navegación - responsive */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X size={24} className="hover:text-[#254a96] duration-200" />
            ) : (
              <Menu size={24} className="hover:text-[#254a96] duration-200" />
            )}
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {/* carrito de compras */}
          <div className="relative cursor-pointer"onClick={() => setIsCartSidebarOpen(true)}>
            <ShoppingCart strokeWidth={1.5} size={24} className="hover:text-gray-600 duration-200" aria-label="shopping cart"/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#254a96] rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          {/* botón iniciar sesión */}
          <Link href="#" className="border border-[#254a96] bg-[#254a96] hover:bg-[#1d3e7d] px-4 py-2 rounded-full text-xs font-bold text-white duration-200">
            Iniciar sesión
          </Link>
        </div>
      </nav>
        {/* menú de navegacion desplegable para mobile */}
      <div className={`sm:hidden flex flex-col gap-4 p-4 bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <Link href="#" className="text-gray-700 hover:text-[#254a96] duration-200 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
          Iniciar sesión
        </Link>
        <div className="relative cursor-pointer flex items-center gap-2" onClick={() => {setIsCartSidebarOpen(true); setIsMobileMenuOpen(false)}}>
          <ShoppingCart strokeWidth={1.5} size={20} className="hover:text-gray-600 duration-200" aria-label="shopping cart"/>
          <span className="text-gray-700">Carrito</span>
          {totalItems > 0 && (
            <span className="ml-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-[#254a96] rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>
      {/*  CartSidebar lateral */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
      </div>
    );
  }
  