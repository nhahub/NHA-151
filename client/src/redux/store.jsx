import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Persist auth token to localStorage from a single place (store layer).
// This keeps reducers pure while still persisting login state across reloads.
try {
  if (typeof window !== 'undefined') {
    store.subscribe(() => {
      try {
        const state = store.getState();
        const token = state && state.auth ? state.auth.token : null;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        // ignore storage errors
      }
    });
  }
} catch {
  // ignore; in non-browser environments this will fail safely
}
