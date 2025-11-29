import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./orderSlice";
import adminOrdersReducer from "./adminOrdersSlice";
import adminProductsReducer from "./adminProductsSlice";
import adminUsersReducer from "./adminUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    adminOrders: adminOrdersReducer,
    adminProducts: adminProductsReducer,
    adminUsers: adminUsersReducer,
  },
});

// Persist auth token to localStorage from a single place (store layer).
// This keeps reducers pure while still persisting login state across reloads.
try {
  if (typeof window !== "undefined") {
    store.subscribe(() => {
      try {
        const state = store.getState();
        const { token, user } = (state && state.auth) || {};
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");

        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
      } catch {
        // ignore storage errors
      }
    });
  }
} catch {
  // ignore; in non-browser environments this will fail safely
}
