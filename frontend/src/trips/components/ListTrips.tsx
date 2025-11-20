import { Trip } from "../types/trips";
import { cities } from "../../utils/cities";

interface Props {
  trips: Trip[];
}

export const ListTrips = ({ trips }: Props) => {
  return (
    <div className="list">
      {trips.map((t) => {
        const origin = cities.find((c) => c.pk === t.origin_city)?.name;
        const dest = cities.find((c) => c.pk === t.destination_city)?.name;

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
