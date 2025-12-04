// /components/CartProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { safeGet, safeSet } from "../utils/safeLocalStorage";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => safeGet("cart", []));
  const [count, setCount] = useState(() => {
    const initial = safeGet("cart", []);
    return Array.isArray(initial) ? initial.length : 0;
  });

  useEffect(() => {
    safeSet("cart", items);
    setCount(items.length);
  }, [items]);

  const addItem = (item) => {
    setItems(prev => {
      const updated = [...prev, item];
      return updated;
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
