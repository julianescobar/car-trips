// src/cars/types/cars.d.ts
export interface Car {
  id: number;
  plate: string;
  color: string;
  entry_date: string; // formato YYYY-MM-DD
}

export interface CreateCar {
  plate: string;
  color: string;
  entry_date: string;
}
