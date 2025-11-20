import { useEffect, useState } from "react";
import type { Trip } from "../types/trips";
import { getCities } from "../services/citiesApi";
import type { City } from "../types/cities"

interface Props {
  trips: Trip[];
}

export const ListTrips = ({ trips }: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error("Error cargando ciudades:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  if (loadingCities) {
    return <p>Cargando ciudades...</p>;
  }

  return (
    <div className="list">
      {trips.map((t) => {
        const origin = cities.find((c) => c.id === t.origin_city)?.name;
        const dest = cities.find((c) => c.id === t.destination_city)?.name;

        return (
          <div key={t.id} className="list-item">

            <div className="list-row">
              <span className="list-label">ID:</span>
              <span className="list-value">{t.id}</span>
            </div>

            <div className="list-row">
              <span className="list-label">Carro:</span>
              <span className="list-value">{t.car_plate}</span>
            </div>

            <div className="list-row">
              <span className="list-label">Origen:</span>
              <span className="list-value">{origin}</span>
            </div>

            <div className="list-row">
              <span className="list-label">Destino:</span>
              <span className="list-value">{dest}</span>
            </div>

            <div className="list-row">
              <span className="list-label">Horas:</span>
              <span className="list-value">{t.hours}</span>
            </div>

            <div className="list-row">
              <span className="list-label">Fecha:</span>
              <span className="list-value">{t.date}</span>
            </div>

          </div>
        );
      })}
    </div>
  );
};
