import { createSlice } from "@reduxjs/toolkit";

// Keep reducers pure: avoid side-effects (localStorage) inside reducers.
// Initial token read is okay on the client side.
const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const userFromStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  isLoggedIn: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
