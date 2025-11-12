// src/lib/api/api.jsx
import axios from 'axios';

// Centralized API base URL - use VITE_API_URL from .env, fallback to localhost:5000
const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${API_ROOT.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Attach Authorization header when token exists. Be defensive about SSR.
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // swallow localStorage errors (e.g., in SSR context)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.warn('Error clearing token on 401:', err);
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints are namespaced under /auth in the server routes
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const logoutUser = () => api.post('/auth/logout');

// Products
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProducts = (params) => api.get('/products', { params });
export const searchProducts = (query) => api.get('/products', { params: { search: query } });

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/myorders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// Cart — match backend field names (product, qty)
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart', { product: productId, qty: quantity });
export const removeFromCart = (productId) => api.delete(`/cart/item/${productId}`);
export const updateCartItem = (productId, quantity) => api.put(`/cart/item/${productId}`, { qty: quantity });
export const clearCart = () => api.delete('/cart');

// Wishlist
export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (productId) => api.post('/wishlist', { productId });
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`);

// Categories
export const getCategories = () => api.get('/categories');
export const getSubcategories = (categoryId) => api.get('/subcategories', { params: { category: categoryId } });

// Auth — add profile/user endpoints
export const getCurrentUser = () => api.get('/auth/profile');
export const updateUserProfile = (data) => api.put('/auth/profile', data);
export const verifyEmail = (token) => api.get(`/auth/verify-email/${token}`);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => api.put(`/auth/reset-password/${token}`, { password });

export default api;
