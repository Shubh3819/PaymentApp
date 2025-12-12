import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1",
  withCredentials: false,
  timeout: 15000
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  cfg.headers = cfg.headers || {};
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("API: unauthorized (401)");
    }
    return Promise.reject(err);
  }
);

export default api;
