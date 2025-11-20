import { api } from "../../api/axios";
import type { LoginCredentials, LoginResponse } from "../types/auth";

export const loginRequest = async (data: LoginCredentials): Promise<LoginResponse | null> => {
  try {
    const res = await api.post("/login/", data);
    return res.data;
    
  } catch (error: any) {
    //console.error("Error en loginRequest:", error?.response?.data || error);
    return null; 
  }
};
