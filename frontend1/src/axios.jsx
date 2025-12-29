import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Request interceptor to add JWT token
API.interceptors.request.use(
  (config) => {
    // Allow callers to opt-out of sending auth header by passing `skipAuth: true` in the request config
    if (config && config.skipAuth) {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      // Respect per-request opt-out flag: set `skipAuthRedirect: true` in the request config to avoid automatic redirect
      const skipRedirect = error.config && error.config.skipAuthRedirect === true;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete API.defaults.headers.common['Authorization'];
      
      if (!skipRedirect) {
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Initialize axios headers from localStorage on app start
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

initializeAuth();

export default API;
