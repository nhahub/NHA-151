import { useState, useCallback, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useSelector } from "react-redux";
import { 
  getCart, 
  addToCart as addToCartAPI, 
  removeFromCart as removeFromCartAPI, 
  updateCartItem as updateCartItemAPI,
  clearCart as clearCartAPI,
} from "@/lib/api/api.jsx";

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // Load cart from localStorage only if user is logged in
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined" && isLoggedIn) {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const loadCart = async () => {
        try {
          const response = await getCart();
          if (response.data && Array.isArray(response.data)) {
            // Normalize cart items: ensure they have `id` field for consistency
            const normalizedCart = response.data.map(item => ({
              ...item,
              id: item._id || item.id, // Use _id from API, fallback to id
            }));
            setCartItems(normalizedCart);
            localStorage.setItem("cartItems", JSON.stringify(normalizedCart));
          }
        } catch (err) {
          console.error("Failed to fetch cart from backend:", err);
          // Fallback to localStorage if API fails
        }
      };
      loadCart();
    }
  }, [isLoggedIn, user]);

  // Save cart to localStorage whenever it changes (only if logged in)
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  // Clear cart if user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
    }
  }, [isLoggedIn]);

  const addToCart = useCallback((product) => {
    const productId = product._id || product.id; // Handle both _id and id
    setCartItems((prev) => {
      const existingItem = prev.find((item) => (item._id || item.id) === productId);
      if (existingItem) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Sync with backend if logged in
    if (isLoggedIn) {
      addToCartAPI(productId, 1).catch(err => console.error("Failed to add to cart:", err));
    }
  }, [isLoggedIn]);

  const updateQuantity = useCallback((id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    
    // Sync with backend if logged in
    if (isLoggedIn && quantity > 0) {
      updateCartItemAPI(id, quantity).catch(err => console.error("Failed to update cart:", err));
    }
  }, [isLoggedIn]);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
    
    // Sync with backend if logged in
    if (isLoggedIn) {
      removeFromCartAPI(id).catch(err => console.error("Failed to remove from cart:", err));
    }
  }, [isLoggedIn]);

  const clearCart = useCallback((options = {}) => {
    const { syncServer = true } = options || {};

    // Always clear local state and localStorage
    setCartItems([]);
    try {
      localStorage.removeItem("cartItems");
    } catch (e) {
      // swallow localStorage errors
    }

    // Optionally sync with server (best-effort). Do not block UI.
    if (syncServer && isLoggedIn) {
      clearCartAPI().catch((err) => console.error("Failed to clear server cart:", err));
    }
  }, [isLoggedIn]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
