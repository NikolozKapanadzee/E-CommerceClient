"use client";
import React, { createContext, useContext, useState } from "react";
import { CartContextType, CartItem, Product } from "../types";
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.product.id === product.id);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[index].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };
  const incrementQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const decrementQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };
  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
