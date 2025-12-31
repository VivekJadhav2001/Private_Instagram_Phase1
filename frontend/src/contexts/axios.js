import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change if needed
  withCredentials: true, // 🔥 cookie auth
});

export default api;
