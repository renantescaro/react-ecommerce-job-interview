import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    console.error("VITE_API_BASE_URL não está definida no ambiente!");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
