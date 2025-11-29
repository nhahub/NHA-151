
import axios from "axios";
let store;
export const setStore = (_store) => { store = _store; };

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    let token;
    if (store && store.getState) {
      const state = store.getState();
      token = state.auth?.token;
    }
    if (!token) {
      token = localStorage.getItem("token");
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (store && store.dispatch) {
        // Dynamically import logout to avoid circular import
        import("../redux/authSlice").then(({ logout }) => {
          store.dispatch(logout());
          window.location.href = "/login";
        });
      } else {
        window.location.href = "/login";
      }
      return Promise.reject({ ...error, handled: true });
    }
    return Promise.reject(error);
  }
);

export default instance;
