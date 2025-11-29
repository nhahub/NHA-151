// src/features/cart/cartSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../lib/api/api";

// Fetch cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response.data; // assuming API returns an array of items
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add item to cart
export const addToCartThunk = createAsyncThunk(
  "cart/addItem",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const response = await addToCart(productId, qty);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromCart(productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update cart item quantity
export const updateCartItemQty = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(productId, qty);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Clear cart
export const clearCartItems = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add item
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Remove item
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product !== action.payload
        );
      })
      // Update item
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.product === action.payload.product
        );
        if (index >= 0) state.items[index] = action.payload;
      })
      // Clear cart
      .addCase(clearCartItems.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
