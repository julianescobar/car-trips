import { useEffect, useState } from "react";
import { getCars, createCar } from "../services/carsApi";
import type { Car, CreateCar } from "../types/cars";

import { CarForm } from "../components/CarForm";
import { CarList } from "../components/CarList";

export const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<CreateCar>({
    plate: "",
    color: "",
    entry_date: "",
  });

  const [errors, setErrors] = useState({
    plate: "",
    color: "",
    entry_date: "",
  });

  const colors = ["Red", "Blue", "Green", "Black", "White", "Gray"];

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data);
    } catch {
      console.error("Error al cargar carros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const validate = () => {
    let temp = { plate: "", color: "", entry_date: "" };
    let valid = true;

    if (!form.plate.trim()) {
      temp.plate = "La placa es obligatoria";
      valid = false;
    } else if (form.plate.length < 4) {
      temp.plate = "Debe tener mínimo 4 caracteres";
      valid = false;
    } else if (!/\d/.test(form.plate)) {
      temp.plate = "Debe contener al menos un número";
      valid = false;
    }

    if (!form.color) {
      temp.color = "Debe seleccionar un color";
      valid = false;
    }

    if (!form.entry_date) {
      temp.entry_date = "La fecha es obligatoria";
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createCar(form);
      await fetchCars();
      setForm({ plate: "", color: "", entry_date: "" });
      setErrors({ plate: "", color: "", entry_date: "" });
    } catch {
      alert("Error creando carro");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Carros</h1>

      <CarForm
        form={form}
        errors={errors}
        colors={colors}
        onChange={setForm}
        onSubmit={handleSubmit}
      />

      <CarList cars={cars} />
    </div>
  );
};

export default CarsPage;
