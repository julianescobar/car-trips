import {api} from "../../api/axios";
import { LoginCredentials, LoginResponse } from "../types/auth";


export const loginRequest = async (data: LoginCredentials): Promise<LoginResponse> => {
const res = await api.post("/login/", data);
return res.data;
};