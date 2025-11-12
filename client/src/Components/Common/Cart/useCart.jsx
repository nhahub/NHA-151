import { useContext } from "react";
import { CartContext } from "./CartContext";

// النسخة العادية (ترمي Error لو مفيش Provider)
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// النسخة الآمنة (Safe) — مش هترمي Error حتى لو مفيش Provider
export function useSafeCart() {
  return useContext(CartContext);
}
