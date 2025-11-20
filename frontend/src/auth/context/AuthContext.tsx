import { createContext, useState, useEffect } from "react";
import { loginRequest } from "../services/authApi";
import { LoginCredentials } from "../types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("access");
  });

  const login = async (data: LoginCredentials) => {
    const res = await loginRequest(data);

    localStorage.setItem("access", res.access);
    localStorage.setItem("refresh", res.refresh);

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
