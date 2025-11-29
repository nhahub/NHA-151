import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Router";
import "./index.css";
import { CartProvider } from "./Components/Common/Cart/CartProvider";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { checkBackendHealth, getAPIBaseURL } from "./lib/safeFetch";
import { fetchProducts } from "./redux/productsSlice"; // <- import your thunk
import { setStore } from "./lib/axiosInstance";

const rootEl = document.getElementById("root");

// Boot sequence: perform a backend health check before rendering.
(async function boot() {
  try {
    const apiURL = getAPIBaseURL();
    const healthy = await checkBackendHealth(apiURL, 2500);
    if (!healthy) {
      const banner = document.createElement("div");
      banner.style.position = "fixed";
      banner.style.top = "0";
      banner.style.left = "0";
      banner.style.right = "0";
      banner.style.background = "#fffbdd";
      banner.style.color = "#663c00";
      banner.style.borderBottom = "1px solid #f5c542";
      banner.style.padding = "8px 12px";
      banner.style.zIndex = "9999";
      banner.style.fontFamily =
        "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      banner.textContent = `Warning: Backend not reachable at ${apiURL}. Some features may be unavailable.`;
      document.body.appendChild(banner);
    }
  } catch (err) {
    console.warn("Boot health check failed:", err.message || err);
  } finally {
    // Register the Redux store with the axios instance to avoid circular import
    setStore(store);

    // Wrap app in a component that dispatches fetchProducts once
    const AppBootstrap = () => {
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(fetchProducts()); // fetch products globally
      }, [dispatch]);

      return <RouterProvider router={router} />;
    };

    createRoot(rootEl).render(
      <StrictMode>
        <Provider store={store}>
          <CartProvider>
            <AppBootstrap />
          </CartProvider>
        </Provider>
      </StrictMode>
    );
  }
})();
