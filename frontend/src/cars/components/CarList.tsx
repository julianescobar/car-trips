import type { Car } from "../types/cars";

interface Props {
  cars: Car[];
}

export const CarList = ({ cars }: Props) => {
  return (
    <div className="list">
      {cars.map((c) => (
        <div key={c.id} className="list-item">

          <div className="list-row">
            <span className="list-label">ID:</span>
            <span className="list-value">{c.id}</span>
          </div>

          <div className="list-row">
            <span className="list-label">Placa:</span>
            <span className="list-value">{c.plate}</span>
          </div>

          <div className="list-row">
            <span className="list-label">Color:</span>
            <span className="list-value">{c.color}</span>
          </div>

          <div className="list-row">
            <span className="list-label">Fecha:</span>
            <span className="list-value">{c.entry_date}</span>
          </div>

        </div>
      ))}
    </div>
  );
};
