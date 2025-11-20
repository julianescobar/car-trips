import { api } from "../../api/axios";
import type { City} from "../types/cities";

export const getCities = async (): Promise<City[]> => {
  const { data } = await api.get("/ciudades/");  
  return data.filter((c: City) => c.active);
};
