import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000/api", // backend URL
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
