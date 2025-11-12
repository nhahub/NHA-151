🛒 Cart Component

A beautiful, animated shopping cart drawer built with React, Tailwind CSS, and Framer Motion — designed to match the visual style of your Indoor.jsx and PlantDetails.jsx pages.

✨ Features

🧭 Smooth slide-in / slide-out animation (Framer Motion)

🎨 Matches your app’s design system (same colors & layout)

📱 Fully responsive (mobile → desktop)

🔢 Dynamic quantity updates

💰 Real-time summary (subtotal, tax, total)

♿ Accessible with proper ARIA labels

🔌 Works standalone or integrated with global cart context

⚙️ Installation

Make sure you have the dependencies installed:

npm install framer-motion lucide-react react-router-dom

Tailwind CSS should already be set up in your project.

🚀 Usage

You can use the Cart in two ways:

🧩 Option 1: Standalone (Without Context)

If you just want a quick test or a simple cart:

import { useState } from "react";
import Cart from "./Components/Common/Cart/Cart";

function App() {
const [isCartOpen, setIsCartOpen] = useState(false);

return (
<>
<button onClick={() => setIsCartOpen(true)}>🛒 Open Cart</button>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>

);
}

✅ Pros: Easy to test and use
❌ Cons: Doesn’t share data between pages or components

🌍 Option 2: With Global Cart Context (Recommended)

This approach makes the cart accessible from anywhere in your app.

1. Wrap your app with CartProvider
   // main.jsx or App.jsx
   import { CartProvider } from "./Components/Common/Cart/useCart";

function App() {
return (
<CartProvider>
{/_ your app components _/}
</CartProvider>
);
}

2. Use the cart anywhere

For example, in your Navbar:

import { useCart } from "./Components/Common/Cart/useCart";
import Cart from "./Components/Common/Cart/Cart";

function Navbar() {
const { openCart, cartItems } = useCart();

return (
<>
<button onClick={openCart}>
🛍️ Cart ({cartItems.length})
</button>

      {/* Cart Drawer (automatically uses context) */}
      <Cart />
    </>

);
}

3. Add products to the cart

In your product cards or details pages:

import { useCart } from "./Components/Common/Cart/useCart";
import { Button } from "../../ui/button";

function ProductCard({ product }) {
const { addToCart, openCart } = useCart();

const handleAdd = () => {
addToCart({
id: product.id,
name: product.name,
img: product.img,
price: product.price,
});
openCart(); // optional — opens cart after adding
};

return <Button onClick={handleAdd}>Add to Cart</Button>;
}

🧠 Cart Context API

When you use useCart(), you get access to:

Function / Variable Description
cartItems Array of all cart items
isCartOpen Boolean controlling if drawer is open
addToCart(product) Adds an item (or increases quantity)
updateQuantity(id, qty) Updates item quantity
removeFromCart(id) Removes one item
clearCart() Empties the entire cart
openCart() Opens the cart drawer
closeCart() Closes the cart drawer
🎨 Styling

The cart uses your design system colors:

Primary: oklch(45.3% 0.124 130.933)
Secondary: oklch(14.1% 0.005 285.823)
Background: oklch(0.95 0.06 115)

It automatically adapts to both light and dark environments if your Tailwind config supports them.

🧾 File Structure Example
src/
└── Components/
└── Common/
└── Cart/
├── Cart.jsx
├── CartContext.js
├── CartProvider.jsx
└── useCart.js
