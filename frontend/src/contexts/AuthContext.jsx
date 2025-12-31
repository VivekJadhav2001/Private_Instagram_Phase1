import { createContext, useContext, useEffect, useState } from "react";
import api from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check auth on refresh
  useEffect(() => {
    api.get("/user/me") // we’ll add this backend route
      .then(res => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const res = await api.post("/auth/signIn", payload);
    setUser(res.data.data);
  };

  const signup = async (payload) => {
    await api.post("/auth/signUp", payload);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
