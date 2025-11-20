import { createContext, useEffect, useState } from "react";
import { loginRequest } from "../services/authApi";
import type { LoginCredentials } from "../types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  loadingAuth : boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (access && refresh) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
     setLoadingAuth(false);
  }, []); 

   
  const login = async (data: LoginCredentials): Promise<boolean> => {
    try {
      const res = await loginRequest(data);

      if (!res){
        return false;
      }
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      setIsAuthenticated(true);
      return true;      
    } catch (err: any) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loadingAuth  }}>
      {children}
    </AuthContext.Provider>
  );
};
