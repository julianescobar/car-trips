export interface Trip {
  id: number;
  car_plate: string;
  car: number; 
  origin_city: number;
  destination_city: number;
  hours: number;
  date: string;
}

export interface CreateTrip {
  car: number;
  origin_city: number;
  destination_city: number;
  hours: number;
  date: string;
}
