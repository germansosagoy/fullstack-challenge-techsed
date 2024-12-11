"use client";
import React from 'react'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/cart/CartContext';
import CartSidebar from '../Cart/CartSidebar';

export default function Navbar() {
    const [isCartSidebarOpen, setIsCartSidebarOpen] = React.useState(false);
    const {cart} = useCart();

    // muestra +"1" si hay productos en el carrito, independientemente de las cantidades del mismo
    const totalItems = cart.items.length;

    return (
      <div className='border-b border-gray-200 shadow-md'>
      <nav className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
        <Link href="/" className="text-xl">Tech 
           {"-"}
          <span className='font-bold underline'>Sed</span>
        </Link>
        <div className="flex items-center justify-between gap-2 sm:gap-8">
          {/* Carrito de compras */}
          <div className="relative cursor-pointer" onClick={() => setIsCartSidebarOpen(true)}>
            <ShoppingCart strokeWidth={1.5} size={24} className="hover:text-gray-600 duration-200" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#254a96] rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <Link
              href="#"
              className="border border-[#254a96] bg-[#254a96] hover:bg-[#1d3e7d] px-4 py-2.5 rounded-full text-xs font-bold text-white duration-200"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>
      {/*  CartSidebar lateral */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
      </div>
    );
  }
  