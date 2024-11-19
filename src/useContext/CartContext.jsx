// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
  setCartItems((prevItems) => {
    if (quantity === 0) {
      // Remove the item if quantity is 0
      return prevItems.filter((item) => item.id !== product.id);
    }

    const existingItem = prevItems.find((item) => item.id === product.id);
    if (existingItem) {
      // Update quantity if the product is already in the cart
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      );
    }

    // Add new product to the cart
    return [...prevItems, { ...product, quantity }];
  });
};


  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    resetProductQuantity(productId); // Notify ProductCard to reset its counter
};

  const resetProductQuantity = (productId) => {
    // Reset logic will be handled in ProductCard
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, resetProductQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
