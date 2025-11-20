// src/trips/pages/TripsPage.tsx
import { useEffect, useState } from "react";
import { getTrips, createTrip } from "../services/tripApi";
import { Trip, CreateTrip } from "../types/trips";
import { getCars } from "../../cars/services/carsApi";
import { Car } from "../../cars/types/cars";

import { FormTrips } from "../components/FormTrips";
import { ListTrips } from "../components/ListTrips";

export const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<CreateTrip>({
    car: 0,
    origin_city: 0,
    destination_city: 0,
    hours: 1,
    date: "",
  });

  const [errors, setErrors] = useState({
    car: "",
    origin_city: "",
    destination_city: "",
    hours: "",
    date: "",
  });

  const fetchCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  const fetchTrips = async () => {
    const data = await getTrips();
    setTrips(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
    fetchTrips();
  }, []);

  const validate = () => {
    let temp = { car: "", origin_city: "", destination_city: "", hours: "", date: "" };
    let valid = true;

    if (!form.car) {
      temp.car = "Debe seleccionar un carro";
      valid = false;
    }

    if (!form.origin_city) {
      temp.origin_city = "Ciudad de origen requerida";
      valid = false;
    }

    if (!form.destination_city) {
      temp.destination_city = "Ciudad de destino requerida";
      valid = false;
    }

    if (form.origin_city === form.destination_city) {
      temp.destination_city = "Origen y destino deben ser distintos";
      valid = false;
    }

    if (form.hours <= 0) {
      temp.hours = "Horas inválidas";
      valid = false;
    }

    if (!form.date) {
      temp.date = "Fecha requerida";
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await createTrip(form);
    await fetchTrips();

    setForm({
      car: 0,
      origin_city: 0,
      destination_city: 0,
      hours: 1,
      date: "",
    });
    setErrors({ car: "", origin_city: "", destination_city: "", hours: "", date: "" });
  };

  if (loading) return <p>Cargando viajes...</p>;

  return (
    <div className="form" style={{ padding: "20px" }}>
      <h1>Gestión de Viajes</h1>

      <FormTrips
        cars={cars}
        form={form}
        errors={errors}
        onChange={setForm}
        onSubmit={handleSubmit}
      />

      <ListTrips trips={trips} />
    </div>
  );
};
