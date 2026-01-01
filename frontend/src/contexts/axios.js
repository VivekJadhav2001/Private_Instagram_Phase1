import axios from "axios";

const api = axios.create({
  baseURL: "https://private-instagram-phase1.onrender.com/api", 
  withCredentials: true, 
});

export default api;
