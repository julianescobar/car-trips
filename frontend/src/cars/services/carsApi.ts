import { api } from "../../api/axios";
import type { Car, CreateCar } from "../types/cars";

export const getCars = async (): Promise<Car[]> => {
  const { data } = await api.get("/carros/");
  return data;
};

export const createCar = async (car: CreateCar): Promise<Car> => {
  const { data } = await api.post("/carros/", car);
  return data;
};
