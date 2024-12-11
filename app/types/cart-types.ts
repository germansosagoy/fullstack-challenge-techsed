import { Product } from "./product-types";

export type Cart = {
  quantity: number;
  id: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  createdAt: Date;
};

export type CartContextType = {
  cart: Cart; 
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};