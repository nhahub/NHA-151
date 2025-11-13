import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useSafeCart } from "./useCart";
import { motion } from "framer-motion";

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-4 bg-white shadow-sm rounded-2xl border-primary/10"
    >
      {/* Image */}
      <div className="relative w-24 h-24 overflow-hidden rounded-xl bg-gray-50 shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="mb-1 text-base font-semibold truncate text-secondary">
          {item.name}
        </h3>
        <p className="mb-3 text-lg font-bold text-secondary">${item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary/10 text-primary "
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-sm font-semibold text-center text-secondary">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg text-secondary/70 bg-secondary/5 hover:bg-secondary/10 hover:text-secondary"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Cart Drawer Component
export default function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
  const cartContext = useSafeCart();

  const [localCartItems, setLocalCartItems] = useState(null);

  const cartItems = cartContext?.cartItems || localCartItems;
  const isCartOpen = cartContext?.isCartOpen ?? isOpen;

  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return { subtotal, tax, total, itemCount: cartItems.length };
  }, [cartItems]);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (cartContext) {
      cartContext.updateQuantity(id, newQuantity);
    } else {
      setLocalCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    if (cartContext) {
      cartContext.removeFromCart(id);
    } else {
      setLocalCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleClose = () => {
    if (cartContext) {
      cartContext.closeCart();
    } else if (onClose) {
      onClose();
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    handleClose();
  };

  const handleContinueShopping = () => {
    handleClose();
    navigate("/indoor");
  };

  return (
    <AnimatePresence>
      {(isCartOpen || isOpen) && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 z-50 w-full max-w-lg overflow-hidden bg-lime-100"
          >
            {/* Subtle background gradient */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: `radial-gradient(circle at top right, oklch(45.3% 0.124 130.933)/15 0%, transparent 60%)`,
              }}
            />

            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-primary/15 bg-secondary/2">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">
                      Your Cart
                    </h2>
                    <p className="text-sm mt-0.5 text-secondary/70">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-full bg-secondary/5 text-secondary hover:bg-secondary/15"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 mb-4 text-primary/30" />
                    <h3 className="mb-2 text-xl font-semibold text-secondary">
                      Your cart is empty
                    </h3>
                    <p className="mb-6 text-sm text-secondary/70">
                      Add some beautiful plants to get started!
                    </p>
                    <Button
                      onClick={handleContinueShopping}
                      className="px-6 py-3 font-semibold transition-all duration-200 rounded-full bg-primary text-secondary hover:bg-primary/90"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-6 py-6 border-t border-primary/15 bg-secondary/2"
                >
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary/80">
                        Subtotal
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        ${cartSummary.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary/80">
                        Estimated Tax
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        ${cartSummary.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-lg font-bold text-secondary">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${cartSummary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full px-6 py-3 text-base font-semibold transition-all duration-200 rounded-full hover:shadow-lg bg-primary text-secondary hover:bg-primary/90"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      onClick={handleContinueShopping}
                      variant="outline"
                      className="w-full px-6 py-3 text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full border-primary/30 text-secondary hover:bg-primary/10 hover:border-primary"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
