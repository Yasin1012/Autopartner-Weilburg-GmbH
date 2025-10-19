import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

// Request interceptor - add JWT token
api.interceptors.request.use(
  (config) => {
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

// Response interceptor - handle errors
let hasShownSessionExpired = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle errors for non-login requests
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    
    if (error.response?.status === 401 && !isLoginRequest) {
      // Only show session expired message once to avoid spam
      if (!hasShownSessionExpired) {
        hasShownSessionExpired = true;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        toast.error('Sitzung abgelaufen. Bitte melden Sie sich erneut an.');
        // Reset flag after 2 seconds
        setTimeout(() => { hasShownSessionExpired = false; }, 2000);
      }
    } else if (error.response?.status === 403 && !isLoginRequest) {
      toast.error('Zugriff verweigert.');
    } else if (error.response?.status === 404 && !isLoginRequest) {
      toast.error('Ressource nicht gefunden.');
    } else if (error.response?.status >= 500 && !isLoginRequest) {
      toast.error('Serverfehler. Bitte versuchen Sie es später erneut.');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
};

// Vehicle API
export const vehicleAPI = {
  getAll: () => api.get('/api/vehicles'),
  getById: (id) => api.get(`/api/vehicles/${id}`),
  create: (data) => api.post('/api/vehicles', data),
  update: (id, data) => api.put(`/api/vehicles/${id}`, data),
  delete: (id) => api.delete(`/api/vehicles/${id}`),
};

export default api;

