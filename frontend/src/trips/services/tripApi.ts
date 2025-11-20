import { api } from "../../api/axios";
import type { Trip, CreateTrip } from "../types/trips";

export const getTrips = async (placa?: string): Promise<Trip[]> => {
  const url = placa ? `/viajes/?placa=${placa}` : "/viajes/";
  const { data } = await api.get(url);
  return data;
};

export const createTrip = async (trip: CreateTrip): Promise<Trip> => {
  const { data } = await api.post("/viajes/", trip);
  return data;
};
